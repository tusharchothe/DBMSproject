import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { QueryResult, SchemaTable, Message } from './types';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Results from './components/Results';
import Chat from './components/Chat';
import { motion, AnimatePresence } from 'motion/react';

// Mock Schema Data
const MOCK_SCHEMA: SchemaTable[] = [
  { name: 'users', columns: [{ name: 'id', type: 'integer' }, { name: 'name', type: 'varchar' }, { name: 'email', type: 'varchar' }, { name: 'created_at', type: 'timestamp' }], rowCount: 1250 },
  { name: 'orders', columns: [{ name: 'id', type: 'integer' }, { name: 'user_id', type: 'integer' }, { name: 'total', type: 'decimal' }, { name: 'status', type: 'varchar' }], rowCount: 8420 },
  { name: 'products', columns: [{ name: 'id', type: 'integer' }, { name: 'name', type: 'varchar' }, { name: 'price', type: 'decimal' }, { name: 'stock', type: 'integer' }], rowCount: 450 },
  { name: 'categories', columns: [{ name: 'id', type: 'integer' }, { name: 'name', type: 'varchar' }], rowCount: 12 },
];

// Mock Query Results
const MOCK_RESULTS: Record<string, QueryResult> = {
  'SELECT * FROM users': {
    columns: ['id', 'name', 'email', 'created_at'],
    rows: [
      { id: 1, name: 'Alex Rivera', email: 'alex@example.com', created_at: '2023-01-15 10:30:00' },
      { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', created_at: '2023-02-20 14:45:00' },
      { id: 3, name: 'Jordan Smith', email: 'jordan@example.com', created_at: '2023-03-05 09:15:00' },
      { id: 4, name: 'Maria Garcia', email: 'maria@example.com', created_at: '2023-04-12 16:20:00' },
      { id: 5, name: 'Kevin Lee', email: 'kevin@example.com', created_at: '2023-05-18 11:10:00' },
    ],
    executionTime: 42,
    rowCount: 5
  }
};

export default function App() {
  const [query, setQuery] = useState('SELECT * FROM users');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI SQL Mentor. I can help you write queries, explain complex joins, or optimize your database structure. How can I assist you today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const executeQuery = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const normalizedQuery = query.trim().replace(/\s+/g, ' ').toUpperCase();
      if (normalizedQuery.includes('SELECT * FROM USERS')) {
        setResult(MOCK_RESULTS['SELECT * FROM users']);
      } else {
        // Generic result for other queries
        setResult({
          columns: ['id', 'data', 'status'],
          rows: [
            { id: 101, data: 'Sample Data A', status: 'Active' },
            { id: 102, data: 'Sample Data B', status: 'Pending' },
          ],
          executionTime: 124,
          rowCount: 2
        });
      }
      setLoading(false);
    }, 800);
  };

  const handleAiChat = async (text?: string) => {
    const messageText = text || chatInput;
    if (!messageText.trim()) return;

    const newUserMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setAiLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert SQL Mentor. The user is currently working on this query: "${query}". 
        The available tables are: ${MOCK_SCHEMA.map(t => t.name).join(', ')}.
        User message: "${messageText}"
        Provide a helpful, educational response. If you provide SQL code, wrap it in a code block.`,
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request.";
      
      // Extract code if present
      const codeMatch = aiText.match(/```sql\n([\s\S]*?)```/);
      const code = codeMatch ? codeMatch[1].trim() : undefined;
      const cleanContent = aiText.replace(/```sql\n[\s\S]*?```/, '').trim();

      setMessages(prev => [...prev, { role: 'assistant', content: cleanContent, code }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error while processing your request. Please try again." }]);
    } finally {
      setAiLoading(false);
    }
  };

  const explainQuery = () => {
    handleAiChat(`Can you explain what this SQL query does? \n\n${query}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30">
      <TopNav />
      
      <div className="flex pt-12 h-screen overflow-hidden">
        <Sidebar schema={MOCK_SCHEMA} />
        
        <main className="flex-1 ml-64 mr-96 p-6 overflow-y-auto flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[45%]"
          >
            <Editor 
              query={query} 
              setQuery={setQuery} 
              onExecute={executeQuery} 
              onExplain={explainQuery}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-h-0"
          >
            <Results result={result} loading={loading} />
          </motion.div>
        </main>
        
        <Chat 
          messages={messages} 
          input={chatInput} 
          setInput={setChatInput} 
          onSend={() => handleAiChat()} 
          loading={aiLoading}
        />
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-tertiary/5 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
}
