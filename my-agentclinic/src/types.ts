/** Row shape from the agents table */
export interface AgentRow {
  id: number;
  name: string;
  model_type: string;
  status: string;
  created_at?: string;
}

/** Ailment reference (used in join queries) */
export interface AilmentRef {
  id: number;
  name: string;
  description: string;
}

/** Row shape from the ailments-list query */
export interface AilmentRow {
  id: number;
  name: string;
  description: string;
  agent_count: number;
}

/** Props for the AgentDetail component */
export interface AgentDetailProps {
  id: number;
}

/** Row shape from the _migrations tracking table */
export interface MigrationRow {
  name: string;
}