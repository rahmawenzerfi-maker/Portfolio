// src/components/Footer.tsx
import { site } from "../data/portfolio";

export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden border-t border-espresso/10 px-6 pb-8 pt-12 dark:border-cream/10 md:px-12">
            <p
                aria-hidden="true"
                className="select-none text-center font-display text-[15vw] leading-none tracking-tight text-espresso/5 dark:text-cream/5"
            >
                {site.brand}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-espresso/85 dark:text-cream/85">
                <span className="font-display text-lg text-espresso dark:text-cream">
                    {site.name}
                    <span className="text-burgundy dark:text-beige">.</span>
                </span>
                <span>Designed with intention · © {new Date().getFullYear()}</span>
                <a
                    href="#"
                    className="transition-colors hover:text-burgundy dark:hover:text-beige"
                >
                    Back to top ↑
                </a>
            </div>
        </footer>
    );
}