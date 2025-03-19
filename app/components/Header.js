"use client";
import React, { useState } from 'react';
import { Box, Flex, Image, Link, Spacer, HStack, Button, Heading } from '@chakra-ui/react';

const Header = () => {
  const [isInvolvedOpen, setIsInvolvedOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <Box as="header" bg="white" px={8} py={4} boxShadow="md"  borderBottom="3px solid #2c3d90"         

    >
      <Flex alignItems="center">
        {/* Logo */}

      <Link href="/">
        <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize="100px" />
      </Link>

      <Link href="/" _hover={{ textDecoration: 'none' }} // Ensures no underline on hover
>

      <Heading
        as="h1"
        textAlign="center"
        mt={5}
        ml={5}
        fontSize="2.3rem" // Custom size between 4xl and 5xl
        fontWeight="600" 
        color="#2c3d90" 
        letterSpacing="-2px" // Reduces space between letters
        lineHeight="1.2" // Slightly reduces line spacing
        fontFamily="'Open Sauce One', sans-serif"

      >
        The Safety Net Project
      </Heading>
      </Link>

        <Spacer />

{/* Navigation Links */}
<HStack spacing={4} fontSize="md" alignItems="center" position="relative" mt={5}>
  {/* Get Involved with Dropdown */}
  <Box
    as="button"
    onMouseEnter={() => setIsInvolvedOpen(true)}  // Show dropdown on hover
    onMouseLeave={() => setIsInvolvedOpen(false)} // Hide dropdown when mouse leaves
    color="#2c3d90"
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
    _hover={{ textDecoration: 'none' }} // Removes underline on hover
    background="none" // Removes default button styling
    position="relative" // Ensure dropdown is positioned correctly relative to the parent
    whiteSpace="nowrap" // Prevent the text from breaking into two lines
  >
    Get Involved

    {/* Dropdown Menu */}
    {isInvolvedOpen && (
      <Box
  position="absolute"
  top="100%" // Position the dropdown below the "Get Involved" link
  left="0"
  bg="white" // Background color
  color="#2c3d90"
  fontFamily="'Open Sauce One', sans-serif"
  fontWeight="400"
  p={2}
  borderRadius="md" // Rounded corners
  zIndex={1500} // Ensure dropdown appears above other content

>
        <Link
          href="/volunteer"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" // Removes the underline
          _hover={{ textDecoration: 'none' }} // Ensures no underline on hover
          display="block"
          p={2} // Adds some padding for better clickability
          passHref
        >
          Volunteer
        </Link>
      </Box>
    )}
  </Box>

  {/* Zia Academy Dropdown */}
  <Box
    as="button"
    onMouseEnter={() => setIsAcademyOpen(true)}  // Show dropdown on hover
    onMouseLeave={() => setIsAcademyOpen(false)} // Hide dropdown when mouse leaves
    color="#2c3d90"
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
    _hover={{ textDecoration: 'none' }} // Removes underline on hover
    background="none" // Removes default button styling
    position="relative" // Ensure dropdown is positioned correctly relative to the parent
    whiteSpace="nowrap" // Prevent the text from breaking into two lines
  >
    Projects
    {/* Dropdown Menu */}
    {isAcademyOpen && (
      <Box
      position="absolute"
      top="100%" // Position the dropdown below the "Get Involved" link
      left="0"
      bg="white" // Background color
      color="#2c3d90"
      fontFamily="'Open Sauce One', sans-serif"
      fontWeight="400"
      p={2}
      borderRadius="md" // Rounded corners
      zIndex={1500} // Ensure dropdown appears above other content
    
    >
        <Link
          href="/ZiaAcademy"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" // Removes the underline
          _hover={{ textDecoration: 'none' }} // Ensures no underline on hover
          display="block"
          p={2} // Adds some padding for better clickability
        >
          Zia Academy
        </Link>
      </Box>
    )}
  </Box>

  {/* About Dropdown */}
  <Box
    as="button"
    onMouseEnter={() => setIsAboutOpen(true)}  // Show dropdown on hover
    onMouseLeave={() => setIsAboutOpen(false)} // Hide dropdown when mouse leaves
    color="#2c3d90"
    fontFamily="'Open Sauce One', sans-serif"
    fontWeight="400"
    _hover={{ textDecoration: 'none' }} // Removes underline on hover
    background="none" // Removes default button styling
    position="relative" // Ensure dropdown is positioned correctly relative to the parent
    whiteSpace="nowrap" // Prevent the text from breaking into two lines
  >
    About

    {/* Dropdown Menu */}
    {isAboutOpen && (
      <Box
      position="absolute"
      top="100%" // Position the dropdown below the "Get Involved" link
      left="0"
      bg="white" // Background color
      color="#2c3d90"
      fontFamily="'Open Sauce One', sans-serif"
      fontWeight="400"
      p={2}
      borderRadius="md" // Rounded corners
      zIndex={1500} // Ensure dropdown appears above other content
    
    >
        <Link
          href="/our-team"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" // Removes the underline
          _hover={{ textDecoration: 'none' }} // Ensures no underline on hover
          display="block"
          p={2} // Adds some padding for better clickability
        >
          Our Team
        </Link>
        <Link
          href="/contact-us"
          color="#2c3d90"
          fontFamily="'Open Sauce One', sans-serif"
          fontWeight="400"
          textDecoration="none" // Removes the underline
          _hover={{ textDecoration: 'none' }} // Ensures no underline on hover
          display="block"
          p={2} // Adds some padding for better clickability
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

  {/* Instagram Icon */}
  <Link href="https://instagram.com/thesafetynetproject" isExternal>
    <Image src="/instagram.png" alt="Instagram" boxSize="30px" />
  </Link>
</HStack>
      </Flex>
    </Box>
  );
};

export default Header;