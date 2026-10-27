"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import gsap from "gsap";

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const MAROON = "#8a2327";
const NAVY = "#1b2a5b";
const CREAM = "#fbf7ee";

const SECTION_PX = { base: 6, md: 14 };

const NAV = [
  { label: "Get Involved", href: "/volunteer" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/our-team" },
  { label: "Explore", href: "/Explore" },
  { label: "Contact", href: "/contact-us" },
];

// Rendered once at the page level (not inside LandingHero/PurposeSection) so
// it stays fixed on top of both pinned sections as the user scrolls, and
// never gets caught by their scroll-driven filters/transforms.
/* `awaitIntro` is for the homepage only, where LandingHero plays a loading
   intro and fires "intro:reveal-nav" when the wordmark is ready. On every
   other page there is no intro and no event, so the nav must NOT start
   hidden — it would sit invisible until the 4s fallback fired. */
const Navbar = ({ awaitIntro = false }) => {
  const navRef = useRef(null);

  // The nav's type colour comes from --nav-fg, which defaults to --page-fg
  // (see globals.css) so it travels with the rest of the page as
  // ProjectsSection sweeps the palette to navy and back. Sections with their
  // own dark blocks override --nav-fg directly while one sits under the nav.
  //
  // "site:tone" is still needed for the logo mark: it's an image, not type,
  // so a colour variable can't reach it. It's inverted by a CSS filter
  // instead, which needs a plain light/dark signal rather than a colour.
  const [tone, setTone] = useState("light");

  useEffect(() => {
    const onTone = (e) => setTone(e.detail === "dark" ? "dark" : "light");
    window.addEventListener("site:tone", onTone);
    return () => window.removeEventListener("site:tone", onTone);
  }, []);

  const dark = tone === "dark";

  useEffect(() => {
    if (!navRef.current) return;

    // no hero on this page — nothing to wait for
    if (!awaitIntro) return;

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
  }, [awaitIntro]);

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
      /* Above every section, including ProjectsSection's z-40 wrapper and the
         full-viewport navy veil inside it — otherwise the veil would paint
         straight over the nav. */
      zIndex={60}
      bg="transparent"
    >
      <Link href="/" display="flex" alignItems="center" gap={3} _hover={{ textDecoration: "none" }}>
        {/* logo.PNG is a transparent PNG of the navy mark, so on a dark page
            it can simply be recoloured rather than hidden: brightness(0)
            flattens every opaque pixel to black and invert(1) takes it to
            white, while the transparency is left untouched. (The old
            logo.jpg couldn't do this — it was the same mark on an opaque
            white field, so any filter that lit the glyph lit the field with
            it, which is why the mark used to disappear on navy.) */}
        <Box
          as="img"
          src="/logo.PNG"
          alt="The Safety Net Project"
          w="38px"
          h="38px"
          objectFit="contain"
          filter={dark ? "brightness(0) invert(1)" : "none"}
          transition="filter .3s ease"
        />
        <Text fontFamily={SERIF} fontWeight="600" fontSize="19px" lineHeight="1" color="var(--nav-fg)" letterSpacing="-.3px" transition="color .3s ease">
          The Safety Net Project
        </Text>
      </Link>

      <Flex align="center" gap={{ base: 5, md: 10 }} display={{ base: "none", lg: "flex" }} fontFamily={SANS} fontWeight="500" fontSize="15px" color="var(--nav-fg)" transition="color .3s ease">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} _hover={{ opacity: 0.6 }} whiteSpace="nowrap">
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact-us"
          ml={{ md: 4 }}
          px="12px"
          py="4px"
          bg="var(--nav-fg)"
          color="var(--nav-bg)"
          transition="background-color .3s ease, color .3s ease"
          fontWeight="700"
          borderRadius="2px"
          _hover={{ textDecoration: "none", opacity: 0.85 }}
        >
          Donate
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;