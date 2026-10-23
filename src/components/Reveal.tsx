// src/components/Reveal.tsx
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}