import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Play } from "lucide-react";
import { Github } from "./icons.jsx";
import { Cover } from "./ProjectGrid.jsx";
import { ease } from "./motion.js";

function youtubeId(url) {
  const m = url && url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function ProjectDialog({ project, index, onClose }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!project) return;
    document.body.classList.add("lock");
    closeBtn.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll('a[href],button:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("lock"); };
  }, [project, onClose]);

  const yt = project && youtubeId(project.videoUrl);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="dialog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div ref={panel} className="dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dlg-title"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.5, ease }}>
            <button ref={closeBtn} type="button" className="dialog__close" onClick={onClose} aria-label="Close project details"><X size={22} /></button>
            <div className="dialog__media">
              {yt ? (
                <iframe src={`https://www.youtube-nocookie.com/embed/${yt}`} title={`${project.title} video`} loading="lazy"
                        allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
              ) : <Cover project={project} index={index} large />}
            </div>
            <div className="dialog__body">
              <div className="card__tags">
                <span className="tag tag--accent">{project.category}</span>
                {project.year && <span className="tag">{project.year}</span>}
                {project.status && <span className="tag">{project.status}</span>}
              </div>
              <h2 id="dlg-title" className="dialog__title">{project.title}</h2>
              <p className="dialog__lede">{project.summary}</p>
              <div className="dialog__cols">
                <div>
                  <p>{project.description}</p>
                  {project.highlights?.length > 0 && (
                    <>
                      <h3 className="mini">Highlights</h3>
                      <ul className="ticks">{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                    </>
                  )}
                </div>
                <aside className="dialog__side">
                  {project.role && (<><h3 className="mini">Role</h3><p>{project.role}</p></>)}
                  {project.tools?.length > 0 && (
                    <><h3 className="mini">Stack</h3><ul className="stack">{project.tools.map((t) => <li key={t}>{t}</li>)}</ul></>
                  )}
                  <div className="dialog__links">
                    {project.liveUrl && <a className="btn btn--accent btn--sm" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Globe size={16} aria-hidden="true" />Live site</a>}
                    {project.sourceUrl && <a className="btn btn--ghost btn--sm" href={project.sourceUrl} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" />Source</a>}
                    {project.videoUrl && !yt && <a className="btn btn--ghost btn--sm" href={project.videoUrl} target="_blank" rel="noopener noreferrer"><Play size={16} aria-hidden="true" />Video</a>}
                  </div>
                </aside>
              </div>
              {project.gallery?.length > 0 && (
                <div className="gallery">{project.gallery.map((g, i) => (
                  <img key={g} src={g} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
                ))}</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
