import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Mail, Linkedin, Code, ArrowDown, ArrowUp, FileCode } from 'lucide-react';
import emailjs from '@emailjs/browser';

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
      <header className="header-nav">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo/Name */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Sai Charan
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              
              {/* Dark Mode Toggle */}
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
                <Menu size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="px-6 py-4 space-y-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors
                    ${activeSection === section 
                      ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center hero-section relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900/80 dark:to-gray-800/80"></div>
          
          <div className="container mx-auto px-4 py-20 text-center relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Main content wrapper */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                {/* Profile Image */}
                <div className="profile-image-container">
                  <img 
                    src="/profile.jpg" 
                    alt="Sai Charan Lenkallapally" 
                    className="profile-image w-full h-full object-cover"
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
                <a href="mailto:saicharan27.jobs@gmail.com" 
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="text-red-600 dark:text-red-400" />
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
        <section id="about" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">About Me</h2>
            <div className={`max-w-3xl mx-auto rounded-lg shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="space-y-6">
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  I am a Computer Science graduate student at Saint Louis University with a strong foundation in software 
                  development, testing, and machine learning. My experience spans across full-stack development, 
                  automated testing, and data-driven machine learning applications.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  With a background as an SDET and software developer at Darwinbox Digital Solutions, I've worked on 
                  various aspects of HRMS systems, improving application performance and implementing robust automated 
                  testing frameworks.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  I'm passionate about building scalable applications and implementing efficient automation solutions.
                  My goal is to leverage my technical skills to develop innovative software that solves real-world problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Experience & Education</h2>
            
            {/* Education */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              
              <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg education-card`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">Saint Louis University</h4>
                  <span className="text-sm md:text-base">June 2023 - May 2025</span>
                </div>
                <p className="mb-2">Masters in Computer Science - GPA: 3.9/4.0</p>
                <p className="text-sm">
                  Relevant Coursework: Algorithms, Web Development, Software Programming, Databases, 
                  Artificial Intelligence, Machine Learning, Object-Oriented Programming, Data Structures.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg education-card`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">Sreenidhi Institute of Science Technology</h4>
                  <span className="text-sm md:text-base">June 2018 - July 2022</span>
                </div>
                <p className="mb-2">Bachelor of Technology in Computer Science - GPA: 3.3/4.0</p>
              </div>
            </div>
            
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
              
              <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg experience-card`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">SDET — Darwinbox Digital Solutions Pvt Ltd</h4>
                  <span className="text-sm md:text-base">July 2022 - July 2023</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Automated HRMS modules (Recruitment, Payroll, Onboarding) using Selenium, Java, and Rest Assured, including API, UI.</li>
                  <li>Enhanced application performance from 68% to 85% and reduced bugs in regression releases.</li>
                  <li>Developed automated test scripts for feature validation, supporting Java-based architectures.</li>
                  <li>Identified and implemented test strategies aligned with unique functionality requirements.</li>
                  <li>Engaged in Agile processes, collaborating with project managers and developers to refine requirements.</li>
                  <li>Integrated CI/CD pipelines using Jenkins for efficient test execution and continuous improvement.</li>
                </ul>
              </div>
              
              <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg experience-card`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">SDE Intern — Darwinbox Digital Solutions Pvt Ltd</h4>
                  <span className="text-sm md:text-base">February 2022 - July 2022</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Developed a web application using HTML, CSS, JavaScript (front end) and Node.js, Express.js, MongoDB (back end).</li>
                  <li>Integrated Ajax for login, AWS SNS for messaging, AWS S3 for image storage, JWT for secure authentication.</li>
                  <li>Implemented booking analytics, enabling data-driven insights and efficient decision-making.</li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg experience-card`}>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-xl font-semibold">ML Summer Intern — GoalStreet</h4>
                  <span className="text-sm md:text-base">May 2020 - July 2020</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Developed and deployed multiple ML models for warfarin dosage prediction.</li>
                  <li>Implemented cross-validation and hyperparameter tuning, boosting model accuracy.</li>
                  <li>Integrated the best-performing models into a user-friendly Gradio interface hosted on Hugging Face.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white project-tag">React</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-green-600 text-white project-tag">Node.js</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-yellow-600 text-white project-tag">MongoDB</span>
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
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white project-tag">Python</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-purple-600 text-white project-tag">Machine Learning</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-600 text-white project-tag">NLP</span>
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
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white project-tag">Python</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-green-600 text-white project-tag">OpenCV</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-yellow-600 text-white project-tag">Computer Vision</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Skills & Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg skill-category`}>
                <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Web Development</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>HTML</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>CSS</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>jQuery</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Node.js</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>React.js</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Express</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Redux</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Python</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Java</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>C</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>PHP</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>JavaScript</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Databases</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>SQL</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>MongoDB</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Testing</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Pytest</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Docker</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Jenkins</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Selenium</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Rest API</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>TestNG</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cloud & AI</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>Machine Learning</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>AWS</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} skill-tag`}>GIT</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8 skill-category`}>
                  <h3 className="text-xl font-bold mb-4">Coding Profiles</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>5★ problem python solver in Hacker Rank</li>
                    <li>Solved 180+ problems in Leetcode</li>
                  </ul>
                </div>
                
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg skill-category`}>
                  <h3 className="text-xl font-bold mb-4">Certifications</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Introduction to Database Management Systems, NPTEL (Score: 97%), June 2022</li>
                    <li>Programming in Java, NPTEL (Score: 89%), December 2019</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center section-header">Contact Me</h2>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail size={20} className="mr-3" />
                    <a href="mailto:saicharan27.jobs@gmail.com" className="hover:underline contact-link">
                      saicharan27.jobs@gmail.com
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
                    <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="hover:underline contact-link">
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
      <footer className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Sai Charan Lenkallapally. All Rights Reserved.</p>
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