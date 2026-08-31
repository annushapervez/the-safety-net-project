"use client";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Link,
  useMediaQuery,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HamburgerMenu from '../../components/HamburgerMenu';
import TEAM from '../teamData';
import React, { useState, useEffect } from 'react';

const TeamMemberPage = ({ params }: { params: { slug: string } }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const person = TEAM.find((p) => p.slug === params.slug);

  return (
    <ChakraProvider>
      <Footer>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {isMobile ? <HamburgerMenu /> : <Header />}

          <Box flex="1" px={{ base: 6, md: 16 }} py={{ base: 12, md: 20 }} bg="#F1F6FB">
            <Link
              as={NextLink}
              href="/our-team"
              color="#2c3d90"
              fontFamily="Open Sauce One, sans-serif"
              fontWeight="500"
              display="inline-block"
              mb={{ base: 8, md: 12 }}
            >
              ← Back to Our Team
            </Link>

            {person ? (
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: 8, md: 12 }}
                maxW="900px"
                mx="auto"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  w={{ base: "100%", md: "300px" }}
                  h={{ base: "300px", md: "360px" }}
                  objectFit="cover"
                  borderRadius="12px"
                  flexShrink={0}
                />
                <Box>
                  <Heading
                    as="h1"
                    fontFamily="Open Sauce One, sans-serif"
                    fontWeight="500"
                    fontSize="2xl"
                    color="#2c3d90"
                    letterSpacing="-1px"
                  >
                    {person.name}
                  </Heading>
                  <Text
                    fontFamily="Open Sauce One, sans-serif"
                    fontWeight="400"
                    fontSize="sm"
                    letterSpacing="1px"
                    textTransform="uppercase"
                    color="#5F5D5D"
                    mb={6}
                  >
                    {person.title}
                  </Text>
                  {person.bio.map((paragraph, i) => (
                    <Text
                      key={i}
                      fontFamily="Open Sauce One, sans-serif"
                      color="#5F5D5D"
                      lineHeight="1.7"
                      mb={4}
                    >
                      {paragraph}
                    </Text>
                  ))}
                </Box>
              </Flex>
            ) : (
              <Text textAlign="center" fontFamily="Open Sauce One, sans-serif" color="#5F5D5D">
                We couldn&apos;t find that team member.
              </Text>
            )}
          </Box>
        </Box>
      </Footer>
    </ChakraProvider>
  );
};

export default TeamMemberPage;
