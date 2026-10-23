// src/components/Hero.tsx
import {
    Fragment,
    type PointerEvent as ReactPointerEvent,
    type ReactNode,
} from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
    type MotionValue,
    type Variants,
} from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { hero, site } from "../data/portfolio";

const headlineLines = [
    { text: "Ideas into", accent: false },
    { text: "meaningful", accent: true },
    { text: "digital experiences.", accent: false },
];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const lineReveal: Variants = {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

/* A glass panel that floats and shifts with the mouse. `depth` = max px shift. */
function FloatingPanel({
    x,
    y,
    depth,
    delay = 0,
    className = "",
    children,
}: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    depth: number;
    delay?: number;
    className?: string;
    children: ReactNode;
}) {
    const tx = useTransform(x, (v) => v * depth);
    const ty = useTransform(y, (v) => v * depth);

    return (
        <motion.div style={{ x: tx, y: ty }} className={`absolute z-10 ${className}`}>
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 5 + delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                }}
                className="flex items-center gap-2 rounded-2xl border border-espresso/10 bg-cream/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg backdrop-blur dark:border-cream/15 dark:bg-espresso/70"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

function Marquee({ items, reduce }: { items: string[]; reduce: boolean }) {
    const wrapper =
        "border-y border-espresso/10 bg-beige/50 text-xs font-semibold uppercase tracking-[0.2em] text-espresso/85 dark:border-cream/10 dark:bg-cream/5 dark:text-cream/85";

    // Reduced motion: static row, like your original strip
    if (reduce) {
        return (
            <div className={wrapper}>
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-6 md:px-12">
                    {items.map((item, i) => (
                        <Fragment key={item}>
                            {i > 0 && (
                                <span aria-hidden="true" className="text-burgundy dark:text-beige">
                                    ✳
                                </span>
                            )}
                            <span>{item}</span>
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`${wrapper} overflow-hidden py-6`}>
            <p className="sr-only">{items.join(", ")}</p>
            <motion.div
                aria-hidden="true"
                className="flex w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
                        {[0, 1, 2].map((rep) =>
                            items.map((item) => (
                                <Fragment key={`${rep}-${item}`}>
                                    <span>{item}</span>
                                    <span className="text-burgundy dark:text-beige">✳</span>
                                </Fragment>
                            ))
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function Hero() {
    const reduce = useReducedMotion() ?? false;

    // Mouse position inside the hero, normalised to -1 … 1
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 80, damping: 18 });
    const sy = useSpring(my, { stiffness: 80, damping: 18 });
    const rotateY = useTransform(sx, [-1, 1], [-8, 8]);
    const rotateX = useTransform(sy, [-1, 1], [8, -8]);

    const onMove = (e: ReactPointerEvent<HTMLElement>) => {
        if (reduce || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    const [pillarA, pillarB, pillarC] = hero.marquee;

    return (
        <>
            <section
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-32 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:pb-20"
            >
                {/* LEFT: text */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                    className="relative"
                >
                    <motion.p
                        variants={fadeUp}
                        className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-burgundy dark:text-beige"
                    >
                        <span className="h-px w-8 bg-burgundy dark:bg-beige" />
                        {hero.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                        className="font-display text-5xl leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        {headlineLines.map((line) => (
                            <span key={line.text} className="block overflow-hidden pb-1">
                                <motion.span
                                    variants={lineReveal}
                                    className={`block ${line.accent ? "italic text-burgundy dark:text-beige" : ""
                                        }`}
                                >
                                    {line.text}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-7 max-w-lg text-base leading-7 text-espresso/85 dark:text-cream/85"
                    >
                        {hero.intro}
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
                        <motion.a
                            href="#projects"
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-full bg-burgundy px-6 py-4 text-sm font-semibold text-cream"
                        >
                            Explore my work <ArrowRight className="ml-2 inline" size={15} />
                        </motion.a>
                        <a
                            href="#about"
                            className="px-4 py-3 text-sm font-semibold transition-colors hover:text-burgundy dark:hover:text-beige"
                        >
                            Discover my story <ArrowDownRight className="ml-1 inline" size={15} />
                        </a>
                    </motion.div>

                    <motion.p
                        variants={fadeUp}
                        className="mt-12 text-xs uppercase tracking-[0.2em] text-espresso/75 dark:text-cream/75"
                    >
                        {hero.values}
                    </motion.p>
                </motion.div>

                {/* RIGHT: tilting card + floating panels */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative mx-auto w-full max-w-md"
                >
                    {/* Decorative panels: aria-hidden because the same text exists elsewhere */}
                    <div aria-hidden="true">
                        <FloatingPanel x={sx} y={sy} depth={34} className="-left-3 top-4">
                            <span className="flex gap-1">
                                <span className="h-2 w-2 rounded-full bg-burgundy" />
                                <span className="h-2 w-2 rounded-full bg-beige" />
                                <span className="h-2 w-2 rounded-full bg-espresso dark:bg-cream" />
                            </span>
                            {site.brand}
                        </FloatingPanel>

                        <FloatingPanel x={sx} y={sy} depth={-26} delay={0.6} className="-right-3 top-1/3">
                            {pillarA}
                        </FloatingPanel>

                        <FloatingPanel x={sx} y={sy} depth={22} delay={1.2} className="-left-2 bottom-1/4">
                            {pillarB}
                        </FloatingPanel>

                        <FloatingPanel x={sx} y={sy} depth={-38} delay={0.3} className="-bottom-4 right-6">
                            {pillarC}
                        </FloatingPanel>
                    </div>

                    <motion.div
                        style={{ rotateX, rotateY, transformPerspective: 900 }}
                        className="relative"
                    >
                        <div className="absolute -right-3 -top-3 h-full w-full rounded-[48%_48%_8px_8px] border border-burgundy/25 dark:border-beige/30" />

                        <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[48%_48%_8px_8px] bg-beige p-8 sm:p-10 dark:bg-cream/10">
                            {/* TA PHOTO */}
                            <img
                                src="/me.jfif"
                                alt="Portrait de Rahma souriant"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover object-top"
                            />

                            {/* Dégradé pour garder le texte lisible */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent"
                            />

                            <div className="relative text-cream">
                                <div className="mb-5 h-px w-12 bg-beige" />
                                <p className="font-display text-3xl leading-snug">
                                    Building with
                                    <br />
                                    <span className="italic text-beige">purpose.</span>
                                </p>
                                <p className="mt-3 text-sm leading-6 text-cream/85">
                                    Technology meets creativity.
                                </p>
                                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-cream/75">
                                    Portfolio · 2026
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            <Marquee items={hero.marquee} reduce={reduce} />
        </>
    );
}