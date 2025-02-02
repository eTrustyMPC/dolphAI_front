import React from 'react';
import { Share2, Star, Flag, ExternalLink, Twitter, Globe } from 'lucide-react';

interface TokenActionsProps {
  token?: {
    links?: {
      website?: string;
      twitter?: string;
      explorer?: string;
    };
  };
  onShare?: () => void;
  onFavorite?: () => void;
  onReport?: () => void;
}

export const TokenActions: React.FC<TokenActionsProps> = ({ 
  token = {}, 
  onShare = () => {}, 
  onFavorite = () => {}, 
  onReport = () => {} 
}) => {
  const links = token.links || {};

  return (
    <div className="flex gap-4 justify-end">
      <button
        onClick={onShare}
        className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
        title="Share"
      >
        <Share2 size={20} />
      </button>
      
      <button
        onClick={onFavorite}
        className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
        title="Add to favorites"
      >
        <Star size={20} />
      </button>
      
      <button
        onClick={onReport}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Report"
      >
        <Flag size={20} />
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <div className="flex gap-4">
          {links.website && (
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Globe className="h-5 w-5" />
              Website
            </a>
          )}
          {links.twitter && (
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </a>
          )}
          {links.explorer && (
            <a
              href={links.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              Explorer
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
