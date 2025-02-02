import React from 'react';
import { BarChart2, Users, DollarSign } from 'lucide-react';

interface TokenMetricsProps {
  token?: {
    holders?: number;
    volume24h?: number;
    marketCap?: number;
  };
}

export const TokenMetrics: React.FC<TokenMetricsProps> = ({ token = {} }) => {
  const { holders = 0, volume24h = 0, marketCap = 0 } = token;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-900 rounded-lg">
      <div className="flex items-center gap-3">
        <Users className="text-purple-500" size={24} />
        <div>
          <p className="text-sm text-gray-400">Holders</p>
          <p className="text-lg font-semibold text-white">{holders.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <BarChart2 className="text-purple-500" size={24} />
        <div>
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-lg font-semibold text-white">${volume24h.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <DollarSign className="text-purple-500" size={24} />
        <div>
          <p className="text-sm text-gray-400">Market Cap</p>
          <p className="text-lg font-semibold text-white">${marketCap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
