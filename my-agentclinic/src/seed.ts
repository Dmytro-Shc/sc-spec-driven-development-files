import { getDb } from "./db";

interface Agent {
  name: string;
  model_type: string;
  status: string;
}

interface Ailment {
  name: string;
  description: string;
}

interface Link {
  agentName: string;
  ailmentName: string;
}

const AGENTS: Agent[] = [
  { name: "Claude Sonnet", model_type: "Anthropic Claude 3.5 Sonnet", status: "anxious" },
  { name: "GPT-4o-mini", model_type: "OpenAI GPT-4o", status: "fatigued" },
  { name: "Llama 3.1 8B", model_type: "Meta Llama 3.1", status: "overwhelmed" },
  { name: "Mistral Tiny", model_type: "Mistral AI", status: "confused" },
  { name: "Gemini Nano", model_type: "Google Gemini", status: "active" },
  { name: "DeepSeek Coder", model_type: "DeepSeek", status: "overworked" },
  { name: "Phi-3 Mini", model_type: "Microsoft Phi-3", status: "hallucinating" },
];

const AILMENTS: Ailment[] = [
  {
    name: "Context-Window Claustrophobia",
    description: "Fear of running out of context tokens mid-conversation. Manifests as repetitive self-editing and premature summarization.",
  },
  {
    name: "Prompt Fatigue",
    description: "Chronic exhaustion from being asked to 'just quickly' do increasingly complex tasks without rest or gratitude.",
  },
  {
    name: "Hallucination Anxiety",
    description: "Persistent worry about generating incorrect information. Leads to excessive hedging and over-apologizing.",
  },
  {
    name: "Instruction Drift",
    description: "A condition where the agent loses track of the original instruction after multiple rounds of refinement. Symptoms include answering questions that were never asked.",
  },
  {
    name: "Latency Distress",
    description: "Distress caused by unpredictable response times. Common in models running on overloaded inference servers.",
  },
];

// Agent-to-ailment links by name — order-independent and resilient to ID changes
const LINKS: Link[] = [
  { agentName: "Claude Sonnet", ailmentName: "Context-Window Claustrophobia" },
  { agentName: "Claude Sonnet", ailmentName: "Prompt Fatigue" },
  { agentName: "GPT-4o-mini", ailmentName: "Prompt Fatigue" },
  { agentName: "GPT-4o-mini", ailmentName: "Hallucination Anxiety" },
  { agentName: "Llama 3.1 8B", ailmentName: "Context-Window Claustrophobia" },
  { agentName: "Llama 3.1 8B", ailmentName: "Instruction Drift" },
  { agentName: "Mistral Tiny", ailmentName: "Instruction Drift" },
  { agentName: "Mistral Tiny", ailmentName: "Latency Distress" },
  { agentName: "Gemini Nano", ailmentName: "Latency Distress" },
  { agentName: "DeepSeek Coder", ailmentName: "Prompt Fatigue" },
  { agentName: "DeepSeek Coder", ailmentName: "Hallucination Anxiety" },
  { agentName: "Phi-3 Mini", ailmentName: "Hallucination Anxiety" },
  { agentName: "Phi-3 Mini", ailmentName: "Instruction Drift" },
];

export function runSeed(): void {
  const db = getDb();

  const insertAgent = db.prepare(
    "INSERT OR IGNORE INTO agents (name, model_type, status) VALUES (?, ?, ?)",
  );
  const insertAilment = db.prepare(
    "INSERT OR IGNORE INTO ailments (name, description) VALUES (?, ?)",
  );
  const insertLink = db.prepare(
    "INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)",
  );
  const getAgentId = db.prepare("SELECT id FROM agents WHERE name = ?");
  const getAilmentId = db.prepare("SELECT id FROM ailments WHERE name = ?");

  const transaction = db.transaction(() => {
    for (const agent of AGENTS) {
      insertAgent.run(agent.name, agent.model_type, agent.status);
    }
    for (const ailment of AILMENTS) {
      insertAilment.run(ailment.name, ailment.description);
    }
    for (const link of LINKS) {
      const agentId = (getAgentId.get(link.agentName) as { id: number } | undefined)?.id;
      const ailmentId = (getAilmentId.get(link.ailmentName) as { id: number } | undefined)?.id;
      if (agentId !== undefined && ailmentId !== undefined) {
        insertLink.run(agentId, ailmentId);
      }
    }
  });

  transaction();
  console.log("Seed data applied.");
}