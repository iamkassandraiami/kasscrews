import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Activity,
  Box,
  Users,
  Settings,
  Shield,
  Send,
  Zap,
  Globe,
  Database,
  Briefcase,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type View = 'dashboard' | 'chat' | 'projects' | 'agents' | 'settings';

interface Project {
  id: string;
  name: string;
  status: 'deploying' | 'active' | 'paused';
  agents: number;
  integrations: string[];
}

interface Message {
  id: string;
  role: 'user' | 'ceo';
  content: string;
  timestamp: Date;
}

// --- Mock Data (Representing initial state, no backend yet) ---
const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'Alpha Strike', status: 'active', agents: 4, integrations: ['Stripe', 'n8n'] },
  { id: '2', name: 'Nebula Genesis', status: 'deploying', agents: 2, integrations: ['Zapier'] },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 'msg1', role: 'ceo', content: 'Ops Suite Online. Zero-trust protocols engaged. Awaiting directive.', timestamp: new Date() }
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');

    // Simulate CEO Response
    setTimeout(() => {
      const responseContent = processCommand(newUserMsg.content);
      const newCeoMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ceo',
        content: responseContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newCeoMsg]);
    }, 1000);
  };

  const processCommand = (command: string): string => {
    const lowerCmd = command.toLowerCase();
    if (lowerCmd.includes('spawn') || lowerCmd.includes('create')) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: `Project-${Math.floor(Math.random() * 1000)}`,
        status: 'deploying',
        agents: Math.floor(Math.random() * 5) + 1,
        integrations: ['Pending...']
      };
      setProjects(prev => [newProject, ...prev]);
      return `Acknowledged. Spawning containerized environment for ${newProject.name}. Assigning autonomous workforce...`;
    }
    return `Directive received: "${command}". Analyzing optimal execution path.`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono flex flex-col md:flex-row overflow-hidden selection:bg-cyan-900/50">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-neutral-900/50 border-b md:border-b-0 md:border-r border-neutral-800 p-4 flex flex-col backdrop-blur-sm z-10">
        <div className="flex items-center gap-3 mb-8 px-2">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h1 className="text-sm font-bold tracking-widest uppercase text-cyan-50">Zero-Trust Ops</h1>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          <NavItem icon={<Activity />} label="Overview" view="dashboard" currentView={currentView} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={<Terminal />} label="CEO Terminal" view="chat" currentView={currentView} onClick={() => setCurrentView('chat')} />
          <NavItem icon={<Box />} label="Projects (Live)" view="projects" currentView={currentView} onClick={() => setCurrentView('projects')} />
          <NavItem icon={<Users />} label="Agent Catalog" view="agents" currentView={currentView} onClick={() => setCurrentView('agents')} />
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-800">
           <NavItem icon={<Settings />} label="System Config" view="settings" currentView={currentView} onClick={() => setCurrentView('settings')} />
           <div className="mt-4 px-3 py-2 text-xs text-neutral-500 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Secure Connection
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-[calc(100vh-64px)] md:h-screen">
        {/* Ambient Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-neutral-950 to-neutral-950 pointer-events-none -z-10"></div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && <DashboardView key="dashboard" projects={projects} />}
            {currentView === 'chat' && (
              <ChatView
                key="chat"
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                messagesEndRef={messagesEndRef}
              />
            )}
            {currentView === 'projects' && <ProjectsView key="projects" projects={projects} />}
            {currentView === 'agents' && <AgentsView key="agents" />}
            {currentView === 'settings' && <SettingsView key="settings" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Components ---

function NavItem({ icon, label, view, currentView, onClick }: { icon: React.ReactNode, label: string, view: View, currentView: View, onClick: () => void }) {
  const isActive = currentView === view;
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm group",
        isActive
          ? "bg-cyan-950/40 text-cyan-300 border border-cyan-900/50"
          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 border border-transparent"
      )}
    >
      <span className={cn("transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")}>
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </span>
      {label}
    </button>
  );
}

function DashboardView({ projects }: { projects: Project[] }) {
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const deployingProjects = projects.filter(p => p.status === 'deploying').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-100">Global Overview</h2>
        <p className="text-neutral-400 text-sm mt-1">Autonomous systems operating nominally.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Globe className="text-emerald-400" />} label="Active Environments" value={activeProjects.toString()} />
        <StatCard icon={<Zap className="text-amber-400" />} label="Deploying/Queued" value={deployingProjects.toString()} />
        <StatCard icon={<Users className="text-cyan-400" />} label="Deployed Agents" value={projects.reduce((acc, p) => acc + p.agents, 0).toString()} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 border-b border-neutral-800 pb-2">Recent Telemetry</h3>
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
           <p className="text-neutral-500 text-sm italic">Visual telemetry graphs pending data stream connection...</p>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-neutral-950 rounded-md border border-neutral-800">{icon}</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-neutral-100">{value}</div>
        <div className="text-sm text-neutral-500 uppercase tracking-wider mt-1">{label}</div>
      </div>
    </div>
  );
}


function ChatView({ messages, inputMessage, setInputMessage, handleSendMessage, messagesEndRef }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col max-w-4xl mx-auto">
      <header className="mb-4 flex items-center gap-3 pb-4 border-b border-neutral-800">
        <Terminal className="text-cyan-400" />
        <div>
          <h2 className="text-lg font-bold">Vibe Command Terminal</h2>
          <p className="text-xs text-neutral-500">Connected to Lead AI Ops Director (CEO Agent)</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-thin scrollbar-thumb-neutral-800">
        {messages.map((msg: Message) => (
          <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-lg p-4",
              msg.role === 'user'
                ? "bg-neutral-800 text-neutral-100 border border-neutral-700"
                : "bg-cyan-950/20 text-cyan-100 border border-cyan-900/30"
            )}>
               <div className="flex items-center gap-2 mb-2 text-xs font-semibold opacity-70">
                  {msg.role === 'user' ? 'Operator' : 'CEO Agent'}
                  <span className="text-[10px] font-normal opacity-50 ml-2">{msg.timestamp.toLocaleTimeString()}</span>
               </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-4 border-t border-neutral-800">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <div className="absolute left-3 text-cyan-500 font-bold">&gt;</div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Issue vibe command (e.g., 'spawn a new marketing ops project with n8n')"
            className="w-full bg-neutral-900/60 border border-neutral-700 rounded-md py-3 pl-8 pr-12 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="absolute right-2 p-2 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 hover:text-white disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function ProjectsView({ projects }: { projects: Project[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Active Environments</h2>
          <p className="text-neutral-400 text-sm mt-1">Live autonomous workspaces and assigned resources.</p>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2">
           <Play size={16} /> Spawn New
        </button>
      </header>

      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                {project.status === 'active' && <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20"><CheckCircle2 size={12}/> Live</span>}
                {project.status === 'deploying' && <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20"><Clock size={12}/> Deploying</span>}
              </div>
              <div className="text-sm text-neutral-500 flex gap-4">
                 <span className="flex items-center gap-1"><Users size={14} /> {project.agents} Agents assigned</span>
                 <span className="flex items-center gap-1"><Database size={14} /> {project.integrations.join(', ')}</span>
              </div>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors">Manage</button>
               <button className="px-3 py-1.5 text-xs bg-red-950/30 text-red-400 hover:bg-red-900/50 rounded border border-red-900/50 transition-colors">Terminate</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AgentsView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto text-center py-20">
        <Briefcase className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Agent Catalog</h2>
        <p className="text-neutral-500">Library of predefined autonomous roles (CrewAI templates, custom workers) ready for assignment.</p>
        <div className="mt-8 opacity-50">Under Construction</div>
    </motion.div>
  );
}

function SettingsView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto text-center py-20">
        <Settings className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">System Config & Governance</h2>
        <p className="text-neutral-500">Zero-trust policies, API integrations, and global parameters.</p>
        <div className="mt-8 opacity-50">Under Construction</div>
    </motion.div>
  );
}
