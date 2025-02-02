import React from 'react';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface TokenMetricsProps {
  metrics: {
    liquidity: number;
    volume: number;
    priceChange24h: number;
    holders?: number;
    marketCap?: number;
  } | null;
}

export const TokenMetrics: React.FC<TokenMetricsProps> = ({ metrics }) => {
  console.log('TokenMetrics: Rendering with metrics:', metrics);
  
  if (!metrics) {
    console.log('TokenMetrics: No metrics provided, returning null');
    return null;
  }

  return (
    <div data-testid="metrics-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400 mb-2">Holders</h3>
        <p className="text-xl font-medium">{metrics.holders?.toLocaleString() || '0'}</p>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400 mb-2">24h Volume</h3>
        <p className="text-xl font-medium">${metrics.volume?.toLocaleString() || '0'}</p>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400 mb-2">Market Cap</h3>
        <p className="text-xl font-medium">${metrics.marketCap?.toLocaleString() || '0'}</p>
      </div>
    </div>
  );
};

console.log('TokenMetrics: Module loaded');
