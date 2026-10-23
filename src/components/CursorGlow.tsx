// src/components/CursorGlow.tsx
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SIZE = 400;

export default function CursorGlow() {
    const [enabled, setEnabled] = useState(false);
    const x = useMotionValue(-1000);
    const y = useMotionValue(-1000);
    const sx = useSpring(x, { stiffness: 150, damping: 22, mass: 0.5 });
    const sy = useSpring(y, { stiffness: 150, damping: 22, mass: 0.5 });

    // Only on devices with a real mouse, and only if motion is allowed
    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const check = () => setEnabled(fine.matches && !reduce.matches);
        check();
        fine.addEventListener("change", check);
        reduce.addEventListener("change", check);
        return () => {
            fine.removeEventListener("change", check);
            reduce.removeEventListener("change", check);
        };
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const move = (e: PointerEvent) => {
            x.set(e.clientX - SIZE / 2);
            y.set(e.clientY - SIZE / 2);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, [enabled, x, y]);

    if (!enabled) return null;

    return (
        <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy, width: SIZE, height: SIZE }}
            className="pointer-events-none fixed left-0 top-0 z-[5] rounded-full bg-burgundy/15 blur-3xl dark:bg-beige/10"
        />
    );
}