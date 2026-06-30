import React, { useState, useEffect } from 'react';
import { SKILLS, PROJECTS, EXPERIENCES, PERSONAL_INFO, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import InteractiveCanvas from '../components/InteractiveCanvas';
import {
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  Code,
  Award,
  BookOpen,
  Send,
  MessageSquare,
} from 'lucide-react';
import avatarImg from '../assets/avatar.png';
import '../styles/pages/Home.css';

const GithubIcon = ({ size = 16 }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
  </svg>
);

const TITLES = [
  'Software Developer',
  'Java Enthusiast',
  'React Creator',
  
];

const Home = () => {
  const [activeCategory, setActiveCategory]   = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData]               = useState({ name: '', email: '', subject: '', message: '' });
  const [formFeedback, setFormFeedback]       = useState(null);

  // Typewriter Text Rotator state
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let timer;
    const currentFullTitle = TITLES[titleIndex];
    const typeSpeed = isDeleting ? 35 : 75;

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullTitle.substring(0, displayText.length + 1));
        if (displayText === currentFullTitle) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayText(currentFullTitle.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
          return;
        }
      }
      timer = setTimeout(handleType, typeSpeed);
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  // Scroll animations Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.id === 'skills') {
              entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
                bar.style.width = `${bar.getAttribute('data-percent')}%`;
              });
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, [activeCategory]);

 
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormFeedback({ type: 'success', text: 'Sending message...' });
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Portfolio Contact',
            message: formData.message
        })
      });
      
      if (response.ok) {
        setFormFeedback({ type: 'success', text: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormFeedback({ type: 'error', text: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      setFormFeedback({ type: 'error', text: 'An error occurred. Please check your internet connection.' });
    }
  };

  const skillCategories = ['All', ...new Set(SKILLS.map((s) => s.category))];
  const filteredSkills  = activeCategory === 'All' ? SKILLS : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Interactive Canvas Background */}
      <InteractiveCanvas />

      {/* Background glow blobs */}
      <div className="bg-glow-container">
        <div className="bg-glow-blob bg-glow-blob-1"></div>
        <div className="bg-glow-blob bg-glow-blob-2"></div>
      </div>

      {/* 1. HERO */}
      <section id="home" className="section animate-on-scroll reveal-fade-up" style={{ paddingTop: 'calc(var(--header-height) + 4rem)' }}>
        <div className="hero-container">
          <div className="hero-text animate-on-scroll reveal-fade-left">
            <span className="hero-subtitle">Welcome to my space</span>
            <h1 className="hero-title">
              Hi, I'm a <br />
              <span style={{ display: 'inline-block', minHeight: '4.8rem' }}>{displayText}</span>
              <span className="typewriter-cursor">|</span>
            </h1>
            <p className="hero-desc">
              I design and build premium web applications using Java and React. I specialize in crafting
              interactive user interfaces, robust backend systems, and high-fidelity animations.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View My Work <Code size={18} /></a>
              <a href="#contact"  className="btn-secondary">Get In Touch <Mail size={18} /></a>
              <a href="/resume.pdf" download="Resume.pdf" className="btn-secondary" style={{ border: '1px dashed var(--accent-primary)', color: 'var(--accent-primary)' }}>
                Download Resume <Award size={18} />
              </a>
            </div>
          </div>

          <div className="hero-image-wrapper animate-on-scroll reveal-fade-right">
            <div className="profile-liquid-frame">
              <div className="profile-glow"></div>
              
              {/* Floating tech orbital icons */}
              <div className="orbital-icon orbital-1" title="React"><Code size={20} /></div>
              <div className="orbital-icon orbital-2" title="Java"><Award size={20} /></div>
              <div className="orbital-icon orbital-3" title="Projects"><Briefcase size={20} /></div>
              <div className="orbital-icon orbital-4" title="Learning"><BookOpen size={20} /></div>
              
              <div className="profile-avatar-wrapper">
                <img src={avatarImg} alt="Developer Profile Avatar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-details animate-on-scroll reveal-fade-left">
            <p className="about-p">
              Hi, I'm <strong>Mohammed Arshath K H</strong>, currently pursuing my <strong>Bachelor of Engineering in Computer Science and Engineering (2nd Year)</strong>.
              I am an enthusiastic developer passionate about creating responsive, interactive, and high-performance web applications using Java and React.
            </p>
            <p className="about-p">
              I love learning new technologies, building clean components, and solving complex problems. I am actively seeking <strong>internship opportunities</strong> where I can apply my classroom knowledge and hands-on projects to real-world software development teams.
            </p>
          </div>
          <div className="about-cards">
            {[
              { icon: <Code size={28} />, title: 'Java & React', val: 'Full-Stack Core' },
              { icon: <Award size={28} />, title: 'Interactive UI', val: 'CSS Animations' },
              { icon: <Briefcase size={28} />, title: 'Java Backend', val: 'Secure Systems' },
              { icon: <BookOpen size={28} />, title: 'Constant Learning', val: 'Latest Frameworks' }
            ].map((card, idx) => (
              <div key={idx} className={`about-card glass-panel animate-on-scroll reveal-zoom-in stagger-${idx + 1}`}>
                <div className="about-card-icon" style={{ color: 'var(--accent-primary)' }}>{card.icon}</div>
                <span className="about-card-title">{card.title}</span>
                <span className="about-card-val">{card.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {EDUCATION.map((edu, index) => (
            <div key={edu.id} className={`education-card glass-panel animate-on-scroll reveal-fade-up stagger-${(index % 2) + 1}`}>
              <div className="education-header">
                <div className="education-title-group">
                  <div className="education-icon-wrapper">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <h4 className="education-institution">{edu.institution}</h4>
                  </div>
                </div>
                <div className="education-meta">
                  <span className="education-duration">{edu.duration}</span>
                  <span className="education-location">{edu.location}</span>
                </div>
              </div>
              <p className="education-desc">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SKILLS */}
      <section id="skills" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-categories animate-on-scroll reveal-zoom-in">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`skills-tab ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className={`skill-item animate-on-scroll reveal-fade-up stagger-${(index % 4) + 1}`}>
              <div className="skill-info">
                <span>{skill.name}</span>
                <span style={{ color: 'var(--accent-primary)' }}>{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" data-percent={skill.level}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section id="projects" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid-cols-3">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`project-card glass-panel animate-on-scroll reveal-fade-up stagger-${(index % 2) + 1}`}>
              <div className="project-img-container">
                {project.image ? (
                  <img src={project.image} alt={`${project.title} Preview`} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dark)' }}>
                    <Code size={48} style={{ opacity: 0.3 }} />
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Project Preview</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3 style={{ fontSize: '1.4rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {project.description}
                </p>
                <div className="project-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                      <GithubIcon size={16} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="project-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>&times;</button>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
              {selectedProject.title}
            </h2>
            <div className="project-tags" style={{ marginBottom: '1.5rem' }}>
              {selectedProject.technologies.map((tech) => (
                <span key={tech} className="project-tag">{tech}</span>
              ))}
            </div>
            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {selectedProject.longDescription}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>
                  <GithubIcon size={16} /> Source Code
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
                  <ExternalLink size={16} /> Live Preview
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. EXPERIENCE */}
      <section id="experience" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">Experience & Journey</h2>

        {EXPERIENCES.length > 0 ? (
          <div className="timeline">
            {EXPERIENCES.map((exp, index) => (
              <div key={exp.id} className={`timeline-item animate-on-scroll reveal-fade-up stagger-${(index % 2) + 1}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-panel glass-panel">
                  <div className="timeline-meta">
                    <span className="timeline-duration">{exp.duration}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>{exp.location}</span>
                  </div>
                  <h3 className="timeline-title">{exp.role}</h3>
                  <div className="timeline-subtitle">{exp.company} • {exp.type}</div>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="timeline-empty-card glass-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
            <Briefcase size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem', opacity: 0.7 }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Currently have no experience</h3>
          </div>
        )}
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {CERTIFICATIONS.map((cert, index) => (
            <div key={cert.id} className={`cert-card glass-panel animate-on-scroll reveal-fade-up stagger-${(index % 3) + 1}`}>
              <div className="cert-header">
                <div className="cert-icon-wrapper">
                  <Award size={24} />
                </div>
                <span className="cert-date">{cert.date}</span>
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <h4 className="cert-issuer">{cert.issuer}</h4>
                <p className="cert-desc">{cert.description}</p>
              </div>
              {cert.credentialUrl && (
                <div className="cert-footer">
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn-secondary cert-verify-btn">
                    <span>Verify Certificate</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="section animate-on-scroll reveal-fade-up">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info animate-on-scroll reveal-fade-left">
            <h3 style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>Let's discuss <br />something great.</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              I'm open to freelance opportunities, full-time positions, or collaboration. Send a message and let's talk!
            </p>
            <div className="contact-card glass-panel animate-on-scroll reveal-zoom-in stagger-1">
              <div className="contact-icon-wrapper"><Mail size={20} /></div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>{PERSONAL_INFO.email}</p>
              </div>
            </div>
            <div className="contact-card glass-panel animate-on-scroll reveal-zoom-in stagger-2">
              <div className="contact-icon-wrapper"><MapPin size={20} /></div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>{PERSONAL_INFO.location}</p>
              </div>
            </div>
            {/* Download Resume option in contact info */}
            <div className="contact-card glass-panel animate-on-scroll reveal-zoom-in stagger-3">
              <div className="contact-icon-wrapper"><Award size={20} /></div>
              <div className="contact-text">
                <h4>Resume</h4>
                <p>
                  <a href="/resume.pdf" download="Resume.pdf" style={{ color: 'var(--accent-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    Download PDF Resume &darr;
                  </a>
                </p>
              </div>
            </div>
          </div>

          <form className="contact-form glass-panel animate-on-scroll reveal-fade-right" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required className="form-control" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required className="form-control" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleFormChange} className="form-control" placeholder="Enter message subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleFormChange} required rows={5} className="form-control" placeholder="Type your message here..."></textarea>
            </div>

            {formFeedback && (
              <div className={`form-feedback ${formFeedback.type}`}>
                <MessageSquare size={16} />
                <span>{formFeedback.text}</span>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
              <span>Send Message</span> <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
