"use client";
import {
  Box,
  VStack,
  HStack,
  Link,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { ChakraProvider, useMediaQuery } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HamburgerMenu from "../components/HamburgerMenu";
import dynamic from "next/dynamic";

// ── Color tokens ──
const C = {
  navy:           "#2c3d90",
  navyDark:       "#1e2d6e",
  gold:           "#c9a84c",
  goldLight:      "#e8d5a3",
  terra:          "#c0603a",
  grayBg:         "#f7f8fc",
  gray50:         "#f9fafb",
  pastelBlue:     "#dce4f5",
  pastelMint:     "#ddf0ea",
  pastelLavender: "#e8eaf8",
  pastelYellow:   "#fdf6d8",
  border:         "#e2e6f5",
  muted:          "#5F5D5D",
  ink:            "#1a1a2e",
} as const;

// ── useReveal: fade-in on scroll ──
function useReveal(): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Responsive hook ──
function useIsMobile() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return isMobile;
}

// ── Shared sub-components ──
interface SectionLabelProps { children: ReactNode; gold?: boolean }
function SectionLabel({ children, gold = false }: SectionLabelProps) {
  const color = gold ? C.gold : C.terra;
  const isMobile = useIsMobile();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 26, height: 1, background: color }} />
      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color }}>
        {children}
      </span>
      {isMobile && <div style={{ width: 26, height: 1, background: color }} />}
    </div>
  );
}

interface SectionTitleProps { children: ReactNode; light?: boolean; style?: React.CSSProperties }
function SectionTitle({ children, light = false, style = {} }: SectionTitleProps) {
  const isMobile = useIsMobile();
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(1.7rem, 3.2vw, 2.9rem)",
      fontWeight: 700, lineHeight: 1.15,
      color: light ? "white" : C.navy,
      textAlign: isMobile ? "center" : "left",
      ...style,
    }}>
      {children}
    </h2>
  );
}

type BtnVariant = "gold" | "outlineWhite" | "navyOutline" | "goldFull" | "goldLight";
interface BtnProps { href: string; variant?: BtnVariant; children: ReactNode; style?: React.CSSProperties }
function Btn({ href, variant = "gold", children, style = {} }: BtnProps) {
  const variants: Record<BtnVariant, React.CSSProperties> = {
    gold:         { background: C.gold,        color: C.navyDark },
    outlineWhite: { background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)" },
    navyOutline:  { background: "transparent", color: C.navy,    border: `2px solid ${C.navy}` },
    goldFull:     { background: C.gold,        color: C.navyDark, display: "block", textAlign: "center", width: "100%" },
    goldLight:    { background: C.goldLight,   color: C.navyDark },
  };
  return (
    <a href={href} style={{
      display: "inline-block", textDecoration: "none",
      fontSize: "0.75rem", fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "14px 32px", cursor: "pointer",
      transition: "all 0.2s",
      ...variants[variant], ...style,
    }}>
      {children}
    </a>
  );
}

