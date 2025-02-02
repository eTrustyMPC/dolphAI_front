import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Token } from './types';

interface TokenPreviewCardProps {
  token?: Token | null;
}

export const TokenPreviewCard: React.FC<TokenPreviewCardProps> = ({ token = null }) => {
  if (!token) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            {token.icon ? (
              <img 
                src={token.icon} 
                alt={token.name || 'Token'}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="text-gray-600 text-2xl">?</div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{token.name}</h1>
            <p className="text-gray-400">{token.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
          <TrendingUp className="text-green-500" size={16} />
          <span className="text-sm font-medium text-green-500">
            ${token.marketCap?.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">24h Volume</p>
          <p className="text-lg font-semibold text-white">${token.volume24h?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Holders</p>
          <p className="text-lg font-semibold text-white">{token.holders?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Requests</p>
          <p className="text-lg font-semibold text-white">{token.requestCount?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
