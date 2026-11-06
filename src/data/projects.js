// Real projects only. Images are optional: without `coverImage`, the card
// renders a generated typographic cover (no fake screenshots).
// To add a screenshot: put it in public/assets/projects/ and set coverImage.
//
// Template (copy, fill, uncomment):
// {
//   id: "my-project", title: "", category: "", year: "",
//   summary: "", description: "", role: "", tools: [], highlights: [],
//   coverImage: "", gallery: [], videoUrl: "", liveUrl: "", sourceUrl: "",
//   featured: false,
// },

export const projects = [
  {
    id: "tokengate",
    title: "TokenGate",
    category: "Backend",
    year: "2026",
    summary: "An LLM API cost gateway that tracks AI usage and spend per team.",
    description:
      "A proxy that sits between an organisation's apps and LLM providers. Every request is attributed to a team, metered for tokens and cost, and checked against that team's budget, with usage events streamed through Kafka for downstream reporting.",
    role: "Solo — design and implementation",
    tools: ["Java", "Spring Boot", "Apache Kafka", "REST"],
    highlights: [
      "Per-team usage and cost tracking",
      "Budget enforcement at the proxy layer",
      "Usage events published to Kafka",
      "Next up: semantic caching and a load-tested demo client",
    ],
    status: "In progress",
    coverImage: "",
    sourceUrl: "https://github.com/Anshu2607-iiitr/tokengate",
    liveUrl: "",
    featured: true,
  },
  {
    id: "bharatbrief",
    title: "BharatBrief",
    category: "Full-Stack",
    year: "2026",
    summary: "Government press releases turned into plain-language voice explainers on Telegram.",
    description:
      "Built for the Forge Hackathon (NxtWave Launchpad) with teammates Mayank Dixit and Aditya Pratap. BharatBrief — also called Sarkari Khabar Saathi — takes live PIB press releases and turns them into simple Hindi voice explainers delivered through a Telegram bot, with a companion website. The hackathon banned mock data, so everything runs on live sources.",
    role: "Team of three — built and deployed the bot, website and worker",
    tools: ["Telegram Bot API", "Web", "Render"],
    highlights: [
      "Telegram bot as the primary product, website as companion",
      "Live data only — no mocks",
      "Bot, website and background worker deployed on Render",
    ],
    coverImage: "",
    sourceUrl: "https://github.com/Anshu2607-iiitr/Bharat_brief",
    liveUrl: "https://bharatbrief-j3e3.onrender.com",
    featured: true,
  },
  {
    id: "jeeguide",
    title: "JEEGuide",
    category: "Web",
    year: "",
    summary: "A free JoSAA / CSAB counselling guide for JEE students.",
    description:
      "A free website that helps JEE students navigate JoSAA and CSAB counselling and college choices, built for the Indian student community. Includes work with CSAB cutoff and rank data and a promotional campaign designed in a modern glassmorphism style.",
    role: "Solo — design, build and launch",
    tools: ["HTML", "CSS", "JavaScript", "Netlify"],
    highlights: ["Free for every student", "Counselling and cutoff guidance", "Deployed on Netlify"],
    coverImage: "",
    sourceUrl: "",
    liveUrl: "https://sparkly-meerkat-1a09ab.netlify.app",
    featured: true,
  },
  {
    id: "takatime-export",
    title: "TakaTime — taka-export",
    category: "Open Source",
    year: "",
    summary: "Export command for an open-source Go developer time-tracker.",
    description:
      "Contribution to TakaTime, an open-source developer time-tracking tool written in Go. Implemented the taka-export command (issue #56): an exporter package, a CLI binary, and an updated GitHub Actions release workflow.",
    role: "Open-source contributor",
    tools: ["Go", "GitHub Actions", "CLI"],
    highlights: ["New exporter package", "Standalone CLI binary", "Release workflow updated"],
    coverImage: "",
    sourceUrl: "", // ← add the TakaTime repo / PR link
    liveUrl: "",
    featured: false,
  },
  {
    id: "devpath",
    title: "DevPath",
    category: "Web",
    year: "",
    summary: "A CodeChef-inspired platform for learning web development.",
    description:
      "An interactive learning platform with live code editing, AI-powered error detection through the Claude API, quizzes, and an XP and streak system. A React version adds a structured curriculum and regex-based test validation.",
    role: "Solo",
    tools: ["React", "JavaScript", "Claude API"],
    highlights: ["Live code editor", "AI error detection", "XP, streaks and quizzes"],
    coverImage: "",
    sourceUrl: "",
    liveUrl: "",
    featured: false,
  },
  {
    id: "easemotion",
    title: "EaseMotion fix",
    category: "Open Source",
    year: "",
    summary: "Fixed missing responsive utility classes in an open-source CSS library.",
    description:
      "Added the missing ease-md-* utility classes to EaseMotion, an open-source CSS project, verified the fix in the browser, and submitted it as a pull request.",
    role: "Open-source contributor",
    tools: ["CSS", "Git"],
    highlights: ["Missing ease-md-* utilities added", "Verified with DevTools", "Submitted as a PR"],
    coverImage: "",
    sourceUrl: "", // ← add the PR link
    liveUrl: "",
    featured: false,
  },
];
