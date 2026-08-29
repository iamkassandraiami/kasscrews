import React from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Zap,
  Users,
  Shield,
  ArrowUpRight,
  Play,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Terminal,
  Clock,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Project, View } from '../types';

interface DashboardViewProps {
  projects: Project[];
  onOpenSpawnModal: () => void;
  onNavigate: (view: View) => void;
  onSendVibeCommand: (cmd: string) => void;
}

export function DashboardView({ projects, onOpenSpawnModal, onNavigate, onSendVibeCommand }: DashboardViewProps) {
  const activeCount = projects.filter((p) => p.status === 'active').length;
  const totalAgents = projects.reduce((acc, p) => acc + (p.agents?.length || p.agentsCount || 0), 0);
  const totalTasks = projects.reduce((acc, p) => acc + (p.metrics?.tasksCompleted || 0), 0);

  const quickPrompts = [
    'Spawn a high-ticket SaaS venture with Stripe checkout & n8n workflows',
    'Deploy autonomous E-Commerce growth crew with dynamic pricing',
    'Audit zero-trust sandbox telemetry & verify network isolation',
    'Run autonomous continuous dev loop on all active projects',
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-neutral-100 font-sans tracking-tight">
              Autonomous Operations Fleet Control
            </h2>
            <span className="px-2 py-0.5 text-[10px] bg-cyan-950 border border-cyan-800 text-cyan-400 rounded-full font-mono">
              Live Governance
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans">
            Zero-trust containerized execution mesh. Autonomous agent workforces operating with full continuous handover.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('chat')}
            className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 font-sans"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Vibe Command Terminal
          </button>
          <button
            onClick={onOpenSpawnModal}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950 font-sans"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Spawn Environment
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={<Globe className="text-emerald-400" />}
          label="Live Environments"
          value={activeCount.toString()}
          badge="100% Isolated"
          sub="Containerized Sandboxes"
        />
        <StatCard
          icon={<Users className="text-cyan-400" />}
          label="Autonomous Workforce"
          value={totalAgents.toString()}
          badge="CrewAI Active"
          sub="Full 24/7 Handover"
        />
        <StatCard
          icon={<Zap className="text-amber-400" />}
          label="Completed Task Loops"
          value={totalTasks.toLocaleString()}
          badge="Autonomous"
          sub="Zero Human Intervention"
        />
        <StatCard
          icon={<DollarSign className="text-emerald-400" />}
          label="Fleet Revenue Run Rate"
          value="$7,160/mo"
          badge="Paced"
          sub="Stripe Connected"
        />
      </div>

      {/* Quick Vibe Command Dispatcher */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-neutral-200 font-sans uppercase tracking-wider">
              Quick Vibe Command Dispatch
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 font-sans">Click any directive to execute with CEO Agent</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSendVibeCommand(prompt)}
              className="text-left px-3 py-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 hover:border-cyan-700/60 hover:bg-neutral-900 transition-all text-xs text-neutral-300 flex items-center justify-between group"
            >
              <span className="font-mono text-[11px] group-hover:text-cyan-300 truncate mr-2">
                &gt; {prompt}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Active Workspaces & Telemetry Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Environments Preview */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-200 font-sans flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Active Project Handover Status
            </h3>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-sans flex items-center gap-1"
            >
              View All ({projects.length})
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 hover:border-neutral-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-neutral-100 font-sans">{proj.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 rounded-full flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Live
                      </span>
                      <span className="text-[10px] text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded font-sans">
                        {proj.industry || 'AI Venture'}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 font-sans line-clamp-1">{proj.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-emerald-400 font-mono block">
                      {proj.metrics?.revenuePaced || '$1,200/mo'}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans">Projected Velocity</span>
                  </div>
                </div>

                {/* Integration Pills & Workforce */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-neutral-800/60 text-[11px]">
                  <div className="text-neutral-400 flex items-center gap-2 font-mono">
                    <span className="text-neutral-500">Contact:</span>
                    <span className="text-cyan-400 truncate">{proj.teamEmail}</span>
                  </div>
                  <div className="flex items-center justify-start sm:justify-end gap-1.5 flex-wrap">
                    {proj.integrations?.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-300 font-mono"
                      >
                        {item}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/40 text-[10px] text-cyan-300 font-mono">
                      {proj.agents?.length || proj.agentsCount} Agents
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zero-Trust Telemetry & Fleet Health */}
        <div className="space-y-4">
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-200 font-sans flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Zero-Trust Isolation Audit
            </h3>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Telemetry Leak Prevention</span>
                <span className="text-emerald-400 font-mono font-semibold">100% Enforced</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Container Sandbox Isolation</span>
                <span className="text-emerald-400 font-mono font-semibold">Active (Docker)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">API Key Encryption</span>
                <span className="text-emerald-400 font-mono font-semibold">AES-256 GCM</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-400">Third-Party Tracking</span>
                <span className="text-neutral-300 font-mono">0 Trackers Blocked</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-200 font-sans flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Autonomous Workforce Status
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/70">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-neutral-200">DevOps & Build Pipelines</span>
                  <span className="text-emerald-400 font-mono">Continuous</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full w-[92%]"></div>
                </div>
              </div>

              <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/70">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-neutral-200">Stripe Checkout Webhooks</span>
                  <span className="text-emerald-400 font-mono">Listening</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[100%]"></div>
                </div>
              </div>

              <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/70">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-neutral-200">n8n Process Automations</span>
                  <span className="text-amber-400 font-mono">14 Active Nodes</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  badge,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge: string;
  sub: string;
}) {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800">{icon}</div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 font-mono">
          {badge}
        </span>
      </div>
      <div>
        <div className="text-2xl font-bold text-neutral-100 font-sans tracking-tight">{value}</div>
        <div className="text-xs text-neutral-400 font-sans mt-0.5">{label}</div>
        <div className="text-[10px] text-neutral-500 font-sans mt-1">{sub}</div>
      </div>
    </div>
  );
}
