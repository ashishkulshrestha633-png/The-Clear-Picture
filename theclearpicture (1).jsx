import { useState, useEffect, useRef } from "react";

/* ── DESIGN TOKENS ───────────────────────────────────────── */
const C = {
  cream:   "#F7F3EC",
  paper:   "#EDE8DF",
  sand:    "#D9D1C0",
  ink:     "#1C1C18",
  inkSoft: "#4A4A42",
  muted:   "#8A8A7E",
  ghost:   "#B8B5AC",
  forest:  "#2C4A35",
  forestL: "#3D6349",
  forestXL:"#EBF1EC",
  sage:    "#7DA882",
  clay:    "#9B5B3A",
  clayL:   "#C47A56",
  clayXL:  "#FAF0EB",
  navy:    "#1E2C44",
  navyL:   "#2E4268",
  navyXL:  "#EAF0F8",
  gold:    "#B5893A",
  goldL:   "#D4A855",
  goldXL:  "#FBF5E6",
  plum:    "#5B3558",
  plumL:   "#7D4E79",
  plumXL:  "#F5EEF5",
};

const TEAM = [
  {
    name: "Ashish Kulshrestha",
    role: "Communications & Reputation",
    tag: "Founding Member",
    bio: "Former business journalist with The Economic Times. Led communications at Flipkart and AXA. Twelve years across investigative journalism, corporate communications, and reputation strategy — a rare fluency in how stories are made, and how they hold.",
    brands: ["The Economic Times", "Flipkart", "AXA"],
    initials: "AK",
    bg: C.forest,
    accent: C.sage,
    light: C.forestXL,
    tagColor: C.forestL,
  },
  {
    name: "Aishwarya Kumar",
    role: "Digital Strategy & Campaigns",
    tag: "Digital Lead",
    bio: "Specialist in digital strategy, audience architecture, and campaign communications. Brings a data-informed instinct for how audiences move, what earns attention, and what builds durable engagement across platforms.",
    brands: ["Digital Strategy", "Audience Growth", "Campaign Comms"],
    initials: "AK",
    bg: C.navy,
    accent: "#6B8FBF",
    light: C.navyXL,
    tagColor: C.navyL,
  },
  {
    name: "Ritesh Singh",
    role: "Public Policy & Law",
    tag: "Policy Lead",
    bio: "Practising lawyer and public policy expert working at the intersection of regulatory affairs, governance, and institutional engagement. Brings the discipline of legal reasoning to the complexity of policy influence.",
    brands: ["Regulatory Affairs", "Governance", "Institutional Engagement"],
    initials: "RS",
    bg: C.clay,
    accent: C.clayL,
    light: C.clayXL,
    tagColor: "#8B4A2C",
  },
  {
    name: "Katherene Asuntha",
    role: "CSR & Sustainability",
    tag: "Impact Lead",
    bio: "Expert in social impact communication and sustainability narratives. Works with organisations to translate purpose into credible, resonant stories that hold up under scrutiny and inspire long-term action.",
    brands: ["CSR Strategy", "Impact Narratives", "Social Sector"],
    initials: "KA",
    bg: C.plum,
    accent: C.plumL,
    light: C.plumXL,
    tagColor: "#6A3D67",
  },
];

const SERVICES = [
  { id: "01", title: "Public Relations", desc: "Shaping narratives that earn attention, trust, and lasting recognition.", color: C.forest },
  { id: "02", title: "Strategic Communications", desc: "Communication architecture aligned with organisational goals and long-term positioning.", color: C.navy },
  { id: "03", title: "Public Policy", desc: "Navigating the regulatory and legislative environment with precision and institutional authority.", color: C.clay },
  { id: "04", title: "Government Relations", desc: "Structured, credible engagement with government stakeholders at every level.", color: C.plum },
  { id: "05", title: "Reputation Advisory", desc: "Protecting and advancing how organisations are perceived by the audiences that matter most.", color: C.gold },
  { id: "06", title: "Crisis Communications", desc: "Responding to high-stakes situations with composure, strategy, and unambiguous clarity.", color: "#7A3030" },
  { id: "07", title: "Digital Communications", desc: "Crafting presence and influence across digital channels with intent and editorial rigour.", color: C.navy },
  { id: "08", title: "CSR & Sustainability", desc: "Translating impact programmes into compelling, credible narratives for diverse stakeholders.", color: C.forest },
  { id: "09", title: "Stakeholder Engagement", desc: "Mapping and managing relationships with the full constellation of voices that shape decisions.", color: C.plum },
];

