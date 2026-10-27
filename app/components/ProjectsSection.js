"use client";
import React, { useRef, useState } from "react";
import { Box, Flex, Link, Text, useMediaQuery } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const NAVY = "#1b2a5b";
const CREAM = "#fbf7ee";

// Fixed Navbar height (rendered at page level) — panels reserve it at the top
// so nothing sits under the nav.
const NAV_HEIGHT = "74px";

// Viewport-heights of scrolling per panel transition. Enough that the
// sideways move reads as deliberate rather than a jump.
const TRAVEL = 1.6;

// Viewport-heights of PINNED scrolling after the sideways travel finishes —
// a still beat on the last panel before the pin releases.
const HOLD = 0.25;

// Viewport-heights over which the page turns navy on the way IN, measured
// backwards from the moment this section reaches the top of the screen.
//
// This is the dial for "the blue starts too early". At 1 the fade begins the
// instant the section's top edge appears at the bottom of the screen, so the
// page is already changing while the section is barely visible. Lower it and
// the fade starts later and runs faster — 0.55 means the page stays cream
// until the section is roughly halfway up the screen, then goes navy over
// the rest of the approach.
//
// Values above 1 would start the fade before the section is on screen at
// all, which is why it's capped: the Impact figures above are navy-on-cream
// and darkening the page while they're still mid-screen washes them out.
const ENTER_RAMP = 0.55;

// Viewport-heights over which the page hands its colour back, measured from
// the END of this section's scroll.
//
// The section BELOW takes part in the sweep, so it arrives on navy with
// cream type and only then flips to navy-on-cream as you keep scrolling —
// it crosses the colour boundary rather than butting up against it, which
// is what removes the hard edge. 0.6 leaves the first 0.4 of a viewport of
// its arrival fully navy, so it reads as having landed on the dark page
// before anything starts changing.
const EXIT_RAMP = 0.6;

/* The two live projects, in the order they're funded. Each slide is a tease,
   not the whole story — the breakdown lives on the page it links to, so the
   copy here is one paragraph and nothing else.

   `titleSerif` / `titleBold` split each name across the site's serif +
   heavy-sans pairing, the same convention the Impact pillars use. `flip`
   mirrors the second slide so the eye doesn't land in the same place twice —
   also borrowed from the Impact pillars' zig-zag. */
const PROJECTS = [
  {
    key: "manwais",
    titleBold: "Manwais Health Center",
    href: "/ManwaisHealthcareCenter",
    image: "/punjab.jpg",
    pos: "center",
    body: "Proposing the first women's healthcare facility of its kind in the area. The nearest qualified physician is over an hour away,  the centre will bring weekly visits from female physicians to within walking distance.",
  },
  {
    key: "zia",
    titleBold: "Zia Academy",
    href: "/ZiaAcademy",
    image: "/hero.jpg",
    pos: "center 42%",
    flip: true, // image left, type right
    body: "An educational institution that doubles as a home for over seventy girls, drawn from rural areas across Balochistan, Quetta, and Kashmir. We wire funds straight to the academy and manage distribution as needs arise.",
  },
];

/* One slide: a two-up split, type on one side and a single tall photograph on
   the other. Name, one paragraph, one link — that's the whole panel. With the
   figures and the index line gone there's room to let the photo run nearly
   full height, which is what carries the slide now. */
