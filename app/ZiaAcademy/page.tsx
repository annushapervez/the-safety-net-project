"use client";
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  VStack,
  Stack,
  ChakraProvider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const SECTIONS = ["origin", "funds", "update", "gallery", "donate"];

const ZiaAcademyPage = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Detect when 50% of a section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ChakraProvider>
      <>
        <Header />

        <Flex p={8}  direction={{ base: "column", lg: "row" }}>
          {/* Content Section */}
          <Box flex="1" pl={{ base: 0, lg: 8 }} mb={{ base: 8, lg: 0 }}>
          <Heading
                  as="h2"
                  size="2xl"
                  fontWeight="400"
                  letterSpacing="-2px"
                  lineHeight="1.2"
                  color="#2c3d90"
                  textAlign={"center"}
                  fontFamily="Open Sauce One, sans-serif"
                  mb={4}
                >         The Zia Academy
                </Heading>
            {SECTIONS.map((section) => (
              <Box key={section} id={section} mb={12} py={12}>
        <Heading as="h2" size="xl" fontWeight="500" color="#2c3d90" letterSpacing="-1.2px">

                  {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
                </Heading>
                <Text fontSize="xl" fontWeight="400" color="#5F5D5D">
                  Content about {section}.
                </Text>
              </Box>
            ))}
          </Box>

          {/* Right-Side Navigation */}
          <Stack
            position="sticky" // Change position to fixed
            top="250px" // Keeps the nav fixed at the top 100px from the top
            right="20px"
            w="250px"
            p={4}
            bg="white"
            boxShadow="md"
            borderRadius="md"
            maxH="40vh" // Limit the height of the navigation box
         >
            <VStack align="start" spacing={4}>
              {SECTIONS.map((section) => (
                <Button
                  key={section}
                  as="a"
                  href={`#${section}`}
                  fontSize="lg"
                  fontWeight="bold"
                  color={activeSection === section ? "white" : "#2c3d90"}
                  bg={activeSection === section ? "#2c3d90" : "transparent"}
                  border="2px solid #2c3d90"
                  borderRadius="0"
                  width="100%"
                  _hover={{ bg: "#2c3d90", color: "white" }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
                </Button>
              ))}
            </VStack>
          </Stack>

        </Flex>

        <Footer />
      </>
    </ChakraProvider>
  );
};

export default ZiaAcademyPage;
