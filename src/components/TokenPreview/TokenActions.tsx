import React from 'react';
import { Share2, Star, Flag } from 'lucide-react';
import { Token } from './types';

interface TokenActionsProps {
  token: Token | null;
  onShare?: () => void;
  onFavorite?: () => void;
  onReport?: () => void;
}

export const TokenActions: React.FC<TokenActionsProps> = ({ token = null, onShare, onFavorite, onReport }) => {
  console.log('TokenActions: Rendering with token:', token);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      {token?.links && (
        <div className="flex items-center justify-between mb-4">
          {token.links.website && (
            <a
              href={token.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              Website
            </a>
          )}
          {token.links.telegram && (
            <a
              href={token.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              Telegram
            </a>
          )}
          {token.links.explorer && (
            <a
              href={token.links.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              Explorer
            </a>
          )}
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          onClick={onShare}
          className="p-2 text-gray-400 hover:text-purple-500 transition-colors flex items-center gap-1"
          title="Share"
        >
          <Share2 size={16} />
          <span className="text-sm">Share</span>
        </button>

        <button
          onClick={onFavorite}
          className="p-2 text-gray-400 hover:text-purple-500 transition-colors flex items-center gap-1"
          title="Add to favorites"
        >
          <Star size={16} />
          <span className="text-sm">Add to Watchlist</span>
        </button>

        <button
          onClick={onReport}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
          title="Report"
        >
          <Flag size={16} />
          <span className="text-sm">Report</span>
        </button>
      </div>
    </div>
  );
};

console.log('TokenActions: Module loaded');
