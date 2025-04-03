import React from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

// Footer component
const Footer = () => {
  return (
    <Box
      bg="#0c355e"
      color="#fff"
      p={{ base: 4, md: 6 }} // Smaller padding on mobile
      textAlign="center"
      fontFamily="Open Sauce One, sans-serif"
      mt={0} // Set margin-top to 0
      zIndex={10}
    >
      <Text fontSize={{ base: 'xs', sm: 'sm' }}> {/* Smaller font on mobile */}
        &copy; 2025 The Safety Net Project. All rights reserved.
      </Text>
      <Text fontSize={{ base: 'xs', sm: 'sm' }} mt={2}>
        Contact us: safetynetprojects@gmail.com
      </Text>
      <Flex justify="center" mt={4}>
        <Link href="https://instagram.com" isExternal>
          <Image
            src="/white.png"
            alt="Instagram"
            boxSize={{ base: '20px', sm: '30px' }} // Smaller icon on mobile
          />
        </Link>
      </Flex>
    </Box>
  );
};

// Layout component with children prop to wrap content
const Layout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Box flex="1">{children}</Box> {/* Content goes here */}
      <Footer /> {/* Footer stays at the bottom */}
    </Flex>
  );
};

export default Layout;