const THINKING = [
  { tag: "Reputation", tagBg: C.forestXL, tagColor: C.forest, title: "Why credibility is an asset class", desc: "On the structural value of institutional trust in an era of compressed attention.", date: "May 2025", accentBg: C.forest },
  { tag: "Policy", tagBg: C.navyXL, tagColor: C.navy, title: "The grammar of government engagement", desc: "How organisations with something to say earn the right to be heard.", date: "April 2025", accentBg: C.navy },
  { tag: "Crisis", tagBg: "#FFF0F0", tagColor: "#7A3030", title: "Silence is a statement", desc: "What organisations communicate when they choose not to — and what to do about it.", date: "March 2025", accentBg: "#7A3030" },
];

/* ── UTILS ───────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, up = 24, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : `translateY(${up}px)`,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', sans-serif";

function Label({ children, color = C.muted }) {
  return <span style={{ display: "block", fontFamily: sans, fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color, marginBottom: "1.1rem" }}>{children}</span>;
}

/* ── NAV ─────────────────────────────────────────────────── */
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Work", "Services", "About", "Thinking", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(247,243,236,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.sand}` : "none",
      transition: "all 0.45s ease", padding: "0 2.5rem",
    }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div onClick={() => setActive("home")} style={{ cursor: "pointer" }}>
          <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, letterSpacing: "0.03em", color: C.ink, lineHeight: 1.1 }}>The Clear Picture</div>
          <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.24em", color: C.muted, textTransform: "uppercase" }}>Strategic Communications</div>
        </div>
        <div style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}>
          {links.map(l => (
            <button key={l} onClick={() => setActive(l.toLowerCase())}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: sans, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                color: active === l.toLowerCase() ? C.ink : C.muted,
                borderBottom: active === l.toLowerCase() ? `1.5px solid ${C.forest}` : "1.5px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}>{l}</button>
          ))}
          <button onClick={() => setActive("contact")} style={{
            background: C.forest, color: C.cream, border: "none", cursor: "pointer",
            fontFamily: sans, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "9px 20px", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = C.forestL}
            onMouseLeave={e => e.target.style.background = C.forest}
          >Talk to Us</button>
        </div>
      </div>
    </nav>
  );
}

