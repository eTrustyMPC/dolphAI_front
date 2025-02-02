import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TokenPreviewCardProps {
  token?: {
    name?: string;
    address?: string;
    description?: string;
    icon?: string;
    symbol?: string;
    price?: string;
  };
}

export const TokenPreviewCard: React.FC<TokenPreviewCardProps> = ({ token = {} }) => {
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
            <h2 className="text-2xl font-bold text-white mb-2">{token.name || 'Unknown Token'}</h2>
            <p className="text-gray-400 font-mono">{token.address || 'No address'}</p>
            {token.symbol && <p className="text-gray-400 text-sm">{token.symbol}</p>}
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          onClick={() => {
            // Add analyze functionality here
          }}
        >
          <TrendingUp className="h-5 w-5" />
          Analyze token
        </button>
      </div>
      {token.description && (
        <p className="text-gray-300">{token.description}</p>
      )}
      {token.price && (
        <div className='space-y-2'>
          <p className='text-gray-300'>
            Price: <span className='text-purple-400'>{token.price}</span>
          </p>
        </div>
      )}
    </div>
  );
};
