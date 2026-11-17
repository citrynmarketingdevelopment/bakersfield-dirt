import type { CSSProperties } from "react";

/** Sets the stagger index read by the `.rise` entrance animation. */
export const stagger = (index: number) => ({ "--i": index }) as CSSProperties;
