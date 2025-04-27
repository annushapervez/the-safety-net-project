"use client";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Image,
  VStack,
  Heading,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import HamburgerMenu from '../components/HamburgerMenu';
import React, { useState, useEffect } from 'react';

const OurTeam = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <ChakraProvider>
              <Footer >
      <Box minHeight="100vh" display="flex" flexDirection="column">
        {isMobile ? <HamburgerMenu /> : <Header />}

        <Box flex="1" p={{ base: 0, md: 8 }} bg="#F1F6FB">
          <Heading
            as="h2"
            size="2xl"
            fontWeight="400"
            letterSpacing="-2px"
            lineHeight="1.2"
            color="#2c3d90"
            textAlign="center"
            mt={{ base: 4, md: 0 }}
            mb={{ base: 2, md: 4 }}
          >
            Our Team
          </Heading>

          <Flex
            justify="center"
            align="center"
            direction={{ base: "column", md: "row" }}
            gap={{ base: 0, md: 4}}
            wrap="wrap"
          >
            <SlideUpWhenVisible threshold={0.35}>
              <VStack spacing={4} m={4} align="center">
                <Box
                  textAlign={{ base: "center", md: "left" }}
                  p={4}
                  border="2px solid pink"
                  borderRadius="16px"
                  boxShadow="lg"
                  width={{ base: "100%", md: "550px" }}
                  bg="white"
                >
                  <HStack align="start" spacing={4}>
                    <Image
                      boxSize={{ base: "120px", md: "150px" }}
                      src="/fae.png"
                      alt="Faeyah Muhammad"
                      borderRadius="16px"
                      flexShrink={0}
                      mb={{ base: 2, md: 0 }}

                    />
                    <VStack align={{ md: "start" }} spacing={1} flex="1" mt={{ base: 5, md: 0 }}>
                    <Text
                            fontSize="xl" 
                            fontFamily="Open Sauce One, sans-serif"
                            fontWeight="500"
                            color="#2c3d90"
                            letterSpacing="-1.2px"
                          
                          >                        Faeyah Muhammad
                      </Text>
                      <Text
                            fontSize="md"
                            fontFamily="Open Sauce One, sans-serif"
                            fontWeight="400"
                            color="#5F5D5D"
                            letterSpacing="-1.2px"
                            mb={4}
                          >
                          CO-FOUNDER
                      </Text>
                    </VStack>
                  </HStack>
                  <Text
                  fontSize={{ base: "md", md: "sm", xl: "md" }}
                        fontFamily="Open Sauce One, sans-serif"
                        fontWeight="400"
                        color="#5F5D5D"
                        letterSpacing="-1px"
                        mt={2}
                      >
                    Driven by a commitment to encouraging long lasting change, I am dedicated to ensure The Safety Net Project serves as a bridge to opportunity for anyone seeking it. Combining my background in finance and law, I work toward creating sustainable solutions for underserved communities. My experience at various nonprofits have helped me curate our initiative to address gaps that normally go unaccounted for.
                    <br /><br />
                    A critical aspect of my work is overseeing strategic planning, communication, and financial management to ensure we operate efficiently and effectively. I work on implementing comprehensive budgeting frameworks that optimize resource allocation such that, after addressing short-term aid, every contribution is directed toward sustainable, and high-impact initiatives.
                    <br /><br />
                    I believe that talent, skill, and hard work exist everywhere- opportunity doesn’t. We are passionate about creating pathways that change this so that those with the drive to succeed have the means to do so as well.
                  </Text>
                </Box>
              </VStack>
            </SlideUpWhenVisible>

            <SlideUpWhenVisible threshold={0.35}>
              <VStack spacing={4} m={4} align="center">
                <Box
                  textAlign={{ base: "center", md: "left" }}
                  mb={{ base: 4, md: 0 }}
                  p={4}
                  border="2px solid pink"
                  borderRadius="16px"
                  boxShadow="lg"
                  width={{ base: "100%", md: "550px" }}
                  bg="white"
                >
                  <HStack align="start" spacing={4}>
                    <Image
                      boxSize={{ base: "120px", md: "150px" }}
                      src="/annu.jpg"
                      alt="Annusha Pervez"
                      borderRadius="16px"
                      flexShrink={0}
                      mb={{ base: 2, md: 0 }}

                    />
                    <VStack align={{ md: "start" }} spacing={1} flex="1" mt={{ base: 5, md: 0 }}>
                    <Text
                            fontSize="xl" 
                            fontFamily="Open Sauce One, sans-serif"
                            fontWeight="500"
                            color="#2c3d90"
                            letterSpacing="-1.2px"
                          
                          >   
                        Annusha Pervez
                        </Text>
                      <Text
                            fontSize="md"
                            fontFamily="Open Sauce One, sans-serif"
                            fontWeight="400"
                            color="#5F5D5D"
                            letterSpacing="-1.2px"
                            mb={4}
                          >
                          CO-FOUNDER
                      </Text>
                    </VStack>
                  </HStack>
                  <Text
                    fontSize={{ base: "lg", md: "md", xl: "md" }}                     fontFamily="Open Sauce One, sans-serif"
                    fontWeight="400"
                    color="#5F5D5D"
                    letterSpacing="-1px"
                    mt={2}
                  >
                    With a strong passion for technology and social impact, I’m dedicated to developing solutions that empower communities and create meaningful change. My background in technology, design, and user experience gives me a unique perspective on how innovation can be leveraged to tackle pressing challenges and drive lasting impact.
                    <br /><br />
                    By developing our website, I created a platform that not only reflects our mission but also strengthens connections between our community, supporters, and partners. Beyond establishing a digital presence, I focus on continuously refining and scaling our technology to better serve those who rely on it. Ensuring accessibility, usability, and adaptability is at the core of my work, allowing us to create a user-friendly experience that amplifies our reach.
                    <br /><br />
                    Through The Safety Net Project, we’re building more than just a platform, we’re creating a sustainable, tech-driven initiative that fosters connection, transparency, and real impact for the communities we serve.
                  </Text>
                </Box>
              </VStack>
            </SlideUpWhenVisible>
          </Flex>
        </Box>

      </Box>
      </Footer >
    </ChakraProvider>
  );
};

export default OurTeam;
