// src/data/portfolio.ts

export const site = {
    name: "Rahma",
    brand: "RAHMA.EXE",
    tagline: "A World in Motion",
    email: "rahmawenzerfi@gmail.com", // TODO: add your real email address
    phone: "97976272", // TODO (optional): leave empty to hide the phone row
    location: "Tunis, Tunisia",
    // TODO (optional): paste a Formspree form URL so messages go straight to
    // your inbox without opening the visitor's email app
    formEndpoint: "https://formspree.io/f/mqpejdqa",
    // TODO (optional): your own image for the right side,
    // e.g. "/contact.png" (file placed in the public/ folder)
    contactImage: "/contact.jfif",
};

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Certificates", href: "#certifications" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export const hero = {
    eyebrow: "Business Computing · ESSECT",
    intro:
        "I'm Rahma, a Business Computing student passionate about development, technology and creating thoughtful digital solutions.",
    marquee: ["Development", "Data & Intelligence", "Creative Thinking"],
    values: "Curious mind · Thoughtful work · Continuous growth",
};

export const about = {
    kicker: "A little about me",
    heading: "Combining logical thinking with a love for creating.",
    body: "I enjoy exploring how technology can transform ideas into useful, accessible and carefully designed experiences. This portfolio is where I'll share my learning journey and the projects I'm proud of.",
};

export const education = [
    {
        period: "Current studies",
        title: "Business Computing",
        place: "ESSECT · Tunis, Tunisia",
        description:
            "Exploring software development, information systems and the relationship between business needs and technology.",
    },
];

export interface Certification {
    title: string;
    provider: string;
    date: string;
    url?: string;
}

// TODO: add your real certificates, for example:
// { title: "...", provider: "...", date: "...", url: "https://..." }
export const certifications: Certification[] = [];

export interface Skill {
    name: string;
    category: string;
    detail: string;
}

// Same 12 skills as before, now listed individually.
// The "detail" lines are neutral descriptions of each technology;
// edit them freely to say what YOU do with it.
export const skills: Skill[] = [
    { name: "PHP", category: "Development", detail: "Server-side web scripting" },
    { name: "Java", category: "Development", detail: "Object-oriented applications" },
    { name: "JavaScript", category: "Development", detail: "Interactive web logic" },
    { name: "HTML", category: "Frontend", detail: "Page structure and semantics" },
    { name: "CSS", category: "Frontend", detail: "Layout and visual styling" },
    { name: "React", category: "Frontend", detail: "Component-based interfaces" },
    { name: "SQL", category: "Data", detail: "Querying relational data" },
    { name: "MySQL", category: "Data", detail: "Relational database system" },
    { name: "Power BI", category: "Data", detail: "Dashboards and reporting" },
    { name: "Git", category: "Tools", detail: "Version control" },
    { name: "GitHub", category: "Tools", detail: "Code hosting and collaboration" },
    { name: "VS Code", category: "Tools", detail: "Code editor" },
];

export interface Project {
    id: string;
    title: string;
    description: string;
    status: string;
    category?: string; // sert aux boutons de filtre, ex. "Web Apps", "PWA"
    tags?: string[]; // petites étiquettes de technologies
    image?: string; // optionnel : capture dans public/, ex. "/projects/challengehub.png"
    url?: string; // optionnel : lien du dépôt ou du site
}

export const projects: Project[] = [
    {
        id: "01",
        title: "ChallengeHub",
        description:
            "A web platform built around challenges and community engagement.",
        status: "Case study coming soon",
        category: "Web Apps",
        tags: ["PHP MVC", "MySQL"], // TODO: vérifie, repris de ta capture
 
    },
    {
        id: "02",
        title: "Productivity Coach",
        description:
            "A Java application exploring intelligent productivity planning.",
        status: "Case study coming soon",
        category: "Desktop/Java",
        tags: ["Java"], // TODO: ajoute les autres technologies utilisées
    },
    {
        id: "03",
        title: "ProofOfCommit",
        description:
            "A software project involving users, submissions and achievements.",
        status: "Case study coming soon",
        // TODO: ajoute category et tags
    },
    {
        id: "04",
        title: "More to come",
        description: "New experiments, ideas and projects in progress.",
        status: "In progress",
    },
];

// TODO: add your real profiles, for example:
// { label: "GitHub", href: "https://github.com/..." }
export const socials: { label: string; href: string }[] = [];

export interface Language {
    name: string;
    native: string; // the language's name in its own script
    code: string; // language code, for screen readers and text direction
    status: string; // e.g. "Mother tongue", "Current level"
    level?: string; // A1 … C2, or "Native"
    certified?: string; // certified level, if any
}

export const languages: Language[] = [
    {
        name: "English",
        native: "English",
        code: "en",
        status: "Current level",
        level: "B1",
        certified: "A2.2",
    },
    {
        name: "French",
        native: "Français",
        code: "fr",
        status: "Fluent / Academic",
        level: "B2",
        // TODO: add your French level to show the bar, e.g. level: "B2",
    },
    {
        name: "Arabic",
        native: "العربية",
        code: "ar",
        status: "Mother tongue",
        level: "Native",
    },
];