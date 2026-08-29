import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Briefcase,
  Layers,
  Sparkles,
  Play,
  Shield,
  Code2,
  DollarSign,
  Workflow,
  CheckCircle2,
  Cpu,
  Plus
} from 'lucide-react';
import { CREW_TEMPLATES } from '../data/mockData';
import { CrewTemplate } from '../types';

interface AgentsViewProps {
  onSpawnWithCrew: (crewTemplate: CrewTemplate) => void;
}

export function AgentsView({ onSpawnWithCrew }: AgentsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCrew, setSelectedCrew] = useState<CrewTemplate>(CREW_TEMPLATES[0]);

  const categories = ['All', 'Software & Cloud', 'Process Automation', 'E-Commerce & DTC', 'Fintech & Monetization'];

  const filteredCrews =
    selectedCategory === 'All'
      ? CREW_TEMPLATES
      : CREW_TEMPLATES.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-100 font-sans tracking-tight">
              Pre-Saved CrewAI Workforce Catalog
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-400 rounded font-mono">
              Autonomous Handover Ready
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Deploy pre-configured specialist crews to autonomously run, scale, and monetize ventures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSpawnWithCrew(selectedCrew)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950 font-sans"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Deploy Selected Crew
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-sans">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-neutral-800 text-cyan-300 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Crew Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCrews.map((crew) => {
          const isSelected = selectedCrew.id === crew.id;
          return (
            <div
              key={crew.id}
              onClick={() => setSelectedCrew(crew)}
              className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-900 border-cyan-500/70 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/20'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cyan-400 font-mono">{crew.category}</span>
                  <span className="text-[10px] bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-mono">
                    {crew.estimatedHandoverTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-100 font-sans mb-1.5">{crew.name}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">{crew.description}</p>

                {/* Roles breakdown */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-semibold text-neutral-300 font-sans uppercase tracking-wider block">
                    Specialist Roles ({crew.agentRoles.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {crew.agentRoles.map((role, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-950/80 border border-neutral-800/80 px-2.5 py-1.5 rounded-lg"
                      >
                        <Cpu className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Integrations & Deploy Button */}
              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1 flex-wrap">
                  {crew.defaultIntegrations.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpawnWithCrew(crew);
                  }}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-sans rounded-lg transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3" /> Deploy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
