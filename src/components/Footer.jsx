import React from "react";
import { ArrowUp } from "lucide-react";
import { site } from "../config/site.js";
import { socialLinks } from "./Contact.jsx";

export default function Footer({ sections }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__big" aria-hidden="true">{site.identity.fullName}</p>
        <div className="footer__row">
          <p>© {year} {site.identity.fullName}</p>
          <nav aria-label="Footer">
            <ul className="footer__links">
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>)}
              {socialLinks().map(({ label, url }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>
              ))}
            </ul>
          </nav>
          <a href="#top" className="icon-btn" aria-label="Back to top"><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
