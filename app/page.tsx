"use client";
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box } from "@chakra-ui/react";
import Head from 'next/head';
import Header from './components/Header';
import ImageCarousel from './components/Carousel';
import MainContent from './components/main';
import Footer from './components/Footer';
import HamburgerMenu from './components/HamburgerMenu';
import { useMediaQuery } from '@chakra-ui/react';

export default function Home() {
  // State to track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Media query to detect mobile devices
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Set hasMounted to true after the component mounts
    setHasMounted(true);
  }, []);

  // If the component hasn't mounted, render nothing to prevent flicker
  if (!hasMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <Footer>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Conditionally render navigation based on isMobile */}
        {isMobile ? <HamburgerMenu /> : <Header />}
        
        <Box mb={isMobile ? 40 : 0}>
          <ImageCarousel />
        </Box>

        <MainContent />
      </Footer>
    </ChakraProvider>
  );
}
