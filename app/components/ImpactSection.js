"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Flex, Grid, Text, Image } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const NAVY = "#1b2a5b";
const CREAM = "#fbf7ee";
const GRAY = "#5F5D5D";

/* The two pillars, moved here out of the Purpose section. Each renders as a
   full-height row where the photo crosses the navy/cream boundary — row 01
   breaks the top edge, row 02 breaks the bottom edge, so the eye zig-zags
   down the page. `titleSerif` / `titleBold` split the heading across the
   site's serif + heavy-sans pairing. Photos are placeholders from /public. */
const PILLARS = [
  {
    num: "01",
    titleSerif: "A Strong",
    titleBold: "Foundation",
    body: "Every individual deserves access to life's basic necessities. We work to improve access to food, safe housing, healthcare, and other critical services that create a foundation for lasting well-being.",
    image: "/atif/DSC_6617.jpg",
    pos: "center",
  },
  {
    num: "02",
    titleSerif: "",
    titleBold: "Empowerment",
    body: "Opportunity should not depend on where someone is born. We provide the education and training that make a stable future possible.",
    image: "/atif/DSC_6505.jpg",
    pos: "center",
    flip: true, // image left, text right
  },
];

/* Ordered as money → people → reach, so the ledger builds from what was
   given to who it reached. `text` stays to one line at desktop width — the
   number and label carry the point, the sentence just qualifies it. */
const STATS = [
  {
    key: "funds",
    target: 8000,
    format: (v) => `$${v.toLocaleString()}+`,
    label: "Funds Distributed",
    text: "Supporting the education, care, and daily needs of the girls we serve.",
    image: "/atif/DSC_6486.jpg",
  },
  {
    key: "girls",
    target: 70,
    format: (v) => `${v}+`,
    label: "Girls Served",
    text: "Empowered with education, safety, and the tools to transform their lives.",
    image: "/atif/DSC_6533.jpg",
  },
  {
    key: "reach",
    target: 100,
    format: (v) => `${v}%`,
    label: "From Underrepresented Communities",
    text: "Every girl we work with comes from a historically underrepresented group.",
    image: "/atif/DSC_6670.jpg",
  },
];

const PillarCopy = ({ pillar }) => (
  <Box className="impact-reveal impact-float" data-float="12" willChange="transform" maxW={{ md: "34rem" }}>
    <Text
      fontFamily={SANS}
      fontWeight="700"
      fontSize={{ base: "14px", md: "15px" }}
      letterSpacing="3px"
      color="rgba(255,255,255,.55)"
      mb={{ base: 4, md: 6 }}
    >
      {pillar.num}
    </Text>
    <Text
      fontFamily={SERIF}
      fontWeight="400"
      fontSize={{ base: "38px", md: "clamp(40px, 4vw, 66px)" }}
      lineHeight="1.08"
      letterSpacing="-.01em"
      color="#fff"
    >
      {pillar.titleSerif && `${pillar.titleSerif} `}
      <Box as="span" fontFamily={SANS} fontWeight="800" letterSpacing="-.02em">
        {pillar.titleBold}
      </Box>
    </Text>
    <Text
      mt={{ base: 5, md: 7 }}
      fontFamily={SERIF}
      fontSize={{ base: "18px", md: "22px" }}
      lineHeight="1.55"
      color="rgba(255,255,255,.86)"
    >
      {pillar.body}
    </Text>
  </Box>
);

/* `rise` swaps the short bounce entrance for a long, scroll-scrubbed climb
   from below the fold — the same travel the hero gallery images make. */
const PillarMedia = ({ pillar, float, h, mt, rise, w = { base: "100%", md: "50%" } }) => (
  <Box
    className={`${rise ? "impact-rise" : "impact-reveal"} impact-float impact-grow`}
    data-float={float}
    data-rise={rise || undefined}
    willChange="transform"
    w={w}
    flexShrink={0}
    mt={mt}
    h={h}
    overflow="hidden"
  >
    <Image
      src={pillar.image}
      alt=""
      w="100%"
      h="100%"
      objectFit="cover"
      objectPosition={pillar.pos}
      draggable={false}
    />
  </Box>
);