/* ── HERO ────────────────────────────────────────────────── */
function Hero({ setActive }) {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);
  const t = (d) => ({ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(22px)", transition: `all 1s cubic-bezier(0.16,1,0.3,1) ${d}s` });
  return (
    <section style={{ minHeight: "100vh", background: C.cream, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: "38%", height: "100%", background: `linear-gradient(135deg, ${C.forestXL} 0%, ${C.paper} 100%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "12%", bottom: "15%", width: 180, height: 180, borderRadius: "50%", background: C.sage, opacity: 0.18, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "28%", top: "18%", width: 90, height: 90, borderRadius: "50%", background: C.gold, opacity: 0.14, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "4%", bottom: "8%", width: 60, height: 60, background: C.clay, opacity: 0.12, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={t(0.1)}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: sans, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.forest, marginBottom: "2.5rem" }}>
              <span style={{ display: "inline-block", width: 28, height: 1.5, background: C.forest }} />
              A Multidisciplinary Collective · India
            </span>
          </div>
          <h1 style={{ ...t(0.22), fontFamily: serif, fontSize: "clamp(56px, 8vw, 112px)", fontWeight: 500, lineHeight: 0.95, color: C.ink, letterSpacing: "-0.025em", margin: "0 0 2.2rem" }}>
            Influence.<br />
            <em style={{ fontStyle: "italic", color: C.forest }}>Clarity.</em><br />
            Credibility.
          </h1>
          <p style={{ ...t(0.38), fontFamily: sans, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.85, color: C.inkSoft, maxWidth: 520, margin: "0 0 3rem" }}>
            We help organisations shape influence, navigate complexity, and communicate with precision. A collective of senior specialists at the intersection of communications, policy, and public affairs.
          </p>
          <div style={{ ...t(0.52), display: "flex", gap: "1.4rem", alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => setActive("contact")} style={{
              background: C.ink, color: C.cream, border: "none", cursor: "pointer",
              fontFamily: sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "15px 34px", transition: "background 0.22s",
            }}
              onMouseEnter={e => e.target.style.background = C.forest}
              onMouseLeave={e => e.target.style.background = C.ink}
            >Begin a Conversation</button>
            <button onClick={() => setActive("work")} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              color: C.inkSoft, display: "flex", alignItems: "center", gap: 8,
              borderBottom: `1px solid ${C.sand}`, paddingBottom: 2,
            }}>View Our Work <span style={{ fontSize: 17 }}>→</span></button>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: on ? 0.45 : 0, transition: "opacity 1s ease 1.3s" }}>
        <div style={{ width: 1, height: 52, background: `linear-gradient(to bottom, ${C.forest}, transparent)` }} />
        <span style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted }}>Scroll</span>
      </div>
    </section>
  );
}

/* ── MARQUEE ─────────────────────────────────────────────── */
function Marquee() {
  const items = ["Strategic Communications", "Public Affairs", "Reputation Advisory", "Public Policy", "Crisis Strategy", "Stakeholder Engagement", "Digital Strategy", "Government Relations", "CSR & Sustainability"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: C.forest, padding: "16px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: "3rem", animation: "tcp-marquee 30s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontFamily: sans, fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            {t}&nbsp;<span style={{ opacity: 0.2 }}>·</span>&nbsp;
          </span>
        ))}
      </div>
      <style>{`@keyframes tcp-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/* ── STAT BAR ────────────────────────────────────────────── */
function StatBar() {
  const stats = [
    { num: "12+", label: "Years of combined journalism & policy experience", color: C.forest },
    { num: "4", label: "Senior domain specialists — no juniors on your brief", color: C.navy },
    { num: "9", label: "Practice areas spanning the full communications landscape", color: C.clay },
  ];
  return (
    <section style={{ background: C.paper, borderTop: `1px solid ${C.sand}`, borderBottom: `1px solid ${C.sand}` }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              padding: "3.5rem 2.5rem 3.5rem 0",
              borderRight: i < 2 ? `1px solid ${C.sand}` : "none",
              paddingLeft: i > 0 ? "2.5rem" : 0,
            }}>
              <div style={{ fontFamily: serif, fontSize: "clamp(42px, 5vw, 66px)", fontWeight: 500, color: s.color, lineHeight: 1, marginBottom: "0.4rem" }}>{s.num}</div>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, lineHeight: 1.55, maxWidth: 220 }}>{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── ABOUT INTRO ─────────────────────────────────────────── */
function AboutIntro({ setActive }) {
  return (
    <section style={{ background: C.cream, padding: "9rem 0 5rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "center" }}>
          <FadeIn>
            <Label color={C.forest}>About the Collective</Label>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 500, lineHeight: 1.1, color: C.ink, margin: "0 0 0" }}>
              Where journalism meets strategy. Where law meets narrative.
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.88, color: C.inkSoft, margin: "0 0 1.5rem" }}>
              The Clear Picture is a strategic communications collective built on the belief that clarity is a competitive advantage. We bring together former journalists, lawyers, digital strategists, and policy professionals — each at the top of their respective disciplines.
            </p>
            <p style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.88, color: C.inkSoft, margin: "0 0 2.5rem" }}>
              We are not an agency. We operate as a network of senior experts, assembled to serve organisations that cannot afford vague thinking or diluted strategy.
            </p>
            <button onClick={() => setActive("about")} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: sans, fontSize: 11, letterSpacing: "0.18em",
              textTransform: "uppercase", color: C.forest,
              display: "flex", alignItems: "center", gap: 8,
              borderBottom: `1px solid ${C.sage}`, paddingBottom: 2,
            }}>Meet the Collective <span style={{ fontSize: 17 }}>→</span></button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── TEAM SECTION (homepage) ─────────────────────────────── */
function TeamSection({ setActive }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ background: C.cream, padding: "3rem 0 9rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <Label>The Collective</Label>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(30px, 3.5vw, 46px)", fontWeight: 500, color: C.ink, margin: 0, lineHeight: 1.1 }}>
                The people behind<br />the collective
              </h2>
            </div>
            <button onClick={() => setActive("about")} style={{
              background: "none", border: `1px solid ${C.sand}`, cursor: "pointer",
              fontFamily: sans, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
              color: C.inkSoft, padding: "10px 20px",
            }}>All Members →</button>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3px" }}>
          {TEAM.map((m, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i ? m.bg : C.paper,
                  transition: "background 0.4s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "pointer", padding: "2.8rem 2.4rem", minHeight: 400,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", right: -30, bottom: -30, width: 130, height: 130,
                  borderRadius: "50%", background: m.accent,
                  opacity: hovered === i ? 0.22 : 0, transition: "opacity 0.4s",
                  pointerEvents: "none",
                }} />

                <div>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: hovered === i ? "rgba(255,255,255,0.18)" : m.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: sans, fontSize: 14, fontWeight: 500,
                    color: hovered === i ? "rgba(255,255,255,0.9)" : C.cream,
                    marginBottom: "1.5rem", transition: "all 0.4s",
                  }}>{m.initials}</div>

                  <span style={{
                    display: "inline-block", fontFamily: sans, fontSize: 9,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: hovered === i ? "rgba(255,255,255,0.6)" : m.tagColor,
                    background: hovered === i ? "rgba(255,255,255,0.12)" : m.light,
                    padding: "3px 9px", marginBottom: "1rem",
                    transition: "all 0.3s",
                  }}>{m.tag}</span>

                  <div style={{ fontFamily: serif, fontSize: "clamp(17px, 1.5vw, 21px)", fontWeight: 500, color: hovered === i ? "#FAF8F4" : C.ink, lineHeight: 1.18, marginBottom: "0.4rem", transition: "color 0.3s" }}>{m.name}</div>
                  <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: hovered === i ? "rgba(255,255,255,0.55)" : C.muted, marginBottom: "1.4rem", transition: "color 0.3s" }}>{m.role}</div>
                  <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.78, color: hovered === i ? "rgba(255,255,255,0.75)" : C.inkSoft, margin: 0, transition: "color 0.3s" }}>{m.bio}</p>
                </div>

                <div style={{ marginTop: "1.8rem", display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {m.brands.map((b, j) => (
                    <span key={j} style={{
                      fontFamily: sans, fontSize: 10, letterSpacing: "0.06em",
                      color: hovered === i ? "rgba(255,255,255,0.5)" : C.ghost,
                      borderBottom: `1px solid ${hovered === i ? "rgba(255,255,255,0.2)" : C.sand}`,
                      paddingBottom: 1, transition: "all 0.3s",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES (homepage) ─────────────────────────────────── */
function ServicesSection({ setActive }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ background: C.ink, padding: "9rem 0" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "5rem", alignItems: "flex-end" }}>
            <div>
              <Label color="rgba(255,255,255,0.35)">What We Do</Label>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 500, lineHeight: 1.06, color: "#FAF8F4", margin: 0 }}>
                The full range<br />of what we offer
              </h2>
            </div>
            <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, maxWidth: 380, marginLeft: "auto" }}>
              Each practice area is led by a specialist. Every engagement is designed around your specific context — not a template.
            </p>
          </div>
        </FadeIn>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid", gridTemplateColumns: "70px 1fr 2fr 50px",
                  alignItems: "center", gap: "2rem",
                  padding: "1.8rem 1.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  background: hovered === i ? "rgba(255,255,255,0.04)" : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontFamily: sans, fontSize: 10, color: hovered === i ? s.color : "rgba(255,255,255,0.2)", letterSpacing: "0.12em", transition: "color 0.2s" }}>{s.id}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(17px, 1.7vw, 23px)", fontWeight: 500, color: hovered === i ? "#FAF8F4" : "rgba(255,255,255,0.78)", transition: "color 0.2s" }}>{s.title}</span>
                <span style={{ fontFamily: sans, fontSize: 13.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>{s.desc}</span>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: hovered === i ? s.color : "transparent", border: `1px solid ${hovered === i ? s.color : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", transition: "all 0.2s" }}>
                  <span style={{ color: hovered === i ? "#fff" : "rgba(255,255,255,0.25)", fontSize: 13 }}>→</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── THINKING (homepage) ─────────────────────────────────── */
function ThinkingSection() {
  return (
    <section style={{ background: C.paper, padding: "9rem 0" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
            <div>
              <Label>Thinking</Label>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.08, color: C.ink, margin: 0 }}>How we see the landscape</h2>
            </div>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px" }}>
          {THINKING.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                background: C.cream, padding: "3rem", cursor: "pointer", minHeight: 360,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                borderTop: `3px solid ${t.accentBg}`, transition: "transform 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                <div>
                  <span style={{ display: "inline-block", fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: t.tagColor, background: t.tagBg, padding: "4px 10px", marginBottom: "1.8rem" }}>{t.tag}</span>
                  <h3 style={{ fontFamily: serif, fontSize: "clamp(21px, 2vw, 28px)", fontWeight: 500, color: C.ink, lineHeight: 1.18, margin: "0 0 1rem" }}>{t.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
                </div>
                <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.sand}`, paddingTop: "1.2rem" }}>
                  <span style={{ fontFamily: sans, fontSize: 12, color: C.ghost }}>{t.date}</span>
                  <span style={{ fontSize: 17, color: t.accentBg }}>→</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA BANNER ──────────────────────────────────────────── */
