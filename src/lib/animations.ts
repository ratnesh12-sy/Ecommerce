/**
 * Shared Framer Motion animation variants used across the application.
 * Import these instead of redefining in each component.
 */

/** Fade up animation with configurable delay via custom index */
export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

/** Stagger children animation container */
export const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
};

/** Faster fade up for compact layouts (e.g. menu, wallet) */
export const fadeUpFast = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

/** Faster stagger container */
export const staggerFast = {
    visible: { transition: { staggerChildren: 0.06 } },
};
