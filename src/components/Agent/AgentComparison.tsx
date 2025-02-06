import React from 'react';
import { LineChart } from 'lucide-react';

import { AgentAnalysis } from '../../types/agent';

interface AgentComparisonProps {
  agents: AgentAnalysis[];
}

export const AgentComparison: React.FC<AgentComparisonProps> = ({ agents }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="text-purple-500" size={20} />
        <h3 className="text-lg font-medium">Agent Comparison</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">{agent.agentName}</div>
              <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-sm">
                Score: {agent.score}
              </div>
            </div>
            <div className="text-sm text-gray-300">
              {agent.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