// ─────────────────────────────────────────
// STICKY SECTION NAV — slides in after callout scrolls out
// ─────────────────────────────────────────
interface StickyNavProps { calloutRef: React.RefObject<HTMLDivElement> }
function StickyNav({ calloutRef }: StickyNavProps) {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
 
 useEffect(() => {
    // On mobile, always show. On desktop, show after callout scrolls out.
    if (isMobile) { setShow(true); return; }
    const el = calloutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [calloutRef, isMobile]);
 
 
  const navLinks: { label: string; id: string }[] = [
    { label: "The Problem", id: "problem" },
    { label: "The Center",  id: "building" },
    { label: "Budget",      id: "budget" },
    { label: "Timeline",    id: "timeline" },
    { label: "Donate",      id: "donate" },
  ];
 
  if (!show) return null;
 
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };
  if (!show) return null;
 
  return (
  <Box
      position={isMobile ? "sticky" : "fixed"}
      top={0} left={0} right={0} zIndex={9999}
      bg="white" boxShadow="md"
      py={isMobile ? 2 : 4} px={isMobile ? 4 : 8}
    >
      {isMobile ? (
        <>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              color={C.navy}
              fontWeight={500}
              fontSize="sm"
              letterSpacing="0.08em"
              textTransform="uppercase"
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              Navigate
            </Button>
          </Box>
          <Collapse in={isOpen} animateOpacity>
            <VStack spacing={4} align="center" mt={2} pb={2}>
              {navLinks.map(({ label, id }) => (
                <Link key={id} onClick={() => scrollToSection(id)}
                      fontSize="sm" fontWeight="500" color={C.navy}
                      letterSpacing="0.06em"
                  textTransform="uppercase"
                      _hover={{ textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </VStack>
          </Collapse>
        </>
      ) : (
        <HStack spacing={8} justify="center">
          {navLinks.map(({ label, id }) => (
            <Link key={id} onClick={() => scrollToSection(id)}
                  fontSize="sm" fontWeight="500" color={C.muted}
                  letterSpacing="0.1em"
              textTransform="uppercase"
              textDecoration="none"
                  _hover={{ color:C.navy }}>
              {label}
            </Link>
          ))}
        </HStack>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────
// HERO
// ─────────────────────────────────────────
interface HeroProps { calloutRef: React.RefObject<HTMLDivElement> }
function Hero({ calloutRef }: HeroProps) {
  const isMobile = useIsMobile();
  const kpis: { num: string; label: string }[] = [
    { num: "$20K", label: "Total funding goal · Phase I construction & operations" },
    { num: "21K",  label: "Square feet of land legally secured in Manwais" },
    { num: "1st",  label: "Women's healthcare facility of its kind in the entire area" },
    { num: "100s", label: "Women and girls across Manwais and neighboring villages to be served" },
  ];

  return (
    <>
      <section style={{
        background: C.navy,
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <svg
          style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", width: 400, height: 400, pointerEvents: "none", opacity: isMobile ? 0.4 : 1 }}
          viewBox="0 0 600 600"
        >
          {([280, 200, 120] as number[]).map((r) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
        </svg>

        <div style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 24 : 32,
          alignItems: "center",
          padding: isMobile ? "36px 24px 28px" : "50px 60px",
        }}>
          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.gold }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                Future Project · Manwais, Punjab, Pakistan
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.4rem)" : "clamp(2.5rem, 5.3vw, 4.5rem)",
              fontWeight: 900, lineHeight: 1.05, color: "white", marginBottom: 16, textAlign: isMobile ? "center" : "left"
            }}>
              Building<br />
              <em style={{ fontStyle: "italic", color: C.goldLight }}>Access</em><br />
              to Care.
            </h1>
            <p style={{ fontSize: isMobile ? "0.92rem" : "1rem", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.88)", maxWidth: 440, marginBottom: 28,  textAlign: isMobile ? "center" : "left"}}>
              A Women&apos;s Healthcare and Safety Center in Manwais, the first of its kind in the region. Bringing essential care within walking distance for women who have long been underserved.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn href="#donate" variant="goldLight" style={isMobile ? { padding: "12px 22px", fontSize: "0.7rem" } : {}}>Fund This Project</Btn>
              <Btn href="#problem" variant="outlineWhite" style={isMobile ? { padding: "12px 22px", fontSize: "0.7rem" } : {}}>Read the Story</Btn>
            </div>
          </div>

          {/* KPI stack */}
          <div style={{ borderTop: isMobile ? "1px solid rgba(255,255,255,0.1)" : "none", paddingTop: isMobile ? 24 : 0 }}>
            {kpis.map((k, i) => (
              <div key={i} style={{
                padding: isMobile ? "14px 0" : "24px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: isMobile ? "flex" : "block",
                alignItems: isMobile ? "baseline" : undefined,
                gap: isMobile ? 12 : 0,
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.6rem", fontWeight: 700, color: C.goldLight, lineHeight: 1, marginBottom: isMobile ? 0 : 5, flexShrink: 0 }}>
                  {k.num}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 400, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold callout strip */}
      <div
        ref={calloutRef}
        style={{ background: C.goldLight, padding: isMobile ? "14px 24px" : "16px 60px", display: "flex", alignItems: "flex-start", gap: 12 }}
      >
        <span style={{ flexShrink: 0 }}>📌</span>
        <p style={{ fontSize: isMobile ? "0.8rem" : "0.85rem", fontWeight: 400, color: C.navyDark, lineHeight: 1.6 }}>
          <strong>The land has been legally transferred to The Safety Net Project.</strong> Construction begins upon funding. This is Phase I of a long-term women&apos;s health initiative.
        </p>
      </div>
    </>
  );
}

// ─────────────────────────────────────────
// THE PROBLEM
// ─────────────────────────────────────────
function Problem() {
  const isMobile = useIsMobile();
  const statCards: { num: string; label: ReactNode; bg: string }[] = [
    {
      num: "<35%",
      label: <>Female literacy rate in rural Punjab is directly tied to <strong>higher maternal mortality</strong> and economic dependency. <em>Pakistan Ministry of Education, 2023.</em></>,
      bg: C.pastelBlue,
    },
    {
      num: "1hr+",
      label: <>Distance to the nearest qualified physician in Bhera is <strong>prohibitive</strong> for women without independent transport or income.</>,
      bg: C.pastelYellow,
    },
    {
      num: "Zero.",
      label: <>Women&apos;s healthcare facilities currently in Manwais and surrounding villages. <strong>This center will be the first.</strong></>,
      bg: C.pastelLavender,
    },
  ];

  return (
    <section id="problem" style={{ padding: isMobile ? "48px 0" : "70px 0", background: "white" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: isMobile ? "0 24px" : "0 60px" }}>
        <SectionLabel>The Problem</SectionLabel>
        <SectionTitle>
          Women in Manwais have been<br />
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>systematically left behind.</em>
        </SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 72, marginTop: isMobile ? 36 : 56, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.muted, lineHeight: 1.85, marginBottom: 18 }}>
              The village of Manwais sits in Sargodha District, central Punjab and the nearest qualified hospital is{" "}
              <strong style={{ color: C.ink }}>over an hour away in Bhera.</strong> For most women here, that distance isn&apos;t an inconvenience. It&apos;s an insurmountable wall.
            </p>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.muted, lineHeight: 1.85, marginBottom: 18 }}>
              Without independent transportation, income, or financial autonomy, women cannot access care on their own. They must first convince a husband or male relative to acknowledge symptoms, requests that are routinely{" "}
              <strong style={{ color: C.ink }}>dismissed or denied.</strong>
            </p>
            <div style={{ borderLeft: `3px solid ${C.terra}`, padding: "20px 0 20px 24px", margin: "28px 0" }}>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.05rem" : "1.25rem", fontStyle: "italic", color: C.navy, lineHeight: 1.55 }}>
                &ldquo;Preventable conditions go untreated. Prenatal care is skipped. Medical attention only arrives during emergencies and often too late.&rdquo;
              </blockquote>
            </div>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.muted, lineHeight: 1.85, marginBottom: 18 }}>
              Cultural norms deepen the crisis. Women are conditioned to endure illness in silence, not because they choose to, but because{" "}
              <strong style={{ color: C.ink }}>the system leaves them no other option.</strong>
            </p>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.muted, lineHeight: 1.85 }}>
              Without targeted, on-the-ground intervention, these cycles of poverty, ill health, and isolation will persist across generations. The Safety Net Project is here to break them.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {statCards.map((card, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 10, background: card.bg, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: "rgba(44,61,144,0.06)" }} />
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "2rem" : "2.4rem", fontWeight: 700, color: C.navy, lineHeight: 1, marginBottom: 8 }}>
                  {card.num}
                </div>
                <div style={{ fontSize: "0.83rem", fontWeight: 300, color: C.muted, lineHeight: 1.6 }}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// QUOTE BAND
// ─────────────────────────────────────────
function QuoteBand() {
  const isMobile = useIsMobile();
  return (
    <div style={{ background: C.navy, padding: isMobile ? "48px 24px" : "70px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "8rem" : "18rem", fontWeight: 900,
        color: "rgba(255,255,255,0.06)", lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>
        &ldquo;
      </div>
      <blockquote style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.15rem, 2.5vw, 2.2rem)",
        fontStyle: "italic", fontWeight: 400,
        color: "white", maxWidth: 800,
        margin: "0 auto 16px", lineHeight: 1.45,
        position: "relative", zIndex: 1,
      }}>
        &ldquo;A Healthcare and Safety Center in Manwais is not merely a medical facility, it is a structural intervention.&rdquo;
      </blockquote>
      <cite style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontStyle: "normal" }}>
        The Safety Net Project · Grant Proposal, 2025
      </cite>
    </div>
  );
}

// ─────────────────────────────────────────
// WHAT WE'RE BUILDING
// ─────────────────────────────────────────
interface PillarProps { n: string; title: string; body: string; delay: number }

function PillarCard({ n, title, body, delay }: PillarProps) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      background: "white", padding: "32px 24px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.55s ${delay}ms, transform 0.55s ${delay}ms`,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 900, color: C.pastelBlue, lineHeight: 1, marginBottom: 14 }}>{n}</div>
      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: C.navy, marginBottom: 8 }}>{title}</div>
      <p style={{ fontSize: "0.85rem", fontWeight: 300, color: C.muted, lineHeight: 1.75 }}>{body}</p>
    </div>
  );
}

