// src/components/Journey.tsx
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Award } from "lucide-react";
import Reveal from "./Reveal";
import { certifications, education } from "../data/portfolio";

function Education() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 60%"],
    });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section
            id="education"
            className="border-t border-espresso/10 px-6 py-20 md:px-12 dark:border-cream/10"
        >
            <div className="mx-auto max-w-7xl">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy dark:text-beige">
                        The journey
                    </p>
                    <h2 className="mt-4 font-display text-4xl">Education</h2>
                </Reveal>

                <div ref={ref} className="relative mt-10 pl-8">
                    {/* timeline track + progress line */}
                    <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 top-0 w-px bg-espresso/10 dark:bg-cream/15"
                    >
                        <motion.div
                            style={{ scaleY: reduce ? 1 : scaleY }}
                            className="h-full w-full origin-top bg-burgundy dark:bg-beige"
                        />
                    </div>

                    <ol className="grid gap-10">
                        {education.map((item) => (
                            <li key={item.title} className="relative">
                                <span
                                    aria-hidden="true"
                                    className="absolute -left-[2.45rem] top-1 h-3 w-3 rounded-full border-2 border-burgundy bg-cream dark:border-beige dark:bg-espresso"
                                />
                                <Reveal>
                                    <p className="text-sm text-burgundy dark:text-beige">{item.period}</p>
                                    <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                                    <p className="mt-2 text-base text-espresso/85 dark:text-cream/85">
                                        {item.place}
                                    </p>
                                    <p className="mt-3 max-w-xl text-base leading-6 text-espresso/85 dark:text-cream/85">
                                        {item.description}
                                    </p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

function Certifications() {
    return (
        <section
            id="certifications"
            className="bg-beige/60 px-6 py-20 md:px-12 dark:bg-cream/5"
        >
            <div className="mx-auto max-w-7xl">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy dark:text-beige">
                        Learning & growth
                    </p>
                    <h2 className="mt-4 font-display text-4xl">Certifications</h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-espresso/85 dark:text-cream/85">
                        A collection of certifications and learning milestones that reflect
                        my commitment to continuous development.
                    </p>
                </Reveal>

                {certifications.length === 0 ? (
                    <Reveal delay={0.1} className="mt-8">
                        <div className="rounded-xl border border-espresso/10 bg-cream p-6 dark:border-cream/10 dark:bg-espresso">
                            <p className="font-display text-xl">Your next achievement</p>
                            <p className="mt-2 text-base leading-6 text-espresso/85 dark:text-cream/85">
                                Your real certificates will appear here, with their providers,
                                dates and verification links.
                            </p>
                        </div>
                    </Reveal>
                ) : (
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((cert, i) => (
                            <motion.li
                                key={`${cert.title}-${cert.date}`}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                                whileHover={{ y: -6 }}
                                className="rounded-xl border border-espresso/10 bg-cream p-6 dark:border-cream/10 dark:bg-espresso"
                            >
                                <Award size={20} className="text-burgundy dark:text-beige" />
                                <h3 className="mt-4 font-display text-xl">{cert.title}</h3>
                                <p className="mt-2 text-base text-espresso/85 dark:text-cream/85">
                                    {cert.provider} · {cert.date}
                                </p>
                                {cert.url && (
                                    <a
                                        href={cert.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 inline-flex items-center text-sm font-semibold text-burgundy dark:text-beige"
                                    >
                                        Verify
                                        <span className="sr-only"> {cert.title} (opens in a new tab)</span>
                                        <ArrowUpRight className="ml-1" size={14} />
                                    </a>
                                )}
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default function Journey() {
    return (
        <>
            <Education />
            <Certifications />
        </>
    );
}