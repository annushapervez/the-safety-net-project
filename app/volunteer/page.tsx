import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';

const VolunteerPage = () => {
  return (
    <ChakraProvider>
      <>
        <Header />
        <Box
          bg="#F1F6FB"
          py={10}
          px={{ base: 4, md: 10 }}
          fontFamily="'Open Sauce One', sans-serif" // Apply font to the entire container
        >
          <Flex
            maxW="1200px"
            mx="auto"
            bg="white"
            boxShadow="md"
            rounded="lg"
            overflow="hidden"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems="center" // Center the children vertically
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
                Volunteer
              </Heading>
              <Text
                fontSize="lg"
                color="#5F5D5D"
                mb={2}
                fontWeight="400"
                letterSpacing="-1.2px"
              >
                At the Safety Net Project, we understand that not everyone has the financial means to contribute to our cause. However, we still believe that everyone can make a difference in their own unique way. That's why we're excited to offer a volunteer program that not only benefits our organization but also benefits you.
              </Text>
              <Text
                fontSize="lg"
                color="#5F5D5D"
                mb={2}
                fontWeight="400"
                letterSpacing="-1.2px"
              >
                By becoming a volunteer with us, you'll have the opportunity to make a meaningful impact on the community we serve. Since our non-profit is officially registered, you'll be able to showcase your dedication to social responsibility by adding this experience to your resume. And if you need a recommendation letter in the future, we're happy to provide one based on your contributions.
              </Text>
              <Text
                fontSize="lg"
                color="#5F5D5D"
                fontWeight="400"
                letterSpacing="-1.2px"
              >
                As a volunteer, you'll be involved in the essentials of our organization, such as outreach, idea pitching, and planning. But beyond that, you'll be part of a community of like-minded individuals who share your passion for making a difference. Together, we can support and uplift each other as we work towards our common goals.
              </Text>
            </Box>

            {/* Right Section */}
            <Box flex="1" p={10} bg="white" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px"
 >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {/* Name */}
                <FormControl id="first-name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="First Name" />
                </FormControl>
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

              {/* Phone */}
              <FormControl id="phone" mt={4}>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" placeholder="Your Phone Number" />
              </FormControl>

              {/* Volunteer Type */}
              <FormControl id="volunteer-type" isRequired mt={4}>
                <FormLabel>
                  What type of volunteer work would you be interested in?
                </FormLabel>
                <Select placeholder="Select an option" color="gray.500">
                  <option>Outreach</option>
                  <option>Event Planning</option>
                  <option>Fundraising</option>
                  <option>Administrative Work</option>
                </Select>
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
};

export default VolunteerPage;