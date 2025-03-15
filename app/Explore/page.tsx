"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import dynamic from "next/dynamic";

// Dynamically import the Map component with SSR disabled
const PakistanMap = dynamic(() => import("../components/map"), {
  ssr: false, // Disable SSR for the Map component
});

const Explore = () => {
    return (
        <ChakraProvider>
        <>
          <Header />
        <PakistanMap />  
        <Footer />

</>
</ChakraProvider>
    );
};

export default Explore;
