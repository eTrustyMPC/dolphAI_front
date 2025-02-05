import React, { useState, useEffect, useMemo } from 'react';
import { Lock, Search, TrendingUp, Globe, Twitter, ExternalLink, InfoIcon, RefreshCcw, X, Check, ClipboardCopy } from 'lucide-react';
import dynamic from 'next/dynamic';
import { TokenPreviewCard } from '@/components/TokenPreview/TokenPreviewCard';
import { TokenMetrics } from '@/components/TokenPreview/TokenMetrics';
import { TokenActions } from '@/components/TokenPreview/TokenActions';
import { useTokenData } from '@/hooks/useTokenData';
import { mockTokens } from '@/data/mockTokens';
import { Token } from '@/components/TokenPreview/types';
import { useRouter } from 'next/router';
import { useWallet } from '@suiet/wallet-kit';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';

const ConnectButton = dynamic(
  () => import('@suiet/wallet-kit').then((mod) => mod.ConnectButton),
  { ssr: false }
);

export default function TokenPreviewPage() {
  const router = useRouter();
  const { connected, select } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Monitor wallet connection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected && connected) {
      console.log('Wallet connected, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [connected, router]);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    // Show toast or notification
  };

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      if (!connected) {
        await select('Suiet');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setError('Failed to connect wallet. Please try again.');
      localStorage.removeItem('walletConnected');
    } finally {
      setIsConnecting(false);
    }
  };

  const topTokens = mockTokens;

  // Filter tokens for the main search
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return [];
    return mockTokens.filter(token =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filter tokens for the leaderboard
  const leaderboardTokens = useMemo(() => {
    if (!leaderboardSearch) return mockTokens;
    return mockTokens.filter(token =>
      token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      token.symbol.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      token.address.toLowerCase().includes(leaderboardSearch.toLowerCase())
    );
  }, [leaderboardSearch]);

  const handleAnalyzeToken = (token: Token) => {
    setSearchQuery(token.address);
    setSelectedToken(token);
    setShowPreview(true);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setSelectedToken(null);
    setShowPreview(false);
  };

  const handleClosePreview = () => {
    setSelectedToken(null);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Restoring <span className="text-purple-500">TRUST</span> in the digital economy
          </h1>
          <p className="text-xl mb-4">Demasking one fraud at a time.</p>
          <p className="text-gray-400 mb-4">
            Because transparency isn't optional...
          </p>

          <p className="text-purple-500 text-2xl font-semibold mb-8">
            ITS EVERYTHING.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter token name or address..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-3 flex items-center">
                  {searchQuery && (
                    <button
                      onClick={handleSearchClear}
                      className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                      title="Clear search"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                    </button>
                  )}
                </div>
              </div>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (searchQuery && filteredTokens.length > 0) {
                    handleAnalyzeToken(filteredTokens[0]);
                  }
                }}
                disabled={!searchQuery || filteredTokens.length === 0}
              >
                <TrendingUp className="h-5 w-5" />
                Analyze token
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            {!error && !connected && (
              <div className="text-center mt-4">
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Don't have Sui Wallet? Install here
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Token Preview Section */}
        {showPreview && selectedToken && (
          <div className="mb-12">
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <TokenPreviewCard 
                  token={selectedToken} 
                  isDashboard={false}
                  isWalletConnected={connected}
                  onConnectSuccess={() => {
                    localStorage.setItem('walletConnected', 'true');
                    router.push('/dashboard');
                  }}
                  onConnectError={(error) => {
                    console.error('Failed to connect wallet:', error);
                    setError('Failed to connect wallet. Please try again.');
                    localStorage.removeItem('walletConnected');
                  }}
                  onClose={handleClosePreview}
                />
              </div>
            </div>
          </div>
        )}

        {/* Token Table Section */}
        <div className="grid grid-cols-1 gap-8">
          {/* Top Tokens Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Most Analyzed Tokens</h2>
                <div className="relative">
                  <input
                    type="text"
                    value={leaderboardSearch}
                    onChange={(e) => setLeaderboardSearch(e.target.value)}
                    placeholder="Search tokens..."
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  {leaderboardSearch && (
                    <button
                      onClick={() => setLeaderboardSearch('')}
                      className="absolute inset-y-0 right-3 p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                      title="Clear search"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gray-900 z-10">
                      <tr className="text-left text-gray-400 text-sm">
                        <th className="pb-4 font-medium">Token</th>
                        <th className="pb-4 font-medium">Address</th>
                        <th className="pb-4 font-medium">Analysis Calls</th>
                        <th className="pb-4 font-medium">Links</th>
                        <th className="pb-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {leaderboardTokens.map((token) => (
                        <tr key={token.address} className="border-t border-gray-800">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {token.icon && (
                                <img 
                                  src={token.icon} 
                                  alt={token.name} 
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div>
                                <div className="font-medium text-white">{token.name}</div>
                                <div className="text-sm text-gray-400">{token.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400 font-mono">
                                {token.address.slice(0, 8)}...{token.address.slice(-6)}
                              </span>
                              <button
                                onClick={() => handleCopyAddress(token.address)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
                              >
                                {copiedAddress === token.address ? (
                                  <Check size={14} className="text-green-400" />
                                ) : (
                                  <ClipboardCopy size={14} className="text-purple-400 hover:text-purple-300" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="text-white">{token.holders?.toLocaleString() || 0}</div>
                          </td>
                          <td className="py-4">
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
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => handleAnalyzeToken(token)}
                              className="px-4 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 rounded-lg transition-colors font-bold"
                            >
                              Analyze
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="mb-4"
            />
            <h1 className="text-4xl font-bold mb-2">DolphAI</h1>
            <p className="text-gray-400 text-center max-w-lg">
              Your AI-powered companion for navigating the Sui ecosystem. Get instant insights, analytics, and recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
