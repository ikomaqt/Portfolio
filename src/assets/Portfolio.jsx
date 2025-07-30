"use client"

import { useState, useEffect } from "react"

import profileImg from "../images/image.png"
import nesracImg from "../images/nesrac.png"
import alumniImg from "../images/alumni.png"
import healthRecordImg from "../images/HR.png"
import posImg from "../images/POS.jpg"
import libraryImg from "../images/LMS.png"
import cvFile from "../resume/Sarmiento Ranilei A_CV.pdf"

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Add menu closing protection
  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuClosing(true)
      setIsMenuOpen(false)
      // Prevent any clicks for 500ms after closing
      setTimeout(() => {
        setIsMenuClosing(false)
      }, 500)
    } else {
      setIsMenuOpen(true)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Basic scrolled state
      setIsScrolled(currentScrollY > 50)

      // Mobile navbar hide/show logic
      if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px - hide navbar
          setIsNavbarVisible(false)
          // Close menu if open
          if (isMenuOpen) {
            setIsMenuOpen(false)
          }
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsNavbarVisible(true)
        }
      } else {
        // Always show on desktop
        setIsNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isMenuOpen])

  // Enhanced scroll animation observer with bidirectional animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        } else {
          entry.target.classList.remove("animate")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .fade-in-down, .rotate-in",
    )
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    // Prevent navigation if menu is closing
    if (isMenuClosing) return

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const downloadCV = () => {
    try {
      const link = document.createElement("a")
      link.href = cvFile
      link.download = "Sarmiento_Ranilei_A_CV.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
      showNotification("Download failed. Please try again.")
    }
  }

  const showNotification = (message) => {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add("show")
    }, 100)

    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    showNotification("Message sent successfully! I'll get back to you soon.")
    e.target.reset()
  }

  const projects = [
    {
      title: "NESRAC Insight Hub",
      description:
        "Integrated Swine Procurement and Meat Distribution System for Nueva Ecija Swine Raisers Agriculture Cooperative. Automates pig procurement, meat distribution, order processing, and inventory management.",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      github: "https://github.com/ikomaqt/Nesrac_Insighthub",
      image: nesracImg,
    },
    {
      title: "Alumni Management System",
      description:
        "Job matching platform for ASKI Skills and Knowledge Institute Inc. alumni, built with modern web technologies for efficient alumni tracking and job placement.",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      github: "https://github.com/ikomaqt/Alumni_MS",
      image: alumniImg,
    },
    {
      title: "Student Health Record System",
      description:
        "Online health record system that allows form submissions, automates data collection, reduces manual paperwork, and improves real-time access to student health records.",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      github: "https://github.com/ikomaqt/Student_hr",
      image: healthRecordImg,
    },
    {
      title: "POS for Dairy Daily",
      description:
        "Point of Sale system for Dairy Daily that allows staff to monitor daily sales, track cups sold, and access historical records for reporting and inventory purposes.",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      github: "https://github.com/ikomaqt/POS",
      image: posImg,
    },
    {
      title: "Library Management System",
      description:
        "Comprehensive library system with book borrowing, returns, and barcode scanner integration for quick book additions and inventory tracking.",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      github: "https://github.com/ikomaqt/Library_MS",
      image: libraryImg,
    },
  ]

  const skills = {
    "Programming & Web": [
      { name: "Python", icon: "fab fa-python", color: "#3776AB" },
      { name: "React", icon: "fab fa-react", color: "#61DAFB" },
      { name: "PHP", icon: "fab fa-php", color: "#777BB4" },
      { name: "HTML", icon: "fab fa-html5", color: "#E34F26" },
      { name: "CSS", icon: "fab fa-css3-alt", color: "#1572B6" },
    ],
    Database: [{ name: "MySQL", icon: "fas fa-database", color: "#4479A1" }],
    Tools: [
      { name: "MS Office", icon: "fab fa-microsoft", color: "#D83B01" },
      { name: "Canva", icon: "fas fa-palette", color: "#00C4CC" },
      { name: "Figma", icon: "fab fa-figma", color: "#F24E1E" },
    ],
  }

  const navigationItems = ["Home", "About", "Skills", "Experience", "Projects", "Contact"]

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${!isNavbarVisible ? "navbar-hidden" : ""}`}>
        <div className="nav-container">
          <ul className="nav-menu desktop-menu">
            {navigationItems.map((item) => (
              <li key={item} className="nav-item">
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="nav-link"
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={handleMenuToggle}
            aria-label="Toggle navigation menu"
            disabled={isMenuClosing}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""} ${isMenuClosing ? "closing" : ""}`}>
          <ul className="mobile-nav-list">
            {navigationItems.map((item) => (
              <li key={item} className="mobile-nav-item">
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="mobile-nav-link"
                  aria-label={`Navigate to ${item} section`}
                  disabled={isMenuClosing}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Landing/Welcome Section */}
      <section id="home" className="landing">
        <div className="landing-container">
          {/* Left Side - Welcome Text */}
          <div className="welcome-content">
            <div className="welcome-text">
              <h1 className="welcome-title">
                <span className="welcome-word">Welcome</span>
                <span className="welcome-word">to</span>
                <span className="welcome-word">My</span>
                <span className="welcome-word">Portfolio</span>
              </h1>
              <p className="welcome-subtitle">Building Web Solutions with Code</p>
              <p className="welcome-description">
                Hi! I'm a Full-stack Developer who loves creating websites and web applications. I enjoy learning new
                technologies and building projects that solve real problems.
              </p>
            </div>
          </div>

          {/* Right Side - Network Connectivity Animation */}
          <div className="animation-container">
            <div className="network-system">
              {/* Central Hub Node */}
              <div className="network-node central-node">
                <div className="node-core">
                  <i className="fas fa-server" aria-hidden="true"></i>
                </div>
                <div className="node-pulse"></div>
              </div>

              {/* Satellite Nodes */}
              <div className="network-node satellite-node node-1">
                <div className="node-core">
                  <i className="fas fa-laptop" aria-hidden="true"></i>
                </div>
              </div>

              <div className="network-node satellite-node node-2">
                <div className="node-core">
                  <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                </div>
              </div>

              <div className="network-node satellite-node node-3">
                <div className="node-core">
                  <i className="fas fa-database" aria-hidden="true"></i>
                </div>
              </div>

              <div className="network-node satellite-node node-4">
                <div className="node-core">
                  <i className="fas fa-cloud" aria-hidden="true"></i>
                </div>
              </div>

              <div className="network-node satellite-node node-5">
                <div className="node-core">
                  <i className="fas fa-wifi" aria-hidden="true"></i>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="network-connections">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className={`connection-line line-${num}`}>
                    <div className="data-packet"></div>
                  </div>
                ))}
              </div>

              {/* Floating Tech Elements */}
              <div className="floating-tech">
                {[
                  { icon: "fas fa-shield-alt", delay: "0s" },
                  { icon: "fas fa-cog", delay: "1s" },
                  { icon: "fas fa-chart-line", delay: "2s" },
                  { icon: "fas fa-lock", delay: "3s" },
                ].map((tech, index) => (
                  <div key={index} className="tech-element" style={{ "--delay": tech.delay }}>
                    <i className={tech.icon} aria-hidden="true"></i>
                  </div>
                ))}
              </div>

              {/* Background Grid */}
              <div className="tech-grid">
                {[1, 2, 3].map((num) => (
                  <div key={`h-${num}`} className={`grid-line horizontal line-${num}`}></div>
                ))}
                {[1, 2, 3].map((num) => (
                  <div key={`v-${num}`} className={`grid-line vertical line-${num}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            {/* Profile Image at the top */}
            <div className="hero-image fade-in-up">
              <div className="profile-circle">
                <img
                  src={profileImg || "/placeholder.svg"}
                  alt="Ranilei Sarmiento - Full Stack Developer"
                  className="profile-img"
                />
              </div>
              <div className="floating-elements">
                {[
                  { icon: "fab fa-php", delay: "0s" },
                  { icon: "fas fa-database", delay: "0.5s" },
                  { icon: "fab fa-python", delay: "1s" },
                  { icon: "fab fa-html5", delay: "1.5s" },
                ].map((tech, index) => (
                  <div key={index} className="tech-icon" style={{ "--delay": tech.delay }}>
                    <i className={tech.icon} aria-hidden="true"></i>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-text fade-in-up">
              <p className="greeting">Hello, I'm</p>
              <h1 className="name">Ranilei Sarmiento</h1>
              <h2 className="title">Full-stack Developer</h2>
              <p className="description">
                I’m a web developer with 1 year of experience in creating websites and systems.
                I graduated from Nueva Ecija University of Science and Technology with a degree in Bachelor of Science in Information Technology, major in Database Systems Technology.
                I’m a motivated person who loves learning and improving my skills. 
                I always do my best and aim to make a positive impact in every project I work on.


              </p>
              <div className="hero-buttons">
                <button onClick={downloadCV} className="download-btn">
                  <i className="fas fa-download" aria-hidden="true"></i>
                  Download CV
                </button>
                <button onClick={() => scrollToSection("projects")} className="portfolio-btn">
                  View Projects
                </button>
              </div>
            </div>
          </div>

          <div className="social-links fade-in-up">
            <a
              href="https://github.com/ikomaqt"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ranilei-sarmiento-862855349/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.facebook.com/not.ikoma/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Facebook profile"
            >
              <i className="fab fa-facebook" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title fade-in-down">Technical Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={category} className={`skill-category ${index % 2 === 0 ? "fade-in-left" : "fade-in-right"}`}>
                <h3>{category}</h3>
                <div className="skill-badges">
                  {skillList.map((skill) => (
                    <div key={skill.name} className="skill-badge" style={{ "--skill-color": skill.color }}>
                      <i className={skill.icon} aria-hidden="true"></i>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title fade-in-down">Work Experience</h2>
          <div className="experience-grid">
            <div className="experience-card rotate-in">
              <div className="exp-header">
                <span className="exp-role">Intern Full Stack Developer</span>
                <span className="exp-date">January 2025 - May 2025</span>
              </div>
              <div className="exp-company">Aski Skills and Knowledge Institute Inc.</div>
              <div className="exp-desc">
                Contributed as a Full Stack Developer intern, focusing on system feature development, database
                management, and front-end design improvements. Used PHP, MySQL, HTML, CSS, and Git for team
                collaboration and project updates.
              </div>
              <ul className="exp-list">
                <li>
                  Created the development of the <strong>Alumni Management System</strong>
                </li>
                <li>
                  Created and maintained the <strong>Student Health Record System</strong>
                </li>
                <li>
                  Contributed to the <strong>POS System for Dairy Daily</strong>
                </li>
                <li>
                  Contributed to the <strong>Library Management System</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title fade-in-down">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card ${index % 3 === 0 ? "fade-in-left" : index % 3 === 1 ? "scale-in" : "fade-in-right"}`}
                onClick={() => window.open(project.github, "_blank")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.open(project.github, "_blank")
                  }
                }}
              >
                <div className="project-image">
                  <img src={project.image || "/placeholder.svg"} alt={`${project.title} screenshot`} />
                  <div className="project-overlay">
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <i className="fab fa-github" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title fade-in-down">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-card scale-in">
              <h3>Let's work together</h3>
              <p>
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  <span>ranileiaquinosarmiento.0327@gmail.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  <span>+63 (920) 387-50237</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <span>Quezon, Nueva Ecija</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
