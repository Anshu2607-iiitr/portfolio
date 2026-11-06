import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Sparkles, Pause } from "lucide-react";
import { site } from "../config/site.js";
import { useMotionPref } from "../motionContext.js";

export default function Header({ sections }) {
  const { enabled, toggle } = useMotionPref();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); el && io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, [sections]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); menuBtn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("lock");
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("lock"); };
  }, [open]);

  const { displayName, initials } = site.identity;
  const MotionIcon = enabled ? Pause : Sparkles;

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header__inner">
        <a href="#top" className="wordmark" aria-label={`${displayName} — back to top`}>
          <span className="wordmark__mark">{initials}</span>
          <span className="wordmark__name">{displayName}<span className="dot">.</span></span>
        </a>

        <nav id="site-nav" className={`nav ${open ? "is-open" : ""}`} aria-label="Primary">
          <ul>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}
                   className={active === s.id ? "is-active" : ""} onClick={() => setOpen(false)}>
                  <span className="nav__num">0{i + 1}</span>{s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button type="button" className="motion-toggle" onClick={toggle} aria-pressed={enabled}
                  title={enabled ? site.labels.motionOff : site.labels.motionOn}>
            <MotionIcon size={16} aria-hidden="true" />
            <span className="motion-toggle__label">{enabled ? site.labels.motionOff : site.labels.motionOn}</span>
          </button>
          <a href="#contact" className="btn btn--accent btn--sm header__cta">{site.labels.contact}</a>
          <button ref={menuBtn} type="button" className="menu-btn" aria-expanded={open} aria-controls="site-nav"
                  aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
