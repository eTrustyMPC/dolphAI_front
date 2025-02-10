import { Token } from '@/components/TokenPreview/types';
import { useState, useEffect } from 'react';
import { accountService } from '@/services/api/account';

export const useWatchlist = (walletAddress: string | null) => {
  const [watchlist, setWatchlist] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load watchlist when wallet connects and reset when disconnects
  useEffect(() => {
    const initWatchlist = async () => {
      if (walletAddress) {
        try {
          const tokens = await accountService.getWatchlist(walletAddress);
          console.log('Initial watchlist loaded:', tokens.length, 'tokens');
          setWatchlist(tokens);
        } catch (err) {
          console.error('Error loading initial watchlist:', err);
          setError(err as Error);
        }
      } else {
        setWatchlist([]);
        setError(null);
      }
    };
    
    initWatchlist();
  }, [walletAddress]);

  // Debug log watchlist changes
  useEffect(() => {
    console.log('Watchlist updated:', {
      walletAddress,
      tokenCount: watchlist?.length,
      tokens: watchlist?.map(t => ({ id: t.id, name: t.name }))
    });
  }, [watchlist, walletAddress]);

  // Load watchlist when wallet is connected
  const loadWatchlist = async () => {
    if (!walletAddress) {
      console.log('No wallet address, skipping watchlist load');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Loading watchlist for wallet:', walletAddress);
      const tokens = await accountService.getWatchlist(walletAddress);
      console.log('Watchlist loaded:', tokens.length, 'tokens');
      setWatchlist(tokens);
    } catch (err) {
      console.error('Error loading watchlist:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWatchlist = async (walletAddress: string, tokenId: string) => {
    if (!walletAddress) {
      console.error('Cannot add to watchlist: No wallet address');
      return;
    }

    setIsLoading(true);
    try {
      // Optimistically update UI
      const token = watchlist.find(t => t.id === tokenId);
      if (!token) {
        // If we don't have the token in watchlist yet, add a placeholder
        setWatchlist(prev => [...prev, { id: tokenId } as Token]);
      }

      // Make API call
      await accountService.addToWatchlist(walletAddress, tokenId);
      
      // Verify addition by checking current watchlist
      const tokens = await accountService.getWatchlist(walletAddress);
      const isInWatchlist = tokens.some(t => t.id === tokenId);
      
      if (!isInWatchlist) {
        console.error('Token addition verification failed, retrying...');
        // Retry addition if token is not present
        await accountService.addToWatchlist(walletAddress, tokenId);
        const updatedTokens = await accountService.getWatchlist(walletAddress);
        if (!updatedTokens.some(t => t.id === tokenId)) {
          console.error('Token addition failed after retry');
          throw new Error('Failed to add token to watchlist');
        }
        setWatchlist(updatedTokens);
      } else {
        console.log('Token addition verified successfully');
        setWatchlist(tokens);
      }
      
      console.log('Updated watchlist after add:', tokens.length, 'tokens');
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      setError(err as Error);
      // Revert optimistic update on error
      loadWatchlist();
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWatchlist = async (walletAddress: string, tokenId: string) => {
    if (!walletAddress) {
      console.error('Cannot remove from watchlist: No wallet address');
      return;
    }

    setIsLoading(true);
    try {
      // Optimistically update UI
      setWatchlist(prev => prev.filter(t => t.id !== tokenId));

      // Make API call
      await accountService.removeFromWatchlist(walletAddress, tokenId);
      
      // Verify removal by checking current watchlist
      const tokens = await accountService.getWatchlist(walletAddress);
      const isStillInWatchlist = tokens.some(t => t.id === tokenId);
      
      if (isStillInWatchlist) {
        console.error('Token removal verification failed, retrying...');
        // Retry removal if token is still present
        await accountService.removeFromWatchlist(walletAddress, tokenId);
        const updatedTokens = await accountService.getWatchlist(walletAddress);
        setWatchlist(updatedTokens);
      } else {
        console.log('Token removal verified successfully');
        setWatchlist(tokens);
      }
      
      console.log('Updated watchlist after remove:', tokens.length, 'tokens');
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      setError(err as Error);
      // Revert optimistic update on error
      loadWatchlist();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    watchlist,
    isLoading,
    error,
    loadWatchlist,
    addToWatchlist,
    removeFromWatchlist
  };
};
