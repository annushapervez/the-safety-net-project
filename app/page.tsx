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
  const [hasMounted, setHasMounted] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

        {isMobile ? <HamburgerMenu /> : <Header />}
        
        <Box mb={{base:40, md:0}}>
          <ImageCarousel />
        </Box>

        <MainContent />
      </Footer>
    </ChakraProvider>
  );
}
