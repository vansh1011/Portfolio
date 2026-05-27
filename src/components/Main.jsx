import { useState, useEffect, useRef } from "react";
import { FaGithub, FaHospital, FaLinkedin, FaVideo } from "react-icons/fa";
import { HiBars3, HiEnvelope, HiXMark } from "react-icons/hi2";
const imagee = "/vansh.jpg";

const SECTIONS = ["Home", "About", "Skills", "Projects", "Contact"];

const PAGE_MAX = 1200;

const contentWrap = {
  maxWidth: PAGE_MAX,
  width: "100%",
  margin: "0 auto",
};

const sectionWrap = {
  width: "100%",
  maxWidth: "min(1520px, 92vw)",
  margin: "0 auto",
  boxSizing: "border-box",
};

const skills = {
  "Web Dev": [
    { name: "React", level: 80 },
    { name: "JavaScript", level: 82 },
    { name: "HTML / CSS", level: 88 },
    { name: "Node.js", level: 72 },
    { name: "MongoDB", level: 68 },
  ],
  Programming: [
    { name: "C++", level: 85 },
    { name: "DSA / CP", level: 80 },
    { name: "SQL", level: 65 },
  ],
}

const projects = [
  {
    title: "MediConnect",
    desc: "Full-stack MERN medical help web app — patient-doctor connection platform with auth, dashboards, and real-time features.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    Icon: FaHospital,
    color: "#00f5c4",
    live: "https://medical-help-chi.vercel.app/",
  },
  {
    title: "VideoCall App",
    desc: "Peer-to-peer video calling application built with WebRTC and PERN stack. Supports room-based calling with live signaling.",
    tags: ["WebRTC", "React", "Socket.io", "Node.js"],
    Icon: FaVideo,
    color: "#7b6ef6",
    live: "https://vcall-drab.vercel.app",
  },
]

function useInView(ref) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return inView;
}

function AnimatedBar({ level, color, delay = 0 }) {
  const ref = useRef();
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      style={{
        height: 6,
        background: "#1e1e2e",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: inView ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 999,
          transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          boxShadow: `0 0 8px ${color}66`,
        }}
      />
    </div>
  );
}

