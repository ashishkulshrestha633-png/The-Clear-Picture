import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Services", "Collective", "Thinking", "Contact"];

const SERVICES = [
  { id: "01", title: "Public Relations", desc: "Shaping narratives that earn attention, trust, and lasting recognition across media landscapes." },
  { id: "02", title: "Strategic Communications", desc: "Developing communication architecture that aligns with organisational goals and long-term positioning." },
  { id: "03", title: "Public Policy", desc: "Navigating the regulatory and legislative environment with precision and institutional authority." },
  { id: "04", title: "Government Relations", desc: "Building structured, credible engagement with government stakeholders at every level." },
  { id: "05", title: "Reputation Advisory", desc: "Protecting and advancing how organisations are perceived by the audiences that matter most." },
  { id: "06", title: "Crisis Communications", desc: "Responding to high-stakes situations with composure, strategy, and unambiguous clarity." },
  { id: "07", title: "Digital Communications", desc: "Crafting presence and influence across digital channels with intent and editorial rigour." },
  { id: "08", title: "CSR & Sustainability", desc: "Translating impact programmes into compelling, credible narratives for diverse stakeholders." },
  { id: "09", title: "Stakeholder Engagement", desc: "Mapping and managing relationships with the full constellation of voices that shape decisions." },
];

const TEAM = [
  {
    name: "Ashish Kulshrestha",
    role: "Communications & Reputation",
    bio: "Former business journalist with The Economic Times. Has led communications at Flipkart and AXA. Over twelve years spanning investigative journalism, corporate communications, and reputation strategy — a rare fluency in how stories are made, and how they hold.",
    initials: "AK",
    accent: "#2C3E30",
  },
  {
    name: "Aishwarya Kumar",
    role: "Digital Strategy",
    bio: "Specialist in digital strategy, audience architecture, and campaign communications. Brings a data-informed instinct for how audiences move, what earns attention, and what drives durable engagement.",
    initials: "AK",
    accent: "#2B3040",
  },
  {
    name: "Ritesh Singh",
    role: "Public Policy & Law",
    bio: "Practising lawyer and public policy expert. Works at the intersection of regulatory affairs, governance, and institutional engagement. Brings the discipline of legal reasoning to the complexity of policy influence.",
    initials: "RS",
    accent: "#3A2E28",
  },
  {
    name: "Katherene Asuntha",
    role: "CSR & Sustainability",
    bio: "Expert in social impact communication and sustainability narratives. Works with organisations to translate purpose into credible, resonant stories that hold up under scrutiny and inspire action.",
    initials: "KA",
    accent: "#2A3530",
  },
];

