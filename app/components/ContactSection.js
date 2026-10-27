"use client";
import React, { useRef } from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const NAVY = "#1b2a5b";
const CREAM = "#fbf7ee";

const EMAIL = "safetynetprojects@gmail.com";

/* The three ways in, ordered by commitment. Routes match the Navbar's. */
const WAYS = [
  { label: "Donate", href: "/contact-us", note: "Fund a project directly" },
  { label: "Volunteer", href: "/volunteer", note: "Give time and skills" },
  { label: "Contact us", href: "/contact-us", note: "Questions, partnerships, press" },
];

/* Part of the --page-bg sweep ProjectsSection drives, which is why it paints
   from the palette variables rather than fixed colours. It ARRIVES on navy
   with cream type, holds there, and flips to navy-on-cream as you keep
   scrolling — the section crosses the colour boundary instead of butting up
   against it, so there's no edge to see.

   Standalone (on /contact-us) nothing drives those variables, so it falls
   back to the :root defaults in globals.css — cream page, navy type. */
/* `topSpace` exists because this section is used in two places with very
   different things above it: on /contact-us it sits directly under the site
   Header and wants ordinary padding, while as a standalone hero it wants the
   full drop. */
const ContactSection = ({ topSpace = { base: 24, md: "22vh" } }) => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".contact-rise", {
        opacity: 0,
        y: 34,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <Box
      ref={sectionRef}
      bg="var(--page-bg)"
      position="relative"
      zIndex={40}
      px={{ base: 6, md: "56px" }}
      pt={topSpace}
      pb={{ base: 20, md: 28 }}
    >
      <Box maxW="1500px" mx="auto">
        <Text
          className="contact-rise"
          fontFamily={SERIF}
          fontWeight="400"
          fontSize={{ base: "62px", md: "clamp(78px, 9vw, 150px)" }}
          lineHeight="0.88"
          letterSpacing="-.02em"
          color="var(--page-fg)"
        >
          work with us
        </Text>

        <Flex
          className="contact-rise"
          /* tighter than the Impact masthead's equivalent gap on purpose:
             this section now closes the page above the footer, and the extra
             air left it looking squeezed rather than open */
          mt={{ base: 10, md: 16 }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 10, md: 16 }}
          align={{ md: "flex-start" }}
        >
          <Text
            fontFamily={SANS}
            fontSize={{ base: "15px", md: "17px" }}
            lineHeight="1.6"
            color="var(--page-fg)"
            opacity={0.72}
            maxW={{ md: "30rem" }}
          >
            We are a small New York-based team working with underserved rural
communities on access to education and healthcare. If you want to fund
a project, give your time, or ask what we're working on next, we read
everything.
          </Text>

          <Box ml={{ md: "auto" }}>
            <Text
              fontFamily={SANS}
              fontWeight="500"
              fontSize={{ base: "13px", md: "14px" }}
              letterSpacing="2px"
              textTransform="uppercase"
              color="var(--page-fg)"
              opacity={0.5}
              mb={3}
            >
              Email
            </Text>
            <Link
              href={`mailto:${EMAIL}`}
              fontFamily={SERIF}
              fontSize={{ base: "22px", md: "30px" }}
              letterSpacing="-.01em"
              color="var(--page-fg)"
              borderBottom="1px solid"
              borderColor="var(--page-fg)"
              opacity={0.75}
              pb="4px"
              _hover={{ textDecoration: "none", opacity: 1 }}
              transition="opacity .25s ease"
            >
              {EMAIL}
            </Link>
          </Box>
        </Flex>

        {/* the three ways in, on one rule-free row — same borderless index
            treatment the Impact stats use */}
        <Flex
          className="contact-rise"
          mt={{ base: 14, md: 24 }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 20 }}
        >
          {WAYS.map((w) => (
            <Box key={w.label}>
              <Link
                href={w.href}
                fontFamily={SANS}
                fontWeight="800"
                fontSize={{ base: "26px", md: "clamp(28px, 2.6vw, 40px)" }}
                letterSpacing="-.02em"
                color="var(--page-fg)"
                _hover={{ textDecoration: "none", opacity: 0.6 }}
                transition="opacity .25s ease"
              >
                {w.label} →
              </Link>
      
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default ContactSection;
