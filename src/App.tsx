import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Stethoscope, Mail } from "lucide-react";
import { Button } from "./components/ui/button";
import { useEffect } from "react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

function App() {
  // Adding dark class to html for dark mode by default to look premium
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const projects = [
    {
      title: "Sparks Salon",
      description: "A highly minimalist, premium, and spacious digital experience tailored for a luxury salon brand. Features custom branding, elegant interactions, and a royal-themed aesthetic.",
      tags: ["UI/UX Design", "Frontend Development", "Animations"],
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      link: "saprks salon/index.html", 
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
      gradient: "from-amber-500/20 to-orange-600/20"
    },
    {
      title: "Dentist Sanctuary",
      description: "A \"Sovereign Sanctuary\" design system for a high-end dental clinic. Integrates an emerald-and-gold color palette with sophisticated scroll animations for a premium curated feel.",
      tags: ["Strategic Branding", "Premium Web Design", "GSAP"],
      icon: <Stethoscope className="w-8 h-8 text-emerald-500" />,
      link: "dentisst/index.html",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop",
      gradient: "from-emerald-500/20 to-teal-600/20"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-white/30 selection:text-white font-sans">
      
      {/* Hero Section */}
      <section className="relative">
        <BackgroundPaths title="Gursimar Singh" />
        <div className="absolute top-8 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 mix-blend-difference">
           <div className="font-bold text-xl tracking-tighter text-white">GS.</div>
           <div className="flex gap-6">
              <a href="#projects" className="text-sm font-medium hover:opacity-70 transition-opacity text-white">Work</a>
              <a href="#about" className="text-sm font-medium hover:opacity-70 transition-opacity text-white">About</a>
           </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Selected Works</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-2xl">
            Showcasing a curated collection of premium web experiences, designed with a focus on immersive aesthetics and flawless functional execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group block relative rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              {/* Image Container */}
              <div className="relative h-80 w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} mix-blend-overlay z-10`} />
                <div className="absolute inset-0 bg-neutral-950/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Icon */}
                <div className="absolute top-6 right-6 z-20 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                    {project.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative z-20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                  <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ExternalLink className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm text-neutral-700 dark:text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* About/Footer Section */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Let's craft something exceptional.</h2>
                  <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-8 max-w-md leading-relaxed">
                      I specialize in translating brand identities into premium, high-performance digital experiences. Open for collaborative opportunities and creative challenges.
                  </p>
                  <Button className="rounded-full px-8 py-6 text-lg group">
                      <Mail className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                      Start a Conversation
                  </Button>
              </div>
              
              <div className="flex flex-col gap-6 md:items-end">
                  <h3 className="font-semibold text-lg text-neutral-400 uppercase tracking-widest">Connect</h3>
                  <div className="flex gap-4">
                      <a href="https://github.com/gursimar007" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                          <GithubIcon />
                      </a>
                      <a href="#" className="p-4 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                          <LinkedinIcon />
                      </a>
                      <a href="#" className="p-4 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                          <TwitterIcon />
                      </a>
                  </div>
              </div>
          </div>
      </section>
      
    </div>
  );
}

export default App;