const THINKING = [
  {
    tag: "Reputation",
    title: "Why credibility is an asset class",
    desc: "On the structural value of institutional trust in an era of compressed attention.",
    date: "May 2025",
  },
  {
    tag: "Policy",
    title: "The grammar of government engagement",
    desc: "How organisations with something to say earn the right to be heard in policy conversations.",
    date: "April 2025",
  },
  {
    tag: "Crisis",
    title: "Silence is a statement",
    desc: "What organisations communicate when they choose not to communicate — and what to do about it.",
    date: "March 2025",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,248,244,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(30,30,28,0.08)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2.5rem",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div
          onClick={() => setActive("home")}
          style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 1 }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", color: "#1a1a18" }}>
            The Clear Picture
          </span>
          <span style={{ fontSize: 9, letterSpacing: "0.22em", color: "#7a7a72", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            Strategic Communications
          </span>
        </div>
        <div style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => setActive(link.toLowerCase())}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active === link.toLowerCase() ? "#1a1a18" : "#7a7a72",
                borderBottom: active === link.toLowerCase() ? "1px solid #1a1a18" : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero({ setActive }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 120); }, []);
  return (
    <section style={{ minHeight: "100vh", background: "#FAF8F4", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", right: "-8%", top: "10%", width: 520, height: 520,
        borderRadius: "50%", border: "1px solid rgba(30,30,28,0.06)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: "2%", top: "20%", width: 320, height: 320,
        borderRadius: "50%", border: "1px solid rgba(30,30,28,0.05)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", width: "100%" }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(16px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            <span style={{
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: "0.26em",
              textTransform: "uppercase", color: "#7a7a72",
              marginBottom: "2.2rem",
              borderLeft: "2px solid #2C3E30", paddingLeft: "0.9rem",
            }}>
              A Multidisciplinary Collective
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(52px, 7.5vw, 104px)",
            fontWeight: 500,
            lineHeight: 1.0,
            color: "#1a1a18",
            letterSpacing: "-0.02em",
            margin: "0 0 2rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(22px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s",
          }}>
            Influence.<br />
            <em style={{ fontStyle: "italic", color: "#2C3E30" }}>Clarity.</em><br />
            Credibility.
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            lineHeight: 1.75,
            color: "#5a5a52",
            maxWidth: 540,
            margin: "0 0 3rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(18px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.42s",
          }}>
            We help organisations shape influence, build credibility, navigate complexity, and communicate with precision. A collective of senior specialists working at the intersection of communications, policy, and public affairs.
          </p>
          <div style={{
            display: "flex", gap: "1.5rem", alignItems: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(14px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.58s",
          }}>
            <button
              onClick={() => setActive("contact")}
              style={{
                background: "#1a1a18", color: "#FAF8F4",
                border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "15px 32px",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.target.style.background = "#2C3E30"}
              onMouseLeave={e => e.target.style.background = "#1a1a18"}
            >
              Begin a Conversation
            </button>
            <button
              onClick={() => setActive("work")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "#1a1a18",
                display: "flex", alignItems: "center", gap: 8,
                borderBottom: "1px solid rgba(30,30,28,0.2)", paddingBottom: 1,
              }}
            >
              View Our Work <span style={{ fontSize: 16 }}>→</span>
            </button>
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: mounted ? 0.4 : 0, transition: "opacity 1s ease 1.2s",
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a7a72" }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #7a7a72, transparent)" }} />
      </div>
    </section>
  );
}

