export interface QueryResult {
  columns: string[];
  rows: any[];
  executionTime: number;
  rowCount: number;
}

export interface SchemaTable {
  name: string;
  columns: { name: string; type: string }[];
  rowCount: number;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
}
