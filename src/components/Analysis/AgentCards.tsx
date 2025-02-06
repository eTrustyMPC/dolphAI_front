import React from 'react';
import { Activity, Shield, LineChart } from 'lucide-react';

interface AgentCardProps {
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
}

const AgentCard: React.FC<AgentCardProps> = ({ title, score, description, icon }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-sm">
        Score: {score}
      </div>
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export function AgentCards() {
  const agents = [
    {
      title: 'Security Analysis',
      score: 92,
      description: 'Contract security analysis reveals robust implementation with no vulnerabilities.',
      icon: <Shield className="text-green-500" size={20} />
    },
    {
      title: 'Performance Metrics',
      score: 88,
      description: 'Strong market metrics with healthy liquidity across major DEXs.',
      icon: <Activity className="text-blue-500" size={20} />
    },
    {
      title: 'Network Analysis',
      score: 95,
      description: 'Excellent network performance with high throughput and low latency.',
      icon: <LineChart className="text-purple-500" size={20} />
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {agents.map((agent, index) => (
        <AgentCard key={index} {...agent} />
      ))}
    </div>
  );
}