const Panel = ({ project, isMobile }) => (
  <Flex
    className="project-panel"
    direction="column"
    justify="center"
    flexShrink={0}
    w={isMobile ? "100%" : "100vw"}
    h={isMobile ? "auto" : "100%"}
    px={{ base: 6, md: "56px" }}
    pt={{ base: 20, md: NAV_HEIGHT }}
    /* md bottom padding clears the slide indicator, which is absolutely
       positioned 34px up and stands 58px tall */
    pb={{ base: 20, md: 24 }}
  >
    <Flex
      maxW="1500px"
      mx="auto"
      w="100%"
      direction={{ base: "column", md: project.flip ? "row-reverse" : "row" }}
      align={{ md: "center" }}
      gap={{ base: 8, md: 16 }}
    >
      <Box flex="1" minW={0} maxW={{ md: "32rem" }}>
        <Link
          href={project.href}
          _hover={{ textDecoration: "none", opacity: 0.78 }}
          transition="opacity .25s ease"
        >
          <Text
            fontFamily={SERIF}
            fontWeight="400"
            fontSize={{ base: "46px", md: "clamp(46px, 4.8vw, 84px)" }}
            lineHeight="0.94"
            letterSpacing="-.01em"
            color="var(--page-fg)"
          >
            {project.titleSerif}
            <Box
              as="span"
              display="block"
              fontFamily={SANS}
              fontWeight="800"
              letterSpacing="-.03em"
            >
              {project.titleBold}
            </Box>
          </Text>
        </Link>

        <Text
          mt={{ base: 6, md: 8 }}
          fontFamily={SANS}
          fontSize={{ base: "15px", md: "17px" }}
          lineHeight="1.6"
          color="var(--page-fg)"
          opacity={0.78}
        >
          {project.body}
        </Text>

        <Link
          href={project.href}
          display="inline-block"
          mt={{ base: 7, md: 10 }}
          fontFamily={SANS}
          fontWeight="700"
          fontSize={{ base: "15px", md: "16px" }}
          color="var(--page-fg)"
          borderBottom="1px solid"
          borderColor="var(--page-fg)"
          opacity={0.82}
          pb="3px"
          whiteSpace="nowrap"
          _hover={{ textDecoration: "none", opacity: 1 }}
        >
          Read the full breakdown
        </Link>
      </Box>

      <Box
        className="panel-media"
        w={{ base: "100%", md: "46%" }}
        h={{ base: "38vh", md: "clamp(280px, 56vh, 620px)" }}
        flexShrink={0}
        overflow="hidden"
        willChange="transform"
      >
        <Box
          as="img"
          src={project.image}
          alt=""
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition={project.pos}
          draggable={false}
        />
      </Box>
    </Flex>
  </Flex>
);

