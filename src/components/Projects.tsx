// src/components/Projects.tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import Reveal from "./Reveal";
import { projects, type Project } from "../data/portfolio";

// Les boutons de filtre viennent des catégories présentes dans tes projets
const categories = [
    "All",
    ...Array.from(
        new Set(
            projects.map((p) => p.category).filter((c): c is string => Boolean(c))
        )
    ),
];

// Couleurs des bandeaux (palette du portfolio), utilisées en alternance
const covers = [
    "bg-burgundy text-cream",
    "bg-beige text-espresso",
    "bg-gradient-to-br from-burgundy to-espresso text-cream",
];

function ProjectCard({
    project,
    index,
    onOpen,
}: {
    project: Project;
    index: number;
    onOpen: (p: Project) => void;
}) {
    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-cream/15 bg-cream/5 transition-colors hover:border-beige/60"
        >
            {/* Bandeau : ta capture si `image` est défini, sinon un bandeau coloré */}
            <div
                className={`relative flex h-44 items-center justify-center overflow-hidden px-6 text-center ${covers[index % covers.length]
                    }`}
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={`Preview of ${project.title}`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl italic opacity-15"
                        >
                            {project.id}
                        </span>
                        <span
                            aria-hidden="true"
                            className="relative font-display text-2xl md:text-3xl"
                        >
                            {project.title}
                        </span>
                    </>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                {project.tags && project.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <li
                                key={tag}
                                className="rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-beige"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}

                <h3 className="mt-4 font-display text-2xl">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-base leading-7 text-cream/85">
                    {project.description}
                </p>

                <div className="mt-auto pt-6">
                    <div className="border-t border-cream/15 pt-4">
                        <button
                            type="button"
                            onClick={() => onOpen(project)}
                            className="inline-flex w-full items-center justify-between text-sm font-semibold text-beige"
                        >
                            <span>
                                View Details
                                <span className="sr-only"> of {project.title}</span>
                            </span>
                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </motion.li>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState<Project | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const visible =
        filter === "All" ? projects : projects.filter((p) => p.category === filter);

    // Ouvre/ferme la fenêtre de détails (balise <dialog> native :
    // gère Échap et le focus au clavier toute seule)
    useEffect(() => {
        const d = dialogRef.current;
        if (!d) return;
        if (selected && !d.open) d.showModal();
        if (!selected && d.open) d.close();
        document.body.style.overflow = selected ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selected]);

    return (
        <section
            id="projects"
            className="bg-espresso px-6 py-20 text-cream md:px-12 dark:bg-burgundy/15"
        >
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-beige">
                            Selected work
                        </p>
                        <h2 className="mt-4 font-display text-4xl md:text-5xl">
                            Projects with purpose.
                        </h2>
                        <p className="mt-3 max-w-xl text-base text-cream/85">
                            Explore my latest web platforms and software projects.
                        </p>
                    </Reveal>

                    {categories.length > 2 && (
                        <div
                            role="group"
                            aria-label="Filter projects"
                            className="flex flex-wrap gap-2"
                        >
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    aria-pressed={filter === c}
                                    onClick={() => setFilter(c)}
                                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === c
                                            ? "border-beige bg-beige text-espresso"
                                            : "border-cream/25 text-cream hover:border-beige"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Annoncé aux lecteurs d'écran quand le filtre change */}
                <p className="sr-only" role="status">
                    {visible.length} project{visible.length === 1 ? "" : "s"} shown
                </p>

                <motion.ul
                    layout
                    className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                onOpen={setSelected}
                            />
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>

            {/* Fenêtre "View Details" */}
            <dialog
                ref={dialogRef}
                onClose={() => setSelected(null)}
                onClick={(e) => {
                    if (e.target === e.currentTarget) e.currentTarget.close();
                }}
                aria-labelledby="project-dialog-title"
                className="m-auto w-[min(92vw,40rem)] rounded-2xl bg-cream p-0 text-espresso shadow-2xl backdrop:bg-espresso/70 backdrop:backdrop-blur-sm"
            >
                {selected && (
                    <div className="p-6 sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                {selected.category && (
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">
                                        {selected.category}
                                    </p>
                                )}
                                <h3
                                    id="project-dialog-title"
                                    className="mt-2 font-display text-3xl"
                                >
                                    {selected.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => dialogRef.current?.close()}
                                aria-label="Close details"
                                className="shrink-0 rounded-full border border-espresso/20 p-2 transition-colors hover:bg-burgundy hover:text-cream"
                            >
                                <X size={18} aria-hidden="true" />
                            </button>
                        </div>

                        {selected.tags && selected.tags.length > 0 && (
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {selected.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="rounded-full bg-beige px-3 py-1 text-xs font-semibold text-espresso"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <p className="mt-5 text-base leading-7 text-espresso/85">
                            {selected.description}
                        </p>

                        <div className="mt-6">
                            {selected.url ? (
                                <a
                                    href={selected.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-cream"
                                >
                                    Open project
                                    <span className="sr-only"> (opens in a new tab)</span>
                                    <ArrowUpRight size={16} aria-hidden="true" />
                                </a>
                            ) : (
                                <p className="text-sm font-semibold text-burgundy">
                                    {selected.status}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </dialog>
        </section>
    );
}