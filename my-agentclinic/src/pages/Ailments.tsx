import { Layout } from "../components/Layout";
import { getDb } from "../db";

interface AilmentRow {
  id: number;
  name: string;
  description: string;
  agent_count: number;
}

export function AilmentsList() {
  const db = getDb();
  const ailments = db.prepare(`
    SELECT
      a.id,
      a.name,
      a.description,
      COUNT(aa.agent_id) AS agent_count
    FROM ailments a
    LEFT JOIN agent_ailments aa ON aa.ailment_id = a.id
    GROUP BY a.id
    ORDER BY a.name
  `).all() as AilmentRow[];

  return (
    <Layout>
      <h1>Ailments</h1>
      <p class="muted">Common conditions affecting AI agents across the clinic.</p>
      {ailments.length === 0 && <p>No ailments recorded yet.</p>}
      <table>
        <thead>
          <tr>
            <th>Ailment</th>
            <th>Description</th>
            <th>Affected Agents</th>
          </tr>
        </thead>
        <tbody>
          {ailments.map((a) => (
            <tr>
              <td><strong>{a.name}</strong></td>
              <td>{a.description}</td>
              <td>{a.agent_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}