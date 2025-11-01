"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Menu,
  X,
} from "lucide-react";

// 3D Background Component
const ThreeDBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scene, camera, renderer, particles;

    const init = async () => {
      const THREE = await import("three");

      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 5000;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: "#8B5CF6",
        transparent: true,
        opacity: 0.8,
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      camera.position.z = 2;

      const animate = () => {
        requestAnimationFrame(animate);

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    init();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#internships", label: "Internships" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            SAI MUKESH
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-purple-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-white/80 hover:text-purple-400 transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Hero Section - Removed background image
const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black/40" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              SAI MUKESH
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-4xl font-semibold mb-8"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-extrabold">
              WEB DEVELOPER
            </span>
            {" & "}
            <span className="text-white">DATA ANALYST</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Freelancer passionate about creating sleek, user-friendly web
            applications and turning data into actionable insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              View Projects
            </button>
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-semibold hover:bg-purple-400 hover:text-black transition-all duration-300">
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section - Removed profile image
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6">
                KASINENI VENKATA SAI MUKESH
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                I'm a web developer & data-analyst driven by a passion for
                creating sleek, user-friendly web apps and turning data into
                actionable insights. I blend modern web technologies (HTML, CSS,
                JavaScript, Bootstrap) with analytical tools (Python, SQL, Power
                BI, Tableau) to build dynamic, accessible experiences and tell
                data-driven stories.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                  <h4 className="text-purple-400 font-semibold text-lg mb-2">
                    Specialization
                  </h4>
                  <p className="text-gray-300">Full-Stack Development</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                  <h4 className="text-purple-400 font-semibold text-lg mb-2">
                    Focus
                  </h4>
                  <p className="text-gray-300">Data Analysis & Visualization</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skills = {
    Frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "React.js"],
    Backend: ["Node.js", "Python", "SQL"],
    "Data Analysis": ["Power BI", "Tableau", "Pandas", "NumPy"],
    Tools: ["Git", "VS Code", "Figma", "Excel"],
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                {category}
              </h3>
              <div className="space-y-3">
                {skillList.map((skill) => (
                  <div
                    key={skill}
                    className="bg-white/5 px-3 py-2 rounded-lg text-gray-300 text-sm hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: "Predictify - Predictive Analysis Dashboard",
      description:
        "A powerful data analytics platform that uses historical data, machine learning, and statistical models to forecast future trends. Supports CSV, SQL, and XLSX files with AI-powered predictions.",
      image:
        "https://ucarecdn.com/b4fc2e2f-48d3-428f-8703-20bf668fd8db/-/format/auto/",
      technologies: [
        "Python",
        "Machine Learning",
        "JavaScript",
        "Power BI",
        "AI/ML Models",
      ],
      liveDemo: "https://ai-predictive-analyt-dct6.bolt.host/",
      github: "https://github.com/saikasineni",
      features: [
        "1000+ Dashboard Types",
        "AI-Powered Predictions",
        "Real-time Analytics",
        "Multi-format Support",
      ],
    },
    {
      title: "Hunger Spot - Restaurant Website",
      description:
        "A full-featured restaurant website with menu management and reservation functionality using core web technologies. Features modern UI/UX with responsive design.",
      image:
        "https://ucarecdn.com/b71c5c8d-1bd3-40df-84ed-5bd710b7e54e/-/format/auto/",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "Responsive Design",
      ],
      liveDemo: "https://saikasineni.github.io/Hunger-Spot/",
      github: "https://github.com/saikasineni",
      features: [
        "Menu Management",
        "Reservation System",
        "Responsive Design",
        "Interactive UI",
      ],
    },
    {
      title: "Portfolio Website V2.0",
      description:
        "A refreshed personal portfolio site built with HTML, CSS, JavaScript, and Bootstrap, focused on interactive UI/UX and showcasing web development skills.",
      image:
        "https://ucarecdn.com/17a8d86e-256c-4e97-a8f9-c5daf2c0e50a/-/format/auto/",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "Interactive Design",
      ],
      liveDemo: "https://saikasineni.github.io/portfolio/",
      github: "https://github.com/saikasineni",
      features: [
        "Interactive UI/UX",
        "Responsive Design",
        "Modern Layout",
        "Portfolio Showcase",
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          <p className="text-gray-300 mt-6 text-lg">
            Explore my selection of projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-purple-400 font-semibold mb-2 text-sm">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-purple-400 font-semibold mb-2 text-sm">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-500 text-gray-300 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Internships Section - Removed logo images
const InternshipsSection = () => {
  const internships = [
    {
      company: "Tata Consultancy Services",
      role: "Data Visualisation Intern",
      duration: "Jun 2025 – Feb 2025",
      description:
        "Completed a business simulation creating executive-level visual insights, refining data cleanup and presentation skills.",
      skills: [
        "Data Visualization",
        "Business Intelligence",
        "Data Analysis",
        "Executive Reporting",
      ],
    },
    {
      company: "Boston Consulting Group (BCG)",
      role: "GenAI Financial Chatbot Intern",
      duration: "Jul 2025 – Aug 2025",
      description:
        "Built an AI-powered chatbot interpreting 10-K/10-Q financial data, using Python and rule-based logic to deliver user-friendly insights.",
      skills: [
        "AI/ML",
        "Python",
        "Financial Analysis",
        "Chatbot Development",
        "NLP",
      ],
    },
  ];

  return (
    <section id="internships" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Internships & Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          <p className="text-gray-300 mt-6 text-lg">
            My internship experiences have sharpened both my analytical and
            development skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300"
            >
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {internship.company
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {internship.company}
                    </h3>
                    <h4 className="text-purple-400 font-semibold mb-1">
                      {internship.role}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {internship.duration}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">
                {internship.description}
              </p>

              <div>
                <h4 className="text-purple-400 font-semibold mb-2">
                  Skills Gained:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 px-3 py-1 rounded-full border border-purple-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          <p className="text-gray-300 mt-6 text-lg">
            Let's connect and discuss your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Let's work together!
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold">Email</h4>
                  <p className="text-gray-300">saikasinenikavs@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold">Phone</h4>
                  <p className="text-gray-300">Available for consultation</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold">Location</h4>
                  <p className="text-gray-300">Available for remote work</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/in/kasineni-venkata-sai-mukesh-73768b37b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://github.com/saikasineni"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-gray-500 text-gray-300 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-black/60 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            SAI MUKESH
          </div>
          <p className="text-gray-400 mb-6">
            Full-Stack Developer & Data Analyst | Freelancer
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.linkedin.com/in/kasineni-venkata-sai-mukesh-73768b37b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/saikasineni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:saikasinenikavs@gmail.com"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Sai Mukesh. All rights reserved. | Designed & Developed with
            ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Component
export default function Portfolio() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white">
      <ThreeDBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <InternshipsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}