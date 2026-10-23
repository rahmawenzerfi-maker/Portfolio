// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { navLinks, site } from "../data/portfolio";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    // Blur background after scrolling a little
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Highlight the section currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        navLinks.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // Close the mobile menu with Escape
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    const isDark = theme === "dark";

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || menuOpen
                ? "border-b border-espresso/10 bg-cream/80 backdrop-blur-md dark:border-cream/10 dark:bg-espresso/80"
                : "border-b border-transparent"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
                <a
                    href="#"
                    aria-label={`${site.name} — back to top`}
                    className="font-display text-2xl font-semibold tracking-tight"
                >
                    R<span className="text-burgundy dark:text-beige">.</span>
                </a>

                <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            aria-current={active === href ? "true" : undefined}
                            className={`text-sm font-medium transition-colors hover:text-burgundy dark:hover:text-beige ${active === href ? "text-burgundy dark:text-beige" : ""
                                }`}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        className="rounded-full border border-espresso/15 p-2 transition-colors hover:bg-burgundy hover:text-cream dark:border-cream/20"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={theme}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="block"
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </motion.span>
                        </AnimatePresence>
                    </button>

                    <a
                        href="#contact"
                        className="hidden rounded-full border border-burgundy/25 px-5 py-3 text-sm font-semibold transition-colors hover:bg-burgundy hover:text-cream md:block dark:border-beige/30"
                    >
                        Let's connect <ArrowUpRight className="ml-2 inline" size={14} />
                    </a>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        className="rounded-full border border-espresso/15 p-2 md:hidden dark:border-cream/20"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        id="mobile-menu"
                        aria-label="Mobile"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        className="grid gap-4 border-t border-espresso/10 px-6 py-6 md:hidden dark:border-cream/10"
                    >
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="text-base"
                            >
                                {label}
                            </a>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}