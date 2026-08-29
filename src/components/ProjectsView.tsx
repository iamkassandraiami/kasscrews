import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  CheckCircle2,
  Clock,
  Users,
  Database,
  Mail,
  Phone,
  Layers,
  Terminal,
  Activity,
  Trash2,
  Sparkles,
  Zap,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  onOpenSpawnModal: () => void;
  onDeleteProject: (id: string) => void;
  onTriggerTaskLoop: (id: string) => void;
}

export function ProjectsView({
  projects,
  onOpenSpawnModal,
  onDeleteProject,
  onTriggerTaskLoop,
}: ProjectsViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id || null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-100 font-sans tracking-tight">
              Live Containerized Environments
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded font-mono">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Isolated project spaces handed over to autonomous CrewAI workforces with pre-configured integrations.
          </p>
        </div>

        <button
          onClick={onOpenSpawnModal}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950 font-sans self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Spawn New Environment
        </button>
      </div>

      {/* Main Grid: Projects List + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-neutral-900 border-cyan-500/70 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/20'
                    : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-neutral-100 font-sans">{proj.name}</h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono ${
                      proj.status === 'active'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                    }`}
                  >
                    {proj.status === 'active' ? (
                      <>
                        <CheckCircle2 className="w-2.5 h-2.5" /> Active
                      </>
                    ) : (
                      <>
                        <Clock className="w-2.5 h-2.5" /> Deploying
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 font-sans line-clamp-2 mb-3">
                  {proj.description || 'Autonomous execution workspace.'}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800/60">
                  <div className="flex items-center gap-1 text-cyan-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{proj.agents?.length || proj.agentsCount} Autonomous Agents</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <span>{proj.metrics?.revenuePaced || '$1,200/mo'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Full Details & Operations Panel */}
        {selectedProject && (
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800/80 rounded-xl p-5 space-y-5">
            {/* Header with Project Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-neutral-100 font-sans">{selectedProject.name}</h3>
                  <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-sans">
                    {selectedProject.industry || 'Autonomous Ops'}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Container ID: {selectedProject.id} • Created {new Date(selectedProject.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTriggerTaskLoop(selectedProject.id)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-sans rounded-lg border border-neutral-700 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3 text-cyan-400" />
                  Run Task Loop
                </button>
                <button
                  onClick={() => onDeleteProject(selectedProject.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 rounded-lg transition-colors"
                  title="Terminate Container"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dedicated Team Phone & Email Handover Credentials */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 space-y-3">
              <span className="text-xs font-semibold text-neutral-300 font-sans uppercase tracking-wider block">
                Assigned Team Identity (Autonomous Customer/Partner Channel)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5 p-2.5 bg-neutral-900/80 rounded border border-neutral-800">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-neutral-500 block">Dedicated Virtual Email:</span>
                    <span className="text-neutral-200 font-medium">{selectedProject.teamEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-neutral-900/80 rounded border border-neutral-800">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-neutral-500 block">Assigned Direct Line:</span>
                    <span className="text-neutral-200 font-medium">{selectedProject.teamPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrations Stack */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 font-sans uppercase tracking-wider block mb-2">
                Container Integrations & Bridges
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.integrations.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{item}</span>
                    <span className="text-[10px] text-neutral-500">Connected</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Autonomous Crew Members */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 font-sans uppercase tracking-wider block mb-2">
                Assigned Autonomous Workforce ({selectedProject.agents?.length || selectedProject.agentsCount})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedProject.agents?.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-3 bg-neutral-950/70 border border-neutral-800/80 rounded-lg flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-200 font-sans">{agent.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-cyan-950 text-cyan-300 border border-cyan-800/40 rounded font-mono">
                          {agent.crew || 'Specialist'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                        {agent.goal || agent.role}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {agent.status}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono block">Uptime: {agent.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Container Activity Logs */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 font-sans uppercase tracking-wider block mb-2">
                Live Container Telemetry & Self-Driving Activity
              </span>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-[11px] font-mono text-neutral-400 space-y-1.5 max-h-36 overflow-y-auto">
                {selectedProject.logs && selectedProject.logs.length > 0 ? (
                  selectedProject.logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      <span className="text-cyan-500">&gt;</span> {log}
                    </div>
                  ))
                ) : (
                  <div className="italic text-neutral-600">&gt; Container standing by. Autonomous cycle running...</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