function CTABanner({ setActive }) {
  return (
    <section style={{ background: `linear-gradient(135deg, ${C.forest} 0%, ${C.navy} 100%)`, padding: "8rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "8%", top: "20%", width: 200, height: 200, borderRadius: "50%", background: C.sage, opacity: 0.1 }} />
      <div style={{ position: "absolute", right: "10%", bottom: "15%", width: 140, height: 140, background: C.gold, opacity: 0.08 }} />
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <Label color="rgba(255,255,255,0.35)">Ready to Begin</Label>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 500, color: "#FAF8F4", lineHeight: 1.05, margin: "0 0 1.5rem" }}>
            Every complex situation<br />has a clear path through it.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 460, margin: "0 auto 3rem", lineHeight: 1.8 }}>
            If you are navigating something that requires strategic intelligence and communications rigour, let us talk.
          </p>
          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setActive("contact")} style={{
              background: "#FAF8F4", color: C.ink, border: "none", cursor: "pointer",
              fontFamily: sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "15px 36px", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.opacity = 0.88}
              onMouseLeave={e => e.target.style.opacity = 1}
            >Begin a Conversation</button>
            <button onClick={() => setActive("services")} style={{
              background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer",
              fontFamily: sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "15px 36px", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.6)"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "rgba(255,255,255,0.7)"; }}
            >Our Services</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── ABOUT PAGE (full) ───────────────────────────────────── */
function AboutPage() {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <section style={{ background: C.ink, padding: "9rem 0 7rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
          <FadeIn>
            <Label color="rgba(255,255,255,0.3)">The Collective</Label>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(44px, 6vw, 84px)", fontWeight: 500, lineHeight: 1.0, color: "#FAF8F4", margin: "0 0 2rem" }}>
              Senior specialists.<br /><em style={{ fontStyle: "italic", color: C.sage }}>No juniors</em> on your brief.
            </h1>
            <p style={{ fontFamily: sans, fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
              Every engagement is handled by the specialist who built their reputation in that domain. You work with the person — not the organisation they represent.
            </p>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: C.cream, padding: "0 0 8rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "3px", marginTop: -3 }}>
            {TEAM.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: "4rem",
                    background: hovered === i ? m.bg : (i % 2 === 0 ? C.paper : C.cream),
                    transition: "background 0.45s cubic-bezier(0.16,1,0.3,1)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", right: -40, bottom: -40, width: 200, height: 200, borderRadius: "50%", background: m.accent, opacity: hovered === i ? 0.18 : 0, transition: "opacity 0.4s" }} />

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2.2rem" }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: "50%", flexShrink: 0,
                      background: hovered === i ? "rgba(255,255,255,0.2)" : m.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: sans, fontSize: 16, fontWeight: 500,
                      color: hovered === i ? "rgba(255,255,255,0.9)" : C.cream,
                      transition: "all 0.4s",
                    }}>{m.initials}</div>
                    <div style={{ paddingTop: 4 }}>
                      <span style={{ display: "inline-block", fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: hovered === i ? "rgba(255,255,255,0.5)" : m.tagColor, background: hovered === i ? "rgba(255,255,255,0.1)" : m.light, padding: "3px 9px", marginBottom: 8, transition: "all 0.35s" }}>{m.tag}</span>
                      <div style={{ fontFamily: serif, fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 500, color: hovered === i ? "#FAF8F4" : C.ink, lineHeight: 1.15, transition: "color 0.35s" }}>{m.name}</div>
                      <div style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: hovered === i ? "rgba(255,255,255,0.5)" : C.muted, marginTop: 4, transition: "color 0.35s" }}>{m.role}</div>
                    </div>
                  </div>

                  <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.85, color: hovered === i ? "rgba(255,255,255,0.72)" : C.inkSoft, margin: "0 0 2rem", transition: "color 0.35s" }}>{m.bio}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {m.brands.map((b, j) => (
                      <span key={j} style={{
                        fontFamily: sans, fontSize: 11, letterSpacing: "0.08em",
                        color: hovered === i ? "rgba(255,255,255,0.45)" : C.muted,
                        border: `1px solid ${hovered === i ? "rgba(255,255,255,0.15)" : C.sand}`,
                        padding: "4px 12px", transition: "all 0.3s",
                      }}>{b}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.goldXL, padding: "7rem 0", borderTop: `3px solid ${C.gold}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <FadeIn>
              <Label color={C.gold}>Our Philosophy</Label>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 500, color: C.ink, lineHeight: 1.12, margin: 0 }}>
                Intelligence is the product. Communication is the delivery.
              </h2>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p style={{ fontFamily: sans, fontSize: 15.5, lineHeight: 1.88, color: C.inkSoft, margin: "0 0 1.4rem" }}>
                We believe that the best communications work begins with rigorous thinking — about the organisation, its stakeholders, its context, and the currents it must navigate. We do not reach for messaging before we understand the situation.
              </p>
              <p style={{ fontFamily: sans, fontSize: 15.5, lineHeight: 1.88, color: C.inkSoft, margin: 0 }}>
                This is why our collective combines editorial instinct, legal precision, policy fluency, and digital strategy — because no single lens is sufficient for the complexity our clients face.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── SERVICES PAGE (full) ────────────────────────────────── */
function ServicesPage({ setActive }) {
  const [hovered, setHovered] = useState(null);
  const pillars = [
    { title: "Communications", color: C.forest, light: C.forestXL, services: ["Public Relations", "Strategic Communications", "Crisis Communications", "Digital Communications"], desc: "The craft of shaping how organisations are understood — across media, platforms, and stakeholder networks." },
    { title: "Policy & Government", color: C.navy, light: C.navyXL, services: ["Public Policy", "Government Relations", "Stakeholder Engagement"], desc: "The architecture of institutional engagement — where legal precision meets political acuity." },
    { title: "Reputation & Impact", color: C.clay, light: C.clayXL, services: ["Reputation Advisory", "CSR & Sustainability Communications"], desc: "The long game — building and protecting the credibility that gives organisations licence to operate." },
  ];
  return (
    <div>
      <section style={{ background: C.paper, padding: "8rem 0 6rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
          <FadeIn>
            <Label>Services</Label>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 500, lineHeight: 1.0, color: C.ink, margin: "0 0 1.5rem" }}>
              What we do.<br /><em style={{ fontStyle: "italic", color: C.forest }}>How we do it.</em>
            </h1>
            <p style={{ fontFamily: sans, fontSize: 16, color: C.muted, maxWidth: 500, lineHeight: 1.8 }}>
              Nine practice areas. Three strategic pillars. One collective with the depth to serve the full spectrum of your communications needs.
            </p>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: C.cream, padding: "0 0 8rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px" }}>
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{ background: p.light, padding: "3.5rem 3rem", borderTop: `3px solid ${p.color}` }}>
                  <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: p.color, marginBottom: "1.2rem" }}>{`0${i + 1}`}</div>
                  <h3 style={{ fontFamily: serif, fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500, color: C.ink, margin: "0 0 1rem", lineHeight: 1.15 }}>{p.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft, lineHeight: 1.72, margin: "0 0 2rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {p.services.map((s, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.ink, padding: "8rem 0" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
          <FadeIn><h2 style={{ fontFamily: serif, fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 500, color: "#FAF8F4", margin: "0 0 4rem", lineHeight: 1.1 }}>All Practice Areas</h2></FadeIn>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{
                  display: "grid", gridTemplateColumns: "70px 1fr 2fr 50px",
                  alignItems: "center", gap: "2rem", padding: "1.9rem 1.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: hovered === i ? "rgba(255,255,255,0.03)" : "transparent",
                  cursor: "pointer", transition: "background 0.2s",
                }}>
                  <span style={{ fontFamily: sans, fontSize: 10, color: hovered === i ? s.color : "rgba(255,255,255,0.18)", letterSpacing: "0.12em", transition: "color 0.2s" }}>{s.id}</span>
                  <span style={{ fontFamily: serif, fontSize: "clamp(17px, 1.7vw, 23px)", fontWeight: 500, color: hovered === i ? "#FAF8F4" : "rgba(255,255,255,0.75)", transition: "color 0.2s" }}>{s.title}</span>
                  <span style={{ fontFamily: sans, fontSize: 13.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>{s.desc}</span>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: hovered === i ? s.color : "transparent", border: `1px solid ${hovered === i ? s.color : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", transition: "all 0.2s" }}>
                    <span style={{ color: hovered === i ? "#fff" : "rgba(255,255,255,0.2)", fontSize: 13 }}>→</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── WORK PAGE ───────────────────────────────────────────── */
function WorkPage() {
  const cases = [
    { client: "A venture-backed fintech", tag: "Crisis Communications", tagColor: "#7A3030", tagBg: "#FFF0F0", accent: "#7A3030", headline: "Reframing a regulatory moment", summary: "When a regulatory inquiry created uncertainty for investors and media alike, we helped the company establish a clear, consistent narrative — converting a potential crisis into a demonstration of transparency and governance maturity.", outcome: "Maintained investor confidence through a 6-week regulatory process. Coverage shifted from adversarial to explanatory within 3 weeks." },
    { client: "A multinational entering India", tag: "Government Relations", tagColor: C.navy, tagBg: C.navyXL, accent: C.navy, headline: "Building institutional presence", summary: "An international company required structured engagement with regulatory bodies before market entry. We developed a public affairs strategy that introduced the organisation to the right stakeholders with credibility, not just access.", outcome: "Established relationships with three regulatory bodies and one industry association in the pre-launch phase." },
    { client: "A mission-driven NGO", tag: "CSR & Sustainability", tagColor: C.forest, tagBg: C.forestXL, accent: C.forest, headline: "Making impact legible", summary: "A well-regarded non-profit had significant programme depth but weak external communication. We translated their work into a coherent narrative that served both donor relations and media engagement.", outcome: "Programme coverage in two national publications. 40% improvement in donor communication response rates." },
  ];
  return (
    <section style={{ background: C.cream, padding: "8rem 0" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <Label>Selected Work</Label>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 500, lineHeight: 1.04, color: C.ink, margin: "0 0 1.5rem" }}>Engagements that<br />required precision.</h1>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.muted, maxWidth: 460, lineHeight: 1.78, marginBottom: "5rem" }}>Client identities are protected. What we share is the shape of the problem — and how we addressed it.</p>
        </FadeIn>
        {cases.map((c, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "4rem", padding: "4rem 0", borderTop: `1px solid ${C.sand}` }}>
              <div>
                <span style={{ display: "inline-block", fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: c.tagColor, background: c.tagBg, padding: "4px 10px", marginBottom: "1.5rem" }}>{c.tag}</span>
                <div style={{ fontFamily: sans, fontSize: 12, color: C.ghost, marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Client</div>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: C.ink }}>{c.client}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: "clamp(22px, 2.2vw, 34px)", fontWeight: 500, color: C.ink, lineHeight: 1.16, margin: "0 0 1.3rem" }}>{c.headline}</h3>
                <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.82, color: C.inkSoft, margin: "0 0 1.8rem" }}>{c.summary}</p>
                <div style={{ padding: "1.2rem 1.6rem", borderLeft: `3px solid ${c.accent}`, background: C.paper }}>
                  <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.ghost, display: "block", marginBottom: 6 }}>Outcome</span>
                  <span style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft, lineHeight: 1.65 }}>{c.outcome}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── THINKING PAGE ───────────────────────────────────────── */
