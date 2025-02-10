import React, { useState, useEffect, useMemo } from 'react';
import { Star } from 'lucide-react';
import { accountService } from '@/services/api/account';
import { Token } from '@/components/TokenPreview/types';

interface TokenWatchlistProps {
  token: Token;
  walletAddress: string;
  isWalletConnected: boolean;
  activeTab: 'leaderboard' | 'watchlist';
}

import { useWatchlist } from '@/hooks/useWatchlist';

export const TokenWatchlist: React.FC<TokenWatchlistProps> = ({
  token,
  walletAddress,
  isWalletConnected,
  activeTab,
}) => {
  console.log('TokenWatchlist: Rendering with props:', {
    tokenId: token.id,
    walletAddress,
    isWalletConnected
  });

  const { watchlist, addToWatchlist, removeFromWatchlist, isLoading, loadWatchlist } = useWatchlist(isWalletConnected ? walletAddress : null);
  // Check if token is in watchlist
  const isWatched = useMemo(() => {
    console.log('Checking watchlist state for token:', {
      tokenId: token.id,
      watchlistIds: watchlist?.map(t => t.id),
      result: watchlist?.some(t => t.id === token.id) ?? false
    });
    return watchlist?.some(t => t.id === token.id) ?? false;
  }, [watchlist, token.id]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Debug log for watchlist state
  useEffect(() => {
    console.log('TokenWatchlist: watchlist updated', {
      tokenId: token.id,
      isWatched,
      watchlistIds: watchlist?.map(t => t.id)
    });
  }, [watchlist, token.id]);

  console.log('TokenWatchlist: State', {
    watchlistLength: watchlist.length,
    isWatched,
    isLoading,
    isUpdating
  });

  const handleToggleWatchlist = async () => {
    try {
      console.log('TokenWatchlist: handleToggleWatchlist called', {
        token,
        walletAddress,
        isWalletConnected,
        isWatched,
        activeTab
      });
      
      if (!isWalletConnected) {
        console.warn('Wallet not connected');
        return;
      }
      
      if (!walletAddress) {
        console.warn('No wallet address available');
        return;
      }

      setIsUpdating(true);
      
      if (isWatched) {
        try {
          await removeFromWatchlist(walletAddress, token.id);
          // Double check removal
          const currentWatchlist = await accountService.getWatchlist(walletAddress);
          const isStillWatched = currentWatchlist.some(t => t.id === token.id);
          if (isStillWatched) {
            console.error('Token still in watchlist after removal, forcing refresh');
            loadWatchlist();
          }
        } catch (err) {
          console.error('Error removing from watchlist:', err);
          loadWatchlist();
        }
      } else {
        try {
          await addToWatchlist(walletAddress, token.id);
          // Double check addition
          const currentWatchlist = await accountService.getWatchlist(walletAddress);
          const isNowWatched = currentWatchlist.some(t => t.id === token.id);
          if (!isNowWatched) {
            console.error('Token not in watchlist after addition, forcing refresh');
            loadWatchlist();
          }
        } catch (err) {
          console.error('Error adding to watchlist:', err);
          loadWatchlist();
        }
      }
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      loadWatchlist(); // Reload on any error to ensure consistent state
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      onClick={async (e) => {
        console.log('TokenWatchlist: star clicked');
        e.stopPropagation();
        if (isWalletConnected) {
          handleToggleWatchlist();
        }
      }}
      className={`p-2 rounded-lg z-50 relative transition-colors ${
        isWalletConnected
          ? 'bg-[#1B1F27] hover:bg-[#252A34] cursor-pointer'
          : 'bg-gray-800/50 cursor-not-allowed'
      }`}
      title={isWalletConnected 
        ? (isWatched ? "Remove from watchlist" : "Add to watchlist")
        : "Connect wallet to use watchlist"
      }
    >
      <Star 
        className={`w-4 h-4 transition-all ${isUpdating ? 'animate-pulse' : ''} ${
          !isWalletConnected
            ? 'text-gray-600'
            : isWatched
              ? 'text-yellow-400 fill-yellow-400 stroke-yellow-400'
              : 'text-yellow-400 hover:text-yellow-500'
        }`} 
      />
    </div>
  );
};
