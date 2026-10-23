// src/components/Skills.tsx
import { useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import type { IconType } from "react-icons";
import {
    FaChartBar,
    FaCode,
    FaCss3Alt,
    FaDatabase,
    FaGitAlt,
    FaGithub,
    FaHtml5,
    FaJava,
    FaJs,
    FaPhp,
    FaReact,
} from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Reveal from "./Reveal";
import { skills, type Skill } from "../data/portfolio";

// Icon for each skill, matched by name
const icons: Record<string, IconType> = {
    PHP: FaPhp,
    Java: FaJava,
    JavaScript: FaJs,
    HTML: FaHtml5,
    CSS: FaCss3Alt,
    React: FaReact,
    SQL: FaDatabase,
    MySQL: SiMysql,
    "Power BI": FaChartBar,
    Git: FaGitAlt,
    GitHub: FaGithub,
    "VS Code": VscVscode,
};

function SkillCard({
    skill,
    className = "w-72 shrink-0",
}: {
    skill: Skill;
    className?: string;
}) {
    const Icon = icons[skill.name] ?? FaCode;

    return (
        <div
            className={`${className} flex items-center gap-4 rounded-2xl border border-espresso/10 bg-cream/70 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-burgundy/50 dark:border-cream/15 dark:bg-cream/5 dark:hover:border-beige/60`}
        >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-beige text-burgundy dark:bg-cream/10 dark:text-beige">
                <Icon size={28} aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy dark:text-beige">
                    {skill.category}
                </p>
                <p className="font-display text-xl leading-tight">{skill.name}</p>
                <p className="mt-0.5 text-sm text-espresso/85 dark:text-cream/85">
                    {skill.detail}
                </p>
            </div>
        </div>
    );
}

function MarqueeRow({
    items,
    reverse = false,
    duration = 45,
}: {
    items: Skill[];
    reverse?: boolean;
    duration?: number;
}) {
    // Repeat the items so the row is always wider than the screen,
    // then render two identical copies for a seamless -50% loop
    const copy = [...items, ...items];

    return (
        <div
            aria-hidden="true"
            className="marquee-pause overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
            <div
                className={`marquee-track flex w-max ${reverse ? "reverse" : ""}`}
                style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
            >
                {[0, 1].map((c) => (
                    <div key={c} className="flex shrink-0 gap-6 pr-6">
                        {copy.map((skill, i) => (
                            <SkillCard key={`${c}-${i}`} skill={skill} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    const reduce = useReducedMotion();
    const [paused, setPaused] = useState(false);

    const half = Math.ceil(skills.length / 2);
    const rowA = skills.slice(0, half);
    const rowB = skills.slice(half);

    return (
        <section id="skills" className="py-20">
            <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6 md:px-12">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy dark:text-beige">
                        What I work with
                    </p>
                    <h2 className="mt-4 font-display text-4xl">Skills & tools</h2>
                </Reveal>

                {!reduce && (
                    <button
                        type="button"
                        onClick={() => setPaused((p) => !p)}
                        aria-pressed={paused}
                        className="inline-flex items-center gap-2 rounded-full border border-espresso/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-burgundy hover:text-cream dark:border-cream/20"
                    >
                        {paused ? (
                            <Play size={14} aria-hidden="true" />
                        ) : (
                            <Pause size={14} aria-hidden="true" />
                        )}
                        {paused ? "Play animation" : "Pause animation"}
                    </button>
                )}
            </div>

            {reduce ? (
                // Reduced motion: a still, readable grid instead of a moving band
                <ul className="mx-auto mt-10 grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-12">
                    {skills.map((skill) => (
                        <li key={skill.name}>
                            <SkillCard skill={skill} className="w-full" />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={`mt-10 ${paused ? "marquee-paused" : ""}`}>
                    {/* Screen readers get a normal list; the moving rows are hidden from them */}
                    <ul className="sr-only">
                        {skills.map((skill) => (
                            <li key={skill.name}>
                                {skill.name}, {skill.category}: {skill.detail}
                            </li>
                        ))}
                    </ul>
                    <MarqueeRow items={rowA} duration={45} />
                    <MarqueeRow items={rowB} reverse duration={50} />
                </div>
            )}
        </section>
    );
}