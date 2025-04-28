"use client";
import React, { useState } from 'react';
import { Box, Flex, Image, Link, Spacer, HStack, Button, Heading } from '@chakra-ui/react';

const Header = () => {
  const [isInvolvedOpen, setIsInvolvedOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <Box as="header" bg="white" px={10} py={6} boxShadow="md"  borderBottom="3px solid #2c3d90"         

    >
      <Flex alignItems="center">

      <Link href="/">
        <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize="85px" />
      </Link>

      <Link href="/" _hover={{ textDecoration: 'none' }} 
>

      <Heading
        as="h1"
        textAlign="center"
        mt={3}
        ml={3}
        fontSize="2.3rem"
        fontWeight="600" 
        color="#2c3d90" 
        letterSpacing="-2px" 
        lineHeight="1.2" 
        fontFamily="'Open Sauce One', sans-serif"

      >
        The Safety Net Project
      </Heading>
      </Link>

        <Spacer />

<HStack spacing={4} fontSize="lg" alignItems="center" position="relative" mt={4}>
  <Box
    as="button"
    onMouseEnter={() => setIsInvolvedOpen(true)} 
    onMouseLeave={() => setIsInvolvedOpen(false)} 
    color="#2c3d90"
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
    _hover={{ textDecoration: 'none' }}
    background="none" 
    position="relative" 
    whiteSpace="nowrap" 
  >
    Get Involved

    {isInvolvedOpen && (
      <Box
  position="absolute"
  top="100%" 
  left="0"
  bg="white" 
  color="#2c3d90"
  fontFamily="'Open Sauce One', sans-serif"
  fontWeight="400"
  p={2}
  borderRadius="md" 
  zIndex={1500} 

>
        <Link
          href="/volunteer"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none"
          _hover={{ textDecoration: 'none' }} 
          display="block"
          p={2}
          passHref
        >
          Volunteer
        </Link>
      </Box>
    )}
  </Box>

  <Box
    as="button"
    onMouseEnter={() => setIsAcademyOpen(true)} 
    onMouseLeave={() => setIsAcademyOpen(false)} 
    color="#2c3d90"
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
    _hover={{ textDecoration: 'none' }} 
    background="none" 
    position="relative"
    whiteSpace="nowrap" 
  >
    Projects
    {isAcademyOpen && (
      <Box
      position="absolute"
      top="100%" 
      left="0"
      bg="white" 
      color="#2c3d90"
      fontFamily="'Open Sauce One', sans-serif"
      fontWeight="400"
      p={2}
      borderRadius="md" 
      zIndex={1500} 
    
    >
        <Link
          href="/ZiaAcademy"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" 
          _hover={{ textDecoration: 'none' }} 
          display="block"
          p={2} 
        >
          Zia Academy
        </Link>
      </Box>
    )}
  </Box>

  <Box
    as="button"
    onMouseEnter={() => setIsAboutOpen(true)}  
    onMouseLeave={() => setIsAboutOpen(false)} 
    color="#2c3d90"
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
    _hover={{ textDecoration: 'none' }} 
    background="none"
    position="relative" 
    whiteSpace="nowrap" 
  >
    About

    {isAboutOpen && (
      <Box
      position="absolute"
      top="100%"
      left="0"
      bg="white"
      color="#2c3d90"
      fontFamily="'Open Sauce One', sans-serif"
      fontWeight="400"
      p={2}
      borderRadius="md" 
      zIndex={1500}
    
    >
        <Link
          href="/our-team"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" 
          _hover={{ textDecoration: 'none' }} 
          display="block"
          p={2} 
        >
          Our Team
        </Link>
        <Link
          href="/contact-us"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" 
          _hover={{ textDecoration: 'none' }} 
          display="block"
          p={2} 
        >
          Contact Us
        </Link>
      </Box>
    )}
  </Box>

  <Link
    href="/Explore"
    color="#2c3d90"
    _hover={{ textDecoration: 'none' }}
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
  >
    Explore
  </Link>

  <Link href="https://instagram.com/thesafetynetproject" isExternal>
    <Image src="/instagram.png" alt="Instagram" boxSize="30px" />
  </Link>
</HStack>
      </Flex>
    </Box>
  );
};

export default Header;