const ProjectsSection = () => {
  const [isMobile] = useMediaQuery("(max-width: 900px)");
  const [active, setActive] = useState(0);

  const wrapRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // ---- the horizontal scroll: pin the section, translate the track ----
  useGSAP(
    () => {
      if (isMobile) return;

      const track = trackRef.current;
      if (!track) return;

      const steps = PROJECTS.length - 1; // how many panel-widths to travel
      const travel = TRAVEL * steps;     // timeline units spent moving

      // x as a function (not xPercent) because the track is N viewports wide:
      // xPercent would be a share of that whole width, not of one panel.
      // invalidateOnRefresh re-runs it after a resize.
      //
      // The pin runs for travel + HOLD, and the timeline is built in matching
      // units (1 unit = 1 viewport of scroll) so the tweens below land in the
      // travel portion and the hold is genuinely still.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * (travel + HOLD),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // progress spans travel + hold, so rescale before deriving which
            // panel is showing — otherwise the indicator would drift during
            // the hold even though nothing has moved
            const t = gsap.utils.clamp(
              0,
              1,
              (self.progress * (travel + HOLD)) / travel
            );
            // React bails out when the value is unchanged, so this is safe to
            // call on every scroll frame
            setActive(Math.round(t * steps));
          },
        },
      });

      tl.to(
        track,
        { x: () => -(window.innerWidth * steps), ease: "none", duration: travel },
        0
      );

      // each photo drifts slightly against the travel, so the slides have
      // depth instead of sliding as one flat sheet. Transform only — cheap.
      tl.fromTo(
        ".panel-media",
        { xPercent: 6 },
        { xPercent: -6, ease: "none", duration: travel },
        0
      );

      // the hold — an empty tween that simply extends the timeline so the
      // pin keeps running with nothing moving. The colour hand-back happens
      // across this window; see the colour block below.
      tl.to({}, { duration: HOLD }, travel);
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // ---- the colour takeover ----
  //
  // The page itself changes colour: --page-bg is interpolated cream → navy
  // and --page-fg navy → cream, and every section that takes part paints
  // from those two variables (this one, the Impact stats row above it, the
  // Contact section below it, and the Navbar). Nothing is covered by an
  // overlay — the background and the type genuinely change, the same idea as
  // the hero wordmark flipping colour as the band passes over it.
  //
  // Runs off the OUTER wrapper, not the pinned section: pinning re-parents
  // the section into a pin-spacer, and measuring a pinned element for a
  // second trigger is a reliable way to get wrong numbers.
  useGSAP(
    () => {
      const tone = (mode) =>
        window.dispatchEvent(new CustomEvent("site:tone", { detail: mode }));

      const bgAt = gsap.utils.interpolate(CREAM, NAVY);
      const fgAt = gsap.utils.interpolate(NAVY, CREAM);
      const clamp01 = gsap.utils.clamp(0, 1);

      const paint = (k) => {
        const root = document.documentElement.style;
        root.setProperty("--page-bg", bgAt(k));

        // The type deliberately LAGS the background and then flips quickly.
        // Both colours travel between the same two endpoints in opposite
        // directions, so crossfading them in step would make them identical
        // at the halfway point and the text would disappear. Holding the
        // type dark until the page is already half-dark, then switching it
        // over a short window, keeps contrast on the usable side of the
        // crossing in both directions.
        root.setProperty("--page-fg", fgAt(clamp01((k - 0.5) / 0.15)));
      };

      // One trigger spanning the whole approach-through-exit, with both ramps
      // derived from measured scroll distance rather than guessed fractions.
      //
      //   0 ─── enterStart ─── a ═════════ exitStart ─────── 1
      //   │  still cream  │ turns  │  navy   │ next section is
      //   │               │ navy   │         │ already on screen
      //
      // `a`           the section has finished arriving — one viewport in,
      //               i.e. its top edge has reached the top of the screen.
      // `enterStart`  ENTER_RAMP viewports before that. Everything before it
      //               stays cream, which is what keeps the blue from
      //               starting the moment the section peeks into view.
      // `exitStart`   EXIT_RAMP viewports from the end. By then the section
      //               below has begun rising and is still fully navy; the
      //               colour changes underneath it as it settles.
      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const vh = window.innerHeight;
          const total = self.end - self.start;
          const p = self.progress;

          const a = vh / total;
          // capped at `a` so the fade can never begin before the section is
          // on screen (see ENTER_RAMP)
          const enterStart = Math.max(0, (vh - vh * ENTER_RAMP) / total);
          // guard: on a short page the two ramps could otherwise cross
          const exitStart = Math.max(a, (total - vh * EXIT_RAMP) / total);

          const k =
            p < enterStart
              ? 0
              : p < a
              ? (p - enterStart) / (a - enterStart)
              : p >= exitStart
              ? 1 - (p - exitStart) / (1 - exitStart)
              : 1;
          paint(clamp01(k));

          // the logo mark is the one thing a colour variable can't fix (see
          // the Navbar) — it needs a plain light/dark signal
          tone(k > 0.5 ? "dark" : "light");
        },
        // onUpdate stops firing once the trigger is out of range, so the
        // palette has to be parked explicitly at both ends — and BOTH ends
        // are cream. Leaving forwards means the exit ramp has completed and
        // the next section owns the screen; leaving backwards means we're
        // above the section entirely. Painting navy here was what left the
        // page stuck dark once you scrolled all the way down.
        onLeave: () => {
          paint(0);
          tone("light");
        },
        onLeaveBack: () => {
          paint(0);
          tone("light");
        },
      });

      return () => {
        st.kill();
        // never leave the rest of the site stuck mid-transition
        paint(0);
        tone("light");
      };
    },
    { scope: wrapRef, dependencies: [isMobile] }
  );

  // ---- mobile: no pin, no sideways travel — the panels just stack ----
  if (isMobile) {
    return (
      <Box ref={wrapRef} bg="var(--page-bg)" position="relative" zIndex={40}>
        {PROJECTS.map((p) => (
          <Panel key={p.key} project={p} isMobile />
        ))}
      </Box>
    );
  }

  return (
    /* zIndex 40 keeps this above the Impact section as it arrives, matching
       the stacking the earlier sections use to slide over one another. */
    <Box ref={wrapRef} bg="var(--page-bg)" position="relative" zIndex={40}>
      <Box ref={sectionRef} h="100vh" overflow="hidden" position="relative">
        <Flex
          ref={trackRef}
          h="100%"
          w={`${PROJECTS.length * 100}vw`}
          willChange="transform"
        >
          {PROJECTS.map((p) => (
            <Panel key={p.key} project={p} isMobile={false} />
          ))}
        </Flex>

        {/* Slide indicator, bottom right. Read-only — it reports where you
            are in the horizontal travel rather than offering a jump, so it
            can't fight the scrub. */}
        <Flex
          position="absolute"
          bottom="34px"
          right="56px"
          gap={3}
          zIndex={3}
          pointerEvents="none"
        >
          {PROJECTS.map((p, i) => (
            <Box
              key={p.key}
              w="86px"
              h="58px"
              overflow="hidden"
              border="1px solid"
              borderColor="var(--page-fg)"
              opacity={i === active ? 1 : 0.35}
              transition="opacity .4s ease, border-color .4s ease"
            >
              <Box
                as="img"
                src={p.image}
                alt=""
                w="100%"
                h="100%"
                objectFit="cover"
                draggable={false}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default ProjectsSection;
