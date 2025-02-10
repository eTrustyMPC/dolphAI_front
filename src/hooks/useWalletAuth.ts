import { useState, useEffect } from 'react';
import { accountService, AccountResponse } from '@/services/api/account';
import { Token } from '@/components/TokenPreview/types';

interface WalletAuthState {
  account: AccountResponse | null;
  loading: boolean;
  error: Error | null;
  watchlist: Token[];
}

export const useWalletAuth = (walletAddress?: string) => {
  const [state, setState] = useState<WalletAuthState>({
    account: null,
    loading: false,
    error: null,
    watchlist: []
  });

  const authenticateWallet = async (address: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // This will either find an existing account or create a new one
      const account = await accountService.findOrCreateAccount(address);
      
      // After getting/creating the account, fetch the watchlist
      const watchlist = await accountService.getWatchlist(address);
      
      setState({
        account,
        watchlist,
        loading: false,
        error: null
      });

      return account;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error
      }));
      throw error;
    }
  };

  const addToWatchlist = async (walletAddress: string, tokenAddress: string) => {
    if (!walletAddress) {
      console.error('Cannot add to watchlist: No wallet address provided');
      throw new Error('Wallet not connected');
    }

    try {
      // Always try to initialize/find the account first
      const account = await accountService.findOrCreateAccount(walletAddress);
      setState(prev => ({ ...prev, account }));
    } catch (error) {
      console.error('Error initializing account:', error);
      throw error;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // First add the token
      await accountService.addToWatchlist(walletAddress, tokenAddress);
      
      // Then refresh the watchlist
      const watchlist = await accountService.getWatchlist(walletAddress);
      
      setState(prev => ({
        ...prev,
        watchlist,
        loading: false
      }));
    } catch (error) {
      console.error('Error in addToWatchlist:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error
      }));
      throw error;
    }
  };

  const removeFromWatchlist = async (walletAddress: string, tokenAddress: string) => {
    if (!walletAddress) {
      console.error('Cannot remove from watchlist: No wallet address provided');
      throw new Error('Wallet not connected');
    }

    try {
      // Always try to initialize/find the account first
      const account = await accountService.findOrCreateAccount(walletAddress);
      setState(prev => ({ ...prev, account }));
    } catch (error) {
      console.error('Error initializing account:', error);
      throw error;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // First remove the token
      await accountService.removeFromWatchlist(walletAddress, tokenAddress);
      
      // Then refresh the watchlist
      const watchlist = await accountService.getWatchlist(walletAddress);
      
      setState(prev => ({
        ...prev,
        watchlist,
        loading: false
      }));
    } catch (error) {
      console.error('Error in removeFromWatchlist:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error
      }));
      throw error;
    }
  };

  // Fetch watchlist whenever account changes
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (state.account?.walletAddress) {
        try {
          setState(prev => ({ ...prev, loading: true }));
          const watchlist = await accountService.getWatchlist(state.account.walletAddress);
          console.log('Fetched watchlist:', watchlist); // Debug log
          setState(prev => ({ ...prev, watchlist, loading: false }));
        } catch (error) {
          console.error('Error fetching watchlist:', error);
          setState(prev => ({ ...prev, loading: false, error: error as Error }));
        }
      }
    };
    
    fetchWatchlist();
  }, [state.account]);

  // Initialize account and fetch watchlist when wallet address changes
  useEffect(() => {
    const initializeAccount = async () => {
      if (walletAddress) {
        try {
          setState(prev => ({ ...prev, loading: true }));
          // First ensure we have an account
          const account = await accountService.findOrCreateAccount(walletAddress);
          // Then fetch the watchlist
          const watchlist = await accountService.getWatchlist(walletAddress);
          console.log('Initial watchlist:', watchlist); // Debug log
          setState({
            account,
            watchlist,
            loading: false,
            error: null
          });
        } catch (error) {
          console.error('Error initializing account:', error);
          setState(prev => ({
            ...prev,
            loading: false,
            error: error as Error
          }));
        }
      } else {
        // Reset state when wallet is disconnected
        setState({
          account: null,
          loading: false,
          error: null,
          watchlist: []
        });
      }
    };

    initializeAccount();
  }, [walletAddress]);

  return {
    ...state,
    authenticateWallet,
    addToWatchlist,
    removeFromWatchlist,
    isTokenWatched: (tokenId: string) => 
      state.watchlist.some(token => token.id === tokenId)
  };
};
