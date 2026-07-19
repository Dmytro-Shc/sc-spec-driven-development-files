import { Layout } from "../components/Layout";
import { getDb } from "../db";
import type { AgentRow, AilmentRef, AgentDetailProps } from "../types";

export function AgentsList() {
  const db = getDb();
  const agents = db.prepare(
    "SELECT id, name, model_type, status FROM agents ORDER BY name",
  ).all() as AgentRow[];

  return (
    <Layout>
      <h1>Agents</h1>
      <p class="muted">Our AI agent patients — each one is a unique model with their own set of challenges.</p>
      {agents.length === 0 && <p>No agents registered yet.</p>}
      {agents.map((agent) => (
        <div class="agent-card">
          <h2><a href={`/agents/${agent.id}`}>{agent.name}</a></h2>
          <div class="meta">
            {agent.model_type} &middot; <em>{agent.status}</em>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export function AgentDetail({ id }: AgentDetailProps) {
  const db = getDb();
  const agent = db.prepare(
    "SELECT id, name, model_type, status, created_at FROM agents WHERE id = ?",
  ).get(id) as AgentRow | undefined;

  if (!agent) {
    return (
      <Layout>
        <div class="not-found">
          <h1>404</h1>
          <p>Agent not found.</p>
          <a href="/agents">&larr; Back to agents</a>
        </div>
      </Layout>
    );
  }

  const ailments = db.prepare(`
    SELECT a.id, a.name, a.description
    FROM ailments a
    JOIN agent_ailments aa ON aa.ailment_id = a.id
    WHERE aa.agent_id = ?
    ORDER BY a.name
  `).all(id) as AilmentRef[];

  return (
    <Layout>
      <a href="/agents">&larr; Back to agents</a>
      <h1>{agent.name}</h1>
      <table>
        <tbody>
          <tr>
            <th>Model Type</th>
            <td>{agent.model_type}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td><em>{agent.status}</em></td>
          </tr>
          <tr>
            <th>Registered</th>
            <td>{agent.created_at}</td>
          </tr>
        </tbody>
      </table>

      <h2>Presenting Complaints</h2>
      {ailments.length === 0 ? (
        <p class="muted">No ailments recorded for this agent.</p>
      ) : (
        <ul>
          {ailments.map((a) => (
            <li>
              <strong>{a.name}</strong> — {a.description}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}