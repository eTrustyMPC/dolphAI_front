import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { mockValueAgent, mockScoringAgents } from '@/services/mockAgentData';
import { Agent } from '@/types/agent';

export const AgentDashboard: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([mockValueAgent, ...mockScoringAgents]);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock data based on search input
      const filtered = [mockValueAgent, ...mockScoringAgents].filter(agent =>
        agent.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      
      if (filtered.length === 0) {
        setError('No agents found matching your search');
        setAgents([]);
      } else {
        setAgents(filtered);
      }
    } catch (err) {
      setError('Failed to fetch agents');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setError(null);
    setAgents([mockValueAgent, ...mockScoringAgents]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="flex justify-center items-center gap-3 mb-8 max-w-3xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search agents..."
            className="w-full bg-[#0D1117] text-white placeholder-gray-400 rounded-lg h-12 px-4 pl-12 pr-12 border-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors text-base"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 p-1.5 hover:bg-gray-700 rounded-md transition-colors"
              title="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Agent Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-[#1A1D24] rounded-lg p-6 h-[300px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-gray-700 rounded"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
};
