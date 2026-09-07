const TEAM = [
  {
    slug: "faeyah-muhammad",
    name: "Faeyah Muhammad",
    title: "Director and Co-Founder",
    group: "Co-Founders",
    image: "/FAEHeadshot.jpg",
    bio: [
      "Faeyah Muhammad is Co-Founder and Director of The Safety Net Project, Faeyah leads the organization’s financial management, grant writing, strategic planning, and digital outreach. With a foundation in finance, law, and policy, combined with hands-on experience in grassroots development, Faeyah believes that localized, data-driven investment is key to creating long-term, scalable impact. Her work is driven by a focus on sustainable, community-centered solutions that expand access to essential services in low-resource settings.",
    ],
  },
  {
    slug: "annusha-pervez",
    name: "Annusha Pervez",
    title: "Director and Co-Founder",
    group: "Co-Founders",
    image: "/IMG_7177.jpg",
    imageScale: 1.20,
    bio: [
      "With a strong passion for technology and social impact, I'm dedicated to developing solutions that empower communities and create meaningful change. My background in technology, design, and user experience gives me a unique perspective on how innovation can be leveraged to tackle pressing challenges and drive lasting impact.",
      "By developing our website, I created a platform that not only reflects our mission but also strengthens connections between our community, supporters, and partners. Beyond establishing a digital presence, I focus on continuously refining and scaling our technology to better serve those who rely on it. Ensuring accessibility, usability, and adaptability is at the core of my work, allowing us to create a user-friendly experience that amplifies our reach.",
      "Through The Safety Net Project, we're building more than just a platform, we're creating a sustainable, tech-driven initiative that fosters connection, transparency, and real impact for the communities we serve.",
    ],
  },
  {
    slug: "farwa-tashin",
    name: "Farwa Tashin",
    title: "Research Fellow",
    group: "Research Fellows",
    image: "/Farwa.jpg",
    imagePosition: "center 20%",
    bio: [
      "Farwa is a Human Biology student at Hunter College pursuing a career in medicine. Passionate about public health, she's drawn to how research can illuminate community health challenges and expand access to care. As a Research Fellow with Safety Net, she contributes to projects that advance health education and support underserved communities; while growing as both a researcher and future healthcare professional.",
    ],
  },
  {
    slug: "rafiuddin-shah",
    name: "Rafiuddin Shah",
    title: "Advisor",
    group: "Advisors",
    image: "",
    bio: [],
  },
  {
    slug: "shahbaz-khaled",
    name: "Shahbaz Khaled",
    title: "Engineering Advisor",
    group: "Advisors",
    image: "",
    bio: [],
  },
];

export const GROUP_ORDER = ["Co-Founders", "Advisors", "Research Fellows"];

// Accent per section, picked up from the team blueprint.
/** @type {Record<string, string>} */
export const GROUP_ACCENT = {
  "Co-Founders": "#2c3d90",
  Advisors: "#8AB4E8",
  "Research Fellows": "#4A86C8",
};

export default TEAM;
