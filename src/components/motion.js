import { site } from "../config/site.js";

export const ease = [0.22, 1, 0.36, 1];
const dist = { subtle: 16, balanced: 32, expressive: 48 }[site.appearance.animationIntensity] ?? 32;

export const reveal = (enabled, delay = 0) =>
  enabled
    ? {
        initial: { opacity: 0, y: dist },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: { duration: 0.7, ease, delay },
      }
    : {};
