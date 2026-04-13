import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Stethoscope, Mail, ArrowUpRight, Globe, Layers, Cpu, Code2, MousePointer2, Palette, Monitor, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Social Icons ────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3H9v3z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// ─── Marquee ─────────────────────────────────────────────────────────────────
const tools = ["FIGMA", "HTML5", "CSS3", "JAVASCRIPT", "REACT", "TAILWIND", "FRAMER", "NEXT.JS", "GSAP", "THREE.JS", "TYPESCRIPT", "WEBFLOW", "ILLUSTRATOR", "PHOTOSHOP"];

function Marquee() {
  const repeated = [...tools, ...tools];
  return (
    <div className="overflow-hidden py-6 mask-gradient">
      <div className="flex gap-12 w-max animate-marquee">
        {repeated.map((t, i) => (
          <span key={i} className={`text-xl font-bold tracking-widest ${i % 3 === 1 ? "text-neutral-100" : "text-neutral-700"}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Skill Card ──────────────────────────────────────────────────────────────
function SkillCard({ icon, label, level }: { icon: React.ReactNode; label: string; level: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all group"
    >
      <div className="mb-4 text-neutral-400 group-hover:text-white transition-colors">{icon}</div>
      <div className="text-sm font-semibold mb-3 text-neutral-300">{label}</div>
      <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-gradient-to-r from-neutral-400 to-white rounded-full"
        />
      </div>
      <div className="text-right text-xs text-neutral-600 mt-1">{level}%</div>
    </motion.div>
  );
}

// ─── Project Card ────────────────────────────────────────────────────────────
const projects = [
  {
    title: "Sparks Salon",
    subtitle: "Luxury Brand Identity & Web",
    description: "A highly minimalist, premium digital experience tailored for a luxury salon brand in Chandigarh. Custom branding, royal blue-and-gold palette, animated service showcases and smooth scroll interactions.",
    tags: ["UI/UX Design", "Brand Identity", "Animations"],
    icon: <Sparkles className="w-7 h-7 text-amber-400" />,
    link: "saprks salon/index.html",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
    accent: "amber",
    year: "2024",
  },
  {
    title: "Dentist Sanctuary",
    subtitle: "Premium Clinic Web Experience",
    description: "A \"Sovereign Sanctuary\" design system for a high-end dental clinic. Emerald-and-gold palette, sophisticated GSAP scroll animations, and a curated premium feel from first load.",
    tags: ["Strategic Branding", "Premium Web Design", "GSAP"],
    icon: <Stethoscope className="w-7 h-7 text-emerald-400" />,
    link: "dentisst/index.html",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop",
    accent: "emerald",
    year: "2024",
  },
];

// ─── Weather Widget ───────────────────────────────────────────────────────────
function WeatherWidget() {
  const [temp, setTemp] = useState<string>("--");
  const [desc, setDesc] = useState("Scanning...");

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.9664&longitude=76.5331&current=temperature_2m")
      .then(r => r.json())
      .then(d => {
        setTemp(Math.round(d.current.temperature_2m) + "°C");
        setDesc("Rupnagar, PB · Live");
      }).catch(() => {});
  }, []);

  return (
    <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between h-full">
      <div>
        <p className="text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest">Environment</p>
        <div className="text-5xl font-bold text-white mb-1">{temp}</div>
        <div className="text-sm text-neutral-500">{desc}</div>
      </div>
      <div className="mt-6">
        <div className="flex gap-2 items-center text-xs text-neutral-500 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#10B981]" />
          GS.DEV // ONLINE
        </div>
        <div className="w-full h-px bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neutral-700 to-white"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Clock ────────────────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-sm text-neutral-400 tabular-nums">{time}</span>;
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [formState, setFormState] = useState({ name: "", email: "", message: "", sent: false, sending: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(s => ({ ...s, sending: true }));
    await new Promise(r => setTimeout(r, 1000));
    setFormState(s => ({ ...s, sending: false, sent: true }));
  };

  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans overflow-x-hidden">

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-px bg-white z-[999] origin-left" style={{ scaleX }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-6">
        <div className="font-bold text-xl tracking-tighter">GS.</div>
        <div className="flex items-center gap-8">
          <a href="#work" className="text-sm text-neutral-400 hover:text-white transition-colors hidden md:block">Work</a>
          <a href="#skills" className="text-sm text-neutral-400 hover:text-white transition-colors hidden md:block">Skills</a>
          <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors hidden md:block">About</a>
          <a href="#contact" className="text-sm px-5 py-2 rounded-full border border-neutral-700 hover:border-white hover:bg-white hover:text-black transition-all">Contact</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative">
        <BackgroundPaths title="Gursimar Singh" />
        {/* Subtitle overlay */}
        <div className="absolute bottom-16 left-0 right-0 z-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-neutral-400 text-lg md:text-xl"
          >
            Web Designer & Frontend Developer &mdash; Punjab, India
          </motion.p>
        </div>
      </section>

      {/* ── Marquee ── */}
      <section className="border-y border-neutral-800 bg-neutral-950">
        <style>{`.animate-marquee{animation:marquee 30s linear infinite}@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.mask-gradient{-webkit-mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent)}`}</style>
        <Marquee />
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Projects Shipped", value: "12+", icon: <Globe className="w-5 h-5" /> },
            { label: "Happy Clients", value: "8+", icon: <Layers className="w-5 h-5" /> },
            { label: "Design Tools", value: "10+", icon: <Palette className="w-5 h-5" /> },
            { label: "Years Building", value: "3+", icon: <Cpu className="w-5 h-5" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col gap-3"
            >
              <div className="text-neutral-500">{stat.icon}</div>
              <div className="text-4xl font-bold tracking-tighter">{stat.value}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">02 / Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">My Skill Set</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SkillCard icon={<Palette className="w-6 h-6" />} label="UI / UX Design" level={92} />
          <SkillCard icon={<Code2 className="w-6 h-6" />} label="HTML & CSS" level={95} />
          <SkillCard icon={<Monitor className="w-6 h-6" />} label="JavaScript / TS" level={85} />
          <SkillCard icon={<Layers className="w-6 h-6" />} label="React & Next.js" level={80} />
          <SkillCard icon={<MousePointer2 className="w-6 h-6" />} label="Framer Motion" level={78} />
          <SkillCard icon={<Globe className="w-6 h-6" />} label="Three.js / WebGL" level={65} />
          <SkillCard icon={<Cpu className="w-6 h-6" />} label="Figma & Webflow" level={88} />
          <SkillCard icon={<Sparkles className="w-6 h-6" />} label="Brand Strategy" level={82} />
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section id="work" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">03 / Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Selected Works</h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className={`relative h-72 md:h-auto overflow-hidden ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="absolute inset-0 bg-neutral-950/30 group-hover:bg-neutral-950/10 transition-colors duration-500 z-10" />
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-5 right-5 z-20 p-3 bg-neutral-950/50 backdrop-blur-md rounded-xl border border-white/10">
                  {project.icon}
                </div>
                <div className="absolute bottom-5 left-5 z-20 text-xs font-mono text-neutral-400 bg-neutral-950/60 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-700">
                  {project.year}
                </div>
              </div>

              {/* Content */}
              <div className={`p-10 md:p-14 flex flex-col justify-center ${idx % 2 === 1 ? "md:order-1" : ""}`}>
                <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">{project.subtitle}</p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 border border-neutral-700 text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-4 transition-all">
                  View Project <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── About / GitHub ── */}
      <section id="about" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">04 / About</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">The Person Behind the Screen</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 p-10 rounded-2xl bg-neutral-900 border border-neutral-800"
          >
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">// Bio</p>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              I'm <strong className="text-white">Gursimar Singh</strong>, a self-taught web designer and frontend developer from Punjab, India. I obsess over the intersection of code and design — crafting websites that don't just look beautiful, but feel immersive.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              Every project is a chance to push boundaries. From luxury salon brands to premium medical clinics, I translate visions into digital experiences that leave an impression.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="https://github.com/gursimar007" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <GithubIcon />
              </a>
              <a href="https://linkedin.com/in/gursimar007" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <LinkedinIcon />
              </a>
            </div>
          </motion.div>

          {/* Weather */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <WeatherWidget />
          </motion.div>

          {/* GitHub Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 p-10 rounded-2xl bg-neutral-900 border border-neutral-800"
          >
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">// Source Control</p>
            <div className="text-2xl font-bold mb-6">Active Contributor</div>
            <img
              src="https://ghchart.rshah.org/666666/gursimar007"
              alt="GitHub contribution chart"
              className="w-full mix-blend-screen opacity-70 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">05 / Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Let's build something exceptional.</h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Whether you need a brand-new digital presence, a redesign, or a landing page that converts — I'm ready to make it happen.
            </p>
            <div className="flex flex-col gap-3 text-neutral-400">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4" /> gursimar007@gmail.com</div>
              <div className="flex items-center gap-3"><Globe className="w-4 h-4" /> Punjab, India · Available Worldwide</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800"
          >
            {formState.sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-neutral-400">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text" required
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-600"
                    placeholder="Alex Johnson"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email" required
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-600"
                    placeholder="alex@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest">Message</label>
                  <textarea
                    rows={4} required
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-white rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none placeholder:text-neutral-600"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState.sending}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formState.sending ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-800 py-8 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-xl tracking-tighter">GS.</div>
          <div className="flex items-center gap-6">
            <Clock />
            <span className="text-xs text-neutral-600 font-mono">Punjab, IN · {new Date().getFullYear()}</span>
          </div>
          <p className="text-xs text-neutral-600 font-mono">Designed & built by Gursimar Singh</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
