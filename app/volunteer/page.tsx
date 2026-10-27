"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Flex, Heading, Text, FormControl, FormLabel, FormHelperText, Input, Select, Button, SimpleGrid,
  UnorderedList, ListItem, HStack, Tag,
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import HamburgerMenu from '../components/HamburgerMenu';
import { useMediaQuery } from "@chakra-ui/react";

const NAVY = "#2c3d90";
const MUTED = "#5F5D5D";

// Matches body copy on the Manwais Healthcare Center page
const BODY_TEXT = { fontSize: "md", fontWeight: 300, color: MUTED, lineHeight: 1.85 } as const;

const MAX_RESUME_BYTES = 4 * 1024 * 1024; // Vercel caps request bodies at ~4.5MB
const RESUME_ACCEPT = ".pdf,.doc,.docx";

// ── Open positions: edit role details here ──
type Role = {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

const ROLES: Role[] = [
  {
    id: "Social Media Volunteer",
    title: "Social Media Volunteer",
    tags: ["Remote", "Flexible hours"],
    summary:
      "Help tell the story of The Safety Net Project. You'll share our work with supporters, grow our online community, and help drive awareness for campaigns like the Manwais Women's Health & Wellness Center.",
    responsibilities: [
      "Plan and schedule posts across Instagram and LinkedIn",
      "Create graphics, short videos, and captions that highlight our projects and impact",
      "Promote fundraising campaigns and events",
      "Engage with followers and respond to comments and messages",
      "Track basic metrics and suggest ideas to grow our reach",
    ],
    qualifications: [
      "Comfortable creating content for social media",
      "Familiarity with tools like Canva or CapCut is a plus",
      "Strong writing skills and attention to detail",
      "Passion for supporting women and children in underserved communities",
    ],
  },
  {
    id: "Grant Applications Volunteer",
    title: "Grant Applications Volunteer",
    tags: ["Remote", "Flexible hours"],
    summary:
      "Help secure the funding that makes our projects possible. You'll research grant opportunities and help write applications that bring our education and healthcare initiatives to life.",
    responsibilities: [
      "Research foundations, grants, and funding opportunities that fit our mission",
      "Draft and edit grant proposals, budget narratives, and supporting documents",
      "Track application deadlines and requirements",
      "Gather project information and impact data from our team",
      "Help prepare reports for awarded grants",
    ],
    qualifications: [
      "Strong research and writing skills",
      "Organized, detail-oriented, and able to meet deadlines",
      "Experience with grant writing or nonprofit work is a plus, but not required",
      "Passion for supporting women and children in underserved communities",
    ],
  },
];

const BENEFITS = [
  "Hands-on experience with a registered 501(c)(3) nonprofit to add to your resume",
  "A recommendation letter based on your contributions",
  "A community of like-minded people working toward a common goal",
];

const emptyForm = { firstName: '', lastName: '', email: '', phone: '', volunteerType: ROLES[0].id };

const VolunteerPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const [formData, setFormData] = useState(emptyForm);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const role = ROLES.find((r) => r.id === formData.volunteerType) ?? ROLES[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const selectRole = (id: string) => setFormData({ ...formData, volunteerType: id });

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeError('');
    if (file && file.size > MAX_RESUME_BYTES) {
      setResumeError("File is too large. Please upload a file under 4 MB.");
      setResume(null);
      e.target.value = '';
      return;
    }
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setResumeError("Please upload your resume.");
      return;
    }
    setSubmitting(true);
    setMessage(null);

    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    body.append('resume', resume);

    try {
      const res = await fetch('/api/volunteer', { method: 'POST', body });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }
      setMessage({ ok: true, text: "Thank you for applying! We'll be in touch soon." });
      setFormData({ ...emptyForm, volunteerType: formData.volunteerType });
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      const text = error instanceof Error && error.message ? error.message : "Error submitting application. Please try again.";
      setMessage({ ok: false, text });
    } finally {
      setSubmitting(false);
    }
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <>
      <Footer >

      {isMobile ? <HamburgerMenu /> : <Header />}
        <SlideUpWhenVisible threshold={0.15}>

        <Box
          bg="#F1F6FB"
          minHeight="100vh"
          py={10}
          px={{ base: 4, md: 10 }}
        >
          <Box maxW="95%" mx="auto">
            {/* Intro */}
            <Box textAlign={{ base: "center", xl: "left" }} mb={8}>
              <Heading as="h2" size="xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color={NAVY} mb={4}>
                Volunteer With Us
              </Heading>
              <Text {...BODY_TEXT} maxW="760px" mx={{ base: "auto", xl: 0 }}>
               Explore our open
                volunteer positions below and apply to join our team.
              </Text>
            </Box>

            {/* Role picker */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
              {ROLES.map((r) => {
                const active = r.id === role.id;
                return (
                  <Box
                    key={r.id}
                    as="button"
                    type="button"
                    onClick={() => selectRole(r.id)}
                    textAlign="left"
                    bg="white"
                    p={6}
                    rounded="lg"
                    boxShadow={active ? "md" : "sm"}
                    border="2px solid"
                    borderColor={active ? NAVY : "transparent"}
                    transition="all 0.2s"
                    _hover={{ borderColor: active ? NAVY : "#c5cde8" }}
                  >
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={active ? NAVY : "gray.400"} mb={1}>
                      {active ? "Viewing" : "Open position"}
                    </Text>
                    <Heading as="h3" size="md" fontWeight="500" color={NAVY} letterSpacing="-1px" mb={2}>
                      {r.title}
                    </Heading>
                    <HStack spacing={2}>
                      {r.tags.map((t) => (
                        <Tag key={t} size="sm" bg="#F1F6FB" color={NAVY}>{t}</Tag>
                      ))}
                    </HStack>
                  </Box>
                );
              })}
            </SimpleGrid>

            <Flex gap={8} flexDirection={{ base: 'column', xl: 'row' }} alignItems={{ base: "stretch", xl: "flex-start" }}>
              {/* Job description */}
              <Box flex="3" bg="white" boxShadow="md" rounded="lg" p={{ base: 5, md: 10 }}>
                <Heading as="h3" size="lg" fontWeight="400" color={NAVY} letterSpacing="-1.5px" mb={3}>
                  {role.title}
                </Heading>
                <Text {...BODY_TEXT} mb={6}>{role.summary}</Text>

                <Heading as="h4" size="sm" color={NAVY} letterSpacing="-0.5px" mb={3}>What you'll do</Heading>
                <UnorderedList {...BODY_TEXT} spacing={1} mb={6} pl={2}>
                  {role.responsibilities.map((item) => <ListItem key={item}>{item}</ListItem>)}
                </UnorderedList>

                <Heading as="h4" size="sm" color={NAVY} letterSpacing="-0.5px" mb={3}>What we're looking for</Heading>
                <UnorderedList {...BODY_TEXT} spacing={1} mb={6} pl={2}>
                  {role.qualifications.map((item) => <ListItem key={item}>{item}</ListItem>)}
                </UnorderedList>

                <Heading as="h4" size="sm" color={NAVY} letterSpacing="-0.5px" mb={3}>What you'll gain</Heading>
                <UnorderedList {...BODY_TEXT} spacing={1} pl={2}>
                  {BENEFITS.map((item) => <ListItem key={item}>{item}</ListItem>)}
                </UnorderedList>

                {isMobile && (
                  <Button
                    mt={8} px={8} fontSize="md" fontWeight="bold" color={NAVY} border="2px" bg="transparent" borderRadius="0"
                    _hover={{ bg: NAVY, color: "white" }}
                    onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    APPLY NOW
                  </Button>
                )}
              </Box>

              {/* Application form */}
              <Box
                ref={formRef}
                flex="2"
                bg="white"
                boxShadow="md"
                rounded="lg"
                p={{ base: 5, md: 8 }}
                color={NAVY}
                position={{ base: "static", xl: "sticky" }}
                top={{ xl: "24px" }}
                scrollMarginTop="24px"
              >
                <Heading as="h3" size="md" fontWeight="500" letterSpacing="-1px" mb={6}>Apply</Heading>

                <form onSubmit={handleSubmit}>
                  <FormControl id="volunteerType" isRequired>
                    <FormLabel>Position</FormLabel>
                    <Select value={formData.volunteerType} onChange={handleChange}>
                      {ROLES.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </Select>
                  </FormControl>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="lastName" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    </FormControl>
                  </SimpleGrid>

                  <FormControl id="email" isRequired mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} />
                  </FormControl>

                  <FormControl id="phone" isRequired mt={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="tel" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} />
                  </FormControl>

                  <FormControl id="resume" isRequired isInvalid={!!resumeError} mt={4}>
                    <FormLabel>Resume</FormLabel>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept={RESUME_ACCEPT}
                      onChange={handleResume}
                      p={1}
                      sx={{
                        "::file-selector-button": {
                          border: "none", bg: "#F1F6FB", color: NAVY, fontWeight: 600,
                          px: 3, py: 1, mr: 3, borderRadius: "md", cursor: "pointer",
                        },
                      }}
                    />
                    <FormHelperText color={resumeError ? "red.500" : "gray.500"}>
                      {resumeError || "PDF or Word document, up to 4 MB"}
                    </FormHelperText>
                  </FormControl>

                  <Button
                    type="submit" isLoading={submitting} loadingText="SUBMITTING"
                    mt={6} px={8} py={4} fontSize="md" fontWeight="bold" color={NAVY} border="2px" bg="transparent"
                    borderRadius="0" width={{ base: "100%", md: "fit-content" }} _hover={{ bg: NAVY, color: "white" }}
                  >
                    SUBMIT APPLICATION
                  </Button>
                </form>
                {message && <Text mt={4} color={message.ok ? "green.500" : "red.500"}>{message.text}</Text>}
              </Box>
            </Flex>
          </Box>
        </Box>
        </SlideUpWhenVisible >

        </Footer >
      </>
    </ChakraProvider>
  );
};

export default VolunteerPage;
