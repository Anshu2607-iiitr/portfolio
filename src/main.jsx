import React, { useEffect, useState } from "react";
import { MotionCtx } from "./motionContext.js";
import { createRoot } from "react-dom/client";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { site, storageKey } from "./config/site.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ProjectGrid from "./components/ProjectGrid.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { experience, education } from "./data/experience.js";
// Self-hosted fonts (no third-party requests). If you change fonts in
// site.appearance, install the matching @fontsource package and swap these.
import "@fontsource/anton/latin-400.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/caveat/latin-600.css";
import "./styles.css";


function readStored() {
  try {
    const v = localStorage.getItem(storageKey);
    if (v === "on") return true;
    if (v === "off") return false;
  } catch {}
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applyTokens() {
  const a = site.appearance, r = document.documentElement.style;
  r.setProperty("--bg", a.background);
  r.setProperty("--text", a.text);
  r.setProperty("--accent", a.accent);
  r.setProperty("--muted", a.muted);
  r.setProperty("--font-display", `"${a.displayFont}", "Impact", "Arial Narrow", sans-serif`);
  r.setProperty("--font-body", `"${a.bodyFont}", system-ui, -apple-system, "Segoe UI", sans-serif`);
  r.setProperty("--font-hand", `"${a.accentFont}", "Comic Sans MS", cursive`);
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

function App() {
  const [enabled, setEnabled] = useState(readStored);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
    // Magnetic CTA — fine pointers only, purely decorative.
    const els = [...document.querySelectorAll(".magnetic")];
    const move = (e) => {
      const el = e.currentTarget, r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
    };
    const reset = (e) => { e.currentTarget.style.transform = ""; };
    els.forEach((el) => { el.addEventListener("pointermove", move); el.addEventListener("pointerleave", reset); });
    return () => els.forEach((el) => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); el.style.transform = ""; });
  }, [enabled]);
  const toggle = () =>
    setEnabled((e) => {
      try { localStorage.setItem(storageKey, e ? "off" : "on"); } catch {}
      return !e;
    });

  const p = site.preferences;
  const showJourney = (p.showExperience && experience.length > 0) || (p.showEducation && education.length > 0);
  const sections = [
    { id: "work", label: site.labels.nav.work },
    { id: "about", label: site.labels.nav.about },
    showJourney && { id: "journey", label: site.labels.nav.journey },
    { id: "contact", label: site.labels.nav.contact },
  ].filter(Boolean);

  return (
    <MotionCtx.Provider value={{ enabled, toggle }}>
      <MotionConfig reducedMotion={enabled ? "never" : "always"}>
        <a className="skip" href="#main">Skip to content</a>
        {enabled && <ScrollProgress />}
        <Header sections={sections} />
        <main id="main">
          <Hero />
          <ProjectGrid />
          <About />
          {showJourney && <Experience />}
          <Contact />
        </main>
        <Footer sections={sections} />
      </MotionConfig>
    </MotionCtx.Provider>
  );
}

applyTokens();
createRoot(document.getElementById("root")).render(<App />);