/* Row 01 opens with 14vh of navy above its copy (32vh top padding, less the
   18vh the band starts at). Row 02 closes with the same 14vh below its copy —
   see the sync effect, which measures rather than hardcodes it because the
   copy's height depends on where the headline and body wrap. */
const NAVY_TAIL_VH = 14;

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const navyRef = useRef(null);
  const copyRef = useRef(null);

  // Size row 02's navy band so it ends NAVY_TAIL_VH below the copy, mirroring
  // the gap above row 01's copy. offsetTop/offsetHeight are used throughout
  // because they report layout position — getBoundingClientRect would fold in
  // the GSAP transforms these elements are carrying.
  useLayoutEffect(() => {
    const navy = navyRef.current;
    const copy = copyRef.current;
    if (!navy || !copy) return;

    const sync = () => {
      // below Chakra's md breakpoint the band is full-height by design
      if (window.innerWidth < 768) {
        navy.style.height = "";
        return;
      }
      const vh = window.innerHeight;
      const wanted = copy.offsetHeight + (NAVY_TAIL_VH / 100) * vh;

      // ...but never past the photo's bottom edge, or the photo stops
      // crossing the boundary. Keeps at least 4vh of bleed at any viewport.
      const media = navy.parentElement?.querySelector(".impact-grow");
      const limit = media
        ? media.offsetTop + media.offsetHeight - 0.04 * vh
        : Infinity;

      navy.style.height = `${Math.min(wanted, limit)}px`;
      ScrollTrigger.refresh();
    };

    sync();
    // webfonts land after first paint and change how the copy wraps
    document.fonts?.ready.then(sync).catch(() => {});
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  const [inView, setInView] = useState(false);
  // derived from STATS so renaming a key can't leave a counter reading NaN
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(STATS.map((s) => [s.key, 0]))
  );

  useGSAP(
    () => {
      // ---- entrance: each row's contents rise in with a slight overshoot
      // ("bounce") as the blur settles. Time-based, not scrubbed, because an
      // ease can only overshoot when it owns the clock.
      gsap.utils.toArray(".impact-row").forEach((row) => {
        const reveals = row.querySelectorAll(".impact-reveal");
        if (!reveals.length) return;

        // A "soft" row keeps its contents visible the whole time — it only
        // settles upward into place, with no opacity/blur to fade out of. Used
        // where the row is already on screen before its trigger can fire, so
        // pre-hiding it would show a blank gap rather than a reveal. It starts
        // earlier too, so the settle plays as the row comes into view.
        const soft = row.dataset.reveal === "soft";

        gsap.set(reveals, soft ? { y: 70 } : { y: 70, opacity: 0, filter: "blur(8px)" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: soft ? "top 90%" : "top 68%", once: true },
        });
        // y overshoots on back.out; opacity/blur settle in parallel on a
        // plain power2.out (blur can't overshoot below 0)
        tl.to(reveals, { y: 0, duration: 0.95, ease: "back.out(1.5)", stagger: 0.16 }, 0);
        if (!soft) {
          tl.to(
            reveals,
            { opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out", stagger: 0.16 },
            0
          );
        }
      });

      // ---- gallery-style rise: instead of the short bounce, these climb a
      // full screen from below the fold, scrubbed to scroll position, and
      // land in their natural spot as the row settles at the top.
      gsap.utils.toArray(".impact-rise").forEach((el) => {
        const dist = parseFloat(el.dataset.rise) || 0.1;
        const row = el.closest(".impact-row") || el;
        gsap.fromTo(
          el,
          { y: () => window.innerHeight * dist },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              // starts climbing while still below the fold and lands while
              // the row is only ~40% up the screen — i.e. midway through
              // the Purpose blur — so the photo is already seated near the
              // navy's top edge instead of still climbing toward it.
              // Starting early keeps the on-screen part of the travel at a
              // natural ~1:1 speed rather than rushing.
              start: "top bottom+=25%",
              end: "top 40%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // ---- grow-in: each photo starts a touch undersized and scales up to
      // its natural size as its row scrolls in, so it reads as revealing
      // itself rather than just arriving. Scales the whole media block (frame
      // + photo together) — scaling the <img> inside its overflow-hidden frame
      // below 1 would pull it off the edges and leave gaps. scale is tracked
      // separately from y / yPercent, so all three compose into one transform
      // instead of overwriting.
      //
      // The two rows need different windows. A photo that also rises spends
      // the early part of its row's range translated ~a full screen below the
      // fold, so the row's natural approach range would spend the whole grow
      // while the photo is still out of sight — it'd already be at full size
      // by the time you first see it. Those grow over a later window that
      // covers the visible tail of the climb and the moment it settles.
      gsap.utils.toArray(".impact-grow").forEach((el) => {
        const rises = el.classList.contains("impact-rise");
        gsap.fromTo(
          el,
          { scale: 0.9 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".impact-row") || el,
              start: rises ? "top 78%" : "top bottom+=20%",
              end: rises ? "top 30%" : "top 60%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // ---- floating parallax: everything drifts against the scroll at its
      // own amplitude (data-float, % of the element's own height) the whole
      // time it's on screen — same depth trick as the hero gallery. Runs on
      // yPercent, which GSAP tracks separately from the entrance's y, so the
      // two compose into one transform instead of fighting.
      gsap.utils.toArray(".impact-float").forEach((el) => {
        const amp = parseFloat(el.dataset.float || "6");
        gsap.fromTo(
          el,
          { yPercent: amp },
          {
            yPercent: -amp,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".impact-row") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // ---- stats media: hovering a stat pops its photo into the frame in
      // the right-hand margin. Hover, not scroll — so the reader chooses what
      // to look at, and the photos stay out of the way until asked for.
      //
      // Listeners go on the rows rather than React onMouseEnter so the whole
      // effect stays in one place with the animation it drives, and so the
      // frame itself can keep pointerEvents: none.
      const media = gsap.utils.toArray(".stat-media");
      const statRows = gsap.utils.toArray(".stat-row");
      const list = document.querySelector(".stat-list");
      const teardown = [];

      if (media.length && statRows.length) {
        let active = -1;

        const show = (i) => {
          if (i === active) return;
          active = i;
          media.forEach((el, j) => {
            if (j === i) {
              // the pop: settles down out of a slight over-size and lifts into
              // place, rather than a plain crossfade
              gsap.fromTo(
                el,
                { opacity: 0, scale: 1.06, y: 18 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power3.out",
                  overwrite: true,
                }
              );
            } else {
              gsap.to(el, { opacity: 0, duration: 0.3, ease: "power2.out", overwrite: true });
            }
          });
        };

        const hide = () => {
          if (active === -1) return;
          active = -1;
          gsap.to(media, { opacity: 0, duration: 0.35, ease: "power2.out", overwrite: true });
        };

        statRows.forEach((row, i) => {
          const enter = () => show(i);
          row.addEventListener("mouseenter", enter);
          teardown.push(() => row.removeEventListener("mouseenter", enter));
        });

        // leaving the list as a whole clears the frame; leaving an individual
        // row does not, so sliding between rows swaps cleanly with no flicker
        if (list) {
          list.addEventListener("mouseleave", hide);
          teardown.push(() => list.removeEventListener("mouseleave", hide));
        }
      }

      return () => teardown.forEach((fn) => fn());
    },
    { scope: sectionRef }
  );

  // fire the counters once, when the stats row scrolls into view
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timers = STATS.map((stat) => {
      let current = 0;
      const increment = Math.ceil(stat.target / 100);
      const id = setInterval(() => {
        current = Math.min(current + increment, stat.target);
        setCounts((prev) => ({ ...prev, [stat.key]: current }));
        if (current >= stat.target) clearInterval(id);
      }, 30);
      return id;
    });
    return () => timers.forEach(clearInterval);
  }, [inView]);

  const [first, second] = PILLARS;

  return (
    /* Wrapper owns the overlap (mt) and stacking (zIndex): zIndex 30 slides
       this over the pinned Purpose section as that one's text exits. */
    <Box ref={sectionRef} position="relative" zIndex={30} mt="-100vh">
      {/* ================= ROW 01 — text left, photo right =================
          The navy starts 18vh down, so the top strip stays transparent and
          the blurred Purpose text shows through while this slides up; the
          photo starts above that line and crosses it. Shrinking this strip
          is what tightens the gap after the Purpose section — the photo's
          mt moves with it to preserve the 8vh bleed. */}
      {/* zIndex 2 keeps the rising photo painting over row 02 while it's
          still translated down there mid-climb */}
      {/* 88vh leaves only ~2vh of navy under the photo (which ends at 86vh) —
          that dead space plus row 02's top margin is the gap between rows */}
      <Box className="impact-row" position="relative" zIndex={2} minH={{ base: "auto", md: "88vh" }}>
        <Box
          position="absolute"
          top={{ base: 0, md: "18vh" }}
          left={0}
          right={0}
          bottom={0}
          bg={NAVY}
        />
        <Flex
          position="relative"
          direction={{ base: "column", md: "row" }}
          align="flex-start"
          gap={{ base: 8, md: 10}}
          px={{ base: 6, md: "56px" }}
          pb={{ base: 16, md: 0 }}
        >
          <Box flex="1" pt={{ base: 16, md: "32vh" }}>
            <PillarCopy pillar={first} />
          </Box>
          <PillarMedia
            pillar={first}
            float="6"
            rise="0.9"
            mt={{ base: 0, md: "10vh" }}
            h={{ base: "44vh", md: "76vh" }}
          />
        </Flex>
      </Box>

      {/* ================= ROW 02 — photo left, text right =================
          Navy fills the top 70vh and cream takes the rest, so this photo
          (5vh → 77vh) crosses the boundary on the way out — mirroring row 01.
          The navy height has to stay BELOW the photo's bottom edge or the
          bleed disappears; it also has to clear the copy, which runs from
          30vh to roughly 62vh and is white-on-navy. */}
      <Box
        className="impact-row"
        /* soft = never fade this row's contents out; see the entrance block.
           Row 01 sits behind the pinned Purpose section while it's hidden, so
           the fade is safe there. This row doesn't — it's plainly on screen
           before its trigger fires, and hiding it read as a blank gap. */
        data-reveal="soft"
        position="relative"
        zIndex={1}
        bg={CREAM}
        minH={{ base: "auto", md: "94vh" }}
      >
        <Box
          ref={navyRef}
          position="absolute"
          top={0}
          left={0}
          right={0}
          /* md value is a first-paint placeholder — the sync effect measures
             the real height from the copy below */
          h={{ base: "100%", md: "70vh" }}
          bg={NAVY}
        />
        <Flex
          position="relative"
          direction={{ base: "column-reverse", md: "row" }}
          align="flex-start"
          gap={{ base: 8, md: 14 }}
          px={{ base: 6, md: "56px" }}
          pb={{ base: 16, md: 0 }}
        >
          <PillarMedia
            pillar={second}
            float="7"
            mt={{ base: 0, md: "5vh" }}
            w={{ base: "100%", md: "45%" }}
            h={{ base: "40vh", md: "72vh" }}
          />
          <Box ref={copyRef} flex="1" pt={{ base: 16, md: "24vh" }}>
            <PillarCopy pillar={second} />
          </Box>
        </Flex>
      </Box>

      {/* ================= ROW 03 — the numbers, on cream ================= */}
      <Box
        className="impact-row"
        ref={panelRef}
        bg={CREAM}
        px={{ base: 6, md: "56px" }}
        pt={{ base: 12, md: 20 }}
        pb={{ base: 20, md: 32 }}
      >
        {/* Masthead: a small lowercase sans eyebrow sitting tight above an
            oversized regular-weight serif line, with the section index set as
            a superscript on the headline itself rather than on its own row.
            The eyebrow carries the sentence so the big word can stay short —
            that contrast in scale is what does the work. */}
        <Box
          className="impact-reveal impact-float"
          data-float="10"
          willChange="transform"
          maxW="1500px"
          mx="auto"
        >
          <Text
            fontFamily={SANS}
            fontWeight="800"
            fontSize={{ base: "17px", md: "20px" }}
            letterSpacing="-.01em"
            color={NAVY}
            mb={{ base: 1, md: 1 }}
          >
            how you&apos;re helping
          </Text>
          <Text
            fontFamily={SERIF}
            fontWeight="400"
            fontSize={{ base: "62px", md: "clamp(78px, 9vw, 150px)" }}
            lineHeight="0.88"
            letterSpacing="-.02em"
            color={NAVY}
          >
            our impact
            <Box
              as="sup"
              fontFamily={SANS}
              fontWeight="700"
              fontSize="0.13em"
              letterSpacing="0"
              verticalAlign="super"
              ml={1}
            >
              03
            </Box>
          </Text>
        </Box>

        {/* The index — no rules. Each row is a serif figure with its label set
            small and muted directly beneath it, and the sentence carried in a
            second column aligned to the figure's top. Rhythm comes from the
            consistent two-tier stack and even row spacing, which is what lets
            a list hold together without borders drawing the eye.

            Held to ~62% width with the right side left empty on purpose: the
            asymmetry and the open margin are as much of the look as the type. */}
        <Box position="relative" maxW="1500px" mx="auto" mt={{ base: 14, md: 24 }}>
          <Box className="stat-list">
            {STATS.map((stat, i) => (
              <Grid
                key={stat.key}
                className="stat-row impact-reveal impact-float"
                data-float={4 + i * 2}
                willChange="transform"
                templateColumns={{ base: "1fr", md: "minmax(0, 34%) minmax(0, 28%)" }}
                columnGap={{ md: 10 }}
                rowGap={{ base: 2, md: 0 }}
                alignItems="start"
                py={{ base: 5, md: 6 }}
              >
                <Box>
                  <Text
                    fontFamily={SERIF}
                    fontWeight="400"
                    fontSize={{ base: "46px", md: "clamp(48px, 4.6vw, 76px)" }}
                    lineHeight="1"
                    letterSpacing="-.02em"
                    color={NAVY}
                    // tabular figures stop the width jitter while counting up
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {stat.format(counts[stat.key])}
                  </Text>
                  <Text
                    mt={{ base: 1, md: 2 }}
                    fontFamily={SANS}
                    fontWeight="500"
                    fontSize={{ base: "14px", md: "15px" }}
                    color="rgba(27,42,91,.55)"
                  >
                    {stat.label}
                  </Text>
                </Box>

                <Text
                  mt={{ base: 0, md: 2 }}
                  fontFamily={SANS}
                  fontSize={{ base: "15px", md: "16px" }}
                  lineHeight="1.5"
                  color={GRAY}
                >
                  {stat.text}
                </Text>
              </Grid>
            ))}
          </Box>

          {/* The photo frame, parked in the open right-hand margin the list
              already leaves (rows run to ~62%). Absolute + pointerEvents none
              so it sits in that space without taking part in the layout or
              swallowing the hover it's driven by. All three photos are stacked
              here at once, one visible at a time — see the .stat-media block
              in the GSAP setup. */}
          <Box
            display={{ base: "none", md: "block" }}
            position="absolute"
            top="50%"
            right="0"
            transform="translateY(-50%)"
            w="30%"
            h="clamp(280px, 36vh, 440px)"
            overflow="hidden"
            pointerEvents="none"
          >
            {STATS.map((stat) => (
              <Box
                key={stat.key}
                className="stat-media"
                position="absolute"
                inset="0"
                opacity={0}
                willChange="transform, opacity"
              >
                <Image
                  src={stat.image}
                  alt=""
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  draggable={false}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImpactSection;
