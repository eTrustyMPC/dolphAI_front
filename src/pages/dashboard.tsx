import React, { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Loader, Search, TrendingUp, X, Check, ClipboardCopy, Globe, Twitter, ExternalLink, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { mockDashboardData } from '@/data/mockDashboardData';
import { mockTokens } from '@/data/mockTokens';
import Navbar from '@/components/Navbar';
import { useCustomWallet } from '@/contexts/WalletContext';
import { tokenService } from '@/services/api/tokens';
import { useRouter } from 'next/router';
import { Token } from '@/components/TokenPreview/types';
import { TokenCardData, TokenScores } from '@/components/TokenCard/types';
import { TokenPreviewCard } from '@/components/TokenPreview/TokenPreviewCard';
import { WatchlistPanel } from '@/components/Watchlist/WatchlistPanel';
import { TokenTableSection } from '@/components/Dashboard/TokenTableSection';
import { useWatchlist } from '@/hooks/useWatchlist';
import { accountService } from '@/services/api/account';

const TokenDashboard = dynamic<any>(
  () => import('@/components/TokenDashboard/TokenDashboard').then(mod => mod.TokenDashboard),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-6 bg-gray-900 rounded-lg">
        <Loader className="w-6 h-6 text-purple-500 animate-spin" />
      </div>
    )
  }
);

export default function DashboardPage() {
  const router = useRouter();
  const customWallet = useCustomWallet();

  // Initialize all state
  const [tokens, setTokens] = useState<Token[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Use the useWatchlist hook
  const { watchlist: watchedTokens, loadWatchlist } = useWatchlist(customWallet.isInitialized && customWallet.address ? customWallet.address : null);
  const watchlistAddresses = useMemo(() => watchedTokens, [watchedTokens]);

  // Load watchlist when wallet connects
  useEffect(() => {
    if (customWallet.isInitialized && customWallet.address) {
      loadWatchlist();
    }
  }, [customWallet.isInitialized, customWallet.address, loadWatchlist]);

  // Header content
  const headerContent = (
    <div className="text-center space-y-6 mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
        DolphAI Project
      </h1>
      <div className="space-y-3">
        <p className="text-xl text-gray-300">
          Discover, analyze and track tokens with AI-powered insights
        </p>
      </div>
    </div>
  );

  const handleToggleWatchlist = useCallback(async (id: string) => {
    // Only allow watchlist functionality if wallet is connected
    if (!customWallet.isInitialized || !customWallet.address) return;

    const token = tokens.find(t => t.id === id);
    if (!token) return;

    const isWatched = watchedTokens.some(t => t.id === token.id);
    try {
      if (isWatched) {
        await accountService.removeFromWatchlist(customWallet.address, token.id);
      } else {
        await accountService.addToWatchlist(customWallet.address, token.id);
      }
      // Reload watchlist after change
      loadWatchlist();
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      setError('Failed to update watchlist');
    }
  }, [tokens, customWallet.isInitialized, customWallet.address, watchedTokens, loadWatchlist]);
  const [copiedAddress, setCopiedAddress] = useState('');

  const handleRemoveFromWatchlist = (tokenToRemove: Token) => {
    handleToggleWatchlist(tokenToRemove.id);
  };

  const toggleWatchToken = (token: Token) => {
    handleToggleWatchlist(token.id);
  };

  // Keep all tokens available but don't filter them
  const filteredTokens = useMemo(() => {
    if (isLoadingTokens) return [];
    return tokens;
  }, [tokens, isLoadingTokens]);

  const handleSearchClear = () => {
    setSearchQuery('');
    setSelectedToken(null);
    setError(null);
    setIsAnalyzed(false);
  };

  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyzeToken = async (token: Token) => {
    try {
      setIsAnalyzing(true);
      setIsAnalyzed(false); // Reset analysis state while loading
      
      // Load full token data using loadById
      const fullTokenData = await tokenService.loadById(token.id);
      
      // Update all relevant state
      setSearchQuery(token.id);
      setSelectedToken(fullTokenData);
      setIsAnalyzed(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error analyzing token:', error);
      setError('Failed to analyze token');
      setIsAnalyzed(false); // Ensure analysis state is false on error
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTokenSelect = (token: Token) => {
    if (Array.isArray(token)) {
      setTokens(token);
      if (token.length > 0) {
        setSelectedToken(token[0]);
      }
    } else {
      setSelectedToken(token);
    }
  };

  // Load tokens on mount
  useEffect(() => {
    const loadTokens = async () => {
      setIsLoadingTokens(true);
      try {
        console.log('Loading tokens...'); // Debug log
        const response = await tokenService.getTokens();
        console.log('Tokens loaded:', response); // Debug log
        if (response && response.tokens) {
          console.log('Setting tokens:', response.tokens.length); // Debug log
          setTokens(response.tokens);
          // Only set selected token if none is selected
          if (response.tokens.length > 0 && !selectedToken) {
            setSelectedToken(response.tokens[0]);
          }
        } else {
          console.log('No tokens in response'); // Debug log
          setTokens([]);
        }
      } catch (err) {
        console.error('Error loading tokens:', err);
        setError('Failed to load tokens');
        setTokens([]);
      } finally {
        setIsLoadingTokens(false);
      }
    };

    loadTokens();
  }, []); // Load on mount

  const handleCopyAddress = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedAddress(id);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy id:', err);
    }
  };

  const handleClosePreview = () => {
    setSelectedToken(null);
    setIsAnalyzed(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <Navbar />
      <main className="min-h-screen relative pt-20">
        <div className="max-w-[90rem] mx-auto px-0">
          {headerContent}

          <div className="space-y-8">
            <div className="flex gap-8">
              <TokenTableSection
                showLeaderboard={showLeaderboard}
                setShowLeaderboard={setShowLeaderboard}
                leaderboardSearch={leaderboardSearch}
                setLeaderboardSearch={setLeaderboardSearch}
                tokens={tokens}
                handleTokenSelect={handleTokenSelect}
                copiedAddress={copiedAddress}
                handleCopyAddress={handleCopyAddress}
                watchlist={watchlistAddresses}
                onToggleWatchlist={handleToggleWatchlist}
                selectedToken={selectedToken}
                isWalletConnected={customWallet.isConnected && customWallet.isInitialized}
                isAnalyzed={isAnalyzed}
                onConnectSuccess={() => {}}
                onConnectError={(error) => setError(error.message)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchClear={handleSearchClear}
                handleAnalyzeToken={handleAnalyzeToken}
                filteredTokens={filteredTokens}
                setSelectedToken={setSelectedToken}
                wallet={{
                  isInitialized: customWallet.isInitialized,
                  address: customWallet.address
                }}
              />
            </div> 
          </div>
        </div>
      </main>

      <WatchlistPanel
        isOpen={isWatchlistOpen}
        onToggle={() => setIsWatchlistOpen(!isWatchlistOpen)}
        watchedTokens={watchedTokens}
        onTokenSelect={(token) => {
          setSearchQuery(token.address);
          setSelectedToken(token);
          handleAnalyzeToken(token);
        }}
        onRemoveToken={handleRemoveFromWatchlist}
        isWalletConnected={customWallet.isConnected}
      />
    </div>
  );
} 