import React from "react";
import { motion } from "framer-motion";
import { site } from "../config/site.js";
import { useMotionPref } from "../motionContext.js";
import { reveal } from "./motion.js";

export default function About() {
  const { enabled } = useMotionPref();
  const about = [].concat(site.identity.about).filter(Boolean);
  return (
    <section id="about" className="section section--alt" aria-labelledby="about-title">
      <div className="container">
        <motion.div className="section__head" {...reveal(enabled)}>
          <span className="eyebrow">02 — About</span>
          <h2 id="about-title" className="section__title">Backend first, <em>never</em> backend only</h2>
        </motion.div>

        <div className="about">
          <motion.div className="about__bio" {...reveal(enabled, 0.05)}>
            {about.map((p, i) => <p key={i} className={i === 0 ? "about__lead" : ""}>{p}</p>)}
            {site.tools.length > 0 && (
              <p className="about__tools"><span className="mini">Daily tools</span>{site.tools.join(" · ")}</p>
            )}
          </motion.div>

          <div className="skills">
            {site.skills.map((g, i) => (
              <motion.div key={g.group} className="skills__group" {...reveal(enabled, 0.08 * i)}>
                <h3 className="mini">{g.group}</h3>
                <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </div>

        {site.preferences.showProcess && site.processSteps.length > 0 && (
          <ol className="process" aria-label="How I work">
            {site.processSteps.map((s, i) => (
              <motion.li key={s.title} {...reveal(enabled, 0.06 * i)}>
                <span className="process__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
