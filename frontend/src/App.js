import "@/App.css";
import { LanguageProvider } from "./context/LanguageContext";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import SkillsBento from "./components/SkillsBento";
import Blog from "./components/Blog";
import Contact from "../Contact";

function App() {
  return (
    <LanguageProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content" data-testid="main-content">
          <Hero />
          <Experience />
          <Projects />
          <SkillsBento />
          <Blog />
          <Contact />
          <footer className="border-t border-zinc-800 py-8 px-6 md:px-12">
            <p className="font-mono text-xs text-zinc-600 text-center">
              Serdar Gulec &middot; DevOps Cloud Engineer
            </p>
          </footer>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
