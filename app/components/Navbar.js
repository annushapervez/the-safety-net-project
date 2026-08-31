"use client";
import React, { useEffect, useRef } from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import gsap from "gsap";

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const MAROON = "#8a2327";
const NAVY = "#1b2a5b";

const SECTION_PX = { base: 6, md: 14 };

const NAV = [
  { label: "Get Involved", href: "/volunteer" },
  { label: "Projects", href: "/ZiaAcademy" },
  { label: "About", href: "/our-team" },
  { label: "Explore", href: "/Explore" },
  { label: "Contact", href: "/contact-us" },
];

// Rendered once at the page level (not inside LandingHero/PurposeSection) so
// it stays fixed on top of both pinned sections as the user scrolls, and
// never gets caught by their scroll-driven filters/transforms.
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    // 900px matches LandingHero's isMobile breakpoint. On mobile the intro
    // timeline doesn't run, so the "intro:reveal-nav" event never fires —
    // just show the nav immediately.
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) return;

    // start hidden, matching "The" / "project" initial state
    gsap.set(navRef.current, { opacity: 0, y: 10 });

    const reveal = () => {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("intro:reveal-nav", reveal);

    // safety net: if the event never fires for any reason (component
    // remounts after the intro already played, hot reload, etc.) reveal
    // after a timeout so the nav is never permanently hidden
    const fallback = setTimeout(reveal, 4000);

    return () => {
      window.removeEventListener("intro:reveal-nav", reveal);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Flex
      ref={navRef}
      as="header"
      px={SECTION_PX}
      py="18px"
      align="center"
      justify="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={30}
      bg="transparent"
    >
      <Link href="/" display="flex" alignItems="center" gap={3} _hover={{ textDecoration: "none" }}>
        <Box as="img" src="/logo.jpg" alt="The Safety Net Project" w="38px" h="38px" objectFit="contain" style={{ mixBlendMode: "multiply" }} />
        <Text fontFamily={SERIF} fontWeight="600" fontSize="19px" lineHeight="1" color={NAVY} letterSpacing="-.3px">
          The Safety Net Project
        </Text>
      </Link>

      <Flex align="center" gap={{ base: 5, md: 10 }} display={{ base: "none", lg: "flex" }} fontFamily={SANS} fontWeight="500" fontSize="15px" color={NAVY}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} _hover={{ opacity: 0.6 }} whiteSpace="nowrap">
            {item.label}
          </Link>
        ))}
        <Link href="/contact-us" ml={{ md: 4 }} px="12px" py="4px" bg={NAVY} color="#fff" fontWeight="700" borderRadius="2px" _hover={{ bg: NAVY, textDecoration: "none" }}>
          Donate
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;