import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Shield, Cloud, Cpu, Bot, Network, Zap, Code, ExternalLink } from 'lucide-react';
import { projects, type Project } from './data/projects';

// --- Types ---
type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: React.ReactNode;
};

// --- Boot Sequence Component ---
const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const bootSteps = [
      <span key="1">Initializing Sovereign Kernel v6.6.9-arch1-1... <span className="boot-ok">[OK]</span></span>,
      <span key="2">Mounting root filesystem... <span className="boot-ok">[OK]</span></span>,
      <span key="3">Loading hardware drivers (RTX 3060 Ti)... <span className="boot-ok">[OK]</span></span>,
      <span key="4">Establishing secure ZeroTier tunnel... <span className="boot-ok">[OK]</span></span>,
      <span key="5">Bypassing standard authentication protocols... <span className="boot-warn">[WARN]</span></span>,
      <span key="6">Injecting memory hooks (AOB Scan)... <span className="boot-ok">[OK]</span></span>,
      <span key="7">Starting Sovereign UI... <span className="boot-ok">[OK]</span></span>,
      <br key="8" />,
      <span key="9" className="glow-text-purple" style={{ fontSize: '1.2rem' }}>ACCESS GRANTED. WELCOME, JESUS.</span>
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSteps.length) {
        setLines(prev => [...prev, bootSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="boot-sequence">
      <div className="scanlines"></div>
      <div className="vignette"></div>
      {lines.map((line, i) => (
        <div key={i} className="boot-line">{line}</div>
      ))}
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'init', type: 'system', content: 'Sovereign OS v2.0 ready. Type "help" to see available commands.' }
  ]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (booted && !activeProject) {
      inputRef.current?.focus();
    }
  }, [booted, activeProject]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newHistory: HistoryItem[] = [...history, { id: Date.now().toString(), type: 'input', content: trimmedCmd }];
    const parts = trimmedCmd.toLowerCase().split(' ');
    const command = parts[0];
    const arg = parts[1];

    switch (command) {
      case 'help':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: (
            <div>
              <div>Available commands:</div>
              <div style={{ paddingLeft: '1rem', color: 'var(--neon-cyan)' }}>
                <div>whoami  - Display user profile</div>
                <div>ls      - List available projects</div>
                <div>cat     - Read project details (e.g., cat archshield)</div>
                <div>execute - Launch the project GUI (e.g., execute archshield)</div>
                <div>clear   - Clear terminal output</div>
              </div>
            </div>
          )
        });
        break;
      
      case 'whoami':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: (
            <div>
              <div className="glow-text-purple">User: ViniciusPHDU (Absolute Authority)</div>
              <div>Role: Senior Systems Architect & Reverse Engineer</div>
              <div>Base: Arch Linux / Hyprland</div>
              <div>Specialization: Memory Injection, Network Tunneling, Automation</div>
            </div>
          )
        });
        break;

      case 'ls':
        newHistory.push({
          id: Date.now().toString() + 'out',
          type: 'output',
          content: (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--terminal-green)' }}>
              {projects.map(p => <span key={p.id}>{p.id}</span>)}
            </div>
          )
        });
        break;

      case 'cat':
        if (!arg) {
          newHistory.push({ id: Date.now().toString() + 'err', type: 'error', content: 'cat: missing operand' });
        } else {
          const proj = projects.find(p => p.id === arg);
          if (proj) {
            newHistory.push({
              id: Date.now().toString() + 'out',
              type: 'output',
              content: (
                <div>
                  <div style={{ color: 'var(--neon-cyan)' }}>Title: {proj.title}</div>
                  <div>Desc: {proj.description}</div>
                  <div>Type "execute {proj.id}" for full interface.</div>
                </div>
              )
            });
          } else {
            newHistory.push({ id: Date.now().toString() + 'err', type: 'error', content: `cat: ${arg}: No such file or project` });
          }
        }
        break;

      case 'execute':
      case 'launch':
        if (!arg) {
          newHistory.push({ id: Date.now().toString() + 'err', type: 'error', content: `${command}: missing operand` });
        } else {
          const proj = projects.find(p => p.id === arg);
          if (proj) {
            newHistory.push({ id: Date.now().toString() + 'sys', type: 'system', content: `Launching GUI for ${proj.title}...` });
            setActiveProject(proj);
          } else {
            newHistory.push({ id: Date.now().toString() + 'err', type: 'error', content: `${command}: ${arg}: Target not found` });
          }
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        newHistory.push({
          id: Date.now().toString() + 'err',
          type: 'error',
          content: `bash: ${trimmedCmd}: command not found`
        });
        break;
    }

    setHistory(newHistory);
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  const getIcon = (category: string) => {
    switch (category) {
      case 'Security': return <Shield className="w-6 h-6 text-neon-cyan" />;
      case 'Backend': return <Cloud className="w-6 h-6 text-neon-purple" />;
      case 'Rust': return <Cpu className="w-6 h-6 text-neon-cyan" />;
      case 'Automation': return <Bot className="w-6 h-6 text-neon-purple" />;
      default: return <TerminalIcon className="w-6 h-6" />;
    }
  };

  return (
    <>
      <div className="scanlines"></div>
      <div className="vignette"></div>
      
      <div className="os-container">
        
        {/* HUD */}
        <aside className="hud-panel">
          <div className="hud-title glow-text-purple">VINICIUSPHDU</div>
          
          <div className="hud-section">
            <h3><TerminalIcon className="w-4 h-4" /> SYSTEM STATUS</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div>OS: Arch Linux x86_64</div>
              <div>Kernel: 6.6.9-arch1-1</div>
              <div>WM: Hyprland (Wayland)</div>
              <div>Uptime: 13 days, 4 hours</div>
            </div>
          </div>

          <div className="hud-section">
            <h3><Zap className="w-4 h-4" /> SKILL RADAR</h3>
            
            <div className="skill-bar-container">
              <div className="skill-label"><span>Reverse Engineering</span> <span>98%</span></div>
              <div className="skill-bar"><div className="skill-fill" style={{ width: '98%' }}></div></div>
            </div>
            
            <div className="skill-bar-container">
              <div className="skill-label"><span>Rust / C++</span> <span>95%</span></div>
              <div className="skill-bar"><div className="skill-fill" style={{ width: '95%' }}></div></div>
            </div>
            
            <div className="skill-bar-container">
              <div className="skill-label"><span>Network Tunneling</span> <span>90%</span></div>
              <div className="skill-bar"><div className="skill-fill" style={{ width: '90%' }}></div></div>
            </div>
            
            <div className="skill-bar-container">
              <div className="skill-label"><span>React / Frontend</span> <span>85%</span></div>
              <div className="skill-bar"><div className="skill-fill" style={{ width: '85%' }}></div></div>
            </div>
          </div>
        </aside>

        {/* Terminal */}
        <main className="terminal-panel" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-header">
            <div className="terminal-title">~/sovereign-node</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Shield className="w-4 h-4 text-neon-cyan" />
              <Network className="w-4 h-4 text-neon-purple" />
            </div>
          </div>

          <div className="terminal-history">
            {history.map(item => (
              <div key={item.id} className="term-line">
                {item.type === 'input' && <span className="term-prompt">vinicius@arch ~$</span>}
                <span style={{ 
                  color: item.type === 'error' ? 'red' : 
                         item.type === 'system' ? 'var(--text-muted)' : 
                         'inherit' 
                }}>
                  {item.content}
                </span>
              </div>
            ))}
            
            <div className="term-input-line">
              <span className="term-prompt">vinicius@arch ~$</span>
              <input 
                ref={inputRef}
                type="text" 
                className="term-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleCommand(input);
                    setInput('');
                  }
                }}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={bottomRef}></div>
          </div>
        </main>

        {/* GUI Modal */}
        {activeProject && (
          <div className="project-gui-overlay" onClick={() => setActiveProject(null)}>
            <div className="project-gui" onClick={e => e.stopPropagation()}>
              <button className="gui-close" onClick={() => setActiveProject(null)}>[ X ] KILL</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {getIcon(activeProject.category)}
                <h2 className="gui-title" style={{ margin: 0 }}>{activeProject.title}</h2>
              </div>
              <p className="gui-desc">{activeProject.longDescription}</p>
              
              <div className="gui-tech">
                {activeProject.stack.map(t => (
                  <span key={t} className="gui-tag">{t}</span>
                ))}
              </div>

              <div className="modal-actions" style={{ marginTop: '1rem' }}>
                <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary neon-border" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 2rem', background: 'var(--neon-purple)', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                  <Code className="w-5 h-5" /> REPOSITÓRIO <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default App;
