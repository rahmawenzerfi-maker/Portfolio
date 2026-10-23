// src/components/About.tsx
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BarChart3, Code2, Palette, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { about, hero } from "../data/portfolio";

const panelStyles = [
    { Icon: Code2, pos: "left-[4%] top-[8%]", rotate: -4 },
    { Icon: BarChart3, pos: "right-[4%] top-[34%]", rotate: 3 },
    { Icon: Palette, pos: "left-[12%] bottom-[8%]", rotate: -2 },
];

export default function About() {
    const reduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const areaRef = useRef<HTMLDivElement>(null);

    // Playground drifts slightly slower than the page while scrolling
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:px-12"
        >
            <div>
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy dark:text-beige">
                        {about.kicker}
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
                        {about.heading}
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-espresso/85 dark:text-cream/85">
                        {about.body}
                    </p>
                </Reveal>
            </div>

            <motion.div style={{ y }} aria-hidden="true">
                <div
                    ref={areaRef}
                    className="relative h-[22rem] overflow-hidden rounded-3xl border border-espresso/10 bg-beige/40 dark:border-cream/10 dark:bg-cream/5"
                >
                    {/* centre ornament */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-burgundy/30 dark:border-beige/30"
                    >
                        <Sparkles className="text-burgundy dark:text-beige" size={28} />
                    </motion.div>

                    {hero.marquee.map((label, i) => {
                        const style = panelStyles[i];
                        if (!style) return null;
                        const { Icon, pos, rotate } = style;
                        return (
                            <motion.div
                                key={label}
                                drag
                                dragConstraints={areaRef}
                                dragElastic={0.15}
                                dragMomentum={false}
                                initial={{ opacity: 0, scale: 0.8, rotate }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.06 }}
                                whileDrag={{ scale: 1.1, zIndex: 20, cursor: "grabbing" }}
                                transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.12 }}
                                className={`absolute ${pos} flex cursor-grab touch-none items-center gap-3 rounded-2xl border border-espresso/10 bg-cream px-5 py-4 text-sm font-semibold shadow-xl dark:border-cream/15 dark:bg-espresso`}
                            >
                                <Icon size={18} className="text-burgundy dark:text-beige" />
                                {label}
                            </motion.div>
                        );
                    })}

                    <p className="absolute bottom-3 right-4 text-xs uppercase tracking-[0.2em] text-espresso/75 dark:text-cream/75">
                        Drag the panels
                    </p>
                </div>
            </motion.div>
        </section>
    );
}