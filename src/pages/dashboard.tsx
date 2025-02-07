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

  const handleToggleWatchlist = useCallback((address: string) => {
    const token = tokens.find(t => t.address === address);
    if (!token) return;

    setWatchlist(prev => {
      const newList = prev.includes(address)
        ? prev.filter(a => a !== address)
        : [...prev, address];
      
      // Sync with watchedTokens
      const tokenWithScores: TokenCardData = {
        ...token,
        scores: {
          onChainActivity: { value: 75, explanation: 'Moderate transaction volume and user engagement' },
          liquidityAndTrading: { value: 70, explanation: 'Adequate liquidity with moderate trading volume' },
          whalesAndHolders: { value: 65, explanation: 'Fair token distribution with moderate holder activity' }
        }
      };

      if (newList.includes(address)) {
        setWatchedTokens(current => {
          const updated = [...current, tokenWithScores];
          localStorage.setItem('watchedTokens', JSON.stringify(updated));
          return updated;
        });
      } else {
        setWatchedTokens(current => {
          const updated = current.filter(t => t.address !== address);
          localStorage.setItem('watchedTokens', JSON.stringify(updated));
          return updated;
        });
      }

      return newList;
    });
  }, [tokens]);
  const [copiedAddress, setCopiedAddress] = useState('');

  // Load watched tokens from localStorage
  useEffect(() => {
    const savedTokens = localStorage.getItem('watchedTokens');
    if (savedTokens) {
      const tokens = JSON.parse(savedTokens);
      setWatchedTokens(tokens);
      setWatchlist(tokens.map((t: TokenCardData) => t.address));
    } else {
      // Set some default watched tokens
      const defaultWatched = mockTokens.slice(0, 3);
      setWatchedTokens(defaultWatched);
      setWatchlist(defaultWatched.map(t => t.address));
      localStorage.setItem('watchedTokens', JSON.stringify(defaultWatched));
    }
  }, []);

  const handleRemoveFromWatchlist = (tokenToRemove: Token) => {
    setWatchedTokens(current => {
      const updated = current.filter(token => token.address !== tokenToRemove.address);
      localStorage.setItem('watchedTokens', JSON.stringify(updated));
      setWatchlist(updated.map(t => t.address));
      return updated;
    });
  };

  const toggleWatchToken = (token: Token) => {
    // Convert Token to TokenCardData by adding default scores
    const tokenWithScores: TokenCardData = {
      ...token,
      scores: {
        onChainActivity: { value: 75, explanation: 'Moderate transaction volume and user engagement' },
        liquidityAndTrading: { value: 70, explanation: 'Adequate liquidity with moderate trading volume' },
        whalesAndHolders: { value: 65, explanation: 'Fair token distribution with moderate holder activity' }
      }
    };
    setWatchedTokens(current => {
      const isWatched = current.some(t => t.address === token.address);
      const newTokens = isWatched
        ? current.filter(t => t.address !== token.address)
        : [...current, tokenWithScores];
      localStorage.setItem('watchedTokens', JSON.stringify(newTokens));
      return newTokens;
    });
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
      <main className="min-h-screen relative pt-16">
        <div className="max-w-[90rem] mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">DolphAI Project</h1>
            <p className="text-gray-400 mb-8">
              Search and analyze tokens
              {!customWallet.isInitialized && " (connect wallet to analyze)"}
            </p>
          </div>

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
      />
    </div>
  );
} 