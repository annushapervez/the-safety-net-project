"use client";
import React from 'react';
import { ChakraProvider, useBreakpointValue } from "@chakra-ui/react";
import Head from 'next/head';
import Header from './components/Header';
import ImageCarousel from './components/Carousel';
import MainContent from './components/main';
import Footer from './components/Footer';
import HamburgerMenu from './components/HamburgerMenu';
import { useMediaQuery } from "@chakra-ui/react";


export default function Home() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isMobile ? <HamburgerMenu /> : <Header />}
      
      <ImageCarousel />
      <MainContent />
      <Footer />
    </ChakraProvider>
  );
}
