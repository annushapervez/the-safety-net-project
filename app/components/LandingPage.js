"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Image,
  Link,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import HamburgerMenu from "./HamburgerMenu";

const AnimatedStatNumber = motion(Text);

const SECTION_PX = { base: 6, md: 14 };

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const MAROON = "#8a2327";
const MAROON_DARK = "#6e1b1e";
const BLUE = "#1e56a8";
const NAVY = "#1b2a5b";
const CREAM = "#fbf7ee";
const GRAY = "#5F5D5D";
const HAIRLINE = "#e4d9c3";

const TapedPhoto = ({ src, alt, rotate, tapeRotate, height }) => (
  <Box position="relative" py={5}>
    <Box
      position="absolute"
      top="6px"
      left="50%"
      transform={`translateX(-50%) rotate(${tapeRotate}deg)`}
      w="120px"
      h="26px"
      bg="rgba(220,196,150,.6)"
      zIndex={2}
    />
    <Box
      bg="#fff"
      p="14px"
      pb="42px"
      boxShadow="0 16px 44px rgba(20,25,50,.22)"
      transform={`rotate(${rotate}deg)`}
    >
      <Image
        src={src}
        alt={alt}
        w="100%"
        h={height}
        objectFit="cover"
        display="block"
      />
    </Box>
  </Box>
);

const DesktopHeader = () => (
  <Flex
    as="header"
    align="center"
    gap={4}
    px={SECTION_PX}
    py="18px"
    bg="#fff"
    borderBottom={`1px solid ${HAIRLINE}`}
  >
    <Link href="/" display="flex" alignItems="center" gap={4} _hover={{ textDecoration: "none" }}>
      <Image
        src="/logo.jpg"
        alt="The Safety Net Project"
        w="50px"
        h="50px"
        objectFit="contain"
        style={{ mixBlendMode: "multiply" }}
      />
      <Text
        as="span"
        fontFamily={SERIF}
        fontWeight="600"
        fontSize="24px"
        lineHeight="1"
        color={NAVY}
        letterSpacing="-.4px"
      >
        The Safety Net Project
      </Text>
    </Link>

    <Flex
      as="nav"
      ml="auto"
      align="center"
      gap="26px"
      fontFamily={SANS}
      fontWeight="500"
      fontSize="15px"
      color={NAVY}
    >
      <Link href="/volunteer" _hover={{ color: MAROON }}>
        Get Involved
      </Link>
      <Link href="/ZiaAcademy" _hover={{ color: MAROON }}>
        Projects
      </Link>
      <Link href="/our-team" _hover={{ color: MAROON }}>
        About
      </Link>
      <Link href="/Explore" _hover={{ color: MAROON }}>
        Explore
      </Link>
      <Link
        href="/contact-us"
        px="20px"
        py="9px"
        bg={MAROON}
        color="#fff"
        fontWeight="700"
        borderRadius="2px"
        _hover={{ bg: MAROON_DARK, textDecoration: "none" }}
      >
        Donate
      </Link>
    </Flex>
  </Flex>
);

const StatCard = ({ number, numberColor, label, text, bordered }) => (
  <Box
    textAlign="center"
    borderLeft={bordered ? { md: `1px solid ${HAIRLINE}` } : undefined}
    borderRight={bordered ? { md: `1px solid ${HAIRLINE}` } : undefined}
    px={bordered ? { md: 5 } : 0}
  >
    <AnimatedStatNumber fontFamily={SERIF} fontWeight="600" fontSize="50px" lineHeight="1" color={numberColor}>
      {number}
    </AnimatedStatNumber>
    <Text fontFamily={SANS} fontWeight="700" fontSize="15px" color={NAVY} mt="12px" mb="8px">
      {label}
    </Text>
    <Text fontFamily={SANS} fontWeight="400" fontSize="14.5px" lineHeight="1.5" color={GRAY}>
      {text}
    </Text>
  </Box>
);

const PurposeItem = ({ num, title, text }) => (
  <Box borderTop={`2px solid ${NAVY}`} pt="18px">
    <Text fontFamily={SANS} fontWeight="600" fontSize="15px" letterSpacing="2px" color={MAROON} mb="10px">
      {num}
    </Text>
    <Heading as="h3" fontFamily={SERIF} fontWeight="600" fontSize="24px" color={BLUE} mb="10px">
      {title}
    </Heading>
    <Text fontFamily={SANS} fontWeight="400" fontSize="16px" lineHeight="1.6" color={GRAY}>
      {text}
    </Text>
  </Box>
);

const LandingPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const [moneyCount, setMoneyCount] = useState(0);
  const [percentCount, setPercentCount] = useState(0);
  const [girlCount, setGirlCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const sectionPx = SECTION_PX;

  const countUp = (target, setter) => {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
      } else {
        current += increment;
        setter(Math.min(current, target));
      }
    }, 30);
  };

  useEffect(() => {
    if (isInView) {
      countUp(8000, setMoneyCount);
      countUp(100, setPercentCount);
      countUp(70, setGirlCount);
    }
  }, [isInView]);

  useEffect(() => {
    const sectionElement = document.getElementById("count-section");
    if (!sectionElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(sectionElement);
    return () => observer.disconnect();
  }, []);

  return (
    <Box bg={MAROON} p={{ base: 2, md: 4 }}>
      <Box bg="#0c355e" p={{ base: "3px", md: "6px" }}>
        <Box bg={CREAM} color={NAVY} overflow="hidden">
          {/* Header */}
          {isMobile ? <HamburgerMenu /> : <DesktopHeader />}

          {/* Hero */}
          <Grid
            templateColumns={{ base: "1fr", lg: "1.02fr .98fr" }}
            gap={{ base: 8, lg: 12 }}
            alignItems="center"
            px={sectionPx}
            pt={{ base: 12, md: 20 }}
            pb={{ base: 10, md: 16 }}
          >
            <Box textAlign={{ base: "center", lg: "left" }}>
              <Heading
                as="h1"
                fontFamily={SERIF}
                fontWeight="600"
                fontSize={{ base: "38px", md: "48px", xl: "56px" }}
                lineHeight="1.06"
                letterSpacing="-1px"
                color={NAVY}
                mb="26px"
              >
                We are not what we know, but what we are willing to learn.

                
              </Heading>
              <Text
                fontFamily={SANS}
                fontWeight="400"
                fontSize="18px"
                lineHeight="1.65"
                color={GRAY}
                mb="34px"
                maxW="470px"
                mx={{ base: "auto", lg: 0 }}
              >
                The Safety Net Project provides support, safety, and education for children and
                women in marginalized communities around the world.
              </Text>
              <Flex gap="14px" justify={{ base: "center", lg: "flex-start" }} align="center" wrap="wrap">
                <Link
                  href="/contact-us"
                  px="34px"
                  py="15px"
                  bg={MAROON}
                  color="#fff"
                  fontFamily={SANS}
                  fontWeight="700"
                  fontSize="16px"
                  borderRadius="2px"
                  _hover={{ bg: MAROON_DARK, textDecoration: "none" }}
                >
                  Donate now
                </Link>
                <Link
                  href="/Explore"
                  color={BLUE}
                  fontFamily={SANS}
                  fontWeight="700"
                  fontSize="16px"
                  _hover={{ color: MAROON_DARK }}
                >
                  Explore →
                </Link>
              </Flex>
            </Box>

            <TapedPhoto
              src="/mission.jpg"
              alt="Girls reading at the academy"
              rotate={-1.5}
              tapeRotate={-3}
              height={{ base: "280px", md: "360px" }}
            />
          </Grid>

          {/* How You're Helping */}
          <Box id="count-section" px={sectionPx} pt={{ base: 8, md: 16 }} pb={10}>
            <Box border={`2px solid ${MAROON}`} bg="#fff" px={{ base: 6, md: 20 }} py={{ base: 10, md: 20 }}>
              <Heading
                as="h2"
                fontFamily={SERIF}
                fontWeight="600"
                fontSize={{ base: "30px", md: "38px" }}
                letterSpacing="-.6px"
                color={NAVY}
                textAlign="center"
                mb="12px"
              >
                How You&apos;re Helping
              </Heading>
              <Text
                fontFamily={SANS}
                fontWeight="400"
                fontSize="17px"
                lineHeight="1.5"
                color={GRAY}
                textAlign="center"
                maxW="620px"
                mx="auto"
                mb="48px"
              >
                Your generosity builds confidence, resilience, and belonging — impacting lives
                beyond the numbers.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={9}>
                <StatCard
                  number={`$${moneyCount.toLocaleString()}+`}
                  numberColor={MAROON}
                  label="Funds Distributed"
                  text="Distributed to support the education and care of girls, creating lasting change."
                />
                <StatCard
                  number={`${percentCount}%`}
                  numberColor={BLUE}
                  label="Underrepresented"
                  text="All the girls we serve come from historically underrepresented groups."
                  bordered
                />
                <StatCard
                  number={`${girlCount}+`}
                  numberColor={MAROON}
                  label="Girls Served"
                  text="Empowered with education, safety, and the tools to transform their lives."
                />
              </SimpleGrid>
            </Box>
          </Box>

          {/* Purpose */}
          <Box px={sectionPx} pt={{ base: 16, md: 28 }} pb={{ base: 16, md: 32 }}>
            <Heading
              as="h2"
              fontFamily={SERIF}
              fontWeight="600"
              fontSize={{ base: "32px", md: "40px" }}
              letterSpacing="-.6px"
              color={NAVY}
              mb="8px"
              textAlign={{ base: "center", lg: "left" }}
            >
              Purpose
            </Heading>
            <Box w="60px" h="3px" bg={MAROON} mb="28px" mx={{ base: "auto", lg: 0 }} />
            <Text
              fontFamily={SERIF}
              fontWeight="500"
              fontSize={{ base: "20px", md: "24px" }}
              lineHeight="1.4"
              color={NAVY}
              mb="40px"
              maxW="780px"
              textAlign={{ base: "center", lg: "left" }}
              mx={{ base: "auto", lg: 0 }}
            >
              The Safety Net Project was formed with the intention of bridging the gap between
              marginalized communities.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
              <PurposeItem
                num="01"
                title="A Strong Foundation"
                text="Our first priority is to assure appropriate living accommodations and food services are readily accessible to those who need them."
              />
              <PurposeItem
                num="02"
                title="Empowerment"
                text="The next goal is to provide educational resources to help them build towards a stable and successful future for themselves."
              />
            </SimpleGrid>
          </Box>

          {/* Zia Academy */}
          <Grid
            templateColumns={{ base: "1fr", lg: ".92fr 1.08fr" }}
            gap={{ base: 12, lg: 24 }}
            alignItems="center"
            px={sectionPx}
            pt={3}
            pb={{ base: 16, md: 28 }}
          >
            <TapedPhoto
              src="/zia.jpg"
              alt="A girl reading at the Zia Academy"
              rotate={1.5}
              tapeRotate={2}
              height={{ base: "320px", md: "440px" }}
            />
            <Box textAlign={{ base: "center", lg: "left" }}>
              <Heading
                as="h2"
                fontFamily={SERIF}
                fontWeight="600"
                fontSize={{ base: "32px", md: "40px" }}
                lineHeight="1.08"
                letterSpacing="-.6px"
                color={NAVY}
                mb="22px"
              >
                Our First Project:{" "}
                <Text as="span" color={MAROON}>
                  The Zia Academy
                </Text>
              </Heading>
              <Text
                fontFamily={SANS}
                fontWeight="400"
                fontSize="17px"
                lineHeight="1.65"
                color={GRAY}
                mb="30px"
              >
                The Zia Academy provides a safe haven and education for 70 girls from remote areas
                of Pakistan and Afghanistan, offering them a chance to escape the hardships of their
                past. At the academy, they are given the protection, care, and opportunities they
                deserve to build brighter futures.
              </Text>
              <Link
                href="/ZiaAcademy"
                color={BLUE}
                fontFamily={SANS}
                fontWeight="700"
                fontSize="16px"
                _hover={{ color: MAROON_DARK }}
              >
                Learn more →
              </Link>
            </Box>
          </Grid>

          {/* Footer */}
          <Box
            as="footer"
            bg="#0c355e"
            color={CREAM}
            textAlign="center"
            px={{ base: 6, md: 10 }}
            py="38px"
          >
            <Text fontFamily={SANS} fontWeight="400" fontSize="14px" mb="8px">
              © 2026 501(c)(3) The Safety Net Project. All rights reserved.
            </Text>
            <Text fontFamily={SANS} fontWeight="400" fontSize="14px" opacity={0.85} mb="16px">
              Contact us: safetynetprojects@gmail.com
            </Text>
            <Link href="https://instagram.com/thesafetynetproject" isExternal display="inline-block">
              <Image
                src="/instagram.png"
                alt="Instagram"
                w="26px"
                h="26px"
                opacity={0.9}
                filter="brightness(0) invert(1)"
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