function ThinkingPage() {
  return (
    <section style={{ background: C.cream, padding: "8rem 0" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <Label>Thinking</Label>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 500, lineHeight: 1.04, color: C.ink, margin: "0 0 4rem" }}>How we see the landscape</h1>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px" }}>
          {THINKING.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                background: C.paper, padding: "3rem", cursor: "pointer", minHeight: 360,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                borderTop: `3px solid ${t.accentBg}`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#E6E2D9"}
                onMouseLeave={e => e.currentTarget.style.background = C.paper}
              >
                <div>
                  <span style={{ display: "inline-block", fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: t.tagColor, background: t.tagBg, padding: "4px 10px", marginBottom: "1.8rem" }}>{t.tag}</span>
                  <h3 style={{ fontFamily: serif, fontSize: "clamp(21px, 2vw, 28px)", fontWeight: 500, color: C.ink, lineHeight: 1.18, margin: "0 0 1rem" }}>{t.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
                </div>
                <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.sand}`, paddingTop: "1.2rem" }}>
                  <span style={{ fontFamily: sans, fontSize: 12, color: C.ghost }}>{t.date}</span>
                  <span style={{ fontSize: 17, color: t.accentBg }}>→</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT PAGE ────────────────────────────────────────── */
function ContactPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", nature: "", message: "" });
  const [sent, setSent] = useState(false);
  const fld = { width: "100%", background: "none", border: "none", borderBottom: `1px solid ${C.sand}`, padding: "11px 0", fontSize: 16, fontFamily: sans, color: C.ink, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const lbl = { fontFamily: sans, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.ghost, display: "block", marginBottom: 8 };
  return (
    <section style={{ background: C.cream, padding: "8rem 0", minHeight: "80vh" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem" }}>
          <FadeIn>
            <Label>Contact</Label>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 500, lineHeight: 1.06, color: C.ink, margin: "0 0 2rem" }}>Let us talk<br />about what matters.</h1>
            <p style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.85, color: C.inkSoft, marginBottom: "3rem" }}>
              Whether you are facing a communications challenge, planning a public affairs strategy, or simply want to understand how we work — we would rather have a candid conversation than send you a brochure.
            </p>
            <div style={{ borderTop: `1px solid ${C.sand}`, paddingTop: "2.2rem", display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
              {[{ label: "Email", value: "hello@theclearpicture.in" }, { label: "Based in", value: "India — Working Globally" }].map((item, i) => (
                <div key={i}>
                  <span style={{ ...lbl, marginBottom: 4 }}>{item.label}</span>
                  <span style={{ fontFamily: sans, fontSize: 16, color: C.ink }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {[{ label: "Communications", color: C.forest }, { label: "Policy & Gov", color: C.navy }, { label: "Reputation", color: C.clay }, { label: "Digital", color: C.plum }].map((s, i) => (
                <div key={i} style={{ background: s.color, padding: "12px 16px" }}>
                  <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            {sent ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 460 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.forestXL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: 26, color: C.forest }}>✓</div>
                  <h3 style={{ fontFamily: serif, fontSize: 34, fontWeight: 500, color: C.ink, margin: "0 0 0.5rem" }}>Message received.</h3>
                  <p style={{ fontFamily: sans, fontSize: 15, color: C.muted }}>We will be in touch shortly.</p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {[{ label: "Your Name", key: "name", type: "text" }, { label: "Organisation", key: "org", type: "text" }, { label: "Email Address", key: "email", type: "email" }].map(f => (
                  <div key={f.key}>
                    <label style={lbl}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={fld}
                      onFocus={e => e.target.style.borderBottomColor = C.forest}
                      onBlur={e => e.target.style.borderBottomColor = C.sand}
                    />
                  </div>
                ))}
                <div>
                  <label style={lbl}>Nature of Enquiry</label>
                  <select value={form.nature} onChange={e => setForm({ ...form, nature: e.target.value })}
                    style={{ ...fld, appearance: "none" }}>
                    <option value="">Select a practice area</option>
                    {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>What is on your mind?</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...fld, resize: "none" }}
                    onFocus={e => e.target.style.borderBottomColor = C.forest}
                    onBlur={e => e.target.style.borderBottomColor = C.sand}
                  />
                </div>
                <button onClick={() => setSent(true)} style={{
                  background: C.forest, color: "#FAF8F4", border: "none", cursor: "pointer",
                  fontFamily: sans, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "15px 34px", alignSelf: "flex-start", marginTop: "0.5rem",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.target.style.background = C.forestL}
                  onMouseLeave={e => e.target.style.background = C.forest}
                >Send Message</button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────── */
function Footer({ setActive }) {
  return (
    <footer style={{ background: C.ink, color: "#FAF8F4", padding: "6rem 0 3rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, marginBottom: 5 }}>The Clear Picture</div>
            <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "1.5rem" }}>Strategic Communications Collective</div>
            <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.82, color: "rgba(255,255,255,0.4)", maxWidth: 280, margin: "0 0 2rem" }}>A collective of senior specialists helping organisations communicate with clarity, influence, and purpose.</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[C.forest, C.navy, C.clay, C.plum].map((c, i) => (
                <div key={i} style={{ width: 30, height: 4, background: c, opacity: 0.7 }} />
              ))}
            </div>
          </div>
          {[
            { label: "Navigate", links: [["Work", "work"], ["Services", "services"], ["About", "about"], ["Thinking", "thinking"]] },
            { label: "Services", links: [["Public Relations", "services"], ["Public Policy", "services"], ["Reputation Advisory", "services"], ["Crisis Communications", "services"]] },
            { label: "Contact", links: [["Begin a Conversation", "contact"], ["hello@theclearpicture.in", null], ["India — Globally", null]] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.5rem" }}>{col.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {col.links.map(([text, page], j) => (
                  <span key={j} onClick={() => page && setActive(page)}
                    style={{ fontFamily: sans, fontSize: 13.5, color: "rgba(255,255,255,0.48)", cursor: page ? "pointer" : "default", transition: "color 0.2s" }}
                    onMouseEnter={e => { if (page) e.target.style.color = "rgba(255,255,255,0.88)"; }}
                    onMouseLeave={e => { if (page) e.target.style.color = "rgba(255,255,255,0.48)"; }}
                  >{text}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.22)" }}>© 2025 The Clear Picture. All rights reserved.</span>
          <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.22)" }}>India</span>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ROOT ────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");
  const go = (page) => { setActive(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const page = () => {
    switch (active) {
      case "services":  return <ServicesPage setActive={go} />;
      case "about":     return <AboutPage />;
      case "thinking":  return <ThinkingPage />;
      case "contact":   return <ContactPage />;
      case "work":      return <WorkPage />;
      default: return (
        <>
          <Hero setActive={go} />
          <Marquee />
          <StatBar />
          <AboutIntro setActive={go} />
          <TeamSection setActive={go} />
          <ServicesSection setActive={go} />
          <ThinkingSection />
          <CTABanner setActive={go} />
        </>
      );
    }
  };

  return (
    <div style={{ fontFamily: sans, background: C.cream, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Nav active={active} setActive={go} />
      <div style={{ paddingTop: active !== "home" ? 72 : 0 }}>{page()}</div>
      <Footer setActive={go} />
    </div>
  );
}
