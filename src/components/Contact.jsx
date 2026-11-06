import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Camera, PlayCircle, MessageCircle, ArrowUpRight, Send } from "lucide-react";
import { Github, Linkedin } from "./icons.jsx";
import { site } from "../config/site.js";
import { useMotionPref } from "../motionContext.js";
import { reveal } from "./motion.js";

export function socialLinks() {
  const c = site.contact;
  return [
    c.github && { label: "GitHub", url: c.github, Icon: Github },
    c.linkedin && { label: "LinkedIn", url: c.linkedin, Icon: Linkedin },
    c.instagram && { label: "Instagram", url: c.instagram, Icon: Camera },
    c.youtube && { label: "YouTube", url: c.youtube, Icon: PlayCircle },
    c.behance && { label: "Behance", url: c.behance, Icon: ArrowUpRight },
    c.dribbble && { label: "Dribbble", url: c.dribbble, Icon: ArrowUpRight },
    ...c.otherLinks.map((l) => ({ ...l, Icon: ArrowUpRight })),
  ].filter(Boolean);
}

export default function Contact() {
  const { enabled } = useMotionPref();
  const c = site.contact;
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const copy = async () => {
    try { await navigator.clipboard.writeText(c.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please add your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) er.message = "A few more words, please (10+ characters).";
    setErrors(er);
    if (Object.keys(er).length) { setStatus(""); return; }
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message ready — hit send there to deliver it.");
  };

  const wa = c.whatsapp && `https://wa.me/${c.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${site.identity.displayName}, I saw your portfolio and wanted to reach out.`)}`;
  const socials = socialLinks();
  const field = (k) => ({
    id: `f-${k}`, name: k, value: form[k], "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
  });

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.div {...reveal(enabled)}>
          <span className="eyebrow">04 — Contact</span>
          <h2 id="contact-title" className="contact__title">Let's build<br /><span className="accent">something real.</span></h2>
          <p className="contact__sub">
            {site.identity.availability ? `${site.identity.availability} — ` : ""}internship offers, collaborations and interesting problems all welcome.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div className="contact__direct" {...reveal(enabled, 0.05)}>
            {c.email && (
              <div className="email">
                <a href={`mailto:${c.email}`} className="email__link"><Mail size={20} aria-hidden="true" />{c.email}</a>
                <button type="button" className="icon-btn" onClick={copy} aria-label="Copy email address">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <span className="sr-only" aria-live="polite">{copied ? "Email copied" : ""}</span>
              </div>
            )}
            {wa && (
              <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a>
            )}
            {socials.length > 0 && (
              <ul className="socials">
                {socials.map(({ label, url, Icon }) => (
                  <li key={label}><a href={url} target="_blank" rel="noopener noreferrer"><Icon size={18} aria-hidden="true" />{label}<ArrowUpRight size={14} aria-hidden="true" /></a></li>
                ))}
              </ul>
            )}
          </motion.div>

          {site.preferences.showContactForm && c.email && (
            <motion.form className="form" noValidate onSubmit={submit} {...reveal(enabled, 0.1)}>
              <div className="form__row">
                <label htmlFor="f-name">Name</label>
                <input type="text" autoComplete="name" {...field("name")} />
                {errors.name && <span id="e-name" className="form__err">{errors.name}</span>}
              </div>
              <div className="form__row">
                <label htmlFor="f-email">Email</label>
                <input type="email" autoComplete="email" {...field("email")} />
                {errors.email && <span id="e-email" className="form__err">{errors.email}</span>}
              </div>
              <div className="form__row">
                <label htmlFor="f-message">Message</label>
                <textarea rows="5" {...field("message")} />
                {errors.message && <span id="e-message" className="form__err">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn--accent">Compose email<Send size={16} aria-hidden="true" /></button>
              <p className="form__note" role="status">{status || "Opens your email app — nothing is sent from this page."}</p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
