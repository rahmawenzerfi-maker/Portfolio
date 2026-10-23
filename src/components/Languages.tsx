// src/components/Languages.tsx
import { motion } from "motion/react";
import { Award } from "lucide-react";
import Reveal from "./Reveal";
import { languages, type Language } from "../data/portfolio";

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

// How many of the 6 bar segments to fill
function filledSteps(level?: string) {
    if (!level) return 0;
    if (level === "Native") return CEFR.length;
    return CEFR.indexOf(level.slice(0, 2)) + 1; // "A2.2" -> "A2"
}

function LanguageCard({ lang, index }: { lang: Language; index: number }) {
    const steps = filledSteps(lang.level);

    return (
        <motion.li
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-espresso/10 bg-cream/70 p-6 backdrop-blur transition-colors hover:border-burgundy/50 dark:border-cream/15 dark:bg-cream/5 dark:hover:border-beige/60"
        >
            <p
                lang={lang.code}
                dir={lang.code === "ar" ? "rtl" : "ltr"}
                className="text-left font-display text-4xl leading-tight"
            >
                {lang.native}
            </p>
            <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-burgundy dark:text-beige">
                {lang.name}
            </h3>

            <div className="mt-6 flex items-baseline justify-between gap-3">
                <span className="text-base text-espresso/85 dark:text-cream/85">
                    {lang.status}
                </span>
                {lang.level && (
                    <span className="font-display text-2xl text-burgundy dark:text-beige">
                        {lang.level}
                    </span>
                )}
            </div>

            {lang.level && (
                <>
                    {/* Decorative bar; the level is already written in text above */}
                    <div aria-hidden="true" className="mt-3 grid grid-cols-6 gap-1.5">
                        {CEFR.map((step, i) => (
                            <div
                                key={step}
                                className="h-2 overflow-hidden rounded-full bg-espresso/10 dark:bg-cream/15"
                            >
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: i < steps ? 1 : 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="h-full origin-left rounded-full bg-burgundy dark:bg-beige"
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        aria-hidden="true"
                        className="mt-1.5 grid grid-cols-6 gap-1.5 text-xs text-espresso/75 dark:text-cream/75"
                    >
                        {CEFR.map((step) => (
                            <span key={step}>{step}</span>
                        ))}
                    </div>
                </>
            )}

            {lang.certified && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-3 py-1 text-sm dark:border-beige/40">
                    <Award size={14} aria-hidden="true" className="text-burgundy dark:text-beige" />
                    Certified {lang.certified}
                </p>
            )}
        </motion.li>
    );
}

export default function Languages() {
    return (
        <section id="languages" className="mx-auto max-w-7xl px-6 py-20 md:px-12">
            <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy dark:text-beige">
                    Communication
                </p>
                <h2 className="mt-4 font-display text-4xl">Languages I speak</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-espresso/85 dark:text-cream/85">
                    Levels follow the CEFR scale, from A1 (beginner) to C2 (proficient).
                </p>
            </Reveal>

            <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {languages.map((lang, i) => (
                    <LanguageCard key={lang.code} lang={lang} index={i} />
                ))}
            </ul>
        </section>
    );
}