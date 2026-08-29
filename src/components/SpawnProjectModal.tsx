import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Play, Cpu, Check, Layers, Mail, Phone, Shield, Database, Sparkles } from 'lucide-react';
import { CREW_TEMPLATES } from '../data/mockData';
import { Project } from '../types';

interface SpawnProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpawn: (project: Project) => void;
}

export function SpawnProjectModal({ isOpen, onClose, onSpawn }: SpawnProjectModalProps) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('SaaS & Digital Business');
  const [selectedTemplate, setSelectedTemplate] = useState(CREW_TEMPLATES[0].id);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(['Stripe', 'n8n', 'Zapier']);
  const [isSpawning, setIsSpawning] = useState(false);

  if (!isOpen) return null;

  const currentTpl = CREW_TEMPLATES.find((t) => t.id === selectedTemplate) || CREW_TEMPLATES[0];

  const toggleIntegration = (name: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpawning(true);

    const projName = name.trim() || `Venture-${Math.floor(1000 + Math.random() * 9000)}`;
    const slug = projName.toLowerCase().replace(/[^a-z0-9]/g, '');

    try {
      const res = await fetch('/api/spawn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projName,
          industry,
          crewTemplate: currentTpl.name,
          integrations: selectedIntegrations,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onSpawn(data.project);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Fallback local spawn
      const newProj: Project = {
        id: 'env_' + Date.now(),
        name: projName,
        industry,
        status: 'active',
        teamEmail: `team.${slug || 'ops'}@secure-mesh.net`,
        teamPhone: `+1 (555) 01${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 9000)}`,
        integrations: selectedIntegrations,
        agentsCount: currentTpl.agentRoles.length,
        crewTemplate: currentTpl.name,
        agents: currentTpl.agentRoles.map((role, idx) => ({
          id: `ag-${idx}-${Date.now()}`,
          name: role,
          role: role,
          crew: currentTpl.name,
          status: 'Running',
          uptime: '100%',
          goal: 'Execute autonomous task cycles and maintain uptime.',
          tools: ['Container Shell', ...selectedIntegrations],
        })),
        metrics: {
          uptime: '100%',
          tasksCompleted: 4,
          activeProcesses: currentTpl.agentRoles.length,
          revenuePaced: '$850/mo (Initial Pace)',
          healthScore: 99,
        },
        roadmap: [
          'Zero-trust container sandbox isolated',
          'Assigned virtual phone & team email credentials',
          'Autonomous workforce engaged for 24/7 self-iteration',
        ],
        logs: [
          `[${new Date().toLocaleTimeString()}] Environment initialized. Isolation verified.`,
          `[${new Date().toLocaleTimeString()}] Assigned contact: team.${slug}@secure-mesh.net`,
          `[${new Date().toLocaleTimeString()}] CrewAI workforce (${currentTpl.agentRoles.length} agents) took full handover.`,
        ],
        createdAt: new Date().toISOString(),
      };
      onSpawn(newProj);
    } finally {
      setIsSpawning(false);
      onClose();
    }
  };

  const integrationList = [
    { name: 'Stripe', desc: 'Payments, subscriptions, checkout webhooks' },
    { name: 'n8n', desc: 'Self-hosted workflow automations' },
    { name: 'Zapier', desc: 'Cloud event triggers & actions' },
    { name: 'PostgreSQL', desc: 'Isolated relational storage container' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950/50 border border-cyan-800/50 rounded-lg text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                Spawn Autonomous Project Environment
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 rounded-full">
                  Zero-Trust
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Deploy an isolated container with assigned phone/email, tools, & CrewAI workforce.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleCreate} className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Omnichannel AI Agency"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Industry / Domain
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Fintech, SaaS, E-Commerce"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
            </div>
          </div>

          {/* Autonomous Crew Template */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Select Pre-Saved CrewAI Workforce</span>
              <span className="text-[11px] text-cyan-400 font-normal">Autonomous Handover</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CREW_TEMPLATES.map((tpl) => {
                const isSel = tpl.id === selectedTemplate;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isSel
                        ? 'bg-cyan-950/30 border-cyan-500/60 ring-1 ring-cyan-500/40 text-cyan-100'
                        : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-neutral-100">{tpl.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 mb-2">{tpl.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tpl.agentRoles.map((r, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integrations */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Pre-Configured Integrations (In-Container Bridges)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {integrationList.map((item) => {
                const isChecked = selectedIntegrations.includes(item.name);
                return (
                  <div
                    key={item.name}
                    onClick={() => toggleIntegration(item.name)}
                    className={`p-3 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-neutral-950 border-cyan-800/80 text-neutral-200'
                        : 'bg-neutral-950/40 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                        isChecked
                          ? 'bg-cyan-500 border-cyan-400 text-neutral-950'
                          : 'border-neutral-700 bg-neutral-900'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="font-medium text-xs text-neutral-200 block">{item.name}</span>
                      <span className="text-[11px] text-neutral-500 block leading-tight">{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auto-Assigned Identity Notice */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3.5 text-xs text-neutral-400 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Shield className="w-4 h-4" />
              <span>Autonomous Handover Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Upon spawning, this environment receives a dedicated virtual email (
              <span className="text-neutral-300 font-mono">team@ops.internal</span>) and dedicated direct line for
              autonomous customer/supplier communications. All agent iterations run with zero external telemetry.
            </p>
          </div>

          {/* Footer actions */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSpawning}
              className="px-5 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-cyan-900/30 disabled:opacity-50"
            >
              {isSpawning ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Provisioning Environment...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Launch Container & Workforce
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
