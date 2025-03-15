import React from 'react';
import { ChakraProvider, Box, Flex, Text, Image, VStack, Heading } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OurTeam = () => {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header />
        <Box flex="1" p={8}>
     <Heading
        as="h2"
        size="2xl"
        fontWeight="400"
        letterSpacing="-2px"
        lineHeight="1.2"
        color="#2c3d90"
        textAlign={'center'}
        mb={8}

      >            Our Team
          </Heading>
          <Flex justify="center" align="center" wrap="wrap">
            <VStack spacing={4} m={4}>
              <Image
                borderRadius="full"
                boxSize="150px"
                src="/fae.png" // Replace with actual image URL
                alt="Faevah Muhammad"
              />
               <Text
            fontSize="xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="500"
            color="#2c3d90"
            letterSpacing="-1.2px"
          >Faeyah Muhammad</Text>
                          <Text   fontSize="md"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#5F5D5D"
            letterSpacing="-1.2px">CO-FOUNDER</Text>
            </VStack>
            <VStack spacing={4} m={4}>
              <Image
                borderRadius="full"
                boxSize="150px"
                src="/annu.png" // Replace with actual image URL
                alt="Annusha Pervez"
              />
              <Text
            fontSize="xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="500"
            color="#2c3d90"
            letterSpacing="-1.2px"
          >Annusha Pervez</Text>
              <Text   fontSize="md"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#5F5D5D"
            letterSpacing="-1.2px">CO-FOUNDER</Text>
            </VStack>
          </Flex>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default OurTeam;