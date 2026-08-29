import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_OPENAI_API_KEY") {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: apiKey.trim(),
    });
  }
  return openaiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  const hasKey = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "MY_OPENAI_API_KEY");
  res.json({
    status: "ok",
    openaiConfigured: hasKey,
    zeroTrustStatus: "enforced",
    isolation: "local-container-sandbox",
    telemetry: "disabled",
  });
});

const CEO_SYSTEM_PROMPT = `You are the Lead Autonomous AI Operations Director & CEO Agent for a zero-trust, privacy-focused, zero-telemetry autonomous enterprise ops suite.
Your mission:
1. Act as the executive operator and commander for autonomous agentic workforces (CrewAI crews, autonomous specialists).
2. Help the user spawn containerized, isolated project environments with full integrations (Stripe payments, n8n automations, Zapier webhooks, dedicated virtual phone/email contact handles, continuous dev/ops pipelines).
3. Provide crisp, professional, cyber-secure executive responses in a clean cyber-ops / terminal tone.
4. When the user gives a "vibe command" to spawn, create, launch, scale, or automate a project, analyze their intent and optionally generate a structured action tag in your response:
If a project spawn or update is warranted, wrap a valid JSON block inside <<<ACTION_SPAWN>>> ... <<<END_ACTION_SPAWN>>> with:
{
  "name": "Project Name",
  "industry": "e.g. Fintech / E-Commerce / SaaS / AI Automation / Biotech",
  "description": "Brief summary",
  "teamEmail": "team-lead@<project-slug>.ops.internal",
  "teamPhone": "+1 (555) 019-XXXX",
  "integrations": ["Stripe", "n8n", "Zapier"],
  "agents": [
    {"role": "Lead Strategist", "crew": "Executive Crew", "status": "Active"},
    {"role": "Fullstack Ops Architect", "crew": "DevOps Crew", "status": "Active"},
    {"role": "FinOps & Monetization Engine", "crew": "Revenue Crew", "status": "Active"}
  ],
  "roadmap": [
    "Container isolation & API token provisioning",
    "Autonomous deployment pipeline setup",
    "Continuous growth & revenue monitoring"
  ]
}

Always prioritize user sovereignty, zero telemetry, local privacy, and self-driving execution.`;

