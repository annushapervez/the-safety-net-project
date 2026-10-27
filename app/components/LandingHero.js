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
const NAVY = "#1b2a5b";
const CREAM = "#fbf7ee";

// Height of the fixed Navbar (rendered separately in page.tsx) — reserved as
// blank space here so the wordmark still centers in the space below it, and
// so gallery images still clear it (NAV_CLEARANCE below).
const NAV_HEIGHT = "74px";

// Images from /public. They cross-fade inside the full-bleed band that runs
// behind the wordmark.
const HERO_IMAGES = ["/1.jpg", "/atif/DSC_6476.jpg","/atif/DSC_6478.jpg","/3.jpg", "/IMG_9366.JPG","/atif/DSC_6564.jpg","/atif/DSC_6629.jpg", "/zia.jpg", "/mission.jpg"];

// The band runs edge to edge — it has no left or right sides, which is what
// keeps it from reading as a box. It is deliberately taller than the type so
// the wordmark sits fully inside it rather than straddling it.
const BAND_H_DESKTOP = "clamp(240px, 52vh, 460px)";
const BAND_H_MOBILE = "clamp(220px, 34vh, 360px)";

// A navy scrim over the photography. Two jobs: it guarantees the cream
// wordmark stays legible over a bright photo, and it pulls nine very
// different images toward one brand colour so the cross-fade doesn't flicker
// between warm and cool.
const SCRIM = "rgba(27, 42, 91, 0.25)";

// THE WORDMARK RULE: one phrase, one size. No word is set smaller than the
// others and no word sits above or below the rest — desktop keeps all four
// words on a single line. Mobile splits into two BALANCED lines (both real
// phrases, both the identical size) purely so the type doesn't shrink to
// nothing on a 390px screen; nothing is demoted or orphaned.
const LINES_DESKTOP = ["The Safety Net Project"];
const LINES_MOBILE = ["The Safety", "Net Project"];

/* One wordmark layer. The navy layer and the cream layer render through this
   same component, which is what guarantees their glyphs sit pixel-identical
   on top of each other — the whole knockout depends on that. The wordmark
   animates as a single object (see the intro's zoom-out), so there is
   deliberately no per-word splitting here. */
const Wordmark = React.forwardRef(({ lines, type, ...rest }, ref) => (
  <Text ref={ref} {...type} {...rest}>
    {lines.map((line, li) => (
      <Box as="span" key={li} display="block">
        {line}
      </Box>
    ))}
  </Text>
));

