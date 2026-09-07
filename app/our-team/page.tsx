"use client";
import {
  ChakraProvider,
  Box,
  Text,
  Image,
  SimpleGrid,
  Heading,
  Link,
  useMediaQuery,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import HamburgerMenu from '../components/HamburgerMenu';
import TEAM, { GROUP_ORDER, GROUP_ACCENT } from './teamData';
import React, { useState, useEffect } from 'react';

type Person = {
  slug: string;
  name: string;
  title: string;
  group: string;
  image: string;
  imageScale?: number;
  imagePosition?: string;
  bio: string[];
};

const AVATAR_SIZE = { base: "220px", md: "270px" };

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const TeamCard = ({ person }: { person: Person }) => {
  const scale = person.imageScale || 1;
  const hasBio = person.bio.length > 0;
  const accent = GROUP_ACCENT[person.group] || "#2c3d90";

  const card = (
    <Box
      textAlign="center"
      transition="transform 0.35s ease"
      _groupHover={{ transform: "translateY(-3px)" }}
    >
      <Box
        overflow="hidden"
        borderRadius="full"
        mb={5}
        w={AVATAR_SIZE}
        h={AVATAR_SIZE}
        mx="auto"
        bgGradient={`linear(to-br, ${accent}22, ${accent}55)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="5px solid white"
        boxShadow={`0 0 0 2px ${accent}55, 0 12px 28px rgba(44, 61, 144, 0.13)`}
        transition="box-shadow 0.35s ease"
        _groupHover={{
          boxShadow: `0 0 0 2px ${accent}AA, 0 14px 30px rgba(44, 61, 144, 0.16)`,
        }}
      >
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition={person.imagePosition || "center"}
            transform={`scale(${scale})`}
            transition="transform 0.35s ease"
            _groupHover={{ transform: `scale(${scale * 1.03})` }}
          />
        ) : (
          <Text
            fontSize="4xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="500"
            color={accent}
            letterSpacing="2px"
          >
            {initialsOf(person.name)}
          </Text>
        )}
      </Box>

      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontFamily="Open Sauce One, sans-serif"
        fontWeight="500"
        color="#2c3d90"
        letterSpacing="-0.8px"
      >
        {person.name}
      </Text>

      <Text
        fontSize="sm"
        fontFamily="Open Sauce One, sans-serif"
        fontWeight="400"
        color="#5F5D5D"
        letterSpacing="1px"
        textTransform="uppercase"
        mt={1}
      >
        {person.title}
      </Text>

      <Text
        h="20px"
        mt={2}
        fontSize="sm"
        fontFamily="Open Sauce One, sans-serif"
        color={accent}
        opacity={0}
        transition="opacity 0.3s ease"
        _groupHover={{ opacity: hasBio ? 1 : 0 }}
      >
        {hasBio ? "Read bio →" : ""}
      </Text>
    </Box>
  );

  if (!hasBio) return card;

  return (
    <Link
      as={NextLink}
      href={`/our-team/${person.slug}`}
      _hover={{ textDecoration: 'none' }}
      role="group"
    >
      {card}
    </Link>
  );
};

const OurTeam = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const groups = GROUP_ORDER
    .map((group) => ({ group, people: TEAM.filter((p: Person) => p.group === group) }))
    .filter(({ people }) => people.length > 0);

  return (
    <ChakraProvider>
      <Footer>
        <Box display="flex" flexDirection="column">
          {hasMounted && isMobile ? <HamburgerMenu /> : <Header />}

          <Box flex="1" px={{ base: 6, md: 16 }} py={{ base: 12, md: 20 }} bg="#F1F6FB">
            <Heading
              as="h1"
              size="2xl"
              fontWeight="400"
              letterSpacing="-2px"
              lineHeight="1.2"
              color="#2c3d90"
              textAlign="center"
              mb={3}
            >
              Our Team
            </Heading>
            <Text
              fontFamily="Open Sauce One, sans-serif"
              color="#5F5D5D"
              textAlign="center"
              maxW="520px"
              mx="auto"
              mb={{ base: 8, md: 10 }}
            >
              The people building The Safety Net Project.
            </Text>

            {groups.map(({ group, people }) => (
              <Box key={group} mb={{ base: 14, md: 20 }} _last={{ mb: 0 }}>
                <Box textAlign="center" mb={{ base: 8, md: 12 }}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontFamily="Open Sauce One, sans-serif"
                    fontWeight="500"
                    letterSpacing="2px"
                    textTransform="uppercase"
                    color="#2c3d90"
                  >
                    {group}
                  </Heading>
                  <Box
                    w="44px"
                    h="3px"
                    borderRadius="full"
                    bg={GROUP_ACCENT[group] || "#2c3d90"}
                    mx="auto"
                    mt={3}
                  />
                </Box>

                <SimpleGrid
                  columns={{ base: 1, sm: people.length > 1 ? 2 : 1 }}
                  spacing={{ base: 12, md: 16 }}
                  justifyItems="center"
                  maxW="760px"
                  mx="auto"
                >
                  {people.map((person: Person) => (
                    <SlideUpWhenVisible key={person.slug} threshold={0.35}>
                      <TeamCard person={person} />
                    </SlideUpWhenVisible>
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </Box>
        </Box>
      </Footer>
    </ChakraProvider>
  );
};

export default OurTeam;
