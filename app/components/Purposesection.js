"use client";
import React, { useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const MAROON = "#1b2a5b";
const CREAM = "#fbf7ee";

// the "unfilled" word color — a faded tint of the navy fill color
const FADED = "#dcdfe8";

// How far the text drifts up on its way out, in viewport heights.
//
// This is 1 for a reason, and it's the whole linkage: the Impact section
// arrives by ordinary document scroll across the 100vh its mt="-100vh"
// overlap consumes — 100vh of travel per 100vh of scrolling. Matching that
// exactly means the text moves at the same rate as the section coming up
// underneath it, so the two travel as one piece instead of sliding against
// each other. At 0.95 the text crept downward relative to the incoming
// section the whole way out.
const EXIT_TRAVEL = 1;

// ...and how far it scales back on the way. Anchored to the top edge (see
// transformOrigin below), so it recedes away from the viewer rather than
// collapsing toward its own middle — the same recede the hero gallery makes.
const EXIT_SCALE = 0.9;

const STATEMENT_LEAD = "The Safety Net Project";
const STATEMENT_REST =
  "is a non-profit organization dedicated to providing support and safety for children and women around the world. It was founded with the intention of bridging the gap for marginalized communities. Through education, healthcare resources, and community-driven initiatives, we create opportunities that foster long-term independence, resilience, and lasting change.";

/* Splits a string into individual word <span>s so GSAP can stagger the
   color fill word-by-word. Every span carries the .fill-word class, so
   the fill order is simply DOM order. */
const Words = ({ text }) =>
  text.split(" ").map((word, i) => (
    <Box as="span" key={i} className="fill-word" whiteSpace="pre-wrap">
      {word}{" "}
    </Box>
  ));

const PurposeSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      // all words start faded...
      gsap.set(".fill-word", { color: FADED });

      // NOTE: the slide-over happens for free — no transform needed here.
      // The hero stays pinned for an extra 100vh at the end of its
      // timeline, and this section's wrapper pulls it up by 100vh
      // (mt="-100vh"), so normal document scroll carries it up and over
      // the fixed hero. The old fromTo(yPercent) slide was double-moving
      // the section AND translating the very element these triggers
      // measure against, which broke the pin's start position — that's
      // what was breaking the word fill and causing the dead scroll.

      // once the section reaches the top, it pins and the words fill to
      // maroon one by one, driven entirely by scroll position (scrub).
      // 150% fills the words + an extra 100% where the text exits while
      // the Impact section slides up over it — same pattern as the
      // hero → purpose handoff. (Was 250%+100% when the pillars lived
      // here too; less copy now, so the fill needs less runway.)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          // The other half of the linkage. A numeric scrub isn't "smoothness",
          // it's how many SECONDS the playhead takes to catch up to the scroll
          // position — so at 1 the text was still travelling a second after the
          // wheel stopped, while the Impact section (plain document scroll,
          // no scrub, no lag) had already stopped dead. Matching EXIT_TRAVEL to
          // its rate only helps if the timing matches too; otherwise the text
          // still slides against a section that's standing still. Lenis already
          // smooths the scroll position itself, so nothing is lost here.
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".fill-word", {
        color: MAROON,
        duration: 1,
        stagger: 0.4, // relative spacing — scrub normalizes it across the pin
        ease: "none",
      });

      // during the extra hold, the text drifts up while blurring — same
      // exit the gallery images make in the hero — as the Impact section
      // slides over. The fill above spans D of timeline ↔ 150% of scroll,
      // so a (100/150)×D tween appended after it maps exactly to the final
      // 100% (which is what ImpactSection's mt="-100vh" overlap consumes).
      // That 1:1 mapping is what lets EXIT_TRAVEL=1 track the incoming
      // section exactly — change either number and they drift apart again.
      const D = tl.duration();
      tl.to(contentRef.current, {
        scale: EXIT_SCALE,
        y: () => -window.innerHeight * EXIT_TRAVEL,
        // top-anchored: the block shrinks upward and away instead of pulling
        // in toward its own centre, which is what makes it read as depth
        // rather than as the text just getting smaller
        transformOrigin: "50% 0%",
        filter: "blur(7px)",
        ease: "none",
        duration: D * (100 / 150),
      });
    },
    { scope: sectionRef }
  );

  return (
    /* Wrapper owns the overlap (mt) and stacking (zIndex) so the pinned
       element itself carries no margin — margins on pinned elements make
       ScrollTrigger's pin-spacer math unreliable. zIndex 20 keeps the
       whole thing painting above the pinned hero as it slides over. */
    <Box position="relative" zIndex={20} mt="-100vh">
      <Box
        ref={sectionRef}
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: "28px" }}
        py={{ base: 20, md: 24 }}
        bg={CREAM}
      >
        {/* exit target — the GSAP hold-phase blur + upward travel hits this
            wrapper, not the pinned element itself, so the pin-spacer math
            stays untouched */}
        <Box
          ref={contentRef}
          display="flex"
          flexDirection="column"
          alignItems="center"
          w="100%"
          willChange="transform"
        >
        {/* eyebrow */}
        <Text
          fontFamily={SANS}
          fontWeight="700"
          fontSize={{ base: "22px", md: "28px" }}
          color={MAROON}
          mb={{ base: 10, md: 16 }}
        >
          purpose
        </Text>

        {/* main statement — lead in bold sans, rest in serif, all filling */}
        <Text
          as="p"
          maxW="1400px"
          textAlign="center"
          fontFamily={SERIF}
          fontWeight="400"
          fontSize={{ base: "28px", md: "clamp(34px, 4.2vw, 64px)" }}
          lineHeight="1.12"
          letterSpacing="-.01em"
        >
          <Box
            as="span"
            fontFamily={SANS}
            fontWeight="800"
            letterSpacing="-.02em"
            fontSize="0.82em"
          >
            <Words text={STATEMENT_LEAD} />
          </Box>
          <Box as="span" fontSize="0.82em">
            <Words text={STATEMENT_REST} />
          </Box>
        </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PurposeSection;