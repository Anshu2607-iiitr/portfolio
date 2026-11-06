import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Globe } from "lucide-react";
import { Github } from "./icons.jsx";
import { projects } from "../data/projects.js";
import { site } from "../config/site.js";
import { useMotionPref } from "../motionContext.js";
import { reveal, ease } from "./motion.js";
import ProjectDialog from "./ProjectDialog.jsx";

const PAGE = 6;

export function Cover({ project, index, large }) {
  if (project.coverImage) {
    return <img className="cover__img" src={project.coverImage} alt={`${project.title} preview`}
                loading="lazy" width="1200" height="750" />;
  }
  const word = project.title.split(/[\s—-]+/)[0];
  return (
    <div className={`cover ${large ? "cover--lg" : ""}`} aria-hidden="true">
      <span className="cover__num">{String(index + 1).padStart(2, "0")}</span>
      <span className="cover__word" style={{ "--len": Math.max(word.length, 3) }}>{word}</span>
      <span className="cover__cat">{project.category}</span>
      <span className="cover__bar" />
    </div>
  );
}

function Card({ project, index, onOpen, large }) {
  const { enabled } = useMotionPref();
  return (
    <motion.article className={`card ${large ? "card--feat" : ""}`}
      layout={enabled ? "position" : false}
      initial={enabled ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={enabled ? { opacity: 0, scale: 0.97 } : undefined}
      transition={{ duration: 0.5, ease }}>
      <button type="button" className="card__hit" onClick={(e) => onOpen(project, e.currentTarget)}
              aria-label={`Open details for ${project.title}`}>
        <div className="card__media"><Cover project={project} index={index} large={large} /></div>
        <div className="card__body">
          <div className="card__tags">
            <span className="tag tag--accent">{project.category}</span>
            {project.year && <span className="tag">{project.year}</span>}
            {project.status && <span className="tag">{project.status}</span>}
          </div>
          <h3 className="card__title">{project.title}</h3>
          <p className="card__summary">{project.summary}</p>
          <span className="card__more">Case study <ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
      </button>
      {(project.liveUrl || project.sourceUrl) && (
        <div className="card__links">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`}><Globe size={16} /></a>}
          {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}><Github size={16} /></a>}
        </div>
      )}
    </motion.article>
  );
}

export default function ProjectGrid() {
  const { enabled } = useMotionPref();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const opener = useRef(null);

  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const archive = site.preferences.showProjectArchive ? projects : [];
  const cats = useMemo(() => ["All", ...new Set(archive.map((p) => p.category))], [archive]);

  const filtered = archive.filter((p) => {
    if (filter !== "All" && p.category !== filter) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [p.title, p.summary, p.category, ...(p.tools || [])].join(" ").toLowerCase().includes(q);
  });
  const shown = filtered.slice(0, count);

  const openProject = (p, el) => { opener.current = el; setOpen(p); };
  const close = () => { setOpen(null); requestAnimationFrame(() => opener.current?.focus()); };
  const idx = (p) => projects.indexOf(p);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <motion.div className="section__head" {...reveal(enabled)}>
          <span className="eyebrow">01 — Selected work</span>
          <h2 id="work-title" className="section__title">Things I've <em>shipped</em></h2>
        </motion.div>

        {projects.length === 0 ? (
          <div className="empty">
            <p className="empty__title">Projects are on their way.</p>
            <p>New work is being prepared. In the meantime, <a href="#contact">get in touch</a>.</p>
          </div>
        ) : (
          <>
            <div className="feat-grid">
              {featured.map((p, i) => (
                <motion.div key={p.id} {...reveal(enabled, i * 0.08)}>
                  <Card project={p} index={idx(p)} onOpen={openProject} large />
                </motion.div>
              ))}
            </div>

            {archive.length > 0 && (
              <div className="archive">
                <div className="archive__bar">
                  <h3 className="archive__title">All projects <span className="muted">({filtered.length})</span></h3>
                  <div className="filters" role="group" aria-label="Filter by category">
                    {cats.map((c) => (
                      <button key={c} type="button" className={`filter ${filter === c ? "is-on" : ""}`}
                              aria-pressed={filter === c} onClick={() => { setFilter(c); setCount(PAGE); }}>
                        {c}
                        {filter === c && enabled && <motion.span layoutId="filter-ul" className="filter__ul" transition={{ duration: 0.4, ease }} />}
                        {filter === c && !enabled && <span className="filter__ul" />}
                      </button>
                    ))}
                  </div>
                  <label className="search">
                    <Search size={16} aria-hidden="true" />
                    <span className="sr-only">Search projects</span>
                    <input type="search" placeholder="Search projects or tools" value={query}
                           onChange={(e) => { setQuery(e.target.value); setCount(PAGE); }} />
                  </label>
                </div>

                <p className="sr-only" aria-live="polite">{filtered.length} projects shown</p>
                {shown.length === 0 ? (
                  <div className="empty"><p>No projects match “{query}”.</p>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setQuery(""); setFilter("All"); }}>Clear filters</button>
                  </div>
                ) : (
                  <motion.div className="grid" layout={enabled}>
                    <AnimatePresence mode="popLayout">
                      {shown.map((p) => <Card key={p.id} project={p} index={idx(p)} onOpen={openProject} />)}
                    </AnimatePresence>
                  </motion.div>
                )}
                {filtered.length > count && (
                  <div className="center"><button type="button" className="btn btn--ghost" onClick={() => setCount((c) => c + PAGE)}>Load more</button></div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <ProjectDialog project={open} index={open ? idx(open) : 0} onClose={close} />
    </section>
  );
}
