import React from 'react';
import { ChakraProvider, Box, Flex, Text, Image, VStack, Heading, HStack} from '@chakra-ui/react';
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
          >
            Our Team
          </Heading>
          <Flex justify="center" align="center" wrap="wrap">
          <HStack maxW="95%">
            <VStack spacing={4} m={4} >
              <Box 
                p={4} 
                border="2px solid pink" 
                borderRadius="16px"
                boxShadow="lg"
                width="500px"
                height="auto"
              >
                <Image
                  boxSize="150px"
                  src="/fae.jpg" 
                  alt="Faevah Muhammad"
                  borderRadius="16px" 
                />
                <Text
                  fontSize="xl"
                  fontFamily="Open Sauce One, sans-serif"
                  fontWeight="500"
                  color="#2c3d90"
                  letterSpacing="-1.2px"
                >
                  Faevah Muhammad
                </Text>
                <Text
                  fontSize="md"
                  fontFamily="Open Sauce One, sans-serif"
                  fontWeight="400"
                  color="#5F5D5D"
                  letterSpacing="-1.2px"
                  mb={2}
                >
                  CO-FOUNDER
                </Text>
                <Text
                  fontSize="md"
                  fontFamily="Open Sauce One, sans-serif"
                  fontWeight="400"
                  color="#5F5D5D"
                  letterSpacing="-1.2px"
                >
                </Text>
              </Box>
            </VStack>
            <VStack spacing={4} m={4}>
  <Box 
    p={4} 
    border="2px solid pink" 
    borderRadius="16px"
    boxShadow="lg"
    width="500px"
    height="auto"
  >
    <HStack align="start" spacing={4}>
      <Image
        boxSize="150px"
        src="/annu.jpg" 
        alt="Annusha Pervez"
        borderRadius="16px"
        flexShrink={0} // Ensures the image does not shrink
      />
      <VStack align="start" spacing={1} flex="1">
        <Text
          fontSize="xl"
          fontFamily="Open Sauce One, sans-serif"
          fontWeight="500"
          color="#2c3d90"
          letterSpacing="-1.2px"
        >
          Annusha Pervez
        </Text>
        <Text
          fontSize="md"
          fontFamily="Open Sauce One, sans-serif"
          fontWeight="400"
          color="#5F5D5D"
          letterSpacing="-1.2px"
          mb={4}
        >
          CO-FOUNDER
        </Text>
      </VStack>
    </HStack>

    <Text
      fontSize="md"
      fontFamily="Open Sauce One, sans-serif"
      fontWeight="400"
      color="#5F5D5D"
      letterSpacing="-1px"
      mt={2} // Adds spacing between the image and the paragraph
    >
      With a strong passion for technology and social impact, I’m dedicated to developing solutions that empower communities and create meaningful change. My background in technology, design, and user experience gives me a unique perspective on how innovation can be leveraged to tackle pressing challenges and drive lasting impact.
      <br /><br />

  By developing our website, I created a platform that not only reflects our mission but also connects our community, supporters, and partners. This project allowed me to integrate my passion for technology into our work, ensuring an accessible, user-friendly online presence to showcase the meaningful impact we’re making. As we continue to grow, I’m excited about the potential to expand our reach and make an even greater difference around the world.
</Text>

              </Box>
            </VStack>
            </HStack>

          </Flex>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default OurTeam;