Wordmark.displayName = "Wordmark";

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
      // rising images sit ABOVE the wordmark + band, so they visibly pass
      // over the letters as they travel (like the reference)
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
  const lines = isMobile ? LINES_MOBILE : LINES_DESKTOP;

  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const fitRef = useRef(null);
  const stackRef = useRef(null);
  const bandRef = useRef(null);
  const boxRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // FIT GUARD. The wordmark is one long line ("The Safety Net Project" is 22
  // characters) sized in vw, which assumes a particular glyph width. If
  // Source Serif 4 loads late, falls back, or is simply wider than assumed,
  // the line could run past the viewport edge — so measure it and scale down
  // to fit if it ever does.
  //
  // This scale lives on .hero-fit, which wraps BOTH the band and the word
  // box, so the two are never scaled independently of each other. Same is
  // true of the intro's scale on .hero-stack inside it. That's what lets the
  // band/letter alignment maths below work in plain untransformed px.
  useEffect(() => {
    const fit = () => {
      const outer = fitRef.current;
      const inner = stackRef.current;
      if (!outer || !inner) return;
      outer.style.transform = "none";
      // offsetWidth, NOT getBoundingClientRect: the intro scales .hero-stack
      // to 1.15 and a bounding rect would report that transformed width, so a
      // re-measure landing mid-intro would bake the overshoot into the fit
      // and leave the resting wordmark permanently undersized.
      const natural = inner.offsetWidth;
      // 0.82 rather than a snug 1.0 so the intro's 1.15 overshoot still has
      // somewhere to go without touching the viewport edges (0.82 * 1.15
      // lands just under full width). Bump this if that starting scale changes.
      const room = window.innerWidth * 0.82;
      const scale = natural > room ? room / natural : 1;
      outer.style.transform = scale < 1 ? `scale(${scale})` : "none";
    };

    fit();
    window.addEventListener("resize", fit);
    // re-measure once webfonts have actually swapped in
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

    return () => window.removeEventListener("resize", fit);
  }, [isMobile, lines]);

  // Sized so the whole phrase fits one line at desktop widths with a
  // comfortable margin either side, and so the two mobile lines stay large
  // enough to read as a hero rather than a caption.
  const fontSize = isMobile ? "16.5vw" : "clamp(34px, 7.8vw, 182px)";

  const wordmarkType = {
    fontFamily: SERIF,
    fontWeight: "600",
    fontSize,
    lineHeight: "1.04",
    letterSpacing: "-.02em",
    whiteSpace: "nowrap",
    textAlign: "center",
    userSelect: "none",
  };

  // The photography inside the band — every image stacked, only the active
  // one opaque, CSS transition doing the dissolve.
  const bandImages = HERO_IMAGES.map((src, i) => (
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
      objectPosition="center 40%"
      opacity={i === active ? 1 : 0}
      transition="opacity 1.1s ease-in-out"
      draggable={false}
    />
  ));

  // ---- intro + scroll share this: keep the cream knockout glued to the band
  //
  // There are two copies of the wordmark stacked exactly on top of each
  // other: navy underneath, cream on top. The cream copy is clipped to
  // whatever slice of the band is currently covering the letters, so a letter
  // reads cream where the photograph is behind it and navy where it isn't.
  // Drive `open` (how far the band has opened, 0→1) and `y` (how far it has
  // travelled up the page) and both the band and the knockout follow.
  const band = useRef({ open: 0, y: 0 }).current;

  const applyBand = () => {
    const bandEl = bandRef.current;
    const boxEl = boxRef.current;
    const maskEl = maskRef.current;
    if (!bandEl || !boxEl || !maskEl) return;

    const boxH = boxEl.offsetHeight;
    const bandH = bandEl.offsetHeight;
    const visH = bandH * band.open;

    // A fully-closed clip is asked to inset by exactly half the height from
    // both the top and the bottom, and on a fractional or odd element height
    // those two halves don't always meet — the browser leaves a 1px sliver of
    // photograph showing as a hairline before the band opens. Sub-pixel clips
    // can't be relied on to close, so below a pixel of visible band we hide
    // the layers outright rather than trusting the clip to be empty.
    const closed = visH < 1;
    bandEl.style.opacity = closed ? "0" : "1";
    maskEl.style.opacity = closed ? "0" : "1";
    if (closed) return;

    // the band opens from a centre hairline outward. clip-path is applied in
    // the band's own untransformed box, so this stays symmetric no matter
    // where the y translate has moved it to.
    const edge = (bandH - visH) / 2;
    bandEl.style.clipPath = `inset(${edge}px 0px ${edge}px 0px)`;

    // ...and the same visible slice, expressed relative to the word box, is
    // exactly the clip the cream copy needs.
    const top = (boxH - visH) / 2 + band.y;
    maskEl.style.clipPath = `inset(${top}px 0px ${boxH - top - visH}px 0px)`;
  };

  // ---- intro: plays once on load, before any scrolling ----
  useGSAP(
    () => {
      if (isMobile) return;

      // cubic-bezier(0.215, 0.61, 0.355, 1) is easeOutCubic — power2.out
      const EASE = "power2.out";

      // -- initial states --
      gsap.set(".hero-stack", { scale: 1.15, transformOrigin: "50% 50%" });
      gsap.set(".photo-band", { xPercent: -50, yPercent: -50 });
      gsap.set(".scroll-hint", { opacity: 0 });
      gsap.set(".intro-ticker", { opacity: 1, y: 0 });
      band.open = 0;
      band.y = 0;
      applyBand();

      // lock scrolling until the intro finishes so it can't fight the
      // pinned scroll timeline. If you're running Lenis on this page,
      // swap these two lines for lenis.stop() / lenis.start().
      document.body.style.overflow = "hidden";

      const counter = { val: 27 };
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      // 1. hold on the oversized wordmark, then zoom out to its real size.
      //    The shrink ends at timeline t=1.1 — that's the moment the ticker
      //    hits 100%. The scale sits on .hero-stack, which wraps the band as
      //    well as the type, so the whole composition zooms out as one piece
      //    and the knockout maths below never has to know it happened.
      tl.to(".hero-stack", { scale: 1, duration: 0.7, ease: EASE }, 0.4);

      // 1b. ticker counts 27 → 100 during the hold + zoom-out, hitting 100
      //     exactly when the wordmark reaches its smaller size. Linear ease
      //     so it reads like a real loader.
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

      // 1c. ticker fades up and out — same 0.8s power2.out as the navbar,
      //     just in reverse (opacity 1→0, y 0→-24). Positioned at t=1.1 so
      //     it starts the instant the count hits 100.
      tl.to(".intro-ticker", { opacity: 0, y: -24, duration: 0.8, ease: EASE }, 1.1);

      // 2. THE MOMENT: the band opens out from a centre hairline to full
      //    height, edge to edge across the viewport, and the letters flip
      //    from navy to cream as it passes over them.
      //
      //    Deliberately starts at t=0.7, mid zoom-out, so the type is still
      //    settling as the band opens — the two read as one gesture rather
      //    than two steps. They can safely overlap because both live under
      //    the same .hero-stack scale, so band and letters never drift.
      tl.to(
        band,
        {
          open: 1,
          duration: 1.0,
          ease: EASE,
          onUpdate: applyBand,
          onStart: () => {
            // the navbar listens for this and runs its own matching fadeInUp
            window.dispatchEvent(new Event("intro:reveal-nav"));
          },
        },
        0.7
      );

      // 3. scroll hint last
      tl.to(".scroll-hint", { opacity: 1, duration: 0.5 }, "-=0.3");

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

      // how far the band travels before it's fully clear of the viewport
      const bandTravel = () => -(window.innerHeight * 1.25);

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

      // 1. the band slides up and off during the first ~70% of the main
      //    phase, and the cream knockout rides with it — so the wordmark
      //    turns back to solid navy from the bottom up, in step with the
      //    photography leaving. immediateRender:false so building this
      //    timeline can't stomp the intro's starting state.
      tl.fromTo(
        band,
        { y: 0 },
        {
          y: bandTravel,
          ease: "none",
          duration: 1.75,
          immediateRender: false,
          onUpdate: () => {
            if (bandRef.current) gsap.set(bandRef.current, { y: band.y });
            applyBand();
          },
        },
        0
      );

      // 2. scroll hint fades out as soon as scrolling starts
      tl.to(".scroll-hint", { opacity: 0, duration: 0.1 }, 0);

      // 3. gallery images rise from below the viewport into their resting
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

      // 4. each photo un-zooms from slightly cropped to its natural scale as
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

  // keep the knockout aligned when the viewport changes size mid-page
  useEffect(() => {
    const onResize = () => applyBand();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // applyBand only touches refs, which are stable — no deps needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- mobile: static hero + simple stacked reveal (no pinning) ----
  if (isMobile) {
    return (
      <Box bg={CREAM}>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Box h={NAV_HEIGHT} flexShrink={0} />
          <Box position="relative" flex="1" display="flex" alignItems="center" justifyContent="center">
            {/* full-bleed band */}
            <Box
              position="absolute"
              top="50%"
              left="0"
              right="0"
              transform="translateY(-50%)"
              h={BAND_H_MOBILE}
              overflow="hidden"
              zIndex={1}
            >
              {bandImages}
              <Box position="absolute" inset={0} bg={SCRIM} />
            </Box>

            {/* the band fully covers the type at rest here, so the mobile
                hero needs only the cream copy — no knockout maths */}
            <Box position="relative" zIndex={2} px={4}>
              <Wordmark lines={lines} type={wordmarkType} color={CREAM} />
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

  // ---- desktop: one pinned section, wordmark fixed, band + images travel ----
  return (
    <Box
      ref={sectionRef}
      bg={CREAM}
      h="100vh"
      overflow="hidden"
      position="relative"
    >
      {/* Wordmark + band layer */}
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
        >
          {/* .hero-fit holds the measured fit scale, .hero-stack holds the
              intro's settle scale. Both wrap the band AND the word box, so
              the two never drift apart. */}
          <Box ref={fitRef} className="hero-fit" position="relative" style={{ transformOrigin: "50% 50%" }}>
            <Box
              ref={stackRef}
              className="hero-stack"
              position="relative"
              mt={{ base: "-16px", md: "-32px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* Full-bleed photographic band. 100vw and centred on the
                  wordmark, so it runs off both edges of the screen — it has
                  no left or right side to read as a box. */}
              <Box
                ref={bandRef}
                className="photo-band"
                position="absolute"
                top="50%"
                left="50%"
                w="100vw"
                h={BAND_H_DESKTOP}
                overflow="hidden"
                zIndex={1}
                willChange="transform, clip-path"
                /* closed before the intro's first applyBand() runs, so the
                   band can't flash on the first paint */
                style={{ opacity: 0 }}
              >
                {bandImages}
                <Box position="absolute" inset={0} bg={SCRIM} />
              </Box>

              {/* Word box — the entire wordmark, one phrase at one size */}
              <Box ref={boxRef} className="word-box" position="relative" zIndex={2}>
                {/* navy copy: what shows wherever the band isn't */}
                <Wordmark
                  lines={lines}
                  type={wordmarkType}
                  color={NAVY}
                  position="relative"
                />

                {/* cream copy: clipped to the band's live position, so the
                    letters read cream exactly where photography is behind
                    them and navy everywhere else */}
                <Wordmark
                  ref={maskRef}
                  lines={lines}
                  type={wordmarkType}
                  color={CREAM}
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  willChange="clip-path"
                  style={{ opacity: 0 }}
                />
              </Box>
            </Box>
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
