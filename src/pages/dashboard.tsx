import React, { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Loader, Search, TrendingUp, X, Check, ClipboardCopy, Globe, Twitter, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockDashboardData } from '@/data/mockDashboardData';
import { mockTokens } from '@/data/mockTokens';
import Navbar from '@/components/Navbar';
import { useCustomWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/router';
import { Token } from '@/components/TokenPreview/types';
import { TokenCardData, TokenScores } from '@/components/TokenCard/types';
import { TokenPreviewCard } from '@/components/TokenPreview/TokenPreviewCard';
import { WatchlistPanel } from '@/components/Watchlist/WatchlistPanel';
import { AgentCards } from '@/components/Analysis/AgentCards';
import { TokenTableSection } from '@/components/Dashboard/TokenTableSection';

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
  const [tokens, setTokens] = useState(() => mockTokens);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(true);
  const [watchedTokens, setWatchedTokens] = useState<TokenCardData[]>([]);
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Header content
  const headerContent = (
    <div className="text-center space-y-6 mb-12">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
        DolphAI Project
      </h1>
      <div className="space-y-3">
        <p className="text-xl text-gray-300">
          Discover, analyze and track tokens with AI-powered insights
        </p>
        <p className="text-sm text-gray-400">
          Connect wallet to unlock full analysis capabilities
        </p>
      </div>
    </div>
  );

  const handleToggleWatchlist = useCallback((address: string) => {
    // Only allow watchlist functionality if wallet is connected
    if (!customWallet.isInitialized) return;

    const token = tokens.find(t => t.address === address);
    if (!token) return;

    const tokenWithScores: TokenCardData = {
      ...token,
      scores: {
        onChainActivity: { value: 75, explanation: 'Moderate transaction volume and user engagement' },
        liquidityAndTrading: { value: 70, explanation: 'Adequate liquidity with moderate trading volume' },
        whalesAndHolders: { value: 65, explanation: 'Fair token distribution with moderate holder activity' }
      }
    };

    setWatchlist(prev => {
      const isWatched = prev.includes(address);
      const newList = isWatched ? prev.filter(a => a !== address) : [...prev, address];
      
      setWatchedTokens(current => {
        const updated = isWatched
          ? current.filter(t => t.address !== address)
          : [...current, tokenWithScores];
        localStorage.setItem('watchedTokens', JSON.stringify(updated));
        localStorage.setItem('watchlist', JSON.stringify(newList));
        return updated;
      });

      return newList;
    });
  }, [tokens, customWallet.isInitialized]);
  const [copiedAddress, setCopiedAddress] = useState('');

  // Load watched tokens from localStorage only if wallet is connected
  useEffect(() => {
    if (!customWallet.isInitialized) {
      setWatchedTokens([]);
      setWatchlist([]);
      return;
    }

    const savedTokens = localStorage.getItem('watchedTokens');
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedTokens && savedWatchlist) {
      const tokens = JSON.parse(savedTokens);
      const list = JSON.parse(savedWatchlist);
      setWatchedTokens(tokens);
      setWatchlist(list);
    } else {
      // Set some default watched tokens
      const defaultWatched = mockTokens.slice(0, 3);
      const defaultList = defaultWatched.map(t => t.address);
      setWatchedTokens(defaultWatched);
      setWatchlist(defaultList);
      localStorage.setItem('watchedTokens', JSON.stringify(defaultWatched));
      localStorage.setItem('watchlist', JSON.stringify(defaultList));
    }
  }, [customWallet.isInitialized]);

  const handleRemoveFromWatchlist = (tokenToRemove: Token) => {
    handleToggleWatchlist(tokenToRemove.address);
  };

  const toggleWatchToken = (token: Token) => {
    handleToggleWatchlist(token.address);
  };

  // Memoize filtered tokens
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return [];
    return tokens.filter(token => 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tokens]);

  const handleSearchClear = () => {
    setSearchQuery('');
    setSelectedToken(null);
    setError(null);
  };

  const handleAnalyzeToken = (token: Token) => {
    setSearchQuery(token.address);
    setSelectedToken(token);
    setIsAnalyzing(true);
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleClosePreview = () => {
    setSelectedToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <Navbar />
      <main className="min-h-screen relative pt-24">
        <div className="max-w-[90rem] mx-auto px-4">
          {headerContent}

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
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              selectedToken={selectedToken}
              isWalletConnected={customWallet.isInitialized}
              onConnectSuccess={() => {}}
              onConnectError={(error) => setError(error.message)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchClear={handleSearchClear}
              handleAnalyzeToken={handleAnalyzeToken}
              filteredTokens={filteredTokens}
              setSelectedToken={setSelectedToken}
              wallet={customWallet}
            />
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
        isWalletConnected={customWallet.isInitialized}
      />
    </div>
  );
} 