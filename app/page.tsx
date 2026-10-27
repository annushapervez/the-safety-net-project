"use client";
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import Head from 'next/head';
import { SmoothScroll } from './components/SmoothScroll';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import PurposeSection  from './components/Purposesection';
import ImpactSection from './components/ImpactSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

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
        {/* Navbar is fixed, so it sits outside the Footer layout wrapper —
            that wrapper is a flex column and the nav isn't part of the flow. */}
        <Navbar awaitIntro />
        <Footer>
          <LandingHero />
          <PurposeSection/>
          <ImpactSection />
          <ProjectsSection />
          <ContactSection />
        </Footer>
      </SmoothScroll>
    </ChakraProvider>
  );
}