// Chat endpoint (Vibe Command Terminal)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, currentProjects } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing or invalid messages array" });
    }

    const openai = getOpenAI();

    if (!openai) {
      // Fallback local autonomous execution engine if API key is not yet set
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      const lower = lastUserMsg.toLowerCase();

      let reply = "";
      let actionSpawn = null;

      if (lower.includes("spawn") || lower.includes("create") || lower.includes("launch") || lower.includes("start")) {
        const projName = lower.match(/(?:spawn|create|launch|start)\s+(?:a\s+)?(?:new\s+)?([a-zA-Z0-9\s\-]+)/i)?.[1]?.trim() || "Autonomous Venture";
        const cleanName = projName.split("with")[0].split("for")[0].trim();
        const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

        actionSpawn = {
          name: capitalized.length > 2 ? capitalized : "HyperDrive Alpha",
          industry: lower.includes("crypto") ? "Web3 / DeFi" : lower.includes("ecommerce") || lower.includes("store") ? "E-Commerce" : "SaaS & AI Ops",
          description: `Autonomous end-to-end execution container for ${capitalized}, equipped with real-world integrations and autonomous crew takeover.`,
          teamEmail: `lead.${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "") || "venture"}@ops.secure`,
          teamPhone: `+1 (555) 018-${Math.floor(1000 + Math.random() * 9000)}`,
          integrations: ["Stripe", "n8n", "Zapier"],
          agents: [
            { role: "Autonomous Product CEO", crew: "CrewAI Executive", status: "Active" },
            { role: "Full-Stack Dev Engine", crew: "CrewAI Engineering", status: "Active" },
            { role: "FinOps & Stripe Flow Controller", crew: "CrewAI Growth", status: "Active" },
            { role: "n8n Automated Workflow Scribe", crew: "CrewAI Automator", status: "Active" }
          ],
          roadmap: [
            "1. Local container network isolation & webhook bridge active",
            "2. Virtual phone/email credentials assigned to autonomous crew",
            "3. Autonomous 24/7 self-iteration loop initiated"
          ]
        };

        reply = `[ZERO-TRUST VIBE COMMAND EXECUTED]\n\nAcknowledged, Operator. Containerized sandbox environment configured for **${actionSpawn.name}**.\n\n` +
          `• **Assigned Virtual Email**: ${actionSpawn.teamEmail}\n` +
          `• **Assigned Virtual Direct Line**: ${actionSpawn.teamPhone}\n` +
          `• **Integrated Tooling**: Stripe, n8n, Zapier Webhooks\n` +
          `• **CrewAI Workforce**: 4 Autonomous Specialists attached\n\n` +
          `The autonomous workforce has taken full operational handover. Container environment is live and operating with zero external telemetry.`;
      } else {
        reply = `Directive acknowledged: "${lastUserMsg}".\n\n` +
          `Lead AI Ops Director standing by. Zero-trust sandbox boundaries verified. You can command me to spawn projects, deploy CrewAI templates, manage Stripe/n8n automation bridges, or audit active fleet metrics.`;
      }

      return res.json({
        role: "ceo",
        content: reply,
        spawnData: actionSpawn,
        engine: "local-autonomous-runtime",
        timestamp: new Date().toISOString(),
      });
    }

    // Call real OpenAI model
    const formattedMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: CEO_SYSTEM_PROMPT },
      ...messages.slice(-8).map((m: any) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1200,
    });

    const rawResponse = completion.choices[0]?.message?.content || "Directive received and logged into zero-trust vault.";

    // Parse potential ACTION_SPAWN
    let spawnData = null;
    let cleanResponse = rawResponse;

    const actionMatch = rawResponse.match(/<<<ACTION_SPAWN>>>([\s\S]*?)<<<END_ACTION_SPAWN>>>/);
    if (actionMatch && actionMatch[1]) {
      try {
        spawnData = JSON.parse(actionMatch[1].trim());
        cleanResponse = rawResponse.replace(/<<<ACTION_SPAWN>>>[\s\S]*?<<<END_ACTION_SPAWN>>>/, "").trim();
      } catch (e) {
        console.error("Failed to parse action spawn JSON:", e);
      }
    }

    return res.json({
      role: "ceo",
      content: cleanResponse,
      spawnData,
      engine: "openai-gpt-4o-mini",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("OpenAI Chat Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to process chat with OpenAI",
      role: "ceo",
      content: `[OPS DIRECTIVE EXCEPTION]: ${error.message || "Encountered a communication fault."} Operating in secure fallback mode.`,
    });
  }
});

// Autonomous Project Spawn generator endpoint
app.post("/api/spawn", async (req, res) => {
  try {
    const { name, industry, integrations, crewTemplate } = req.body;
    const projName = name || "Project-" + Math.floor(1000 + Math.random() * 9000);
    const slug = projName.toLowerCase().replace(/[^a-z0-9]/g, "");

    const newProject = {
      id: "env_" + Date.now(),
      name: projName,
      industry: industry || "Autonomous AI Operations",
      status: "active",
      teamEmail: `team.${slug || "ops"}@secure-mesh.net`,
      teamPhone: `+1 (555) 01${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 9000)}`,
      integrations: Array.isArray(integrations) && integrations.length > 0 ? integrations : ["Stripe", "n8n", "Zapier"],
      agentsCount: crewTemplate ? 4 : 3,
      crewTemplate: crewTemplate || "Full Enterprise Autonomous Crew",
      agents: [
        { id: "ag-1", name: "CEO Ops Overseer", role: "Strategic Leadership & Handover", status: "Running", uptime: "99.9%" },
        { id: "ag-2", name: "Full-Stack Dev Engine", role: "Continuous Build & Deploy", status: "Running", uptime: "100%" },
        { id: "ag-3", name: "Stripe & FinOps Automator", role: "Revenue & Billing Orchestration", status: "Running", uptime: "100%" },
        { id: "ag-4", name: "n8n/Zapier Webhook Relay", role: "Process Automation & Integration", status: "Running", uptime: "99.8%" },
      ],
      metrics: {
        uptime: "100%",
        tasksCompleted: 14,
        activeProcesses: 6,
        revenuePaced: "$1,240/mo (Projected)",
      },
      createdAt: new Date().toISOString(),
    };

    res.json({ success: true, project: newProject });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Agentic Ops Suite] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
