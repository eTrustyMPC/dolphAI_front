import React from 'react';
import { Star } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

interface TokenWatchlistProps {
  token: Token;
  watchlist: string[];
  onToggleWatchlist: (address: string) => void;
}

export const TokenWatchlist: React.FC<TokenWatchlistProps> = ({
  token,
  watchlist,
  onToggleWatchlist,
}) => {
  const isWatched = watchlist.includes(token.address);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onToggleWatchlist(token.address);
      }}
      className="p-2 rounded-lg bg-[#1B1F27] hover:bg-[#252A34] transition-colors cursor-pointer z-50 relative"
      title={isWatched ? "Remove from watchlist" : "Add to watchlist"}
    >
      <Star 
        className={`w-4 h-4 ${
          isWatched 
            ? 'text-yellow-400 fill-yellow-400 stroke-yellow-400' 
            : 'text-yellow-400 hover:text-yellow-500'
        }`} 
      />
    </div>
  );
};
