"use client";
import React, { useState, useEffect } from "react";
import { Box, ChakraProvider, Flex, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { SmoothScroll } from "../components/SmoothScroll";
import Navbar from "../components/Navbar";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";

/* The masthead is not decoration — it's the runway the colour sweep needs.
   ProjectsSection turns --page-bg from cream to navy across the viewport
   directly above itself; on the homepage that space belonged to the Impact
   figures, and here it belongs to this. It therefore paints from the palette
   variables, exactly as those figures do, so the type flips to cream with
   the page instead of disappearing into it. */
const Masthead = () => (
  <Box
    bg="var(--page-bg)"
    px={{ base: 6, md: "56px" }}
    pt={{ base: "120px", md: "26vh" }}
    pb={{ base: 16, md: "20vh" }}
  >
    <Box maxW="1500px" mx="auto">
      <Text
        fontFamily={SANS}
        fontWeight="800"
        fontSize={{ base: "17px", md: "20px" }}
        letterSpacing="-.01em"
        color="var(--page-fg)"
        mb={1}
      >
        what we&apos;re building
      </Text>
      <Text
        fontFamily={SERIF}
        fontWeight="400"
        fontSize={{ base: "62px", md: "clamp(78px, 9vw, 150px)" }}
        lineHeight="0.88"
        letterSpacing="-.02em"
        color="var(--page-fg)"
      >
        our projects
      </Text>
      <Text
        mt={{ base: 8, md: 12 }}
        fontFamily={SANS}
        fontSize={{ base: "15px", md: "17px" }}
        lineHeight="1.6"
        color="var(--page-fg)"
        opacity={0.72}
        maxW={{ md: "34rem" }}
      >
        Two projects, both in rural Pakistan, both built around the same
        idea: that support has to reach people where they already are.
        Scroll on for the breakdown of each.
      </Text>
    </Box>
  </Box>
);

/* A closing block, and not only for tidiness: ProjectsSection's colour sweep
   runs its exit ramp over the scroll AFTER the pin releases, and needs real
   page beneath it to run against. With only the short Footer down there the
   ramp could never finish, leaving the palette stranded part-way to navy. */
const Closing = () => (
  <Box
    bg="var(--page-bg)"
    px={{ base: 6, md: "56px" }}
    pt={{ base: 20, md: "18vh" }}
    pb={{ base: 20, md: "16vh" }}
  >
    <Box maxW="1500px" mx="auto">
      <Text
        fontFamily={SERIF}
        fontWeight="400"
        fontSize={{ base: "40px", md: "clamp(44px, 4.6vw, 76px)" }}
        lineHeight="1"
        letterSpacing="-.02em"
        color="var(--page-fg)"
        maxW={{ md: "26rem" }}
      >
        Both are funded entirely by donations.
      </Text>

      <Flex
        mt={{ base: 10, md: 14 }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 16 }}
      >
        {[
          { label: "Zia Academy", href: "/ZiaAcademy" },
          { label: "Manwais Health Center", href: "/ManwaisHealthcareCenter" },
          { label: "Donate", href: "/contact-us" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            fontFamily={SANS}
            fontWeight="800"
            fontSize={{ base: "22px", md: "clamp(24px, 2.2vw, 34px)" }}
            letterSpacing="-.02em"
            color="var(--page-fg)"
            _hover={{ textDecoration: "none", opacity: 0.6 }}
            transition="opacity .25s ease"
          >
            {l.label} →
          </Link>
        ))}
      </Flex>
    </Box>
  </Box>
);

export default function ProjectsPage() {
  // matches the homepage: Chakra + Lenis want a client-side first paint
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SmoothScroll>
        {/* no awaitIntro: there's no hero intro on this page, so the nav
            shows immediately (see Navbar) */}
        <Navbar />
        <Footer>
          <Masthead />
          <ProjectsSection />
          <Closing />
        </Footer>
      </SmoothScroll>
    </ChakraProvider>
  );
}
