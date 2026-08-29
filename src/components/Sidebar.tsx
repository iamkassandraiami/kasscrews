import React from 'react';
import { Shield, Activity, Terminal, Box, Users, Settings, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { View, SystemHealth } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  systemHealth: SystemHealth | null;
}

export function Sidebar({ currentView, setCurrentView, systemHealth }: SidebarProps) {
  return (
    <nav className="w-full md:w-64 bg-neutral-900/70 border-b md:border-b-0 md:border-r border-neutral-800/80 p-4 flex flex-col backdrop-blur-md z-20 flex-shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-6 px-2 py-1">
        <div className="p-2 bg-cyan-950 border border-cyan-800/60 rounded-lg text-cyan-400">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wider uppercase text-neutral-100 flex items-center gap-1.5">
            Zero-Trust Ops
          </h1>
          <p className="text-[11px] text-cyan-400/90 font-sans font-medium">Autonomous AI Suite</p>
        </div>
      </div>

      {/* Zero-Telemetry Badge */}
      <div className="mb-5 mx-1 px-3 py-2 bg-neutral-950/80 border border-neutral-800 rounded-lg text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-400">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zero Telemetry</span>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-1.5 py-0.5 rounded font-mono">
          Airgapped
        </span>
      </div>

      {/* Navigation items */}
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        <NavItem
          icon={<Activity size={18} />}
          label="Overview & Telemetry"
          isActive={currentView === 'dashboard'}
          onClick={() => setCurrentView('dashboard')}
        />
        <NavItem
          icon={<Terminal size={18} />}
          label="Vibe Command CEO"
          isActive={currentView === 'chat'}
          onClick={() => setCurrentView('chat')}
          badge="AI Director"
        />
        <NavItem
          icon={<Box size={18} />}
          label="Live Environments"
          isActive={currentView === 'projects'}
          onClick={() => setCurrentView('projects')}
        />
        <NavItem
          icon={<Users size={18} />}
          label="CrewAI & Workforce"
          isActive={currentView === 'agents'}
          onClick={() => setCurrentView('agents')}
        />
      </div>

      {/* Bottom info & system config */}
      <div className="mt-6 pt-4 border-t border-neutral-800/80 space-y-2">
        <NavItem
          icon={<Settings size={18} />}
          label="Governance & Security"
          isActive={currentView === 'settings'}
          onClick={() => setCurrentView('settings')}
        />

        {/* OpenAI backend indicator */}
        <div className="mt-3 px-3 py-2.5 bg-neutral-950/60 border border-neutral-800/60 rounded-lg">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-neutral-400 font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Intelligence Engine
            </span>
            <span
              className={cn(
                'text-[10px] px-1.5 py-0.2 rounded font-mono',
                systemHealth?.openaiConfigured
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                  : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60'
              )}
            >
              {systemHealth?.openaiConfigured ? 'OpenAI Live' : 'Autonomous Engine'}
            </span>
          </div>
          <p className="text-[10px] text-neutral-500 font-sans">
            {systemHealth?.openaiConfigured
              ? 'Real OpenAI GPT-4o backend connected via server proxy.'
              : 'Autonomous server-side Director runtime active.'}
          </p>
        </div>

        <div className="px-2 py-1 text-[11px] text-neutral-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Container Isolation
          </span>
          <span className="text-neutral-600 font-mono">v3.2.0</span>
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-xs font-medium group text-left',
        isActive
          ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-800/60 shadow-sm shadow-cyan-950'
          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 border border-transparent'
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn('transition-transform', isActive ? 'text-cyan-400 scale-105' : 'text-neutral-500 group-hover:text-neutral-300')}>
          {icon}
        </span>
        <span className="font-sans">{label}</span>
      </div>
      {badge && (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 uppercase font-mono tracking-wider">
          {badge}
        </span>
      )}
    </button>
  );
}
