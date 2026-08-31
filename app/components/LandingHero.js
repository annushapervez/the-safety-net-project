"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "'Source Serif 4', serif";
const SANS = "'Libre Franklin', system-ui, sans-serif";
const MAROON = "#8a2327";
const NAVY = "#1b2a5b";

const CREAM = "#fbf7ee";

// Height of the fixed Navbar (rendered separately in page.tsx) — reserved as
// blank space here so the wordmark still centers in the space below it, and
// so gallery images still clear it (NAV_CLEARANCE below).
const NAV_HEIGHT = "74px";

// Images from /public, cropped to the same portrait box via object-fit: cover.
const HERO_IMAGES = ["/1.jpg", "/atif/DSC_6476.jpg","/atif/DSC_6478.jpg","/3.jpg", "/IMG_9366.JPG","/atif/DSC_6564.jpg","/atif/DSC_6629.jpg", "/zia.jpg", "/mission.jpg"];

// The scatter layout these images END in (their resting positions around the
// wordmark once the scroll finishes). `from` is how many viewport-heights
// BELOW that resting spot each image starts — bigger number = starts further
// away = travels faster, which is what creates the layered parallax feel
// from the reference site.
// Fixed px (not vh/%) so it clears the header consistently regardless of
// viewport height — the header's own height doesn't scale with breakpoint.
const NAV_CLEARANCE = "104px";

const SCROLL_IMAGES = [
  { src: "/DSC_6502.jpg", top: "50%", left: "47%", w: "23.7vw", h: "63vh", from: 1.1, center: true },
  { src: "/atif/DSC_6458.jpg", top: NAV_CLEARANCE, left: "56px", w: "24vw", h: "26vh", from: 1.4 },
  { src: "/purpose.jpg", top: NAV_CLEARANCE, right: "15%", w: "16.5vw", h: "31vh", from: 1.65, pos: "75% center" },
  { src: "/IMG_9369.JPG", bottom: "6%", left: "8%", w: "16.5vw", h: "46vh", from: 1.85 },
  { src: "/atif/DSC_6589.jpg", bottom: "10%", right: "56px", w: "30.4vw", h: "34vh", from: 2.1, view: true },
];

const RisingImage = ({ item }) => (
  <div
    className="rise-img"
    data-from={item.from}
    style={{
      position: "absolute",
      top: item.top,
      bottom: item.bottom,
      left: item.left,
      right: item.right,
      width: item.w,
      height: item.h,
      // rising images sit ABOVE the wordmark + fill text, so they visibly
      // pass over the letters as they travel (like the reference)
      zIndex: 4,
      marginLeft: item.center ? `calc(${item.w} / -2)` : undefined,
      marginTop: item.center ? `calc(${item.h} / -2)` : undefined,
      willChange: "transform",
    }}
  >
    {/* overflow clip so the un-zoom (see rise-img-inner tween) stays inside the frame */}
    <Box position="relative" w="100%" h="100%" overflow="hidden">
      <Box className="rise-img-inner" as="img" src={item.src} alt="" w="100%" h="100%" objectFit="cover" objectPosition={item.pos || "center"} draggable={false} willChange="transform" />
    </Box>
  </div>
);

