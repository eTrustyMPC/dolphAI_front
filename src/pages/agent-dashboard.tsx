import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { ValueAgent } from '../components/Agent/ValueAgent';
import { TokenSummary } from '../components/Agent/TokenSummary';
import { AgentComparison } from '../components/Agent/AgentComparison';
import { NewsSection } from '../components/Agent/NewsSection';
import { TokenActions } from '../components/Agent/TokenActions';
import { agentService } from '../services/agentService';
import { TokenData, AgentData } from '../types/agent';



const AgentDashboard: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await agentService.getTokenData('0x1234...5678'); // Example address
        setTokenData(data);
      } catch (err) {
        setError('Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await agentService.searchToken(searchInput);
      if (result) {
        setTokenData(result);
      } else {
        setError('Token not found');
      }
    } catch (err) {
      setError('Failed to fetch token data');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setError(null);
  };

  // Mock data - replace with real data later
  const mockAgentData: AgentData = {
    name: "DolphAI Agent",
    indicators: [
      { 
        name: "Security", 
        score: 85,
        description: "Strong security measures and audited smart contracts"
      },
      { 
        name: "Performance", 
        score: 92,
        description: "Excellent network performance and transaction throughput"
      },
      { 
        name: "Reliability", 
        score: 88,
        description: "High uptime and consistent network stability"
      }
    ],
    summary: "Strong network growth with increasing L2 adoption. Recent protocol upgrades show positive momentum.",
    recommendations: [
      {
        title: "Security Audit",
        description: "Schedule regular security audits to maintain high security standards",
        priority: "high"
      },
      {
        title: "Performance Optimization",
        description: "Consider implementing layer 2 scaling solutions for improved throughput",
        priority: "medium"
      },
      {
        title: "Network Monitoring",
        description: "Enhance network monitoring tools for better reliability tracking",
        priority: "low"
      }
    ]
  };

  const mockAgents = [
    { name: "Security Agent", score: 85, summary: "Token contract shows good security practices with no major vulnerabilities detected." },
    { name: "Performance Agent", score: 92, summary: "Excellent transaction throughput and gas efficiency metrics." },
    { name: "Market Agent", score: 88, summary: "Strong market presence with healthy liquidity and trading volume." }
  ];

  const mockNews = [
    { 
      title: "Protocol Upgrade Successfully Implemented",
      source: "Official Blog",
      date: "2h ago",
      type: 'news' as const
    },
    {
      title: "Community Discussion: New Governance Proposal",
      source: "Discord",
      date: "4h ago",
      type: 'social' as const
    },
    {
      title: "Q1 2025 Development Update",
      source: "Medium",
      date: "6h ago",
      type: 'news' as const
    }
  ];

  const handleTokenAction = (action: 'swap' | 'stake' | 'lend') => {
    console.log(`Initiating ${action} action`);
    // Implement action handling
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      {/* Search Bar */}
      <div className="flex justify-center items-center gap-3 mb-8 pt-6 max-w-5xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter token name or address..."
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

      {/* Agent Card */}
      {isLoading ? (
        <div className="bg-gray-900 rounded-lg p-6 mb-6 animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
          <div className="flex gap-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg px-4 py-2 w-32 h-16"></div>
            ))}
          </div>
          <div className="h-20 bg-gray-800 rounded"></div>
        </div>
      ) : error ? (
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="text-red-400">{error}</div>
        </div>
      ) : tokenData && (
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{tokenData.name}</h2>
              <div className="flex gap-4">
                {tokenData.indicators.map((indicator, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg px-4 py-2">
                    <div className="text-sm text-gray-400">{indicator.name}</div>
                    <div className="text-lg font-medium">{indicator.score}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                Score
              </div>
            </div>
          </div>
          <div className="text-gray-300">
            {tokenData.summary}
          </div>
        </div>
      )}

      {/* Grid Layout */}
      {tokenData && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ValueAgent data={tokenData.valueAgent} />
            <TokenSummary data={tokenData.tokenSummary} />
          </div>

          {/* Agent Comparison Section */}
          <div className="mt-6">
            <AgentComparison agents={tokenData.agentAnalyses} />
          </div>

          {/* Token Actions and News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TokenActions onActionClick={handleTokenAction} />
            <NewsSection 
              token={tokenData ? { name: tokenData.name, address: tokenData.address, symbol: tokenData.symbol } : null}
              news={tokenData.news}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AgentDashboard;
