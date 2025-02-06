import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { TokenCardData, TokenScore, DefiPoolInfo } from './types';
import { TokenMetrics } from '../TokenPreview/TokenMetrics';
import { Tooltip } from '../ui/Tooltip'; // Assuming you have a Tooltip component

interface TokenCardProps {
  data: TokenCardData;
}

const ScoreCard: React.FC<{ title: string; score: TokenScore; comingSoon?: boolean }> = ({
  title,
  score,
  comingSoon = false,
}) => (
  <div className="bg-gray-800/50 p-4 rounded-lg relative">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <Tooltip content={score.explanation}>
        <Info size={16} className="text-gray-400 cursor-help" />
      </Tooltip>
    </div>
    {comingSoon ? (
      <div className="text-purple-400 text-sm">Coming with elizaos v2</div>
    ) : (
      <div className="text-2xl font-semibold">{score.value}/100</div>
    )}
  </div>
);

const DefiPoolCard: React.FC<{ pool: DefiPoolInfo }> = ({ pool }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm text-gray-400">{pool.projectName}</h3>
      <a
        href={pool.platformLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300"
      >
        <ExternalLink size={16} />
      </a>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-gray-400">Pool</p>
        <p className="text-sm font-medium">{pool.pool}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400">TVL</p>
        <p className="text-sm font-medium">${pool.tvl.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400">APY</p>
        <p className="text-sm font-medium text-green-400">{pool.apy}%</p>
      </div>
    </div>
  </div>
);

export const TokenCard: React.FC<TokenCardProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        {data.icon && (
          <img src={data.icon} alt={data.name} className="w-12 h-12 rounded-full" />
        )}
        <div>
          <h2 className="text-xl font-semibold">{data.name} ({data.symbol})</h2>
          <p className="text-gray-400">{data.address}</p>
        </div>
      </div>

      {/* Market Info */}
      <TokenMetrics
        metrics={{
          liquidity: data.liquidity || 0,
          volume: data.volume24h || 0,
          priceChange24h: data.priceChange24h || 0,
          holders: data.holders,
          marketCap: data.marketCap,
        }}
      />

      {/* Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard
          title="On-chain Activity"
          score={data.scores?.onChainActivity || {
            value: 0,
            explanation: 'Score data not available'
          }}
        />
        <ScoreCard
          title="Liquidity & Trading"
          score={data.scores?.liquidityAndTrading || {
            value: 0,
            explanation: 'Score data not available'
          }}
        />
        <ScoreCard
          title="Whales & Holders"
          score={data.scores?.whalesAndHolders || {
            value: 0,
            explanation: 'Score data not available'
          }}
        />
        <ScoreCard
          title="Sentiment Analysis"
          score={data.scores?.sentiment || { value: 0, explanation: 'Coming soon' }}
          comingSoon={!data.scores?.sentiment}
        />
      </div>

      {/* DeFi Pools */}
      {data.defiPools && data.defiPools.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Top DeFi Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.defiPools.map((pool, index) => (
              <DefiPoolCard key={index} pool={pool} />
            ))}
          </div>
        </div>
      )}

      {/* Value Proposition */}
      {data.llmValueProposition && (
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Value Proposition</h3>
          <p className="text-gray-300">{data.llmValueProposition}</p>
        </div>
      )}

      {/* Recent Research */}
      {data.recentResearch && (
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Recent Research</h3>
          <p className="text-gray-300">{data.recentResearch}</p>
        </div>
      )}
    </div>
  );
};
