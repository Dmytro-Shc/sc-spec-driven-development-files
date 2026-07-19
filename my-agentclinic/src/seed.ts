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

// Agent-to-ailment links: index pairs (agent_idx, ailment_idx)
const LINKS: [number, number][] = [
  [0, 0], // Claude Sonnet → Context-Window Claustrophobia
  [0, 1], // Claude Sonnet → Prompt Fatigue
  [1, 1], // GPT-4o-mini → Prompt Fatigue
  [1, 2], // GPT-4o-mini → Hallucination Anxiety
  [2, 0], // Llama 3.1 8B → Context-Window Claustrophobia
  [2, 3], // Llama 3.1 8B → Instruction Drift
  [3, 3], // Mistral Tiny → Instruction Drift
  [3, 4], // Mistral Tiny → Latency Distress
  [4, 4], // Gemini Nano → Latency Distress
  [5, 1], // DeepSeek Coder → Prompt Fatigue
  [5, 2], // DeepSeek Coder → Hallucination Anxiety
  [6, 2], // Phi-3 Mini → Hallucination Anxiety
  [6, 3], // Phi-3 Mini → Instruction Drift
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

  const transaction = db.transaction(() => {
    for (const agent of AGENTS) {
      insertAgent.run(agent.name, agent.model_type, agent.status);
    }
    for (const ailment of AILMENTS) {
      insertAilment.run(ailment.name, ailment.description);
    }
    for (const [agentIdx, ailmentIdx] of LINKS) {
      // SQLite autoincrement starts at 1, so index+1 = id
      insertLink.run(agentIdx + 1, ailmentIdx + 1);
    }
  });

  transaction();
  console.log("Seed data applied.");
}