function Marquee() {
  const text = ["Strategic Communications", "Public Affairs", "Reputation Advisory", "Public Policy", "Crisis Strategy", "Stakeholder Engagement", "Digital Communications"];
  const repeated = [...text, ...text];
  return (
    <div style={{ background: "#1a1a18", padding: "18px 0", overflow: "hidden", position: "relative" }}>
      <div style={{
        display: "flex", gap: "4rem",
        animation: "marquee 28s linear infinite",
        whiteSpace: "nowrap", width: "max-content",
      }}>
        {repeated.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "rgba(250,248,244,0.4)",
          }}>
            {t} <span style={{ color: "rgba(250,248,244,0.15)", margin: "0 0.5rem" }}>—</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function StatBar() {
  const stats = [
    { num: "12+", label: "Years of combined media and policy experience" },
    { num: "4", label: "Senior specialists across communications, law, and strategy" },
    { num: "Pan-India", label: "Presence with global benchmarks" },
  ];
  return (
    <section style={{ background: "#FAF8F4", borderBottom: "1px solid rgba(30,30,28,0.08)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                padding: "3.5rem 0",
                borderRight: i < 2 ? "1px solid rgba(30,30,28,0.08)" : "none",
                paddingRight: "3rem", paddingLeft: i > 0 ? "3rem" : 0,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 500,
                  color: "#1a1a18", lineHeight: 1, marginBottom: "0.5rem",
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, color: "#7a7a72", lineHeight: 1.5, maxWidth: 200,
                }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ setActive }) {
  return (
    <section style={{ background: "#FAF8F4", padding: "9rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem", alignItems: "center" }}>
          <div>
            <FadeIn>
              <span style={{
                display: "inline-block", fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase",
                color: "#7a7a72", marginBottom: "2rem",
              }}>About the Collective</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 500,
                lineHeight: 1.12, color: "#1a1a18", margin: "0 0 2.2rem",
              }}>
                Where journalism meets strategy. Where law meets narrative.
              </h2>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.85, color: "#5a5a52", margin: "0 0 1.5rem" }}>
                The Clear Picture is a strategic communications collective built on the belief that clarity is a competitive advantage. We bring together former journalists, lawyers, digital strategists, and policy professionals to help organisations communicate with precision, authority, and purpose.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.85, color: "#5a5a52", margin: "0 0 2.5rem" }}>
                We are not an agency. We operate as a network of senior experts — each with deep domain expertise — assembled to serve organisations that cannot afford vague thinking or diluted strategy.
              </p>
              <button
                onClick={() => setActive("collective")}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "#1a1a18",
                  display: "flex", alignItems: "center", gap: 8,
                  borderBottom: "1px solid rgba(30,30,28,0.25)", paddingBottom: 2,
                }}
              >
                Meet the Collective <span style={{ fontSize: 16 }}>→</span>
              </button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ setActive }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ background: "#FAF8F4", padding: "9rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem" }}>
            <div>
              <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#7a7a72", marginBottom: "1.2rem" }}>What We Do</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 500, lineHeight: 1.06, color: "#1a1a18", margin: 0 }}>
                The full range<br />of what we offer
              </h2>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#7a7a72", maxWidth: 360, lineHeight: 1.7, textAlign: "right" }}>
              Each practice area is led by a specialist. Every engagement is designed around your specific context — not a template.
            </p>
          </div>
        </FadeIn>
        <div style={{ borderTop: "1px solid rgba(30,30,28,0.12)" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid", gridTemplateColumns: "80px 1fr 2fr 60px",
                  alignItems: "center", gap: "2rem",
                  padding: "2rem 0",
                  borderBottom: "1px solid rgba(30,30,28,0.08)",
                  cursor: "pointer",
                  background: hovered === i ? "#F0EDE6" : "transparent",
                  transition: "background 0.2s ease",
                  marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b0ae a8", letterSpacing: "0.1em" }}>{s.id}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 500, color: "#1a1a18" }}>{s.title}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7a7a72", lineHeight: 1.6 }}>{s.desc}</span>
                <span style={{ textAlign: "right", fontSize: 20, color: "#7a7a72", opacity: hovered === i ? 1 : 0, transition: "opacity 0.2s" }}>→</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <section style={{ background: "#FAF8F4", padding: "9rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#7a7a72", marginBottom: "1.2rem" }}>The Collective</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 500, lineHeight: 1.06, color: "#1a1a18", margin: "0 0 1.5rem" }}>
            Senior specialists.<br />No juniors on your brief.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7a7a72", maxWidth: 520, lineHeight: 1.75, marginBottom: "5rem" }}>
            Every client engagement is handled by the specialist who brought that expertise to the collective. You work with the person who built their reputation in the field.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "3px" }}>
          {TEAM.map((m, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: i % 2 === 0 ? "#F0EDE6" : "#E8E5DC",
                padding: "3.5rem",
                position: "relative",
                minHeight: 340,
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2rem" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: m.accent, display: "flex", alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 500, color: "rgba(250,248,244,0.8)",
                    flexShrink: 0,
                  }}>{m.initials}</div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 500, color: "#1a1a18", lineHeight: 1.1 }}>{m.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a7a72", marginTop: 4 }}>{m.role}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#5a5a52", margin: 0 }}>{m.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThinkingPage() {
  return (
    <section style={{ background: "#FAF8F4", padding: "9rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#7a7a72", marginBottom: "1.2rem" }}>Thinking</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 500, lineHeight: 1.06, color: "#1a1a18", margin: "0 0 5rem" }}>
            How we see<br />the landscape
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
          {THINKING.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                background: "#F0EDE6", padding: "3rem",
                cursor: "pointer", minHeight: 340,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#E8E5DC"}
                onMouseLeave={e => e.currentTarget.style.background = "#F0EDE6"}
              >
                <div>
                  <span style={{
                    display: "inline-block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#2C3E30",
                    background: "rgba(44,62,48,0.08)", padding: "4px 10px",
                    marginBottom: "2rem",
                  }}>{t.tag}</span>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500,
                    color: "#1a1a18", lineHeight: 1.18, margin: "0 0 1rem",
                  }}>{t.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7a7a72", lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
                </div>
                <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#a0a098" }}>{t.date}</span>
                  <span style={{ fontSize: 18, color: "#1a1a18" }}>→</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <section style={{ background: "#FAF8F4", padding: "9rem 0", minHeight: "80vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem" }}>
          <FadeIn>
            <div>
              <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#7a7a72", marginBottom: "1.2rem" }}>Contact</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(38px, 4.5vw, 62px)", fontWeight: 500, lineHeight: 1.06, color: "#1a1a18", margin: "0 0 2rem" }}>
                Let us talk<br />about what matters.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: "#5a5a52", marginBottom: "3rem" }}>
                Whether you're facing a communications challenge, planning a public affairs strategy, or simply want to understand how we work — we'd rather have a candid conversation than send you a brochure.
              </p>
              <div style={{ borderTop: "1px solid rgba(30,30,28,0.1)", paddingTop: "2rem" }}>
                <div style={{ marginBottom: "1.2rem" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a0a098", display: "block", marginBottom: 4 }}>Email</span>
                  <a href="mailto:hello@theclearpicture.in" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#1a1a18", textDecoration: "none" }}>hello@theclearpicture.in</a>
                </div>
                <div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a0a098", display: "block", marginBottom: 4 }}>Based in</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#1a1a18" }}>India — Working Globally</span>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            {sent ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 48, color: "#2C3E30", marginBottom: "1rem" }}>✓</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 500, color: "#1a1a18", margin: "0 0 0.5rem" }}>Message received.</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#7a7a72" }}>We'll be in touch shortly.</p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Your Name", key: "name", type: "text" },
                  { label: "Organisation", key: "org", type: "text" },
                  { label: "Email Address", key: "email", type: "email" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a0a098", display: "block", marginBottom: 8 }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={{
                        width: "100%", background: "none",
                        border: "none", borderBottom: "1px solid rgba(30,30,28,0.2)",
                        padding: "10px 0", fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", color: "#1a1a18",
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderBottomColor = "#1a1a18"}
                      onBlur={e => e.target.style.borderBottomColor = "rgba(30,30,28,0.2)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a0a098", display: "block", marginBottom: 8 }}>What's on your mind?</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{
                      width: "100%", background: "none",
                      border: "none", borderBottom: "1px solid rgba(30,30,28,0.2)",
                      padding: "10px 0", fontSize: 16, resize: "none",
                      fontFamily: "'DM Sans', sans-serif", color: "#1a1a18",
                      outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderBottomColor = "#1a1a18"}
                    onBlur={e => e.target.style.borderBottomColor = "rgba(30,30,28,0.2)"}
                  />
                </div>
                <button
                  onClick={() => setSent(true)}
                  style={{
                    background: "#1a1a18", color: "#FAF8F4",
                    border: "none", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12, letterSpacing: "0.16em",
                    textTransform: "uppercase", padding: "15px 32px",
                    alignSelf: "flex-start", marginTop: "0.5rem",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "#2C3E30"}
                  onMouseLeave={e => e.target.style.background = "#1a1a18"}
                >
                  Send Message
                </button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WorkPage() {
  const cases = [
    {
      client: "A venture-backed fintech", tag: "Crisis Communications",
      headline: "Reframing a regulatory moment",
      summary: "When a regulatory inquiry created uncertainty for investors and media alike, we helped the company establish a clear, consistent narrative — converting a potential crisis into a demonstration of transparency and governance maturity.",
      outcome: "Maintained investor confidence through a 6-week regulatory process. Coverage shifted from adversarial to explanatory within 3 weeks.",
    },
    {
      client: "A multinational entering India", tag: "Government Relations",
      headline: "Building institutional presence",
      summary: "An international company required structured engagement with regulatory bodies before market entry. We developed a public affairs strategy that introduced the organisation to the right stakeholders with credibility, not just access.",
      outcome: "Established relationships with three regulatory bodies and one industry association in the pre-launch phase.",
    },
    {
      client: "A mission-driven NGO", tag: "CSR & Sustainability",
      headline: "Making impact legible",
      summary: "A well-regarded non-profit had significant programme depth but weak external communication. We translated their work into a coherent narrative that served both donor relations and media engagement.",
      outcome: "Programme coverage in two national publications. 40% improvement in donor communication response rates.",
    },
  ];
  return (
    <section style={{ background: "#FAF8F4", padding: "9rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <FadeIn>
          <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#7a7a72", marginBottom: "1.2rem" }}>Selected Work</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 500, lineHeight: 1.06, color: "#1a1a18", margin: "0 0 1.5rem" }}>
            Engagements that<br />required precision.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#7a7a72", maxWidth: 480, lineHeight: 1.75, marginBottom: "5rem" }}>
            Client identities are protected. What we share instead is the shape of the problem, and how we addressed it.
          </p>
        </FadeIn>
        {cases.map((c, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 2fr",
              gap: "5rem", padding: "4rem 0",
              borderTop: "1px solid rgba(30,30,28,0.1)",
            }}>
              <div>
                <span style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C3E30", background: "rgba(44,62,48,0.08)", padding: "4px 10px", marginBottom: "1.2rem" }}>{c.tag}</span>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#a0a098", marginBottom: "0.5rem" }}>Client</div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 500, color: "#1a1a18" }}>{c.client}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 2.2vw, 32px)", fontWeight: 500, color: "#1a1a18", lineHeight: 1.18, margin: "0 0 1.2rem" }}>{c.headline}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#5a5a52", margin: "0 0 1.5rem" }}>{c.summary}</p>
                <div style={{ background: "#F0EDE6", padding: "1.2rem 1.5rem", borderLeft: "2px solid #2C3E30" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a7a72", display: "block", marginBottom: 6 }}>Outcome</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a18", lineHeight: 1.6 }}>{c.outcome}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Footer({ setActive }) {
  return (
    <footer style={{ background: "#1a1a18", color: "#FAF8F4", padding: "6rem 0 3rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "5rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, marginBottom: 6 }}>The Clear Picture</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,244,0.3)", marginBottom: "1.5rem" }}>Strategic Communications Collective</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.8, color: "rgba(250,248,244,0.45)", maxWidth: 280, margin: 0 }}>
              A collective of senior specialists helping organisations communicate with clarity, influence, and purpose.
            </p>
          </div>
          {[
            { label: "Navigate", links: ["Work", "Services", "Collective", "Thinking"] },
            { label: "Services", links: ["Public Relations", "Public Policy", "Reputation Advisory", "Crisis Communications"] },
            { label: "Contact", links: ["Begin a Conversation", "hello@theclearpicture.in", "India — Working Globally"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,248,244,0.3)", marginBottom: "1.5rem" }}>{col.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {col.links.map((l, j) => (
                  <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,248,244,0.55)", cursor: "pointer" }}
                    onMouseEnter={e => e.target.style.color = "rgba(250,248,244,0.9)"}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,244,0.55)"}
                  >{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(250,248,244,0.08)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(250,248,244,0.25)" }}>© 2025 The Clear Picture. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(250,248,244,0.25)" }}>India</span>
        </div>
      </div>
    </footer>
  );
}

