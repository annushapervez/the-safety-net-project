import React from "react";
import { ChakraProvider, Box, Text, Input, Textarea, Button, FormLabel, FormControl, Container, Flex, SimpleGrid, Heading} from "@chakra-ui/react";
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactForm() {
  return (
    <ChakraProvider>
      <>
        <Header />
        <Box bg="#F1F6FB"  py={10} px={{ base: 4, md: 10 }}>
          <Flex
            maxW="1200px"
            mx="auto"
            bg="white"
            boxShadow="md"
            rounded="lg"
            overflow="hidden"
            flexDirection={{ base: 'column', lg: 'row' }}
          >
            {/* Left Section */}
            <Box flex="1" p={10} bg="white">
            <Heading
                as="h2"
                size="xl"
                fontWeight="400"
                letterSpacing="-2px"
                lineHeight="1.2"
                color="#2c3d90"
                mb="4"
              >
  Contact Us
  </Heading>
  <Text
            fontSize="xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#5F5D5D"
            letterSpacing="-1.2px"
          >
We’d love to hear from you! For any questions or ideas please feel free to contact us. </Text>
<Heading as="h1" size="md" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px" mt={4} >

  safetynetprojects@gmail.com
  </Heading>

  <Heading as="h1" size="sm" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px" mt={2} >
  Located in New York City
  </Heading>
            </Box>

            {/* Right Section */}
            <Box flex="1" p={10} bg="white" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {/* First Name */}
                <FormControl id="first-name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="First Name" />
                </FormControl>

                {/* Last Name */}
                <FormControl id="last-name" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder="Last Name" />
                </FormControl>
              </SimpleGrid>

              {/* Email */}
              <FormControl id="email" isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Your Email Address" />
              </FormControl>

              {/* Message */}
              <FormControl id="message" isRequired mt={4}>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder="Your Message" />
              </FormControl>

              {/* Submit Button */}
              <Button
                mt={6}
                px={8}
                py={4}
                fontSize="md"
                fontWeight="bold"
                color="#2c3d90"
                border="2px"
                bg="transparent"
                borderRadius="0"
                width="fit-content"
                _hover={{ bg: "#2c3d90", color: "white" }}
              >
                SEND
              </Button>
            </Box>
          </Flex>
        </Box>
        <Footer />
      </>
    </ChakraProvider>
  );
}

export default ContactForm;
