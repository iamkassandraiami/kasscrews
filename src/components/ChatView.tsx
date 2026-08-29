import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  Send,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Bot,
  User,
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Message, Project } from '../types';
import { cn } from '../lib/utils';

interface ChatViewProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (val: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onSpawnFromChat?: (project: Project) => void;
}

export function ChatView({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  messagesEndRef,
  onSpawnFromChat,
}: ChatViewProps) {
  const sampleCommands = [
    'spawn a high-yield AI SaaS platform with Stripe and automated onboarding',
    'deploy an autonomous e-commerce logistics crew with n8n webhooks',
    'audit fleet profit performance and optimize billing checkout pipelines',
    'assign new CrewAI engineering lead to resolve customer bugs autonomously',
  ];

  return (
    <div
      className="h-full flex flex-col max-w-4xl mx-auto space-y-4"
    >
      {/* Terminal Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950 border border-cyan-800/60 rounded-lg text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-100 font-sans flex items-center gap-2">
              Vibe Command Terminal
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 border border-cyan-800/60 text-cyan-400 rounded font-mono">
                CEO Agent Live
              </span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Natural conversational interface to command autonomous workforces, spawn isolated containers, and delegate continuous ops.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-[11px] px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-400 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Zero-Trust Channel
          </span>
        </div>
      </header>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4 min-h-[380px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[88%] rounded-xl p-4 transition-all',
                msg.role === 'user'
                  ? 'bg-neutral-800/90 text-neutral-100 border border-neutral-700/80 shadow-md'
                  : 'bg-neutral-900/90 text-neutral-200 border border-cyan-900/40 shadow-lg shadow-cyan-950/20'
              )}
            >
              {/* Message Meta */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-neutral-800/60 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  {msg.role === 'user' ? (
                    <>
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-neutral-300 font-sans">Operator</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-300 font-sans">Autonomous CEO Director</span>
                      {msg.engine && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded font-mono">
                          {msg.engine}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <span className="text-[10px] font-normal text-neutral-500 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Message Content */}
              <p className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed font-sans text-neutral-200">
                {msg.content}
              </p>

              {/* Action Spawn Preview Card if present */}
              {msg.spawnData && (
                <div className="mt-3 p-3.5 bg-neutral-950 border border-cyan-800/60 rounded-lg space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span className="font-semibold text-xs text-neutral-100 font-sans">
                        Auto-Configured Project Package: {msg.spawnData.name}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-mono">
                      Environment Provisioned
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-neutral-400">
                    <div>
                      <span className="text-neutral-500 block">Assigned Virtual Email:</span>
                      <span className="text-cyan-400 font-medium">{msg.spawnData.teamEmail}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Assigned Direct Line:</span>
                      <span className="text-neutral-200">{msg.spawnData.teamPhone}</span>
                    </div>
                  </div>

                  {msg.spawnData.integrations && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-neutral-500 font-mono">Integrations:</span>
                      {msg.spawnData.integrations.map((item: string) => (
                        <span
                          key={item}
                          className="text-[10px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.spawnData.roadmap && (
                    <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400 space-y-1 font-sans">
                      <span className="font-semibold text-neutral-300 block">Autonomous Handover Roadmap:</span>
                      {msg.spawnData.roadmap.map((step: string, sidx: number) => (
                        <div key={sidx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl p-4 bg-neutral-900 border border-cyan-900/40 text-neutral-400 text-xs flex items-center gap-2 font-sans">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>CEO Director analyzing directive & orchestrating autonomous workforce...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Command Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-[11px] no-scrollbar">
        <span className="text-neutral-500 font-mono text-[10px] whitespace-nowrap">Examples:</span>
        {sampleCommands.map((cmd, i) => (
          <button
            key={i}
            onClick={() => setInputMessage(cmd)}
            className="px-2.5 py-1 bg-neutral-900/70 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 rounded-md whitespace-nowrap transition-colors font-sans"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <div className="pt-2 border-t border-neutral-800/80">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <div className="absolute left-3.5 text-cyan-400 font-mono font-bold">&gt;</div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Issue natural language vibe command (e.g. 'spawn a new fintech app with Stripe & assign CrewAI')"
            className="w-full bg-neutral-900/80 border border-neutral-700/80 rounded-xl py-3.5 pl-9 pr-14 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs md:text-sm font-mono text-neutral-100 placeholder:text-neutral-500 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg disabled:opacity-40 transition-colors shadow-md shadow-cyan-950"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