function CTABanner({ setActive }) {
  return (
    <section style={{ background: "#2C3E30", padding: "7rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 500, color: "#FAF8F4", lineHeight: 1.08, margin: "0 0 1.5rem" }}>
            Every complex situation<br />has a clear path through it.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,248,244,0.65)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            If you're navigating something that requires both strategic intelligence and communications rigour, let's talk.
          </p>
          <button
            onClick={() => setActive("contact")}
            style={{
              background: "#FAF8F4", color: "#1a1a18", border: "none",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, letterSpacing: "0.16em",
              textTransform: "uppercase", padding: "15px 36px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.85}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Begin a Conversation
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

export default function App() {
  const [active, setActive] = useState("home");

  const renderPage = () => {
    switch (active) {
      case "services": return <ServicesPage setActive={setActive} />;
      case "collective": return <TeamPage />;
      case "thinking": return <ThinkingPage />;
      case "contact": return <ContactPage />;
      case "work": return <WorkPage />;
      default: return (
        <>
          <Hero setActive={setActive} />
          <Marquee />
          <StatBar />
          <AboutSection setActive={setActive} />
          <ServicesPage setActive={setActive} />
          <ThinkingPage />
          <CTABanner setActive={setActive} />
        </>
      );
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#FAF8F4",
      minHeight: "100vh",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Nav active={active} setActive={setActive} />
      <div style={{ paddingTop: active !== "home" ? 72 : 0 }}>
        {renderPage()}
      </div>
      <Footer setActive={setActive} />
    </div>
  );
}
