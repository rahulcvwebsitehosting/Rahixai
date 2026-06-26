import React from 'react';

export const COLORS = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  accent: '#ec4899',
  bgPrimary: '#0f172a',
  bgSecondary: '#1e293b',
  bgTertiary: '#334155',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
];

export const TRANSLATIONS: Record<string, any> = {
  en: {
    launchAssistant: "Launch Assistant",
    newSession: "New Session",
    workspaceLogs: "Workspace Logs",
    settings: "Settings",
    saveAndExit: "Save & Exit",
    interfaceDarkMode: "Interface Dark Mode",
    premiumInteractivity: "Premium Interactivity",
    systemLanguage: "System Language",
    usageCapacity: "Usage Capacity",
    neuralLoad: "Neural Load",
    resetsIn: "Resets in",
    commandRahix: "Command Rahix...",
    howCanHelp: "How can Rahix help?",
    deepResearch: "DEEP RESEARCH",
    imageMode: "IMAGE MODE",
    attach: "ATTACH",
    backToHome: "Back to Home",
    workspaceCore: "Workspace Core"
  },
  hi: {
    launchAssistant: "असिस्टेंट शुरू करें",
    newSession: "नया सत्र",
    workspaceLogs: "वर्कस्पेस लॉग्स",
    settings: "सेटिंग्स",
    saveAndExit: "सहेजें और बाहर निकलें",
    interfaceDarkMode: "डार्क मोड",
    premiumInteractivity: "प्रीमियम इंटरैक्टिविटी",
    systemLanguage: "सिस्टम की भाषा",
    usageCapacity: "उपयोग क्षमता",
    neuralLoad: "न्यूरल लोड",
    resetsIn: "रीसेट होगा",
    commandRahix: "राहिक्स को कमांड दें...",
    howCanHelp: "राहिक्स आपकी कैसे मदद कर सकता है?",
    deepResearch: "गहन शोध",
    imageMode: "इमेज मोड",
    attach: "संलग्न करें",
    backToHome: "होम पर वापस",
    workspaceCore: "वर्कஸ்பेस कोर"
  },
  ta: {
    launchAssistant: "உதவியாளரைத் தொடங்கு",
    newSession: "புதிய அமர்வு",
    workspaceLogs: "பணிப்பதிவுகள்",
    settings: "அமைப்புகள்",
    saveAndExit: "சேமித்து வெளியேறு",
    interfaceDarkMode: "இருண்ட பயன்முறை",
    premiumInteractivity: "பிரீமியம் செயல்பாடு",
    systemLanguage: "கணினி மொழி",
    usageCapacity: "பயன்பாட்டுத் திறன்",
    neuralLoad: "இயக்க அளவு",
    resetsIn: "மீண்டும் தொடங்கும்",
    commandRahix: "ரஹிக்ஸ் கட்டளை...",
    howCanHelp: "ரஹிக்ஸ் எவ்வாறு உதவ முடியும்?",
    deepResearch: "ஆழ்ந்த ஆராய்ச்சி",
    imageMode: "படப் பயன்முறை",
    attach: "இணைக்கவும்",
    backToHome: "முகப்புக்குத் திரும்பு",
    workspaceCore: "பணியிட மையம்"
  }
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/rahulshyamcivil/",
  github: "https://github.com/rahulshyam2006",
  instagram: "https://www.instagram.com/rahulcvjps",
  whatsapp: "https://wa.me/917305169964",
  email: "mailto:rahulshyam2006@outlook.com",
  resume: "https://drive.google.com/file/d/11BXxzDZneovwL4tFqS0xxujDtX87W1JI/view",
  portfolio: "https://rahulshyam-portfolio.vercel.app/"
};

export const PROJECTS = [
  { name: "Hostel Planner", url: "https://hostel-planner.vercel.app/", tech: "Next.js, Canvas, OpenAI" },
  { name: "CivilVision AI", url: "https://civil-vis-ai.vercel.app/", tech: "React 19, Gemini AI" },
  { name: "Ecobrick", url: "https://sngreensolutions.vercel.app/", tech: "Next.js, 3D Viz" },
  { name: "WebXR Shooter", url: "https://disc-shooter.vercel.app/", tech: "Three.js, MediaPipe" },
  { name: "TunnelViz", url: "https://tunnel-viz.vercel.app/", tech: "Three.js, React" },
  { name: "TypeArena", url: "https://typearenacv.vercel.app/", tech: "Node.js, Socket.io" }
];

export const EXPERTISE = [
  {
    category: "Frontend Architecture",
    tools: ["React 19", "Next.js 14", "Tailwind CSS", "Framer Motion"],
    description: "Building scalable, high-performance web systems with focus on Engineering UX."
  },
  {
    category: "Applied Intelligence",
    tools: ["Gemini API", "OpenAI", "Prompt Engineering", "Multi-modal LLMs"],
    description: "Integrating advanced AI features to automate complex workflows and decision making."
  },
  {
    category: "3D & Visualization",
    tools: ["Three.js", "WebXR", "D3.js", "Canvas API"],
    description: "Engineering interactive 3D twins and visual educational tools for technical domains."
  },
  {
    category: "System Engineering",
    tools: ["TypeScript", "Node.js", "System Design", "Agile Leadership"],
    description: "Architecting logical data flows and leading technical squads as a CTO."
  }
];

export const RahulLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-9 h-9 flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </radialGradient>
        </defs>
        <path d="M25 80V20H55C70 20 80 30 80 45C80 60 70 70 55 70H45L75 90" stroke="url(#logoGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="52" cy="45" r="8" fill="url(#eyeGlow)" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-base font-black leading-none text-slate-900 dark:text-slate-100 tracking-tighter">
        RAHIX
      </span>
      <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-[0.2em] leading-none mt-1">
        AI ASSISTANT
      </span>
    </div>
  </div>
);

export const RahixLogo = RahulLogo;

export const SUPPORTED_FILE_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain', 'text/markdown'
];
