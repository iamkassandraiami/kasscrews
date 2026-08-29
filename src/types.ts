export type View = 'dashboard' | 'chat' | 'projects' | 'agents' | 'settings';

export interface AgentMember {
  id: string;
  name: string;
  role: string;
  crew: string;
  status: 'Running' | 'Idle' | 'Deploying' | 'Optimizing';
  uptime: string;
  goal?: string;
  backstory?: string;
  tools?: string[];
}

export interface ProjectMetrics {
  uptime: string;
  tasksCompleted: number;
  activeProcesses: number;
  revenuePaced: string;
  healthScore?: number;
}

export interface Project {
  id: string;
  name: string;
  industry?: string;
  description?: string;
  status: 'active' | 'deploying' | 'paused';
  teamEmail: string;
  teamPhone: string;
  integrations: string[];
  agentsCount: number;
  crewTemplate?: string;
  agents: AgentMember[];
  metrics: ProjectMetrics;
  createdAt: string;
  roadmap?: string[];
  logs?: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'ceo';
  content: string;
  timestamp: string;
  engine?: string;
  spawnData?: any;
}

export interface CrewTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  agentRoles: string[];
  defaultIntegrations: string[];
  estimatedHandoverTime: string;
}

export interface SystemHealth {
  status: string;
  openaiConfigured: boolean;
  zeroTrustStatus: string;
  isolation: string;
  telemetry: string;
}
