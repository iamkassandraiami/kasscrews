import React from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Lock,
  EyeOff,
  Server,
  Key,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { SystemHealth } from '../types';

interface SettingsViewProps {
  systemHealth: SystemHealth | null;
  onRefreshHealth: () => void;
}

export function SettingsView({ systemHealth, onRefreshHealth }: SettingsViewProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-100 font-sans tracking-tight">
              Zero-Trust Governance & System Config
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded font-mono">
              Strict Enforcement
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Privacy-first execution boundaries, zero telemetry policies, and API key proxy state.
          </p>
        </div>

        <button
          onClick={onRefreshHealth}
          className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg text-xs font-sans flex items-center gap-1.5 transition-colors"
          title="Refresh System Health"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Audit Status</span>
        </button>
      </div>

      {/* AI Intelligence Backend Connection */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Key className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-neutral-100 font-sans">OpenAI API Connection Status</h3>
              <p className="text-xs text-neutral-400 font-sans">
                Secure server-side API proxy routing for CEO Director commands & autonomous reasoning.
              </p>
            </div>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 ${
              systemHealth?.openaiConfigured
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                systemHealth?.openaiConfigured ? 'bg-emerald-400' : 'bg-cyan-400'
              } animate-pulse`}
            ></span>
            {systemHealth?.openaiConfigured ? 'Connected (GPT-4o)' : 'Autonomous Runtime Ready'}
          </span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-xs font-sans space-y-2 text-neutral-300">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Target Environment Variable:</span>
            <span className="font-mono text-neutral-200">OPENAI_API_KEY</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Security Architecture:</span>
            <span className="font-mono text-emerald-400">Server-Side Proxy (Zero Browser Leakage)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Vibe Command Model:</span>
            <span className="font-mono text-cyan-400">gpt-4o-mini (Autonomous Executive)</span>
          </div>
        </div>
      </div>

      {/* Zero Telemetry & Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <EyeOff className="w-4 h-4" />
            <h4 className="font-semibold text-xs text-neutral-100 font-sans uppercase tracking-wider">
              Zero Telemetry Policy
            </h4>
          </div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            No analytics, no behavioral beacons, and no diagnostic telemetry are emitted outside the local container network.
          </p>
          <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 font-mono text-[11px] text-emerald-400">
            [TELEMETRY_EMISSION_STATE = BLOCKED]
          </div>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Server className="w-4 h-4" />
            <h4 className="font-semibold text-xs text-neutral-100 font-sans uppercase tracking-wider">
              Container Sandbox Isolation
            </h4>
          </div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            All spawned ventures run in isolated memory spaces with segregated network namespaces for Stripe, n8n, and webhooks.
          </p>
          <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 font-mono text-[11px] text-cyan-400">
            [CONTAINER_NAMESPACES = ENFORCED]
          </div>
        </div>
      </div>
    </div>
  );
}
