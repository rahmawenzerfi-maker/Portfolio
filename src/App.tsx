// src/App.tsx
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { ThemeProvider } from "./context/ThemeContext";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Journey from "./components/Journey";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Languages from "./components/Languages";

export default function App() {
  // Scroll progress bar (smoothed with a spring)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ThemeProvider>
      {/* reducedMotion="user": Motion automatically tones down transform
          animations for visitors who enable "reduce motion" in their OS */}
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen overflow-x-clip bg-cream text-espresso transition-colors duration-500 dark:bg-espresso dark:text-cream">
          {/* Accessibility: lets keyboard users skip the navigation */}
          <a
            href="#main"
            className="sr-only z-[100] rounded-md bg-burgundy px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>

          {/* Scroll progress bar */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-burgundy"
          />

          {/* Ambient drifting background blobs (decorative only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden"
          >
            <motion.div
              className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-burgundy/20 blur-3xl dark:bg-burgundy/30"
              animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-beige/60 blur-3xl dark:bg-beige/10"
              animate={{ x: [0, -50, 0], y: [0, -60, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Mouse-reactive spotlight (hidden on touch devices inside the component) */}
          <CursorGlow />

          <Navbar />

          <main id="main" tabIndex={-1} className="relative z-10 outline-none">
            <Hero />
            <About />
            <Journey />
            <Skills />
            <Languages />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}