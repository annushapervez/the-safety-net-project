"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();

    // the bridge: every Lenis scroll frame updates ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // keep one stable reference so we can remove the exact same callback later
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf); // remove first…
      lenis.destroy();         // …then tear down Lenis
    };
  }, []);

  return <>{children}</>;
}