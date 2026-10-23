// src/components/Contact.tsx
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
    ArrowUpRight,
    Check,
    Mail,
    MapPin,
    Phone,
    Send,
    type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { site, socials } from "../data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

function InfoRow({
    Icon,
    value,
    href,
}: {
    Icon: LucideIcon;
    value: string;
    href?: string;
}) {
    return (
        <li className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/15 text-beige">
                <Icon size={18} aria-hidden="true" />
            </span>
            {href ? (
                <a href={href} className="text-base text-cream hover:underline">
                    {value}
                </a>
            ) : (
                <span className="text-base text-cream">{value}</span>
            )}
        </li>
    );
}

const inputClass =
    "mt-1.5 w-full rounded-xl border border-espresso/15 bg-beige/30 px-4 py-3 text-base text-espresso placeholder:text-espresso/50 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/30";

function Visual() {
    if (site.contactImage) {
        return (
            <img
                src={site.contactImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-96 w-full max-w-xs rounded-t-[48%] object-cover object-top"
            />
        );
    }

    // Fallback: decorative animated paper plane
    return (
        <div
            aria-hidden="true"
            className="relative mx-auto flex h-64 w-64 items-center justify-center"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-beige/40"
            />
            <motion.div
                animate={{ y: [0, -12, 0], rotate: [-6, 4, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-28 w-28 items-center justify-center rounded-3xl bg-cream/15 text-beige backdrop-blur"
            >
                <Send size={44} />
            </motion.div>
        </div>
    );
}

export default function Contact() {
    const [status, setStatus] = useState<Status>("idle");
    const [feedback, setFeedback] = useState("");

    const canSend = site.formEndpoint.trim() !== "" || site.email.trim() !== "";

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        // Option A: a form service (e.g. Formspree) delivers it to your inbox
        if (site.formEndpoint) {
            setStatus("sending");
            try {
                const res = await fetch(site.formEndpoint, {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: data,
                });
                if (!res.ok) throw new Error("Request failed");
                form.reset();
                setStatus("sent");
                setFeedback("Thank you! Your message was sent.");
            } catch {
                setStatus("error");
                setFeedback("Something went wrong. Please try again or email me directly.");
            }
            return;
        }

        // Option B: open the visitor's email app with everything filled in
        if (site.email) {
            const name = String(data.get("name") ?? "");
            const email = String(data.get("email") ?? "");
            const subject = String(data.get("subject") ?? "") || `Message from ${name}`;
            const message = String(data.get("message") ?? "");
            const body = `${message}\n\n— ${name} (${email})`;
            window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`;
            setStatus("sent");
            setFeedback("Your email app should open with the message ready to send.");
        }
    }

    return (
        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
            <Reveal>
                <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-espresso via-espresso to-burgundy p-6 text-cream sm:p-10 lg:grid-cols-[0.9fr_1.25fr_0.55fr] dark:border dark:border-cream/15">
                    {/* LEFT: intro + details */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-beige">
                            Let's talk
                        </p>
                        <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                            Have an idea? Let's make something meaningful.
                        </h2>
                        <p className="mt-4 text-base text-cream/85">
                            Open to learning opportunities, collaborations and future
                            projects.
                        </p>

                        <ul className="mt-8 grid gap-4">
                            {site.email && (
                                <InfoRow Icon={Mail} value={site.email} href={`mailto:${site.email}`} />
                            )}
                            {site.phone && (
                                <InfoRow
                                    Icon={Phone}
                                    value={site.phone}
                                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                                />
                            )}
                            {site.location && <InfoRow Icon={MapPin} value={site.location} />}
                        </ul>

                        {socials.length > 0 && (
                            <ul className="mt-8 flex flex-wrap gap-3">
                                {socials.map((s) => (
                                    <li key={s.href}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-cream hover:text-espresso"
                                        >
                                            {s.label}
                                            <span className="sr-only"> (opens in a new tab)</span>
                                            <ArrowUpRight className="ml-1" size={14} aria-hidden="true" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* MIDDLE: form card */}
                    <form
                        onSubmit={onSubmit}
                        className="rounded-2xl bg-cream p-6 text-espresso shadow-2xl sm:p-8"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="c-name" className="text-sm font-semibold">
                                    Your name
                                </label>
                                <input
                                    id="c-name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Your name"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="c-email" className="text-sm font-semibold">
                                    Your email
                                </label>
                                <input
                                    id="c-email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="c-subject" className="text-sm font-semibold">
                                Subject
                            </label>
                            <input
                                id="c-subject"
                                name="subject"
                                type="text"
                                placeholder="What is it about?"
                                className={inputClass}
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="c-message" className="text-sm font-semibold">
                                Your message
                            </label>
                            <textarea
                                id="c-message"
                                name="message"
                                required
                                rows={5}
                                placeholder="Tell me about your idea…"
                                className={`${inputClass} resize-y`}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={!canSend || status === "sending"}
                            whileHover={canSend ? { y: -3 } : undefined}
                            whileTap={canSend ? { scale: 0.97 } : undefined}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-6 py-4 text-sm font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {status === "sending" ? (
                                "Sending…"
                            ) : status === "sent" ? (
                                <>
                                    Done <Check size={16} aria-hidden="true" />
                                </>
                            ) : (
                                <>
                                    Send Message <Send size={16} aria-hidden="true" />
                                </>
                            )}
                        </motion.button>

                        {/* Announced to screen readers when it changes */}
                        <p
                            role="status"
                            aria-live="polite"
                            className={`mt-3 text-sm ${status === "error" ? "text-burgundy" : "text-espresso/85"
                                }`}
                        >
                            {feedback}
                        </p>

                        {!canSend && import.meta.env.DEV && (
                            <p className="mt-3 rounded-lg bg-beige/60 p-3 text-sm text-espresso">
                                Dev note: set <code>site.email</code> (or{" "}
                                <code>site.formEndpoint</code>) in src/data/portfolio.ts to
                                enable sending. Visitors never see this message.
                            </p>
                        )}
                    </form>

                    {/* RIGHT: visual (hidden on small screens) */}
                    <div className="hidden lg:block">
                        <Visual />
                    </div>
                </div>
            </Reveal>
        </section>
    );
}