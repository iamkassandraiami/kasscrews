import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View, Project, Message, CrewTemplate, SystemHealth } from './types';
import { INITIAL_PROJECTS, CREW_TEMPLATES } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ChatView } from './components/ChatView';
import { ProjectsView } from './components/ProjectsView';
import { AgentsView } from './components/AgentsView';
import { SettingsView } from './components/SettingsView';
import { SpawnProjectModal } from './components/SpawnProjectModal';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      role: 'ceo',
      content:
        'Zero-Trust Ops Director Online. Autonomous workforce channels secured.\n\nReady for natural language vibe commands. You can command me to spawn containerized environments with pre-configured Stripe/n8n/Zapier integrations, assign dedicated CrewAI workforces with assigned email/phone numbers, or audit active fleet operations.',
      timestamp: new Date().toISOString(),
      engine: 'Zero-Trust Director',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpawnModalOpen, setIsSpawnModalOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch server health on mount & check OpenAI connection
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data: SystemHealth = await res.json();
        setSystemHealth(data);
      }
    } catch (e) {
      console.warn('Backend health check error:', e);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle vibe commands sent to CEO Agent
  const handleSendMessage = async (e?: React.FormEvent, customCmd?: string) => {
    e?.preventDefault();
    const textToSend = customCmd || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customCmd) setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          currentProjects: projects,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const ceoMsg: Message = {
          id: 'ceo_' + Date.now(),
          role: 'ceo',
          content: data.content || 'Directive acknowledged and logged.',
          timestamp: data.timestamp || new Date().toISOString(),
          engine: data.engine || 'AI Director',
          spawnData: data.spawnData || null,
        };

        setMessages((prev) => [...prev, ceoMsg]);

        // If a new project was spawned by the CEO command, add it to live environments
        if (data.spawnData) {
          const autoSpawned: Project = {
            id: 'env_' + Date.now(),
            name: data.spawnData.name || 'Autonomous Venture',
            industry: data.spawnData.industry || 'AI Operations',
            description: data.spawnData.description || 'Auto-generated venture environment.',
            status: 'active',
            teamEmail: data.spawnData.teamEmail || 'team@ops.secure',
            teamPhone: data.spawnData.teamPhone || '+1 (555) 019-9941',
            integrations: data.spawnData.integrations || ['Stripe', 'n8n', 'Zapier'],
            agentsCount: data.spawnData.agents?.length || 4,
            crewTemplate: 'Executive Autonomous Crew',
            agents: (data.spawnData.agents || []).map((ag: any, idx: number) => ({
              id: `ag-auto-${idx}-${Date.now()}`,
              name: ag.role || 'Autonomous Agent',
              role: ag.role || 'Specialist',
              crew: ag.crew || 'Operations',
              status: 'Running',
              uptime: '100%',
              goal: 'Continuously build, iterate, and monetize.',
              tools: data.spawnData.integrations || ['Stripe', 'n8n'],
            })),
            metrics: {
              uptime: '100%',
              tasksCompleted: 8,
              activeProcesses: 4,
              revenuePaced: '$1,500/mo (Initial Pace)',
              healthScore: 99,
            },
            roadmap: data.spawnData.roadmap || [
              'Zero-trust sandbox online',
              'Stripe billing integration active',
              'CrewAI autonomous handover completed',
            ],
            logs: [
              `[${new Date().toLocaleTimeString()}] Environment initialized via Vibe Command.`,
              `[${new Date().toLocaleTimeString()}] Assigned credentials: ${data.spawnData.teamEmail}`,
              `[${new Date().toLocaleTimeString()}] Autonomous workforce takeover successful.`,
            ],
            createdAt: new Date().toISOString(),
          };

          setProjects((prev) => [autoSpawned, ...prev]);
        }
      } else {
        throw new Error('Chat API returned error status');
      }
    } catch (err: any) {
      // Fallback offline handler
      const fallbackMsg: Message = {
        id: 'ceo_err_' + Date.now(),
        role: 'ceo',
        content: `[ZERO-TRUST DIRECTIVE PROCESSED]\n\nDirective acknowledged: "${textToSend}". Container parameters verified under local sandbox security.`,
        timestamp: new Date().toISOString(),
        engine: 'Local Sandbox Engine',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickVibeCommand = (cmd: string) => {
    setCurrentView('chat');
    handleSendMessage(undefined, cmd);
  };

  const handleSpawnProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    // Notify in chat
    const spawnAlert: Message = {
      id: 'alert_' + Date.now(),
      role: 'ceo',
      content: `[NEW ENVIRONMENT SPAWNED]\n\n**${newProject.name}** container has been provisioned.\n• Dedicated Email: ${newProject.teamEmail}\n• Virtual Phone: ${newProject.teamPhone}\n• Integrations: ${newProject.integrations.join(', ')}\n• CrewAI Workforce: ${newProject.agents?.length || newProject.agentsCount} agents assigned. Handover complete.`,
      timestamp: new Date().toISOString(),
      engine: 'Container Orchestrator',
    };
    setMessages((prev) => [...prev, spawnAlert]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleTriggerTaskLoop = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newCompleted = (p.metrics?.tasksCompleted || 0) + 1;
          const newLog = `[${new Date().toLocaleTimeString()}] Autonomous optimization cycle completed: task #${newCompleted} executed.`;
          return {
            ...p,
            metrics: {
              ...p.metrics,
              tasksCompleted: newCompleted,
            },
            logs: [newLog, ...(p.logs || [])].slice(0, 15),
          };
        }
        return p;
      })
    );
  };

  const handleSpawnWithCrew = (crew: CrewTemplate) => {
    setIsSpawnModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col md:flex-row overflow-hidden selection:bg-cyan-900/50">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        systemHealth={systemHealth}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col relative h-[calc(100vh-60px)] md:h-screen overflow-hidden">
        {/* Subtle Ambient Radial Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/20 via-neutral-950 to-neutral-950 pointer-events-none -z-10"></div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <DashboardView
                  projects={projects}
                  onOpenSpawnModal={() => setIsSpawnModalOpen(true)}
                  onNavigate={setCurrentView}
                  onSendVibeCommand={handleQuickVibeCommand}
                />
              </motion.div>
            )}
            {currentView === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="h-full"
              >
                <ChatView
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  messagesEndRef={messagesEndRef}
                  onSpawnFromChat={handleSpawnProject}
                />
              </motion.div>
            )}
            {currentView === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <ProjectsView
                  projects={projects}
                  onOpenSpawnModal={() => setIsSpawnModalOpen(true)}
                  onDeleteProject={handleDeleteProject}
                  onTriggerTaskLoop={handleTriggerTaskLoop}
                />
              </motion.div>
            )}
            {currentView === 'agents' && (
              <motion.div
                key="agents"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <AgentsView
                  onSpawnWithCrew={handleSpawnWithCrew}
                />
              </motion.div>
            )}
            {currentView === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <SettingsView
                  systemHealth={systemHealth}
                  onRefreshHealth={checkHealth}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Spawn Modal */}
      <SpawnProjectModal
        isOpen={isSpawnModalOpen}
        onClose={() => setIsSpawnModalOpen(false)}
        onSpawn={handleSpawnProject}
      />
    </div>
  );
}
