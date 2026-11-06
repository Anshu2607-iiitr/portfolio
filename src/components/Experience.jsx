import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { experience, education } from "../data/experience.js";
import { site } from "../config/site.js";
import { useMotionPref } from "../motionContext.js";
import { reveal, ease } from "./motion.js";

function Item({ item, open, onToggle }) {
  const panelId = `tl-${item.id}`;
  return (
    <li className={`tl__item ${open ? "is-open" : ""}`}>
      <span className="tl__dot" aria-hidden="true" />
      <button type="button" className="tl__head" aria-expanded={open} aria-controls={panelId}
              onClick={onToggle} disabled={!item.description}>
        <span className="tl__period">{item.period}</span>
        <span className="tl__title">{item.title}</span>
        <span className="tl__org">{item.org}{item.type ? ` · ${item.type}` : ""}</span>
        {item.description && <Plus className="tl__icon" size={20} aria-hidden="true" />}
      </button>
      <AnimatePresence initial={false}>
        {open && item.description && (
          <motion.div id={panelId} className="tl__panel" initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
            <p>{item.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Experience() {
  const { enabled } = useMotionPref();
  const [open, setOpen] = useState(experience[0]?.id);
  const p = site.preferences;
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container">
        <motion.div className="section__head" {...reveal(enabled)}>
          <span className="eyebrow">03 — Journey</span>
          <h2 id="journey-title" className="section__title">Built, shipped, <em>learned</em></h2>
        </motion.div>
        <div className="journey">
          {p.showExperience && experience.length > 0 && (
            <motion.div {...reveal(enabled)}>
              <h3 className="mini">Projects & milestones</h3>
              <ol className="tl">
                {experience.map((it) => (
                  <Item key={it.id} item={it} open={open === it.id} onToggle={() => setOpen(open === it.id ? null : it.id)} />
                ))}
              </ol>
            </motion.div>
          )}
          {p.showEducation && education.length > 0 && (
            <motion.div {...reveal(enabled, 0.1)}>
              <h3 className="mini">Education</h3>
              <ul className="edu">
                {education.map((e) => (
                  <li key={e.id}>
                    <span className="tl__period">{e.period}</span>
                    <span className="edu__title">{e.title}</span>
                    <span className="tl__org">{e.org}</span>
                    {e.description && <p>{e.description}</p>}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