const LandingHero = () => {
  const [isMobile] = useMediaQuery("(max-width: 900px)");
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const imgW = isMobile ? 190 : 340;
  const imgH = isMobile ? 285 : 500;
  const fontSize = isMobile ? "17vw" : "clamp(90px, 13vw, 200px)";

  const clip = `inset(-100% calc(50% - ${imgW / 2}px) -100% calc(50% - ${imgW / 2}px))`;
  const maskImage = HERO_IMAGES[(active + 1) % HERO_IMAGES.length];

  const wordmarkType = {
    fontFamily: SERIF,
    fontWeight: "600",
    fontSize,
    lineHeight: "1",
    letterSpacing: "-.02em",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  // ---- intro: plays once on load, before any scrolling ----
  useGSAP(
    () => {
      if (isMobile) return;

      // cubic-bezier(0.215, 0.61, 0.355, 1) is easeOutCubic — power2.out
      const EASE = "power2.out";

      // same column clip as `clip`, but with an animatable top inset so the
      // photo-filled letters can wipe in alongside the photo
      const fillClip = (top) =>
        `inset(${top}% calc(50% - ${imgW / 2}px) -100% calc(50% - ${imgW / 2}px))`;

      // -- initial states --
      gsap.set(".word-box", { scale: 1.15, transformOrigin: "50% 50%" });
      gsap.set(".hero-photo", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set([".word-the", ".word-project"], { opacity: 0, y: 24 });
      gsap.set(".scroll-hint", { opacity: 0 });
      gsap.set(".intro-ticker", { opacity: 1, y: 0 });
      if (fillRef.current) {
        fillRef.current.style.clipPath = fillClip(100);
        fillRef.current.style.WebkitClipPath = fillClip(100);
      }

      // lock scrolling until the intro finishes so it can't fight the
      // pinned scroll timeline. If you're running Lenis on this page,
      // swap these two lines for lenis.stop() / lenis.start().
      document.body.style.overflow = "hidden";

      const reveal = { top: 100 };
      const counter = { val: 27 };
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      // 1. hold on the big wordmark, then settle down to its real size.
      //    The shrink ends at timeline t=1.1 — that's the moment the
      //    ticker hits 100%.
      tl.to(".word-box", { scale: 1, duration: 0.7, ease: EASE, delay: 0.4 });

      // 1b. ticker counts 27 → 100 during the wait + shrink, hitting 100
      //     exactly when the wordmark reaches its smaller size. Linear
      //     ease so it reads like a real loader.
      tl.to(
        counter,
        {
          val: 100,
          duration: 1.1,
          ease: "none",
          onUpdate: () => {
            const el = document.querySelector(".intro-ticker");
            if (el) el.textContent = `${Math.round(counter.val)}%`;
          },
        },
        0
      );

      // 1c. ticker fades up and out — same 0.8s power2.out as the words
      //     and navbar, just in reverse (opacity 1→0, y 0→-24). Positioned
      //     at t=1.1 so it starts the instant the count hits 100.
      tl.to(
        ".intro-ticker",
        { opacity: 0, y: -24, duration: 0.8, ease: EASE },
        1.1
      );

      // 2. hero photo wipes in from bottom to top, timed to start as the
      //    wordmark is finishing its shrink
      tl.to(
        ".hero-photo",
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE },
        "-=0.4"
      );

      // ...and the photo-filled letters wipe in with it. GSAP can't tween a
      // clip-path string containing calc(), so we tween a plain number and
      // rebuild the string every frame. Ends at -100, which is exactly the
      // resting `clip` value — the scroll behavior afterward is untouched.
      tl.to(
        reveal,
        {
          top: -100,
          duration: 1,
          ease: EASE,
          onUpdate: () => {
            if (!fillRef.current) return;
            fillRef.current.style.clipPath = fillClip(reveal.top);
            fillRef.current.style.WebkitClipPath = fillClip(reveal.top);
          },
        },
        "<"
      );

      // 3. "The" fades in up, then "project" — fadeInUp, staggered
      tl.to(".word-the", { opacity: 1, y: 0, duration: 0.8, ease: EASE }, "-=0.35");
      tl.to(
        ".word-project",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE,
          onStart: () => {
            // fire when "project" begins fading in — the navbar listens for
            // this and runs its own matching fadeInUp
            window.dispatchEvent(new Event("intro:reveal-nav"));
          },
        },
        "-=0.55"
      );

      // 4. scroll hint last
      tl.to(".scroll-hint", { opacity: 1, duration: 0.5 }, "-=0.4");

      return () => {
        // safety: never leave the page scroll-locked if the component
        // unmounts mid-intro
        document.body.style.overflow = "";
      };
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // ---- scroll: pinned section, wordmark fixed, images travel ----
  useGSAP(
    () => {
      if (isMobile) return;

      // how far the hero photo travels before it's fully off-screen
      const heroTravel = () => -(window.innerHeight * 1.25);

      // TIMELINE MATH — end is "+=350%" (3.5 viewports of scroll) and the
      // timeline below is built so 1 duration unit = exactly 1 viewport of
      // scroll. The main animation occupies t = 0 → 2.5 (250vh of scroll),
      // and the exit occupies t = 2.5 → 3.5 (the final 100vh). That final
      // unit lines up exactly with the 100vh the Purpose section overlaps
      // via its mt="-100vh" wrapper — so the gallery gets pushed up and
      // out at precisely the same rate Purpose slides up to cover it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // -- main phase (t = 0 → 2.5) --

      // 1. hero photo exits upward during the first ~70% of the main phase
      tl.to(".hero-photo", { y: heroTravel, ease: "none", duration: 1.75 }, 0);

      // 2. keep the photo-filled letters glued to the moving photo:
      //    the fill is a background-image on the text, so as the photo
      //    translates up, we shift backgroundPosition by the exact same
      //    number of pixels. Once the photo has left the clip window the
      //    fill text renders transparent and the maroon wordmark beneath
      //    shows through — no fade needed.
      const fillProgress = { p: 0 };
      tl.to(
        fillProgress,
        {
          p: 1,
          ease: "none",
          duration: 1.75,
          onUpdate: () => {
            if (!fillRef.current) return;
            const y = fillProgress.p * heroTravel();
            fillRef.current.style.backgroundPosition = `center calc(50% + ${y}px)`;
          },
        },
        0
      );

      // 3. scroll hint fades out as soon as scrolling starts
      tl.to(".scroll-hint", { opacity: 0, duration: 0.1 }, 0);

      // 4. gallery images rise from below the viewport into their resting
      //    scatter positions. All tweens span the full main phase but cover
      //    different distances (data-from), so they move at different
      //    speeds and arrive together — that's the parallax.
      gsap.utils.toArray(".rise-img").forEach((el) => {
        tl.from(
          el,
          {
            y: () => window.innerHeight * parseFloat(el.dataset.from),
            ease: "none",
            duration: 2.5,
          },
          0
        );
      });

      // 5. each photo un-zooms from slightly cropped to its natural scale as
      //    it rises. Runs on the inner <img>, not the .rise-img wrapper, so it
      //    stacks with the y travel above instead of overwriting it. Spans the
      //    same 0 → 2.5 main phase, so images finish resolving exactly as they
      //    land. Transform-only, so it stays GPU-composited (see PERF below).
      tl.fromTo(
        ".rise-img-inner",
        { scale: 1.6 },
        { scale: 1, ease: "power2.out", duration: 2.5 },
        0
      );

      // -- exit phase (t = 2.5 → 3.5) --
      // This runs during the exact 100vh window where the Purpose section
      // slides up over the hero. The whole gallery cluster recedes as one
      // unit, anchored to the TOP edge and drifting upward, so it reads as
      // being pushed up and out by the incoming section.
      //
      // PERF: only transform is animated here (scale + y). We deliberately
      // do NOT scrub an animated filter: blur() — re-rasterizing all five
      // images on every scroll frame is what caused the gallery to lag.
      // Transforms are GPU-composited and stay smooth. If a soft recede is
      // wanted, a STATIC blur (set once, not tweened) or an opacity fade is
      // cheap; a scrubbed blur is not.
      tl.to(
        ".gallery-wrapper",
        {
          scale: 0.9,
          y: () => -window.innerHeight * 0.15,
          transformOrigin: "50% 0%",
          ease: "none",
          duration: 1,
        },
        2.5
      );
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // ---- mobile: static hero + simple stacked reveal (no pinning) ----
  if (isMobile) {
    return (
      <Box bg={CREAM}>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Box h={NAV_HEIGHT} flexShrink={0} />
          <Box position="relative" flex="1" display="flex" alignItems="center" justifyContent="center" px={4}>
            <Box position="relative">
              <Text {...wordmarkType} color={NAVY} position="relative" zIndex={1}>
                Safety&nbsp;Net
              </Text>
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" w={`${imgW}px`} h={`${imgH}px`} zIndex={2}>
                {HERO_IMAGES.map((src, i) => (
                  <Box
                    key={src}
                    as="img"
                    src={src}
                    alt=""
                    position="absolute"
                    inset={0}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    opacity={i === active ? 1 : 0}
                    transition="opacity 1s ease-in-out"
                  />
                ))}
              </Box>
              <Text
                {...wordmarkType}
                position="absolute"
                top="0"
                left="0"
                zIndex={3}
                pointerEvents="none"
                clipPath={clip}
                style={{
                  WebkitClipPath: clip,
                  backgroundImage: `url(${maskImage})`,
                  backgroundSize: `${imgW}px ${imgH}px`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Safety&nbsp;Net
              </Text>
              <Text position="absolute" top="-0.55em" left="0.4em" fontFamily={SANS} fontWeight="700" fontSize="18px" color={NAVY} zIndex={4}>
                The
              </Text>
              <Text position="absolute" bottom="-0.6em" right="0.4em" fontFamily={SANS} fontWeight="700" fontSize="18px" color={NAVY} zIndex={4}>
                project
              </Text>
            </Box>
          </Box>
          <Flex justify="center" pb={8}>
            <Text fontFamily={SANS} fontWeight="500" fontSize="13px" letterSpacing="3px" textTransform="uppercase" color={NAVY}>
              Scroll
            </Text>
          </Flex>
        </Box>

        {SCROLL_IMAGES.map((item, i) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            style={{ marginBottom: 24, padding: "0 24px" }}
          >
            <Box overflow="hidden">
              <motion.div
                initial={{ scale: 1.18 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Box as="img" src={item.src} alt="" w="100%" h="260px" objectFit="cover" display="block" />
              </motion.div>
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  }

  // ---- desktop: one pinned section, wordmark fixed, images travel ----
  return (
    <Box
      ref={sectionRef}
      bg={CREAM}
      h="100vh"
      overflow="hidden"
      position="relative"
    >
      {/* Wordmark layer (never animated) */}
      <Box
        position="absolute"
        inset={0}
        display="flex"
        flexDirection="column"
        pointerEvents="none"
        zIndex={2}
      >
        <Box h={NAV_HEIGHT} flexShrink={0} />

        <Box
          ref={contentRef}
          position="relative"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={4}
        >
          {/* Word box */}
          <Box className="word-box" position="relative" mt={{ base: "-16px", md: "-32px" }}>
            {/* Wordmark */}
            <Text {...wordmarkType} color={NAVY} position="relative" zIndex={1}>
              Safety&nbsp;Net
            </Text>

            {/* Hero photo */}
            <Box
              className="hero-photo"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w={`${imgW}px`}
              h={`${imgH}px`}
              zIndex={2}
              willChange="transform"
            >
              {HERO_IMAGES.map((src, i) => (
                <Box
                  key={src}
                  as="img"
                  src={src}
                  alt=""
                  position="absolute"
                  inset={0}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity={i === active ? 1 : 0}
                  transition="opacity 1s ease-in-out"
                />
              ))}
            </Box>

            {/* Photo-filled wordmark */}
            <Text
              ref={fillRef}
              {...wordmarkType}
              position="absolute"
              top="0"
              left="0"
              zIndex={3}
              pointerEvents="none"
              clipPath={clip}
              style={{
                WebkitClipPath: clip,
                backgroundImage: `url(${maskImage})`,
                backgroundSize: `${imgW}px ${imgH}px`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Safety&nbsp;Net
            </Text>

            {/* "The" */}
            <Text
              className="word-the"
              position="absolute"
              top="-0.73em"
              left="0.4em"
              fontFamily={SERIF}
              fontWeight="700"
              fontSize={{ base: "18px", md: "35px" }}
              color={NAVY}
              zIndex={1}
            >
              The
            </Text>

            {/* "project" */}
            <Text
              className="word-project"
              position="absolute"
              bottom="-0.8em"
              right="0.4em"
              fontFamily={SERIF}
              fontWeight="700"
              fontSize={{ base: "18px", md: "35px" }}
              color={NAVY}
              zIndex={1}
            >
              project
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Gallery images (animated independently) */}
      <Box
        className="gallery-wrapper"
        position="absolute"
        inset={0}
        willChange="transform"
        zIndex={4}
      >
        {SCROLL_IMAGES.map((item) => (
          <RisingImage key={item.src} item={item} />
        ))}
      </Box>

      {/* Ticker + scroll hint */}
      <Flex
        justify="center"
        position="absolute"
        bottom={{ base: 8, md: 10 }}
        left={0}
        right={0}
        zIndex={5}
      >
        <Box position="relative" h="20px" w="80px" textAlign="center">
          <Text
            className="intro-ticker"
            position="absolute"
            top={0}
            left={0}
            right={0}
            fontFamily={SANS}
            fontWeight="500"
            fontSize="13px"
            letterSpacing="3px"
            color={NAVY}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            27%
          </Text>

          <Text
            className="scroll-hint"
            position="absolute"
            top={0}
            left={0}
            right={0}
            fontFamily={SANS}
            fontWeight="500"
            fontSize="13px"
            letterSpacing="3px"
            textTransform="uppercase"
            color={NAVY}
          >
            Scroll
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingHero;