import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Mail, Linkedin, Code, ArrowDown, ArrowUp, FileCode } from 'lucide-react';
import emailjs from '@emailjs/browser';
const tagBase  = "flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105";
const lightBg  = "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white";
const darkBg   = "bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white";

// Main Portfolio App
const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
      
      // Find which section is currently in view
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} min-h-screen transition-colors duration-300`}>
      {/* Header/Navigation */}
      <header className={`header-nav sticky top-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/90 border-b border-gray-800 shadow-lg' : 'bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-b border-gray-200 shadow-md backdrop-blur-md'}`}>
        <div className="container mx-auto px-6 py-4 rounded-b-2xl flex items-center justify-between">
          <nav className="flex items-center justify-between w-full">
            {/* Logo/Name */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight select-none">
                Sai Charan
              </span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link transition-all duration-200 px-4 py-2 rounded-lg font-semibold shadow-sm
                    ${activeSection === section
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white scale-105 shadow-md'
                      : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white hover:shadow-md'}
                  `}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode} 
                className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun size={22} className="text-yellow-500 hover:text-yellow-600 transition-colors" />
                ) : (
                  <Moon size={22} className="text-gray-600 hover:text-gray-800 transition-colors" />
                )}
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-500 hover:text-yellow-600 transition-colors" />
                ) : (
                  <Moon size={20} className="text-gray-600 hover:text-gray-800 transition-colors" />
                )}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={26} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </nav>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="px-6 py-4 space-y-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 rounded-b-2xl shadow-lg">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 font-semibold
                    ${activeSection === section 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white scale-105 shadow-md'
                      : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white hover:shadow-md'}
                  `}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-0">
        {/* Hero Section */}
        <section id="home" className={`min-h-screen flex items-center justify-center hero-section relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : ''}`}>
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80'}`}></div>
          <div className="container mx-auto px-4 py-20 text-center relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Main content wrapper */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                {/* Profile Image */}
                <div className="profile-image-container">
                  <img
                    src={process.env.PUBLIC_URL + "/profile.jpg"}
                    alt="Sai Charan Lenkallapally"
                    className={`profile-image w-full h-full object-cover rounded-full border-4 ${darkMode ? 'border-blue-500 shadow-lg shadow-blue-700/40' : ''}`}
                  />
                </div>
                {/* Text content */}
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                      Sai Charan
                    </span>
                  </h1>
                  <div className="h-12 mb-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 animated-text">
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">Full Stack Developer</span>
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">SDET</span>
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">Software Developer</span>
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">Machine Learning Engineer</span>
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                    Masters in Computer Science graduate with expertise in full-stack development, 
                    test automation, and machine learning.
                  </p>
                 
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-12">
                <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" 
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="text-blue-600 dark:text-blue-400" />
                </a>
                <a href="https://github.com/Saicharan2707l" target="_blank" rel="noopener noreferrer" 
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FileCode className="text-gray-800 dark:text-gray-200" />
                </a>
                <a href="mailto:slenkallapally@gmail.com" 
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="text-red-600 dark:text-red-400" />
                </a>
              </div>
              <div className="flex justify-center mt-0">
                  <a
                    href={process.env.PUBLIC_URL + '/Sai_Charan_Resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    View Resume
                  </a>
                </div>
              
              {/* Scroll indicator with enhanced animation */}
              <div className="mt-8">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-center group"
                  aria-label="Scroll down"
                >
                  <ArrowDown size={32} className="mx-auto text-gray-600 dark:text-gray-400 animate-bounce group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-blue-100'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">About Me</h2>
            <div className={`max-w-3xl mx-auto rounded-lg shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-slate-200'}`}>
              <div className="space-y-6">
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  Software Developer with 3+ years of experience building scalable, cloud-native applications and delivering performant solutions in agile environments. Proven expertise in full-stack development, containerized microservices, and CI/CD automation using technologies like Node.js, React.js, AWS, Docker, and Kubernetes. Recognized for reducing system latency by 35% and accelerating delivery cycles by 60% through infrastructure automation. Known for driving cross-functional collaboration, mentoring junior engineers, and delivering robust, secure, and maintainable code aligned with business goals.
                </p>
              
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-indigo-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Experience</h2>
            <div>
              <div className={`mb-8 p-6 rounded-lg shadow-lg experience-card ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">Intel Corporation — Software Developer</h4>
                  <span className="text-sm md:text-base">May 2021 – Jun 2023</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Spearheaded a cloud-native migration of monolithic systems into containerized microservices using Docker and Kubernetes on AWS, reducing latency by 35% and achieving 99.99% uptime.</li>
                  <li>Engineered reusable, modular REST APIs for core business logic using Node.js and Express.js, reducing development overhead by 40% across internal teams.</li>
                  <li>Automated deployment workflows via Jenkins and CircleCI, cutting deployment times by 60% and increasing release frequency from bi-weekly to weekly.</li>
                  <li>Led security enhancement efforts by implementing JWT-based authentication and RBAC, decreasing vulnerability reports by 70% within the first year.</li>
                  <li>Conducted in-depth code reviews and mentored 5+ junior developers, fostering a culture of clean, maintainable code and improving code quality metrics by 25%.</li>
                  <li>Collaborated across QA, DevOps, and Product teams to align architecture with business goals, resulting in 30% faster feature delivery and reduced post-release issues.</li>
                  <li>Created monitoring and alerting systems using AWS CloudWatch and Prometheus, enabling real-time diagnostics and reducing incident response time from hours to minutes.</li>
                </ul>
              </div>
              <div className={`mb-8 p-6 rounded-lg shadow-lg experience-card ${darkMode ? 'bg-gray-800' : 'bg-purple-100'}`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">IBM Corporation — Software Developer</h4>
                  <span className="text-sm md:text-base">Apr 2020 – Apr 2021</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Designed and delivered a dynamic HR onboarding portal using Java 11, React.js, and PostgreSQL, cutting onboarding time by 80% and earning internal recognition for innovation.</li>
                  <li>Modernized UI/UX across internal applications by replacing outdated jQuery logic with React.js components and WebSocket-based live feeds, improving load times by 40%.</li>
                  <li>Refactored backend services and integrated OAuth2.0 and internal SSO, enhancing authentication security and user experience across departments.</li>
                  <li>Built scalable ORM queries in Hibernate to optimize performance for high-volume reporting dashboards, reducing average query time by 30%.</li>
                  <li>Wrote Dockerfiles and containerized legacy apps for uniform dev/test environments, accelerating QA cycles and reducing environment-related bugs by 50%.</li>
                  <li>Led multiple Agile sprints, took ownership of sprint planning and estimations, and improved planning accuracy and team throughput by 15%.</li>
                  <li>Developed and maintained Ansible playbooks to automate environment setup on Azure App Services, saving 10+ hours per week in manual provisioning efforts.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-cyan-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} project-card`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Full Stack E-Commerce MERN Application</h3>
                    <span className="text-sm">Jan - Mar 2024</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 mt-3 mb-4">
                    <li>Developed a full-stack e-commerce platform using MongoDB, Express.js, React, and Node.js with Docker and Kubernetes.</li>
                    <li>Designed and optimized database schemas and RESTful APIs with JWT authentication.</li>
                    <li>Implemented CI/CD pipelines with automated testing, reducing deployment times by 65%.</li>
                    <li>Created an admin dashboard with comprehensive monitoring and management capabilities.</li>
                  </ul>
                  <div className="flex gap-2 flex-wrap mt-4">
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-blue-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-blue-700">React</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-green-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-green-700">Node.js</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-yellow-500 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-yellow-600">MongoDB</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-red-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-red-700">Express.js</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-green-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-green-700">Redux.js</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-red-500 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-red-600">JWT</span>
                  </div>
                  <div className="flex mt-4">
                    <a
                      href="https://ecommerce-ghjse9y54-saicharan2707ls-projects.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Live Demo
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6m5-3h3m0 0v3m0-3L10 14' /></svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} project-card`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Automatic Emotional Analysis of Textual Comments</h3>
                    <span className="text-sm">Sept - Oct 2021</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 mt-3 mb-4">
                    <li>Developed a machine learning system to classify emotions in textual comments and feedback.</li>
                    <li>Performed end-to-end data processing, feature extraction, and model training.</li>
                    <li>Provided insights on customer sentiment for improved user experiences.</li>
                  </ul>
                  <div className="flex gap-2 flex-wrap mt-4">
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-blue-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-blue-700">Python</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-purple-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-purple-700">Machine Learning</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-red-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-red-700">NLP</span>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} project-card`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Air Canvas Using Python-OpenCV</h3>
                    <span className="text-sm">Nov 2021 - Jan 2022</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 mt-3 mb-4">
                    <li>Built a computer vision system to detect and track user gestures for a virtual canvas.</li>
                    <li>Implemented modules for image acquisition, gesture detection, and UI visualization.</li>
                    <li>Optimized system performance for real-time responsiveness and efficiency.</li>
                  </ul>
                  <div className="flex gap-2 flex-wrap mt-4">
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-blue-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-blue-700">Python</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-green-600 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-green-700">OpenCV</span>
                    <span className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full bg-yellow-500 text-white shadow-sm mb-2 transition-transform duration-150 hover:scale-105 hover:bg-yellow-600">Computer Vision</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-yellow-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className={`p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>          
                <h3 className="text-xl font-bold mb-4">Technical Skills</h3>

                {/* Programming Languages */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['python','java','javascript','typescript','c','php','mysql'].map(lang => (
                      <span
                        key={lang}
                        className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150"
                      >
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`}
                          alt={lang}
                          className="w-5 h-5"
                        />
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}{lang==='javascript'?' (ES6+)':''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Front-End Development */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Front-End Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['html5','css3','react','angularjs','redux','jquery','bootstrap','tailwindcss'].map(fe => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${fe}/${fe}-original.svg`} alt={fe} className="w-5 h-5" />
                        {fe.charAt(0).toUpperCase() + fe.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Back-End Development */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Back-End Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['nodejs','express','yii','swagger','graphql'].map(be => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${be}/${be}-original.svg`} alt={be} className="w-5 h-5" />
                        {be.charAt(0).toUpperCase() + be.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cloud Platforms */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Cloud Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {['amazonwebservices','azure'].map(cloud => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cloud}/${cloud}-original.svg`} alt={cloud} className="w-5 h-5" />
                        {cloud === 'amazonwebservices' ? 'AWS (EC2, S3, Lambda, RDS, CloudWatch)' : 'Azure (App Services)'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DevOps & Infrastructure */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">DevOps & Infrastructure</h4>
                  <div className="flex flex-wrap gap-2">
                    {['docker','kubernetes','jenkins','circleci','git','github','terraform','nginx'].map(dev => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${dev}/${dev}-original.svg`} alt={dev} className="w-5 h-5" />
                        {dev.charAt(0).toUpperCase() + dev.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testing & Automation */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Testing & Automation</h4>
                  <div className="flex flex-wrap gap-2">
                    {['selenium','pytest','testng','junit','postman','mocha','chai','swagger'].map(test => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${test}/${test}-original.svg`} alt={test} className="w-5 h-5" />
                        {test.charAt(0).toUpperCase() + test.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Databases</h4>
                  <div className="flex flex-wrap gap-2">
                    {['mongodb','postgresql','mysql'].map(db => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${db}/${db}-original.svg`} alt={db} className="w-5 h-5" />
                        {db.charAt(0).toUpperCase() + db.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Machine Learning & Data */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Machine Learning & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {['scikitlearn','pandas','numpy','tensorflow'].map(ml => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${ml}/${ml}-original.svg`} alt={ml} className="w-5 h-5" />
                        {ml === 'scikitlearn' ? 'Scikit-learn' : ml.charAt(0).toUpperCase() + ml.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Development Methodologies */}
                <div>
                  <h4 className="font-semibold mb-2">Development Methodologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scrum/scrum-original.svg",
                        label: "Agile (Scrum, Kanban)"
                      },
                      {
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
                        label: "TDD"
                      },
                      {
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
                        label: "CI/CD"
                      }
                    ].map(m => (
                      <span className="flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md transition-all duration-150">
                        <img src={m.icon} alt={m.label} className="w-5 h-5" />
                        {m.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-pink-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Contact Me</h2>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail size={20} className="mr-3" />
                    <a href="mailto:slenkallapally@gmail.com" className="hover:underline contact-link">
                      slenkallapally@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin size={20} className="mr-3" />
                    <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="hover:underline contact-link">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FileCode size={20} className="mr-3" />
                    <a href="https://github.com/Saicharan2707l" target="_blank" rel="noopener noreferrer" className="hover:underline contact-link">
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Code size={20} className="mr-3" />
                    <a href="https://leetcode.com/u/Saicharan27/" target="_blank" rel="noopener noreferrer" className="hover:underline contact-link">
                      LeetCode Profile
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                <form className="space-y-4 contact-form" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setFormStatus({ message: '', type: '' });

                  try {
                    await emailjs.sendForm(
                      'service_2k61wcu', // You'll need to replace this with your EmailJS service ID
                      'template_o1wbp6v', // You'll need to replace this with your EmailJS template ID
                      e.target,
                      '4OF9EtBR9fisWFF0l' // You'll need to replace this with your EmailJS public key
                    );
                    setFormStatus({
                      message: 'Message sent successfully! I will get back to you soon.',
                      type: 'success'
                    });
                    e.target.reset();
                  } catch (error) {
                    setFormStatus({
                      message: 'Failed to send message. Please try again.',
                      type: 'error'
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input 
                      type="text" 
                      name="from_name"
                      id="name" 
                      required
                      className={`w-full p-2 rounded-md border ${
                        darkMode 
                          ? 'bg-white border-gray-300 text-gray-700' 
                          : 'bg-white border-gray-300 text-gray-700'
                      }`} 
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input 
                      type="email" 
                      name="from_email"
                      id="email" 
                      required
                      className={`w-full p-2 rounded-md border ${
                        darkMode 
                          ? 'bg-white border-gray-300 text-gray-700' 
                          : 'bg-white border-gray-300 text-gray-700'
                      }`} 
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows="4" 
                      required
                      className={`w-full p-2 rounded-md border ${
                        darkMode 
                          ? 'bg-white border-gray-300 text-gray-700' 
                          : 'bg-white border-gray-300 text-gray-700'
                      }`} 
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  {formStatus.message && (
                    <div className={`p-3 rounded-md ${
                      formStatus.type === 'success' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
                    }`}>
                      {formStatus.message}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`w-full border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'} py-6`}>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">© {new Date().getFullYear()} Sai Charan Lenkallapally. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button 
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} scroll-top-btn`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Portfolio;