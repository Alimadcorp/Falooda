import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Zap,
  Globe,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
  Slack,
  ChevronDown,
  ArrowUp,
} from "lucide-react";

export const metadata = {
  title: "Falooda Fanatics – Hack Club Faisalabad",
  description:
    "A student-led Hack Club in Faisalabad, Pakistan. A community of young makers building real things together.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdfaf6", color: "#1a0f0b" }}>

      <nav
        className="sticky top-0 z-50"
        style={{
          background: "rgba(253,250,246,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(26,15,11,0.08)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 2rem", height: "64px" }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 700, fontSize: "1.1rem", color: "inherit", textDecoration: "none" }}>
            <span style={{ fontSize: "1.5rem" }}>🧋</span> Falooda Fanatics
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#hackathons" className="nav-link">Hackathons</Link>
            <Link
              href="https://hack.club/join/KIYITB"
              target="_blank"
              className="btn-primary"
              style={{ padding: "0.45rem 1.1rem", fontSize: "0.875rem" }}
            >
              Join
            </Link>
          </div>
        </div>
      </nav>

      <header
        className="hero-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "90vh",
          padding: "5rem 2rem 4rem",
          background: "radial-gradient(ellipse 80% 60% at 60% 20%, rgba(244,120,138,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(255,162,60,0.09) 0%, transparent 60%)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <div className="hc-badge" style={{ marginBottom: "1.75rem" }}>
            Falooda Fanatics
          </div>

          <h1 style={{
            fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            color: "#1a0f0b",
          }}>
            Building the future<br />
            in{" "}
            <span style={{
              color: "var(--primary)",
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textUnderlineOffset: "7px",
              textDecorationColor: "rgba(244,120,138,0.5)",
            }}>
              Faisalabad
            </span>.
          </h1>

          <p style={{
            fontSize: "1.15rem",
            color: "rgba(26,15,11,0.6)",
            lineHeight: 1.75,
            maxWidth: "46ch",
            margin: "0 auto 2.5rem",
          }}>
            A student-run Hack Club where young makers build real projects,
            run hackathons, and grow together.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", justifyContent: "center" }}>
            <Link href="https://hack.club/join/KIYITB" target="_blank" className="btn-primary">
              Join now! <ArrowRight size={16} />
            </Link>
            <Link href="https://app.slack.com/client/E09V59WQY1E/C0AE9JYGJSW" target="_blank" className="btn-secondary">
              <SlackIcon /> Join our Slack
            </Link>
          </div>
        </div>
      </header>

      <section id="about" style={{ background: "#fdfaf6" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "6rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className="section-h2">Falooda Fanatics</h2>
              <div className="rule" />
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                We&apos;re a crew of high schoolers based in Faisalabad who love building things — web apps, AI projects, hardware hacks, you name it.
              </p>
              <p className="body-text" style={{ marginBottom: "2rem" }}>
                Fiscally sponsored by <strong>Hack Club</strong>, we have the tools and support to make ideas real. Whether you&apos;ve written one line of code or a thousand, you belong here.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <Link href="#join" className="btn-primary">
                  Join us <ArrowUp size={15} />
                </Link>
              </div>
            </div>

            <div>
              <p className="eyebrow">Our parent org</p>
              <h2 className="section-h2" style={{ color: "var(--hc-red)" }}>What is Hack Club?</h2>
              <div className="rule" style={{ background: "var(--hc-red)" }} />
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                Hack Club is a global nonprofit network of <strong>student-led coding clubs</strong>. Founded in 2014, it empowers teenagers to become makers and leaders by building real things every week.
              </p>
              <p className="body-text" style={{ marginBottom: "1.5rem" }}>
                It&apos;s not a class — it&apos;s a community. Hack Club provides students with tools, funding, and mentorship to turn their ideas into reality, with clubs in 50+ countries.
              </p>
              <Link
                href="https://hackclub.com"
                target="_blank"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--hc-blue)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Visit hackclub.com <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="hackathons" style={{ background: "#fff", borderTop: "1px solid rgba(26,15,11,0.07)" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "6rem 2rem" }}>
          <p className="eyebrow">Events</p>
          <h2 className="section-h2" style={{ marginBottom: "0.35rem" }}>Hackathons</h2>
          <p className="body-text" style={{ marginBottom: "3rem" }}>
            Major events organized by our team. Come build something amazing in person!
          </p>

          <Link
            href="https://aahvl.github.io/hackanomous/"
            target="_blank"
            className="hackathon-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                <span className="tag tag-pink"><Calendar size={14} /> Spring 2026</span>
                <span className="tag tag-blue"><MapPin size={14} /> Islamabad</span>
                <span className="tag tag-red">✦ Our First Event</span>
              </div>
              <h3 className="hackathon-title">Hackanomous</h3>
              <p className="body-text" style={{ marginBottom: "1.5rem", maxWidth: "52ch" }}>
                Our first-ever in-person hackathon! Join us in Islamabad this Spring 2026 for a full day of building AI projects from scratch. Experience the hacker culture firsthand - all skill levels welcome!
              </p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--hc-red)", fontWeight: 700, fontSize: "0.95rem" }}>
                Visit the website <ExternalLink size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section style={{ background: "#fdfaf6", borderTop: "1px solid rgba(26,15,11,0.07)", padding: "5rem 2rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Proudly part of</p>
        <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
          <Image
            src="https://assets.hackclub.com/flag-standalone.png"
            alt="Hack Club Flag"
            width={120}
            height={150}
            style={{ objectFit: "contain", transition: "transform 0.2s ease" }}
            className="hc-flag"
            unoptimized
          />
        </a>
        <p style={{ marginTop: "1.25rem", color: "rgba(26,15,11,0.45)", fontSize: "0.9rem" }}>
          Falooda Fanatics is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit.
        </p>
      </section>

      <footer style={{ borderTop: "1px solid rgba(26,15,11,0.07)", padding: "2.5rem 2rem" }}>
        <div
          style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", color: "rgba(26,15,11,0.4)", fontSize: "0.875rem" }}
        >
          <span style={{ fontWeight: 600 }}>Falooda Fanatics · Faisalabad, Pakistan</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="https://hack.club/join/KIYITB" target="_blank" style={{ color: "var(--hc-red)", fontWeight: 600 }}>Join Club</Link>
            <Link href="https://app.slack.com/client/E09V59WQY1E/C0AE9JYGJSW" target="_blank" style={{ color: "var(--hc-blue)", fontWeight: 600 }}>Slack</Link>
            <Link href="https://hackclub.com" target="_blank" style={{ color: "rgba(26,15,11,0.4)" }}>Hack Club</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function SlackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 122.8 122.8" fill="currentColor" aria-hidden="true">
      <path d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317-7.33 0-13.317-5.987-13.317-13.317zm0 0" fill="#de1c59" /><path d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0" fill="#35c5f0" /><path d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317 7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0" fill="#2eb57d" /><path d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317 0 7.33-5.987 13.317-13.317 13.317zm0 0" fill="#ebb02e" />
    </svg>
  );
}
