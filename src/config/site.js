// ─────────────────────────────────────────────────────────────
//  SITE CONFIG — the ONLY place personal details live.
//  Header, hero, metadata, contact and footer all read from here.
//  Empty string / empty array = that item or section is hidden.
// ─────────────────────────────────────────────────────────────

export const site = {
  referenceWebsite: "https://touquirakhtar.com/", // design inspiration only
  websiteUrl: "", // ← paste your Netlify URL here once live (used for canonical/OG tags)

  identity: {
    fullName: "Anshu Kumar",
    displayName: "Anshu",
    profession: "Backend & Full-Stack Developer",
    roleLine2: "Java · Spring Boot · Go · React",
    location: "", // optional, e.g. "Ranchi, India"
    availability: "Open to internships", // set "" to hide
    headline: "I build backends that hold up.",
    intro:
      "I'm a Computer Science student at IIIT Ranchi who builds API-first systems and the interfaces around them. Right now that means an LLM cost gateway in Spring Boot and Kafka, open-source Go tooling, and live products people can actually use.",
    about: [
      "I'm in my B.Tech in Computer Science & Engineering at IIIT Ranchi (graduating 2029). Most of my time goes into backend work — Java and Spring Boot, event streaming with Kafka, and Go for small, sharp tools.",
      "I prefer projects that solve a real, current problem over clones of existing products. TokenGate came from that: teams calling LLM APIs have no easy way to see or cap what each team spends, so I'm building the proxy that does.",
      "Outside projects I do competitive programming and contribute to open source, which is where I learned to read unfamiliar codebases and ship changes other people review.",
    ],
    portrait: "", // e.g. "/assets/portrait.webp" — leave "" for the typographic hero
    resume: "", // e.g. "/assets/resume.pdf"
    initials: "AK",
  },

  contact: {
    email: "ak7342405@gmail.com", // ← confirm this is the address you want public
    phone: "",
    whatsapp: "", // international digits only, e.g. "919876543210"
    linkedin: "https://www.linkedin.com/in/anshu-kumar-4b7462364",
    github: "https://github.com/Anshu2607-iiitr",
    instagram: "https://www.instagram.com/anshu_2607_/",
    youtube: "",
    behance: "",
    dribbble: "",
    otherLinks: [], // [{ label: "LeetCode", url: "https://..." }]
  },

  skills: [
    { group: "Backend", items: ["Java", "Spring Boot", "Apache Kafka", "REST APIs", "Go"] },
    { group: "Frontend", items: ["React", "JavaScript", "HTML", "CSS"] },
    { group: "Also working with", items: ["Kotlin", "Jetpack Compose", "Telegram Bot API", "Claude API"] },
    { group: "Practice", items: ["Data structures & algorithms", "Competitive programming", "Git & open source"] },
  ],

  tools: ["Git", "GitHub Actions", "VS Code", "Render", "Netlify"],

  processSteps: [
    { title: "Find the real problem", text: "Start from something people are struggling with now, not a feature list." },
    { title: "Design the API first", text: "Pin down contracts, data and failure modes before the UI." },
    { title: "Ship it live", text: "Deploy early on real infrastructure with real data — no mocks." },
    { title: "Prove it", text: "Load-test, measure, and iterate on what the numbers say." },
  ],

  metrics: [], // verified stats only, e.g. [{ value: "500+", label: "problems solved" }]

  appearance: {
    theme: "dark",
    background: "#090909",
    text: "#f2efeb",
    accent: "#e32b3c",
    muted: "#a09c9a",
    displayFont: "Anton",
    bodyFont: "Manrope",
    accentFont: "Caveat",
    animationIntensity: "balanced", // subtle | balanced | expressive
    language: "English",
  },

  preferences: {
    showAwards: false,
    showEducation: true,
    showExperience: true,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: false,
    showProjectArchive: true,
    showProcess: true,
  },

  labels: {
    nav: { work: "Work", about: "About", journey: "Journey", contact: "Contact" },
    viewWork: "View work",
    contact: "Get in touch",
    motionOn: "Motion on",
    motionOff: "Motion off",
  },
};

export const storageKey = `${(site.identity.displayName || "portfolio").toLowerCase().replace(/\W+/g, "-")}-motion`;
