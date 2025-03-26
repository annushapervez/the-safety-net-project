"use client";
import React, { useRef } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  IconButton,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const sections = [
  { href: "/volunteer", title: "Volunteer" },
  { href: "/ZiaAcademy", title: "Zia Academy" },
  { href: "/our-team", title: "Our Team" },
  { href: "/contact-us", title: "Contact Us" },
  { href: "/Explore", title: "Explore" },
];

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <Box as="header" bg="white" px={6} py={4} boxShadow="md" borderBottom="3px solid #2c3d90">
      <Flex alignItems="center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize="60px" />
        </Link>
        <Spacer />
        {/* Hamburger Icon */}
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon w={7} h={7} /> }
          onClick={onOpen}
          size="xl"
          color="#2c3d90"
          variant="ghost"
        />
      </Flex>

      {/* Drawer for Mobile Menu */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" initialFocusRef={firstField}>
        <DrawerOverlay />
        <DrawerContent bg="white">
          <DrawerCloseButton color="#2c3d90" />
          <DrawerHeader borderBottomWidth="1px" color="#2c3d90">Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {sections.map((section) => (
                <Link key={section.href} href={section.href} fontSize="lg" color="#2c3d90" onClick={onClose}>
                  {section.title}
                </Link>
              ))}
              <Divider borderColor="#2c3d90" my={2} />
              <Link href="https://instagram.com/thesafetynetproject" isExternal>
                <Image src="/instagram.png" alt="Instagram" boxSize="30px" />
              </Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileMenu;