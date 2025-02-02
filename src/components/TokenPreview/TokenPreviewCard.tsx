import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Token } from './types';

interface TokenPreviewCardProps {
  token?: Token | null;
}

export const TokenPreviewCard: React.FC<TokenPreviewCardProps> = ({ token = null }) => {
  console.log('TokenPreviewCard: Rendering with token:', token);
  
  if (!token) {
    console.log('TokenPreviewCard: No token provided, returning null');
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            {token.icon ? (
              <img 
                src={token.icon} 
                alt={token.name} 
                className="w-8 h-8"
              />
            ) : (
              <span className="text-lg text-gray-400">?</span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.address}</p>
            <p className="text-sm text-gray-400">{token.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">${token.price}</p>
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">
              {token.priceChange24h ? `+${token.priceChange24h}%` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      {token.description && (
        <p className="text-gray-400 mb-4">{token.description}</p>
      )}
    </div>
  );
};

console.log('TokenPreviewCard: Module loaded');
