"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import dynamic from "next/dynamic";
import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from '../components/HamburgerMenu';



// Dynamically import the Map component with SSR disabled
const PakistanMap = dynamic(() => import("../components/map"), {
  ssr: false, // Disable SSR for the Map component
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
        
        {/* Main content grows to fill remaining space */}
        <Box flex="1" position="relative"  overflow="hidden">
          <PakistanMap />
        </Box>

      </Box>
      </Footer >

    </ChakraProvider>
  );
};

export default Explore;