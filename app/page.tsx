"use client";
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import Head from 'next/head';
import { SmoothScroll } from './components/SmoothScroll';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import PurposeSection  from './components/Purposesection';
import ImpactSection from './components/ImpactSection';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SmoothScroll>
        <Navbar />
        <LandingHero />
        <PurposeSection/>
        <ImpactSection />
      </SmoothScroll>
    </ChakraProvider>
  );
}