"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import dynamic from "next/dynamic";
import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from '../components/HamburgerMenu';



// Dynamically import the Map component with SSR disabled
const PakistanMap = dynamic(() => import("../components/map"), {
  ssr: false, // Disable SSR for the Map component
});

const Explore = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // ✅ Move inside the component

    return (
        <ChakraProvider>
        <>
        <Footer >

        {isMobile ? <HamburgerMenu /> : <Header />}
        <PakistanMap />  
        </Footer >

</>
</ChakraProvider>
    );
};

export default Explore;
