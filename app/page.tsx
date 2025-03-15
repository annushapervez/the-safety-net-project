"use client"; // top of the file
import React from 'react';
import { ChakraProvider} from "@chakra-ui/react";
import Head from 'next/head';
import Header from './components/Header';
import ImageCarousel from './components/Carousel';
import MainContent from './components/main';
import Footer from './components/Footer';


export default function Home() {
  return (
    <ChakraProvider>
      <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"  />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
        <ImageCarousel />
        <MainContent />
        <Footer />
      </>
    </ChakraProvider>
  );
};
