"use client";
import React, { useRef } from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const MAROON = "#8a2327";
const CREAM = "#fbf7ee";

// wave 1 rises first, wave 2 follows — now tied to scroll progress, not time.
// `depth` controls parallax drift: the tall center image (0.4) moves less than
// the foreground photos (1), which reads as physical depth.
const GALLERY_IMAGES = [
  { src: "/1.jpg", top: "8%", left: "4%", w: "24vw", h: "30vh", wave: 1, depth: 1 },
  { src: "/purpose.jpg", top: "4%", right: "6%", w: "20vw", h: "26vh", wave: 1, depth: 1 },
  { src: "/mission.jpg", top: "50%", left: "50%", w: "17vw", h: "58vh", wave: 1, depth: 0.4, center: true },
  { src: "/2.jpg", bottom: "6%", left: "8%", w: "22vw", h: "34vh", wave: 2, depth: 1 },
  { src: "/zia.jpg", bottom: "4%", right: "10%", w: "20vw", h: "28vh", wave: 2, depth: 1, view: true },
];

const FloatingImage = ({ item }) => {
  const style = {
    position: "absolute",
    top: item.top,
    bottom: item.bottom,
    left: item.left,
    right: item.right,
    width: item.w,
    height: item.h,
    zIndex: item.center ? 1 : 2,
    marginLeft: item.center ? `calc(${item.w} / -2)` : undefined,
    marginTop: item.center ? `calc(${item.h} / -2)` : undefined,
    willChange: "transform",
  };

  return (
    <div
      className={`gallery-img wave-${item.wave}`}
      data-depth={item.depth}
      style={style}
    >
      <Box position="relative" w="100%" h="100%">
        {/* the clip lives here so the zoomed image never spills, while the
            VIEW badge below stays free to hang outside the frame */}
        <Box w="100%" h="100%" overflow="hidden">
          <Box
            as="img"
            className="gallery-img-inner"
            src={item.src}
            alt=""
            w="100%"
            h="100%"
            objectFit="cover"
            draggable={false}
            willChange="transform"
          />
        </Box>
        {item.view && (
          <Box
            position="absolute"
            bottom="-16px"
            left="-16px"
            w="64px"
            h="64px"
            borderRadius="full"
            bg={MAROON}
            color="#fff"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily={SANS}
            fontWeight="700"
            fontSize="11px"
            letterSpacing="1px"
          >
            VIEW
          </Box>
        )}
      </Box>
    </div>
  );
};

const LandingGallery = () => {
  const [isMobile] = useMediaQuery("(max-width: 900px)");
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (isMobile) return; // mobile keeps the simple stacked fallback below

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%", // pin holds for ~1.8 screens of scrolling
          scrub: 1, // ties the timeline to scroll position (the "buttery" bit)
          pin: true,
          anticipatePin: 1,
        },
      });

      tl
        // wave 1 slides up into place — pure position reveal, no fade
        .fromTo(
          ".wave-1",
          { yPercent: 65 },
          { yPercent: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
          0
        )
        // wave 2 follows slightly later
        .fromTo(
          ".wave-2",
          { yPercent: 65 },
          { yPercent: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
          0.35
        )
        // each photo un-zooms from slightly cropped back to its natural scale.
        // runs on the inner <img> so it stacks with the wrapper's yPercent moves.
        .fromTo(
          ".gallery-img-inner",
          { scale: 1.18 },
          { scale: 1, duration: 1.8, stagger: 0.1, ease: "power2.out" },
          0
        )
        // then a gentle depth parallax once everything has landed
        .to(
          ".gallery-img",
          {
            yPercent: (i, el) => -16 * parseFloat(el.dataset.depth),
            ease: "none",
            duration: 1,
          },
          1.4
        )
        // wordmark drifts the opposite way for separation
        .to(".wordmark", { yPercent: 14, ease: "none", duration: 2.4 }, 0);
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  if (isMobile) {
    return (
      <Box bg={CREAM} py={16} px={6}>
        {GALLERY_IMAGES.map((item, i) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            style={{ marginBottom: 24, overflow: "hidden" }}
          >
            <motion.div
              initial={{ scale: 1.18 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Box as="img" src={item.src} alt="" w="100%" h="260px" objectFit="cover" display="block" />
            </motion.div>
          </motion.div>
        ))}
      </Box>
    );
  }

  return (
    <Box ref={sectionRef} position="relative" h="100vh" bg={CREAM} overflow="hidden">
      <Text
        className="wordmark"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontFamily={SERIF}
        fontWeight="600"
        fontSize="clamp(90px, 14vw, 220px)"
        color={MAROON}
        whiteSpace="nowrap"
        userSelect="none"
        zIndex={0}
      >
        Safety&nbsp;Net
      </Text>

      {GALLERY_IMAGES.map((item) => (
        <FloatingImage key={item.src} item={item} />
      ))}
    </Box>
  );
};

export default LandingGallery;