import React from 'react';
import { Token } from '@/components/TokenPreview/types';
import { TokenDashboard } from '@/components/TokenDashboard/TokenDashboard';
import { AgentCards } from '@/components/Analysis/AgentCards';
import { mockDashboardData } from '@/data/mockDashboardData';

interface TokenAnalysisSectionProps {
  selectedToken: Token | null;
  isAnalyzing: boolean;
}

export const TokenAnalysisSection: React.FC<TokenAnalysisSectionProps> = ({
  selectedToken,
  isAnalyzing,
}) => {
  if (!isAnalyzing || !selectedToken) return null;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Content */}
        <div>
          <TokenDashboard data={mockDashboardData} />
        </div>

        {/* Token Info and Agents */}
        <div className="space-y-6">
          {/* Token Block Info */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Token Info</h2>
            {selectedToken ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-400">Name</h3>
                  <p className="font-medium">{selectedToken.name}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Symbol</h3>
                  <p className="font-medium">{selectedToken.symbol}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Price Change</h3>
                  <p className={`font-medium ${(selectedToken.priceChange24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {(selectedToken.priceChange24h ?? 0) >= 0 ? '+' : ''}{selectedToken.priceChange24h ?? 0}%
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a token to view details</p>
            )}
          </div>

          {/* Agent Cards */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">AI Agents</h2>
            <AgentCards />
          </div>
        </div>
      </div>
    </div>
  );
};