function Building() {
  const isMobile = useIsMobile();
  const pillars: Omit<PillarProps, "delay">[] = [
    { n: "01", title: "Primary Healthcare",  body: "Weekly to bi-monthly visits from qualified female physicians providing preventive care, reproductive health, prenatal services, and basic diagnostics, all within walking distance of home." },
    { n: "02", title: "Health Education",    body: "Structured sessions on reproductive health, warning signs of illness, nutrition, and legal rights, equipping women with knowledge to advocate for themselves and their families." },
    { n: "03", title: "Safety & Dignity",    body: "A confidential, women-only space. Distribution of feminine hygiene products and wellness resources. An environment where women can speak freely without fear of shame or dismissal." },
    { n: "04", title: "Independent Access",  body: "By situating care within walking distance, women no longer need to ask permission to seek help. This alone restores a degree of autonomy that is currently entirely absent." },
    { n: "05", title: "Research & Data",     body: "The center will generate vital health data on a population that is critically underrepresented in regional research, supporting policymakers working to close the gap." },
    { n: "06", title: "Community Ripple",    body: "Healthier women participate more in economic and civic life. The effects of this center will extend far beyond its walls, into families, schools, and the next generation." },
  ];

  return (
    <section id="building" style={{ padding: isMobile ? "48px 0" : "70px 0", background: C.grayBg }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: isMobile ? "0 24px" : "0 60px" }}>
        <SectionLabel>Our Response</SectionLabel>
        <SectionTitle>What we&apos;re <em style={{ fontStyle: "italic", fontWeight: 400 }}>building</em></SectionTitle>
        <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.muted, lineHeight: 1.8, maxWidth: 680, marginTop: 16, marginBottom: 40 }}>
          The center sits on 21,000 sq. ft. of land legally transferred to The Safety Net Project in Manwais. Once funded, it will house an exam room, waiting area, bedroom, restroom, and outdoor shaded area, staffed by visiting female physicians, and open to all women in the community.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          border: `1px solid ${C.border}`, background: C.border, gap: 1,
        }}>
          {pillars.map((p, i) => (
            <PillarCard key={i} {...p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// FUND ALLOCATION
// ─────────────────────────────────────────
function FundAllocation() {
  const isMobile = useIsMobile();
  const [selectedAmt, setSelectedAmt] = useState("$50");
  const [progVisible, setProgVisible] = useState(false);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProgVisible(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lineItems: [string, string][] = [
    ["Site Preparation & Foundation",       "$1,000"],
    ["Building Construction",               "$6,500"],
    ["Interior Finishes",                   "$800"],
    ["Doors, Windows & Security",           "$500"],
    ["Plumbing & Sanitation",               "$500"],
    ["Electrical",                          "$500"],
    ["Furniture & Equipment",               "$800"],
    ["Feminine Hygiene Supplies (Year 1)",  "$2,100"],
    ["Medical Personnel Stipends",          "$5,000"],
    ["Outdoor Area & Contingency",          "$2,300"],
  ];

  const amounts = ["$5", "$10", "$20", "$50", "$100", "Other"];

  return (
    <section id="budget" style={{ padding: isMobile ? "48px 0" : "70px 0", background: "white" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: isMobile ? "0 24px" : "0 60px" }}>
        <SectionLabel>Fund Allocation</SectionLabel>
        <SectionTitle>$20,000 to build <em style={{ fontStyle: "italic", fontWeight: 400 }}>something permanent</em></SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 72, marginTop: isMobile ? 36 : 52, alignItems: "start" }}>
          <div>
            <div ref={progRef} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>Fundraising Goal</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: C.navy }}>$20,000</span>
              </div>
              <div style={{ width: "100%", height: 3, background: C.border, marginBottom: 6 }}>
                <div style={{ height: "100%", background: C.navy, width: progVisible ? "18%" : "0%", transition: "width 1.8s cubic-bezier(0.4,0,0.2,1)" }} />
              </div>
              <p style={{ fontSize: "0.72rem", color: C.muted, textAlign: "right" }}>Phase I · Construction + Year 1 Operations</p>
            </div>

            {lineItems.map(([cat, amt], i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "12px 0",
                borderTop: i === 0 ? `1px solid ${C.border}` : "none",
                borderBottom: `1px solid ${C.border}`,
                alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 300, color: C.muted }}>{cat}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.92rem", color: C.navy }}>{amt}</span>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "16px 0 0" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: C.ink }}>Total Projected Cost</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: C.navy }}>$20,000</span>
            </div>
          </div>

          <div style={{ background: C.navyDark, padding: isMobile ? 28 : 44 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 12}}>
              Make a direct impact
            </h3>
            <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 24 }}>
              Every dollar goes directly to construction, supplies, and physician visits for women who have never had access to care. The Safety Net Project is a registered 501(c)(3), your donation is tax-deductible.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
              {amounts.map((a) => (
                <button key={a} onClick={() => setSelectedAmt(a)} style={{
                  background: selectedAmt === a ? C.goldLight : "transparent",
                  border: `1px solid ${selectedAmt === a ? C.goldLight : "rgba(255,255,255,0.18)"}`,
                  color: selectedAmt === a ? C.navyDark : "rgba(255,255,255,0.65)",
                  padding: "10px 6px",
                  fontFamily: "'Playfair Display', serif", fontSize: "0.95rem",
                  cursor: "pointer", fontWeight: selectedAmt === a ? 700 : 400,
                  transition: "all 0.2s",
                }}>
                  {a}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: 24, lineHeight: 1.55 }}>
              $50 funds a month of hygiene supplies · $250 covers a physician visit · $500 funds a full month of operations
            </p>
            <Btn href="mailto:safetynetprojects@gmail.com" variant="goldLight" style={isMobile ? { display: "block", textAlign: "center" } : {}}>
              Donate via Email / Contact Us
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// MANWAIS MAP
// Imported via ManwaisMapNoSSR (ssr:false) so window is always available
// ─────────────────────────────────────────
const MANWAIS_POS: [number, number] = [32.2789, 72.8977];

function ManwaisMap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const L = require("leaflet") as typeof import("leaflet");
  require("leaflet/dist/leaflet.css");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MapContainer, TileLayer, Marker } = require("react-leaflet");

  const icon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize:    [25, 41] as [number, number],
    iconAnchor:  [12, 41] as [number, number],
    popupAnchor: [1,  -34] as [number, number],
    shadowSize:  [41, 41] as [number, number],
  });

  return (
    <MapContainer
      center={MANWAIS_POS}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      dragging={true}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
      <Marker position={MANWAIS_POS} icon={icon} />
    </MapContainer>
  );
}

