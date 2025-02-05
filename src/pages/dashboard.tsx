import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useWallet } from '@suiet/wallet-kit';
import { useCustomWallet } from '@/contexts/WalletContext';
import { 
  Wallet, 
  LineChart, 
  History, 
  Bell, 
  Star,
  ArrowUpRight,
  Search,
  Loader,
  ClipboardCopy,
  Globe,
  Twitter,
  ExternalLink
} from 'lucide-react';
import { mockTokens } from '@/data/mockTokens';
import type { Token } from '@/components/TokenPreview/types';
import { Navbar } from '@/components/Navbar';

// Dynamic imports
const TokenPreviewCard = dynamic(
  () => {
    return import('@/components/TokenPreview/TokenPreviewCard').then(mod => ({ default: mod.TokenPreviewCard }));
  },
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-6 bg-gray-900 rounded-lg">
        <Loader className="w-6 h-6 text-purple-500 animate-spin" />
      </div>
    )
  }
);

const TokenMetrics = dynamic(
  () => {
    return import('@/components/TokenPreview/TokenMetrics').then(mod => ({ default: mod.TokenMetrics }));
  },
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-6 bg-gray-900 rounded-lg">
        <Loader className="w-6 h-6 text-purple-500 animate-spin" />
      </div>
    )
  }
);

const TokenActions = dynamic(
  () => {
    return import('@/components/TokenPreview/TokenActions').then(mod => ({ default: mod.TokenActions }));
  },
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-6 bg-gray-900 rounded-lg">
        <Loader className="w-6 h-6 text-purple-500 animate-spin" />
      </div>
    )
  }
);

interface WalletStats {
  totalTokens: number;
  totalValue: number;
  tokensWatching: number;
  recentActivity: number;
}

export default function DashboardPage() {
  
  const router = useRouter();
  const wallet = useWallet();
  const customWallet = useCustomWallet();
  const [isInitializing, setIsInitializing] = useState(true);
  const [stats, setStats] = useState<WalletStats>({
    totalTokens: 0,
    totalValue: 0,
    tokensWatching: 0,
    recentActivity: 0
  });
  const [watchlist, setWatchlist] = useState<Token[]>([]);
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (!customWallet.isInitialized || customWallet.isLoading) {
      return;
    }

    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    // Check wallet connection
    const wasConnected = localStorage.getItem('walletConnected');
    
    if (!wasConnected || !wallet.connected || !wallet.address) {
      router.push('/token-preview');
      return;
    }

    // Initialize data
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Set stats
        setStats({
          totalTokens: mockTokens.length,
          totalValue: mockTokens.reduce((acc, token) => acc + (token.marketCap || 0), 0),
          tokensWatching: 5,
          recentActivity: 8
        });

        // Set watchlist and recent tokens
        setWatchlist(mockTokens.slice(0, 5));
        setRecentTokens(mockTokens.slice(5, 8));
      } catch (error) {
        console.error('Dashboard: Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [wallet.connected, wallet.address, router, customWallet.isLoading, customWallet.isInitialized]);

  if (!customWallet.isInitialized || customWallet.isLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-purple-500 animate-spin" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleTokenClick = (token: Token) => {
    router.push(`/token/${token.address}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-400">Your DeFi dashboard</p>
          </div>
          <button 
            onClick={() => router.push('/token-preview')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Search size={20} />
            Explore Tokens
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Wallet className="text-blue-500" size={24} />
              </div>
              <h3 className="text-lg font-medium">Total Tokens</h3>
            </div>
            <p className="text-2xl font-bold">{stats.totalTokens}</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <LineChart className="text-green-500" size={24} />
              </div>
              <h3 className="text-lg font-medium">Portfolio Value</h3>
            </div>
            <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Star className="text-yellow-500" size={24} />
              </div>
              <h3 className="text-lg font-medium">Watching</h3>
            </div>
            <p className="text-2xl font-bold">{stats.tokensWatching}</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <History className="text-purple-500" size={24} />
              </div>
              <h3 className="text-lg font-medium">Recent Activity</h3>
            </div>
            <p className="text-2xl font-bold">{stats.recentActivity}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Watchlist */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Watchlist</h2>
              <button className="text-purple-400 hover:text-purple-300">View All</button>
            </div>
            <div className="space-y-4">
              {watchlist.map((token) => (
                <div key={token.address} className="space-y-4">
                  <TokenPreviewCard 
                    token={token} 
                    isDashboard={true}
                    isWalletConnected={wallet.connected}
                  />
                  <TokenActions 
                    token={token}
                    onShare={() => {}}
                    onFavorite={() => {}}
                    onReport={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Most Analyzed Tokens</h2>
              <button className="text-purple-400 hover:text-purple-300">View All</button>
            </div>
            <div className="space-y-4">
              {recentTokens.map((token) => (
                <div key={token.address} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {token.icon && (
                        <img 
                          src={token.icon} 
                          alt={token.name} 
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{token.name}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-400 font-mono">{token.address.slice(0, 8)}...{token.address.slice(-6)}</p>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(token.address);
                            }}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <ClipboardCopy size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-400">Analysis Calls</p>
                        <p className="text-lg font-medium">{token.holders}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {token.links?.website && (
                          <a 
                            href={token.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <Globe size={16} className="text-gray-300" />
                          </a>
                        )}
                        {token.links?.twitter && (
                          <a 
                            href={token.links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <Twitter size={16} className="text-gray-300" />
                          </a>
                        )}
                        {token.links?.explorer && (
                          <a 
                            href={token.links.explorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <ExternalLink size={16} className="text-gray-300" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
