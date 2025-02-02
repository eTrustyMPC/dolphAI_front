import React, { useState, useEffect } from 'react';
import { Lock, Search, TrendingUp, Globe, Twitter, ExternalLink, InfoIcon, RefreshCcw, X } from 'lucide-react';
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

const ConnectButton = dynamic(
  () => import('@suiet/wallet-kit').then((mod) => mod.ConnectButton),
  { ssr: false }
);

export default function TokenPreviewPage() {
  const router = useRouter();
  const wallet = useWallet();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;

    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected && wallet.connected && wallet.address) {
      console.log('Wallet connected, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [wallet.connected, wallet.address, router]);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleWalletConnect = async () => {
    try {
      setError(null);

      if (!wallet.connected) {
        await wallet.select('Sui Wallet');
        await wallet.connect();
        
        // Add a small delay to ensure wallet state is updated
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (wallet.connected && wallet.address) {
          console.log('Wallet connected successfully:', wallet.address);
          router.push('/dashboard');
        } else {
          throw new Error('Failed to connect wallet. Please try again.');
        }
      }
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      if (err.message.includes('No wallet selected')) {
        setError('Please install Sui Wallet extension first');
      } else {
        setError(err.message || 'Failed to connect wallet. Please try again.');
      }
    }
  };

  const topTokens = mockTokens;

  // Filter tokens for the main search
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTokens = topTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter tokens for the leaderboard separately
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const leaderboardTokens = topTokens
    .filter(token =>
      token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      token.address.toLowerCase().includes(leaderboardSearch.toLowerCase())
    );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value) {
      setShowPreview(false);
      setSelectedToken(null);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowPreview(false);
    setSelectedToken(null);
  };

  const handleAnalyzeToken = (token: Token) => {
    setSearchQuery(token.address);
  };

  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

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

          {/* Search Section */}
          <div className="mb-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter token name or address..."
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {searchQuery && (
                      <button
                        onClick={handleClearSearch}
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
                      setSelectedToken(filteredTokens[0]);
                      setShowPreview(true);
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
              {!error && !wallet.connected && (
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Don't have Sui Wallet? Install here
                </a>
              )}
            </div>
          </div>

          {/* Token Preview Section */}
          {showPreview && selectedToken && (
            <div className="mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <TokenPreviewCard token={selectedToken} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <TokenMetrics token={selectedToken} />
                  <TokenActions token={selectedToken} />
                </div>
              </div>
            </div>
          )}

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
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {leaderboardSearch && (
                      <button
                        onClick={() => setLeaderboardSearch('')}
                        className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                        title="Clear search"
                      >
                        <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Token Leaderboard */}
                <div className="w-full bg-gray-900 rounded-lg p-6">
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search leaderboard..."
                        value={leaderboardSearch}
                        onChange={(e) => setLeaderboardSearch(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 text-sm">
                          <th className="pb-4 font-medium">Token</th>
                          <th className="pb-4 font-medium">Price</th>
                          <th className="pb-4 font-medium">24h Change</th>
                          <th className="pb-4 font-medium">Market Cap</th>
                          <th className="pb-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardTokens.map((token, index) => (
                          <tr key={token.address} className="border-t border-gray-800">
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                  {token.symbol.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium text-white">{token.name}</div>
                                  <div className="text-sm text-gray-400">{token.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="text-white">${token.price.toLocaleString()}</div>
                            </td>
                            <td className="py-4">
                              <div className={token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h}%
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="text-white">${token.marketCap.toLocaleString()}</div>
                            </td>
                            <td className="py-4">
                              <button
                                onClick={() => {
                                  setSelectedToken(token);
                                  setShowPreview(true);
                                  setSearchQuery(token.address);
                                }}
                                className="px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
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

          {/* SUI Ecosystem Section - Always Visible */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Powered by SUI Network</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                SUI is a next-generation smart contract platform with high throughput, low latency, and an asset-oriented programming model powered by the Move programming language
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Official SUI Resources */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Official Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://sui.io" target="_blank" rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      SUI Official Website
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.sui.io" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://explorer.sui.io" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Explorer
                    </a>
                  </li>
                </ul>
              </div>

              {/* DeFi Projects */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Popular DeFi</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://app.suiswap.com" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      SuiSwap DEX
                    </a>
                  </li>
                  <li>
                    <a href="https://app.scallop.io" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Scallop Lending
                    </a>
                  </li>
                  <li>
                    <a href="https://aftermath.finance" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Aftermath Finance
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tools & Infrastructure */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Tools & Infrastructure</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://suipad.com" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      SuiPad Launchpad
                    </a>
                  </li>
                  <li>
                    <a href="https://suivision.xyz" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      SuiVision Analytics
                    </a>
                  </li>
                  <li>
                    <a href="https://www.movebit.xyz" target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 flex items-center gap-2 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      MoveBit Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <a 
                href="https://discord.gg/sui" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Join SUI Community
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