// SSR-safe wrapper — mirrors how PakistanMap is used in the rest of the site
const ManwaisMapNoSSR = dynamic(() => Promise.resolve(ManwaisMap), { ssr: false });

// ─────────────────────────────────────────
// LOCATION
// ─────────────────────────────────────────
function Location() {
  const isMobile = useIsMobile();
const details = [
  { icon: <span style={{ width: 6, height: 6, borderRadius: "50%", background: "white", display: "inline-block" }} />, label: "Location", text: "Sargodha District, Punjab Province, Pakistan" },
  { icon: <span style={{ width: 6, height: 6, borderRadius: "50%", background: "white", display: "inline-block" }} />, label: "Site Size", text: "21,000 sq. ft. (4 kanal) legally transferred to The Safety Net Project" },
  { icon: <span style={{ width: 6, height: 6, borderRadius: "50%", background: "white", display: "inline-block" }} />, label: "Nearest Hospital", text: "Bhera which is over 1 hour away for most women without independent transport" },
  { icon: <span style={{ width: 6, height: 6, borderRadius: "50%", background: "white", display: "inline-block" }} />, label: "Population Served", text: "Women of Manwais and neighboring villages including Davis Pur and Mellowal" },
];
  return (
    <section style={{ padding: isMobile ? "48px 0" : "70px 0", background: C.navyDark }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: isMobile ? "0 24px" : "0 60px" }}>
        <SectionLabel gold>Where We&apos;re Building</SectionLabel>
        <SectionTitle light>
          Manwais, <em style={{ fontStyle: "italic", fontWeight: 400, color: C.goldLight }}>Punjab,</em> Pakistan
        </SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 64, marginTop: isMobile ? 32 : 52, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.92rem", fontWeight: 300, color: "rgba(255,255,255,0.9)", lineHeight: 1.8, marginBottom: 16 }}>
              Manwais is a small agricultural village in Sargodha District, central Punjab. One of Pakistan&apos;s most populous provinces but with some of its most underserved rural communities.
            </p>
            <p style={{ fontSize: "0.92rem", fontWeight: 300, color: "rgba(255,255,255,0.9)", lineHeight: 1.8, marginBottom: 24 }}>
              The village sits approximately 10 km east of Bhera, with the nearest qualified hospitals and physicians more than an hour away. There is currently no women&apos;s healthcare facility of any kind in the area.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {details.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1rem", marginTop: 2, flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.goldLight, marginBottom: 3 }}>
                      {d.label}
                    </strong>
                    <span style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{d.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{
            borderRadius: 4,
            height: isMobile ? 260 : undefined,
            aspectRatio: isMobile ? undefined : "4/3",
            position: "relative", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
          }}>
            <ManwaisMapNoSSR />
            <div style={{
              position: "absolute", bottom: 12, left: 12,
              background: "rgba(20,30,65,0.92)", padding: "5px 12px",
              borderRadius: 2, display: "flex", alignItems: "center", gap: 7,
              backdropFilter: "blur(4px)", zIndex: 1000,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, whiteSpace: "nowrap" }}>
                Manwais · Sargodha District, Punjab
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────
type StepStatus = "done" | "active" | "upcoming";
interface TimelineStep {
  status: StepStatus;
  phase: string;
  title: React.ReactNode;
  desc: string;
}interface TimelineItemProps extends TimelineStep { isLast: boolean; delay: number }

function TimelineItem({ status, phase, title, desc, isLast, delay }: TimelineItemProps) {
  const [ref, visible] = useReveal();
  const dotStyles: Record<StepStatus, React.CSSProperties> = {
    done:     { background: C.navy,    border: `1px solid ${C.navy}`,   color: "white" },
    active:   { background: "white",   border: `1px solid ${C.navy}`,   color: C.navy  },
    upcoming: { background: C.grayBg,  border: `1px solid ${C.border}`, color: C.muted },
  };
  const dotLabel: Record<StepStatus, string> = { done: "✓", active: "→", upcoming: "" };

  return (
    <div ref={ref} style={{
      position: "relative",
      marginBottom: isLast ? 0 : 24,
      paddingBottom: isLast ? 0 : 24,
      borderBottom: isLast ? "none" : `1px solid ${C.border}`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.55s ${delay}ms, transform 0.55s ${delay}ms`,
    }}>
      <div style={{
        position: "absolute", left: -44, top: 2,
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.65rem", fontWeight: 700, zIndex: 1,
        ...dotStyles[status],
      }}>
        {dotLabel[status]}
      </div>
      <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.navy, marginBottom: 4 }}>{phase}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: C.ink, marginBottom: 6 }}>{title}</div>
      <p style={{ fontSize: "0.85rem", fontWeight: 300, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

function Timeline() {
  const isMobile = useIsMobile();
  const blueprintUrl = "/Health-Facility-Construction-Preliminary-Design.pdf";

const steps: TimelineStep[] = [
  { 
    status: "done",
    phase: "Completed",
    title: "Land Secured",
    desc: "21,000 sq. ft. (4 kanal) property in Manwais legally transferred to The Safety Net Project, with land use designated specifically for the healthcare center."
  },
  { 
    status: "done",
    phase: "Completed",
   
title: (
  <Link
    href={blueprintUrl}
    isExternal
    textDecoration="none"
    color="inherit"
    _hover={{ color: "#2c3d90", textDecoration: "none" }}
  >
    Blueprints & Planning Finalized ↗
  </Link>
),
    desc: "Architectural plans completed for a single-structure facility: exam room, waiting area, bedroom, restroom, and outdoor shaded area."
  },
    { status: "active",   phase: "In Progress",    title: "Fundraising Campaign",            desc: "Actively seeking grant funding and individual donors to reach the $20,000 Phase I goal. Construction begins immediately upon receipt of funds." },
    { status: "upcoming", phase: "Upon Funding",   title: "Construction Begins",             desc: "Local Pakistani construction workers hired. Directors provide on-ground and remote oversight. Full photo, video, and written documentation throughout." },
    { status: "upcoming", phase: "Phase I Launch", title: "Center Opens",                    desc: "Female physicians begin weekly visits. Hygiene supplies distributed. Health education sessions begin. Referrals established to Bhera hospitals for advanced care." },
  ];

  return (
    <section id="timeline" style={{ padding: isMobile ? "40px 0" : "48px 0", background: C.grayBg }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: isMobile ? "0 24px" : "0 60px" }}>
        <SectionLabel>Project Roadmap</SectionLabel>
        <SectionTitle>From funding <em style={{ fontStyle: "italic", fontWeight: 400 }}>to open doors.</em></SectionTitle>
        <div style={{ marginTop: 28, background: "white", border: `1px solid ${C.border}`, padding: isMobile ? "24px 20px 24px 52px" : 32 }}>
          <div style={{ position: "relative", paddingLeft: 44 }}>
            <div style={{ position: "absolute", left: 16, top: 8, bottom: 8, width: 1, background: C.border }} />
            {steps.map((s, i) => (
              <TimelineItem key={i} {...s} isLast={i === steps.length - 1} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// DONATE + CTA (combined)
// ─────────────────────────────────────────
function DonateAndCta() {
  const isMobile = useIsMobile();
  return (
    <section id="donate" style={{ background: C.navy, padding: isMobile ? "48px 24px" : "50px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {([600, 400] as number[]).map((s) => (
        <div key={s} style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: s, height: s, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none",
        }} />
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 26, height: 1, background: C.gold }} />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold }}>
            Support the Project
          </span>
          <div style={{ width: 26, height: 1, background: C.gold }} />
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)",
          fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 16,
        }}>
          This center will be<br />
          the <em style={{ fontStyle: "italic", color: C.goldLight }}>first of its kind.</em><br />
          Help us build it.
        </h2>
        <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: 36 }}>
          501(c)(3) registered · All donations tax-deductible · 100% goes directly to the project
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn href="https://www.launchgood.com" variant="goldLight">Donate Now</Btn>
          <Btn href="mailto:safetynetprojects@gmail.com" variant="outlineWhite">Contact Us</Btn>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────
const ManwaisPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const [hasMounted, setHasMounted] = useState(false);
  const calloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHasMounted(true); }, []);
  if (!hasMounted) return null;

  return (
    <ChakraProvider>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          section, div { margin-top: 0; }
        `}</style>

        {isMobile ? <HamburgerMenu /> : <Header />}

        <StickyNav calloutRef={calloutRef} />
        <Footer>
          <Hero calloutRef={calloutRef} />
          <Problem />
          <QuoteBand />
          <Building />
          <FundAllocation />
          <Location />
          <Timeline />
          <DonateAndCta />
        </Footer>
      </>
    </ChakraProvider>
  );
};

export default ManwaisPage;