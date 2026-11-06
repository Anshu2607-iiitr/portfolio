import { createContext, useContext } from "react";
export const MotionCtx = createContext({ enabled: true, toggle: () => {} });
export const useMotionPref = () => useContext(MotionCtx);
