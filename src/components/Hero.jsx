import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin, Download } from "lucide-react";
import { site } from "../config/site.js";
import { useMotionPref } from "../motionContext.js";
import { ease } from "./motion.js";

export default function Hero() {
  const { enabled } = useMotionPref();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, enabled ? 120 : 0]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, enabled ? 0.25 : 1]);

  const id = site.identity;
  const [first, ...rest] = id.fullName.split(" ");
  const last = rest.join(" ");
  const chips = site.skills.flatMap((g) => g.items).slice(0, 6);

  const up = (d) => enabled
    ? { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay: d } }
    : {};
  const line = (d) => enabled
    ? { initial: { y: "105%" }, animate: { y: 0 }, transition: { duration: 1, ease, delay: d } }
    : {};

  return (
    <section id="top" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.div className="hero__meta" {...up(0.05)}>
          {id.availability && (
            <span className="pill"><span className="pulse" aria-hidden="true" />{id.availability}</span>
          )}
          <span className="hero__role">{id.profession}</span>
          {id.location && <span className="hero__loc"><MapPin size={14} aria-hidden="true" />{id.location}</span>}
        </motion.div>

        <motion.h1 id="hero-title" className="hero__name" style={{ y, opacity: fade }}>
          <span className="mask"><motion.span className="hero__line" {...line(0.1)}>{first}</motion.span></span>
          {last && (
            <span className="mask"><motion.span className="hero__line hero__line--outline" {...line(0.22)}>{last}</motion.span></span>
          )}
          <span className="sr-only"> — {id.profession}</span>
        </motion.h1>

        {id.portrait && (
          <img className="hero__portrait" src={id.portrait} alt={`Portrait of ${id.fullName}`}
               width="560" height="760" fetchpriority="high" />
        )}

        <div className="hero__bottom">
          <motion.div className="hero__copy" {...up(0.45)}>
            <p className="hero__headline">
              {id.headline}
              <span className="hand" aria-hidden="true">{id.roleLine2}</span>
            </p>
            <p className="hero__intro">{id.intro}</p>
            <div className="hero__ctas">
              <a href="#work" className="btn btn--accent magnetic">{site.labels.viewWork}<ArrowDownRight size={18} aria-hidden="true" /></a>
              <a href="#contact" className="btn btn--ghost">{site.labels.contact}<ArrowUpRight size={18} aria-hidden="true" /></a>
              {site.preferences.showDownloadResume && id.resume && (
                <a href={id.resume} className="btn btn--ghost" download><Download size={18} aria-hidden="true" />Résumé</a>
              )}
            </div>
          </motion.div>

          <motion.ul className="hero__chips" aria-label="Core skills" {...up(0.6)}>
            {chips.map((c) => <li key={c}>{c}</li>)}
          </motion.ul>
        </div>

        {site.metrics.length > 0 && (
          <dl className="hero__metrics">
            {site.metrics.map((m) => (
              <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