function Section({ id, children, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export default function Main() {
  const [activeSection, setActiveSection] = useState("Home");
  const [activeSkillTab, setActiveSkillTab] = useState("Web Dev");
  const [menuOpen, setMenuOpen] = useState(false);

  const [typed, setTyped] = useState("");
  const roles = [
    "Full Stack Developer",
    "Competitive Programmer",
    "Problem Solver",
  ];

  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];

    let timer;

    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 80);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 45);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const accentTeal = "#00f5c4";
  const accentPurple = "#7b6ef6";

  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        background: "#0a0a12",
        color: "#e2e2f0",
        margin: 0,
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1rem 1.5rem",
          background: "rgba(10,10,18,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "0.5px solid rgba(0,245,196,0.1)",
        }}
      >
        <div
          style={{
            ...contentWrap,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 2,
              color: accentTeal,
              flexShrink: 0,
            }}
          >
            VANSH<span style={{ color: accentPurple }}>.</span>DEV
          </span>

          <div className="desktop-nav">
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  letterSpacing: 1.5,
                  color: activeSection === s ? accentTeal : "#8888aa",
                  borderBottom:
                    activeSection === s
                      ? `1px solid ${accentTeal}`
                      : "1px solid transparent",
                  paddingBottom: 2,
                  transition: "all 0.2s",
                  fontWeight: activeSection === s ? "bold" : "normal",
                }}
              >
                {s.toUpperCase()}
              </a>
            ))}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.8rem",
              cursor: "pointer",
              color: accentTeal,
              display: "none",
            }}
          >
            {menuOpen ? <HiXMark size={26} /> : <HiBars3 size={26} />}
          </button>

          {menuOpen && (
            <div
              className="mobile-menu"
              style={{
                position: "fixed",
                top: "70px",
                left: 0,
                right: 0,
                background: "rgba(10,10,18,0.98)",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                borderTop: "0.5px solid rgba(0,245,196,0.1)",
                zIndex: 99,
              }}
            >
              {SECTIONS.map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    textDecoration: "none",
                    fontSize: 17,
                    letterSpacing: 1.5,
                    color: activeSection === s ? accentTeal : "#ccc",
                    padding: "0.5rem 0",
                  }}
                >
                  {s.toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <Section
        id="Home"
        style={{
          position: "relative",
          alignItems: "center",
          padding: "8rem 1.5rem 5rem",
          minHeight: "100vh",
        }}
      >
        <div
          className="hero-grid"
          style={{
            maxWidth: 1200,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          >
            <p
              style={{
                color: accentTeal,
                letterSpacing: 4,
                fontSize: 13,
                marginBottom: "1rem",
              }}
            >
              {"// hello world"}
            </p>

            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: "bold",
                lineHeight: 1.05,
                margin: "0 0 0.5rem",
                color: "#fff",
                textShadow: `0 0 60px ${accentPurple}44`,
              }}
            >
              VANSH
            </h1>

            <h2
              style={{
                fontSize: "clamp(1.2rem, 4vw, 2rem)",
                fontWeight: "normal",
                color: accentTeal,
                letterSpacing: 3,
                margin: "0 0 1.5rem",
                minHeight: "2.5rem",
              }}
            >
              {typed}
              <span
                style={{
                  opacity: 0.7,
                  animation: "blink 1s step-end infinite",
                }}
              >
                |
              </span>
            </h2>

            <p
              style={{
                color: "#888899",
                fontSize: "clamp(15px, 2.2vw, 18px)",
                lineHeight: 1.8,
                maxWidth: 520,
              }}
            >
              Passionate Full Stack Developer focused on building modern web
              applications using the MERN stack. I love solving complex problems
              through code and creating seamless user experiences.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "2.5rem",
              }}
            >
              <a
                href="#Projects"
                style={{
                  padding: "0.85rem 2rem",
                  border: `1px solid ${accentTeal}`,
                  color: accentTeal,
                  textDecoration: "none",
                  letterSpacing: 2,
                  fontSize: 13,
                  transition: "all 0.2s",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = accentTeal;
                  e.target.style.color = "#0a0a12";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = accentTeal;
                }}
              >
                VIEW PROJECTS
              </a>

              <a
                href="#Contact"
                style={{
                  padding: "0.85rem 2rem",
                  border: `1px solid #ffffff22`,
                  color: "#aaaacc",
                  textDecoration: "none",
                  letterSpacing: 2,
                  fontSize: 13,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = accentPurple;
                  e.target.style.color = accentPurple;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#ffffff22";
                  e.target.style.color = "#aaaacc";
                }}
              >
                GET IN TOUCH
              </a>

              <a
                href="/resume.pdf"
                download="Vansh_Resume.pdf"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0.85rem 2rem",
                  background: accentTeal,
                  border: `1px solid ${accentTeal}`,
                  color: "#0a0a12",
                  textDecoration: "none",
                  letterSpacing: 2,
                  fontSize: 13,
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${accentTeal}55`;

                  e.currentTarget.querySelector(".shimmer").style.left =
                    "160%";

                  e.currentTarget.querySelector(".dl-arrow").style.transform =
                    "translateY(3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";

                  e.currentTarget.querySelector(".shimmer").style.left =
                    "-100%";

                  e.currentTarget.querySelector(".dl-arrow").style.transform =
                    "translateY(0)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) scale(0.97)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${accentTeal}55`;
                }}
              >
                <span
                  className="shimmer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "60%",
                    height: "100%",
                    background: "rgba(255,255,255,0.25)",
                    transform: "skewX(-20deg)",
                    transition: "left 0.4s ease",
                    pointerEvents: "none",
                  }}
                />

                <span
                  className="dl-arrow"
                  style={{
                    fontSize: 15,
                    transition: "transform 0.25s ease",
                  }}
                >
                  ↓
                </span>

                RESUME
              </a>
            </div>
          </div>

          <div
            className="hero-image-container"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${accentTeal}`,
                boxShadow: `0 0 60px ${accentTeal}40`,
                transition: "transform 0.4s ease",
                zIndex: 2,
                maxWidth: "100%",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={imagee}
                alt="Vansh"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              className="code-card"
              style={{
                position: "absolute",
                top: "60%",
                right: "-40px",
                background: "#11121f",
                border: `1px solid ${accentPurple}50`,
                borderRadius: "8px",
                padding: "12px 16px",
                width: "220px",
                boxShadow: `0 20px 40px rgba(0,0,0,0.6)`,
                zIndex: 1,
                fontSize: "13px",
                fontFamily: "monospace",
                color: "#a0a0cc",
              }}
            >
              <div
                style={{
                  color: accentTeal,
                  marginBottom: "8px",
                  fontSize: "12px",
                }}
              >
                ● ● ●
              </div>

              <div style={{ lineHeight: "1.5" }}>
                <span style={{ color: "#ff79c6" }}>const</span> developer ={" "}
                {"{"}
                <br />
                name: <span style={{ color: "#f1fa8c" }}>"Vansh"</span>,
                <br />
                stack: <span style={{ color: "#f1fa8c" }}>"MERN"</span>,
                <br />
                passion:{" "}
                <span style={{ color: "#f1fa8c" }}>
                  "Building Cool Stuff"
                </span>
                <br />
                {"}"};
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="About">
        <div style={{ ...sectionWrap, textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              fontWeight: "bold",
              margin: "0 0 2.5rem",
              color: "#fff",
            }}
          >
            About <span style={{ color: accentPurple }}>Me</span>
          </h2>

          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "2rem",
              width: "100%",
            }}
          >
            <div
              style={{
                padding: "2rem",
                border: "0.5px solid rgba(0,245,196,0.15)",
                background: "rgba(0,245,196,0.03)",
                borderRadius: 4,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  color: "#aaaacc",
                  fontSize: 17,
                  lineHeight: 1.9,
                }}
              >
                I'm a passionate developer with strong skills in full-stack web
                development. I build scalable applications using modern
                technologies and focus on writing clean, efficient code.
              </p>
            </div>

            <div
              style={{
                padding: "2rem",
                border: "0.5px solid rgba(123,110,246,0.15)",
                background: "rgba(123,110,246,0.03)",
                borderRadius: 4,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  color: "#aaaacc",
                  fontSize: 17,
                  lineHeight: 1.9,
                }}
              >
                Always eager to learn new technologies and solve challenging
                problems. I enjoy turning ideas into functional and beautiful
                web experiences.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "3rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              ["2+", "MERN Projects Deployed"],
              ["500+", "CP Problems Solved"],
            ].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: accentTeal,
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    color: "#666688",
                    letterSpacing: 1,
                    marginTop: 4,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="Skills">
        <div style={{ ...sectionWrap, textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              fontWeight: "bold",
              margin: "0 0 2rem",
              color: "#fff",
            }}
          >
            Tech <span style={{ color: accentPurple }}>Stack</span>
          </h2>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Object.keys(skills).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkillTab(tab)}
                style={{
                  padding: "0.6rem 1.6rem",
                  fontSize: 15,
                  letterSpacing: 1.5,
                  border: `1px solid ${activeSkillTab === tab ? accentTeal : "#333344"
                    }`,
                  background:
                    activeSkillTab === tab
                      ? `${accentTeal}15`
                      : "transparent",
                  color:
                    activeSkillTab === tab ? accentTeal : "#666688",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderRadius: 2,
                }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              textAlign: "left",
              width: "100%",
            }}
          >
            {skills[activeSkillTab].map((sk, i) => (
              <div key={sk.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      letterSpacing: 1,
                      color: "#ccccdd",
                    }}
                  >
                    {sk.name}
                  </span>

                  <span
                    style={{
                      fontSize: 14,
                      color: accentTeal,
                    }}
                  >
                    {sk.level}%
                  </span>
                </div>

                <AnimatedBar
                  level={sk.level}
                  color={i % 2 === 0 ? accentTeal : accentPurple}
                  delay={i * 100}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="Projects">
        <div style={{ ...sectionWrap, textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              fontWeight: "bold",
              margin: "0 0 2.5rem",
              color: "#fff",
            }}
          >
            Selected <span style={{ color: accentPurple }}>Work</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: "2rem",
              width: "100%",
            }}
          >
            {projects.map((p) => (
              <div
                key={p.title}
                style={{
                  padding: "2rem",
                  border: `0.5px solid ${p.color}30`,
                  background: `${p.color}07`,
                  borderRadius: 4,
                  transition: "transform 0.2s, border-color 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = `${p.color}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = `${p.color}30`;
                }}
              >
                <p.Icon
                  style={{
                    fontSize: 42,
                    marginBottom: "1rem",
                    color: p.color,
                  }}
                />

                <h3
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: p.color,
                    margin: "0 0 0.75rem",
                    letterSpacing: 1,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    color: "#8888aa",
                    fontSize: 17,
                    lineHeight: 1.7,
                    margin: "0 0 1.5rem",
                  }}
                >
                  {p.desc}
                </p>

                <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  }}
