"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Text, HStack, Image } from '@chakra-ui/react';
import dynamic from "next/dynamic";
import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from '../components/HamburgerMenu';



const PakistanMap = dynamic(() => import("../components/map"), {
  ssr: false, 
});
const Explore = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <ChakraProvider>
            <Footer >

      <Box minH="100vh" display="flex" flexDirection="column" >

        {isMobile ? <HamburgerMenu /> : <Header />}
         {/* Our Impact Section */}
          <Box 
            mt={5}
            mb={5}
            textAlign="center"
            fontFamily="Open Sauce One, sans-serif"
            
          >
              <HStack  align="center"  justify="center"mb={3}
              >
                <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize={isMobile ? "45px" : "50px"} />
                <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
                  Our Impact
                </Heading>
              </HStack>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="#5F5D5D"
              maxW="800px"
              mx="auto"
              letterSpacing="-0.5px"
            >
              Explore the regions where we have made a difference. Each marker highlights a place connected to the girls we support, along with important facts about these areas.
              Our mission is to understand, uplift, and advocate for communities facing the greatest challenges.
            </Text>
          
          </Box>
          
        <Box flex="1" position="relative"  overflow="hidden" minH={{base: "90vh", lg: "100vh", xl:"80vh"}}>
          <PakistanMap />
        </Box>

      </Box>
      </Footer >

    </ChakraProvider>
  );
};

export default Explore;