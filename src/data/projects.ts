export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  githubUrl: string;
  category: "Security" | "Backend" | "Rust" | "Automation";
}

export const projects: Project[] = [
  {
    id: "archshield-pro",
    title: "ArchShield PRO",
    description: "Monitoramento de rede e detecção de anomalias com Machine Learning.",
    longDescription: "Uma solução de elite para segurança de rede no Arch Linux. Utiliza Scapy para captura de pacotes em tempo real e Scikit-Learn (IsolationForest) para identificar comportamentos anômalos de rede. Possui dashboard em FastAPI e integração profunda com Iptables.",
    stack: ["Python", "Scapy", "FastAPI", "Scikit-Learn", "Arch Linux"],
    githubUrl: "https://github.com/ViniciusPHDU20/ArchShield",
    category: "Security"
  },
  {
    id: "sovereign-cloud",
    title: "SOVEREIGN-CLOUD-SaaS",
    description: "Backend robusto para armazenamento e processamento de arquivos.",
    longDescription: "Sistema distribuído que permite uploads fracionados e seguros. Integração exclusiva com Discord Webhooks para armazenamento de baixo custo e alta disponibilidade. Implementado com FastAPI e SQLite.",
    stack: ["FastAPI", "Python", "SQLite", "Discord API"],
    githubUrl: "https://github.com/ViniciusPHDU20/SOVEREIGN-CLOUD-SaaS",
    category: "Backend"
  },
  {
    id: "phdu-downloader",
    title: "PHDU Downloader Manager",
    description: "Gerenciador de downloads híbrido para alta performance.",
    longDescription: "Construído com Rust e Tauri para garantir leveza e velocidade. Integra os motores yt-dlp e gallery-dl com uma interface moderna em React, permitindo extração massiva de mídia de múltiplas fontes.",
    stack: ["Rust", "Tauri", "React", "TypeScript"],
    githubUrl: "https://github.com/ViniciusPHDU20/PHDU-Downloader-Manager",
    category: "Automation"
  },
  {
    id: "axon-media",
    title: "AXON-MEDIA-ENGINE",
    description: "Engine de processamento de mídia legado em Rust.",
    longDescription: "O motor original AXON. Focado em processamento de streams de baixa latência e manipulação de buffers de vídeo. Um marco na jornada de engenharia de sistemas de alta performance.",
    stack: ["Rust", "FFmpeg", "Systems Programming"],
    githubUrl: "https://github.com/ViniciusPHDU20/AXON-MEDIA-ENGINE",
    category: "Rust"
  },
  {
    id: "rewards-bot",
    title: "JESUS-Rewards-Bot",
    description: "Automação via Playwright simulando ambiente mobile.",
    longDescription: "Script de automação inteligente para farm de recompensas. Simula dispositivos mobile (Moto G52) através do Playwright, utilizando clonagem de perfis e injeção de comportamento humano para bypass de detecção.",
    stack: ["Node.js", "Playwright", "Automation"],
    githubUrl: "https://github.com/ViniciusPHDU20/JESUS-Rewards-Bot",
    category: "Automation"
  }
];