>
  {p.tags.map((t) => (
    <span
      key={t}
      style={{
        fontSize: 13,
        padding: "2px 10px",
        letterSpacing: 1,
        border: `0.5px solid ${p.color}55`,
        color: p.color,
        borderRadius: 2,
      }}
    >
      {t}
    </span>
  ))}
</div>

<a
  href={p.live}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-block",
    marginTop: "1.5rem",
    padding: "0.7rem 1.4rem",
    border: `1px solid ${p.color}`,
    color: p.color,
    textDecoration: "none",
    letterSpacing: 1,
    fontSize: 14,
    transition: "all 0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = p.color;
    e.currentTarget.style.color = "#0a0a12";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = p.color;
  }}
>
  LIVE DEMO ↗
</a>

                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "1.5rem",
                    padding: "0.7rem 1.4rem",
                    border: `1px solid ${p.color}`,
                    color: p.color,
                    textDecoration: "none",
                    letterSpacing: 1,
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = p.color;
                    e.currentTarget.style.color = "#0a0a12";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = p.color;
                  }}
                >
                  LIVE DEMO ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="Contact">
        <div style={{ ...sectionWrap, textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              fontWeight: "bold",
              margin: "0 0 1rem",
              color: "#fff",
            }}
          >
            Let's <span style={{ color: accentPurple }}>Connect</span>
          </h2>

          <p
            style={{
              color: "#8888aa",
              fontSize: 18,
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Open to full-time opportunities, internships, and interesting
            collaborations. Feel free to reach out — I reply quickly!
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            {[
              {
                label: "Email",
                val: "vanshparmar8742@gmail.com",
                href: "mailto:vanshparmar8742@gmail.com",
                Icon: HiEnvelope,
              },
              {
                label: "GitHub",
                val: "github.com/vansh1011",
                href: "https://github.com/vansh1011",
                Icon: FaGithub,
              },
              {
                label: "LinkedIn",
                val: "linkedin.com/in/vansh-renu-parmar-5b4b49323",
                href: "https://www.linkedin.com/in/vansh-renu-parmar-5b4b49323/",
                Icon: FaLinkedin,
              },
            ].map((row) => (
              <a
                key={row.label}
                href={row.href}
                target={row.label === "Email" ? undefined : "_blank"}
                rel={
                  row.label === "Email"
                    ? undefined
                    : "noopener noreferrer"
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  border: "0.5px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 4,
                  textAlign: "left",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  flexWrap: "wrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accentTeal}44`;
                  e.currentTarget.style.background =
                    "rgba(0,245,196,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.02)";
                }}
              >
                <row.Icon
                  style={{
                    fontSize: 26,
                    color: accentTeal,
                    flexShrink: 0,
                  }}
                />

                <div style={{ wordBreak: "break-word" }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#555566",
                      letterSpacing: 2,
                      marginBottom: 2,
                    }}
                  >
                    {row.label.toUpperCase()}
                  </div>

                  <div
                    style={{
                      fontSize: 17,
                      color: accentTeal,
                    }}
                  >
                    {row.val}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          borderTop: "0.5px solid rgba(0,245,196,0.08)",
          fontSize: 14,
          color: "#444455",
          letterSpacing: 2,
        }}
      >
        VANSH © 2025 — BUILT WITH REACT + LOVE FOR CLEAN CODE
      </footer>

      <style>{`
        *{
          box-sizing:border-box;
        }

        html{
          scroll-behavior:smooth;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        .desktop-nav{
          display:flex;
          gap:2rem;
          align-items:center;
        }

        @media (max-width: 1024px){

          .hero-grid{
            grid-template-columns:1fr !important;
            text-align:center;
            gap:4rem !important;
          }

          .hero-grid p,
          .hero-grid h1,
          .hero-grid h2{
            margin-left:auto;
            margin-right:auto;
          }

          .hero-grid div{
            width:100%;
          }

          .hero-image-container{
            order:-1;
          }

          .code-card{
            right:50% !important;
            transform:translateX(50%);
            top:85% !important;
          }
        }

        @media (max-width: 768px){

          section{
            padding:5rem 1rem !important;
          }

          .desktop-nav{
            display:none !important;
          }

          .mobile-menu-btn{
            display:block !important;
          }

          .about-grid{
            grid-template-columns:1fr !important;
          }

          .hero-grid{
            gap:5rem !important;
          }

          .hero-image-container > div:first-child{
            width:230px !important;
            height:230px !important;
          }

          .code-card{
            width:90% !important;
            max-width:280px;
            top:92% !important;
            font-size:12px !important;
          }
        }

        @media (max-width: 520px){

          nav{
            padding:1rem !important;
          }

          h1{
            word-break:break-word;
          }

          .hero-grid{
            width:100% !important;
          }

          .hero-grid a{
            width:100%;
            justify-content:center;
          }

          .hero-image-container > div:first-child{
            width:200px !important;
            height:200px !important;
          }

          .code-card{
            position:relative !important;
            top:auto !important;
            right:auto !important;
            transform:none !important;
            margin-top:1.5rem;
            width:100% !important;
            max-width:100% !important;
          }
        }
      `}</style>
    </div>
  );
}