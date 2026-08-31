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
import TEAM from './teamData';
import React, { useState, useEffect } from 'react';

type Person = {
  slug: string;
  name: string;
  title: string;
  image: string;
  imageScale?: number;
  bio: string[];
};

const TeamCard = ({ person }: { person: Person }) => {
  const scale = person.imageScale || 1;
  return (
    <Link
      as={NextLink}
      href={`/our-team/${person.slug}`}
      _hover={{ textDecoration: 'none' }}
      role="group"
    >
      <Box textAlign="center">
        <Box overflow="hidden" borderRadius="12px" mb={4} w="220px" mx="auto">
          <Image
            src={person.image}
            alt={person.name}
            w="100%"
            h="280px"
            objectFit="cover"
            transform={`scale(${scale})`}
            transition="transform 0.35s ease"
            _groupHover={{ transform: `scale(${scale * 1.04})` }}
          />
        </Box>
        <Text
          fontSize="xl"
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
      </Box>
    </Link>
  );
};

const OurTeam = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <ChakraProvider>
      <Footer>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {isMobile ? <HamburgerMenu /> : <Header />}

          <Box flex="1" px={{ base: 6, md: 16 }} py={{ base: 12, md: 20 }} bg="#F1F6FB">
            <Heading
              as="h1"
              size="2xl"
              fontWeight="400"
              letterSpacing="-2px"
              lineHeight="1.2"
              color="#2c3d90"
              textAlign="center"
              mb={{ base: 10, md: 16 }}
            >
              Our Team
            </Heading>

            <Heading
              as="h2"
              size="xl"
              fontWeight="400"
              letterSpacing="-2px"
              lineHeight="1.2"
              color="#2c3d90"
              textAlign="center"
              mb={{ base: 8, md: 12 }}
            >
              Co-Founders
            </Heading>

            <SimpleGrid
              columns={{ base: 1, sm: 2 }}
              spacing={{ base: 10, md: 14 }}
              justifyItems="center"
              maxW="600px"
              mx="auto"
            >
              {TEAM.map((person) => (
                <SlideUpWhenVisible key={person.slug} threshold={0.35}>
                  <TeamCard person={person} />
                </SlideUpWhenVisible>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Footer>
    </ChakraProvider>
  );
};

export default OurTeam;
