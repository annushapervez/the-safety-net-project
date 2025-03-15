import React from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg="#0c355e"
      color="#fff"
      p={6}
      textAlign="center"
      mt={0} // Set margin-top to 0
      position="relative" // Ensure footer is positioned properly
      fontFamily="Open Sauce One, sans-serif"

    >
      <Text fontSize="sm">
        &copy; 2025 The Safety Net Project. All rights reserved.
      </Text>
      <Text fontSize="sm" mt={2}>
        Contact us: safetynetprojects@gmail.com
      </Text>
      <Flex justify="center" mt={4}>
        <Link href="https://instagram.com" isExternal>
          <Image src="/white.png" alt="Instagram" boxSize="30px" />
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;

// make footer skinnier