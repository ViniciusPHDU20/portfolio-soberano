import React, { useState } from 'react';
import { Terminal, Shield, Cloud, Download, Cpu, Bot, Github, ExternalLink, ChevronRight, X } from 'lucide-react';
import { projects, Project } from './data/projects';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Security': return <Shield className="w-6 h-6 text-neon-cyan" />;
      case 'Backend': return <Cloud className="w-6 h-6 text-neon-purple" />;
      case 'Rust': return <Cpu className="w-6 h-6 text-neon-cyan" />;
      case 'Automation': return <Bot className="w-6 h-6 text-neon-purple" />;
      default: return <Terminal className="w-6 h-6" />;
    }
  };

  return (
    <div className="container">
      {/* Header Section */}
      <header className="hero">
        <h1 className="glow-purple">SOVEREIGN ENGINEERING</h1>
        <p className="subtitle mono">Architecting the future through hardware and software infiltration.</p>
        <div className="header-tags">
          <span className="tag neon-border">Arch Linux</span>
          <span className="tag neon-border">Reverse Engineering</span>
          <span className="tag neon-border">Automation</span>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card neon-border"
            onClick={() => setSelectedProject(project)}
          >
            <div className="card-header">
              {getIcon(project.category)}
              <span className="category-tag mono">{project.category}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="card-footer">
              <span className="learn-more">Ver Detalhes <ChevronRight className="w-4 h-4" /></span>
            </div>
          </div>
        ))}
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content neon-border" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              <X className="w-6 h-6" />
            </button>
            <div className="modal-header">
              {getIcon(selectedProject.category)}
              <h2 className="glow-purple">{selectedProject.title}</h2>
            </div>
            <p className="modal-long-desc">{selectedProject.longDescription}</p>
            
            <div className="modal-tech-stack">
              <h4>TECH STACK:</h4>
              <div className="stack-tags">
                {selectedProject.stack.map(tech => (
                  <span key={tech} className="tech-tag mono">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary neon-border">
                <Github className="w-5 h-5" /> REPOSITÓRIO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p className="mono">© 2026 JESUS - Absolute Authority</p>
      </footer>

      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero {
          text-align: center;
          margin-bottom: 4rem;
          padding: 4rem 0;
        }

        .hero h1 {
          font-size: 3.5rem;
          letter-spacing: 0.2rem;
          margin-bottom: 1rem;
        }

        .subtitle {
          color: var(--neon-cyan);
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .header-tags {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .tag {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          background: rgba(176, 38, 255, 0.1);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: var(--panel-bg);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 30px rgba(176, 38, 255, 0.4);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-tag {
          font-size: 0.7rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .project-card h3 {
          font-size: 1.5rem;
          color: var(--neon-cyan);
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          color: var(--neon-purple);
        }

        .learn-more {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: bold;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .modal-content {
          background: #0a0515;
          width: 90%;
          max-width: 700px;
          padding: 3rem;
          border-radius: 15px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modal-header h2 {
          font-size: 2rem;
        }

        .modal-long-desc {
          color: var(--text-main);
          font-size: 1.1rem;
        }

        .stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .tech-tag {
          background: #1a0a2e;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.8rem;
          color: var(--neon-cyan);
          border: 1px solid rgba(0, 243, 255, 0.2);
        }

        .modal-actions {
          margin-top: 1rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 2rem;
          background: var(--neon-purple);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: white;
          color: var(--neon-purple);
          box-shadow: 0 0 20px white;
        }

        .footer {
          margin-top: 4rem;
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(176, 38, 255, 0.1);
          color: var(--text-dim);
        }

        .mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
};

export default App;
