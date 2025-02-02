import React, { useState } from 'react';
import { Lock, Search, TrendingUp, Globe, Twitter, ExternalLink, InfoIcon, RefreshCcw, X } from 'lucide-react';
import { TokenPreviewCard, TokenMetrics, TokenActions } from '@/components/TokenPreview';
import { useTokenData } from '@/hooks/useTokenData';

const TokenPreviewPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const topTokens = [
    { 
      name: 'BTW',
      address: 'E2RsfZrsxfN7yHraTRyBL8V3GVHto35KVTpUUsEcpump',
      requestCount: 15234,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://btw.com',
        twitter: 'https://twitter.com/@btw_official',
        explorer: 'https://explorer.sui.io/btw'
      }
    },
    { 
      name: 'Fartcoin',
      address: '9BB6NFEcjBCtNLFko2FqVQBq8HHM13kCyYcdQbgpump',
      requestCount: 12123,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://fartcoin.com',
        twitter: 'https://twitter.com/@fartcoin',
        explorer: 'https://explorer.sui.io/fart'
      }
    },
    { 
      name: 'MESH',
      address: 'FnqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNpump',
      requestCount: 10234,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://mesh.network',
        twitter: 'https://twitter.com/@mesh_network',
        explorer: 'https://explorer.sui.io/mesh'
      }
    },
    { 
      name: 'SUIP',
      address: 'KLqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNsuip',
      requestCount: 9876,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://suip.network',
        twitter: 'https://twitter.com/@suip_network',
        explorer: 'https://explorer.sui.io/suip'
      }
    },
    { 
      name: 'COCO',
      address: 'MMqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNcoco',
      requestCount: 8765,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://coco.finance',
        twitter: 'https://twitter.com/@coco_finance',
        explorer: 'https://explorer.sui.io/coco'
      }
    },
    { 
      name: 'WAVE',
      address: 'NNqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNwave',
      requestCount: 7654,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://wave.protocol',
        twitter: 'https://twitter.com/@wave_protocol',
        explorer: 'https://explorer.sui.io/wave'
      }
    },
    { 
      name: 'SURF',
      address: 'OOqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNsurf',
      requestCount: 6543,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://surf.finance',
        twitter: 'https://twitter.com/@surf_finance',
        explorer: 'https://explorer.sui.io/surf'
      }
    },
    { 
      name: 'PALM',
      address: 'PPqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNpalm',
      requestCount: 5432,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://palm.eco',
        twitter: 'https://twitter.com/@palm_eco',
        explorer: 'https://explorer.sui.io/palm'
      }
    },
    { 
      name: 'REEF',
      address: 'QQqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNreef',
      requestCount: 4321,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://reef.defi',
        twitter: 'https://twitter.com/@reef_defi',
        explorer: 'https://explorer.sui.io/reef'
      }
    },
    { 
      name: 'SHELL',
      address: 'RRqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNshel',
      requestCount: 3210,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://shell.dao',
        twitter: 'https://twitter.com/@shell_dao',
        explorer: 'https://explorer.sui.io/shell'
      }
    },
    { 
      name: 'CORAL',
      address: 'SSqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNcora',
      requestCount: 3100,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://coral.exchange',
        twitter: 'https://twitter.com/@coral_exchange',
        explorer: 'https://explorer.sui.io/coral'
      }
    },
    { 
      name: 'PEARL',
      address: 'TTqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNpear',
      requestCount: 2987,
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: 'https://pearl.finance',
        twitter: 'https://twitter.com/@pearl_finance',
        explorer: 'https://explorer.sui.io/pearl'
      }
    },
    ...Array.from({ length: 38 }, (_, i) => ({
      name: `TOKEN${i + 13}`,
      address: `${String.fromCharCode(85 + Math.floor(i/26))}${String.fromCharCode(65 + (i%26))}qXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwN${i + 13}`,
      requestCount: Math.floor(2800 * Math.pow(0.95, i)),
      holders: 1234,
      volume24h: 1000000,
      marketCap: 5000000,
      links: {
        website: `https://token${i + 13}.network`,
        twitter: `https://twitter.com/@token${i + 13}`,
        explorer: `https://explorer.sui.io/token${i + 13}`
      }
    }))
  ];

  // Filter tokens for the main search
  const filteredTokens = topTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter tokens for the leaderboard separately
  const leaderboardTokens = topTokens
    .filter(token =>
      token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      token.address.toLowerCase().includes(leaderboardSearch.toLowerCase())
    )
    .slice(0, 6); // Limit to 6 tokens

  const handleWalletConnect = async () => {
    setIsWalletConnecting(true);
    try {
      if (window.suiWallet) {
        await window.suiWallet.connect();
      } else {
        window.open('https://chrome.google.com/webstore/detail/sui-wallet', '_blank');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsWalletConnecting(false);
    }
  };

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

  const handleAnalyzeToken = (token: any) => {
    setSelectedToken(token);
    setShowPreview(true);
    setSearchQuery(token.address);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Fixed Social Links */}
      <div className="fixed left-6 top-6 flex flex-col gap-5 z-50">
        <a
          href="https://dexscreener.com/sui"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 flex items-center justify-center transition-all hover:scale-110 group border border-gray-800"
          title="DEX Screener"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-gray-400 group-hover:text-purple-400 transition-colors"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M3 12h3m12 0h3M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
          </svg>
        </a>

        <a
          href="https://sui.io"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 flex items-center justify-center transition-all hover:scale-110 group border border-gray-800"
          title="SUI Network"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            className="text-gray-400 group-hover:text-purple-400 transition-colors"
            fill="currentColor"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.837 0 16-7.163 16-16S24.837 0 16 0zm4.5 25.5h-9L7 21l5.5-5.5c.5-.5 1.5-.5 2 0l2 2 5-5c.5-.5 1.5-.5 2 0l3 3v7c0 1.657-1.343 3-3 3z" />
          </svg>
        </a>

        <a
          href="https://elizaos.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 flex items-center justify-center transition-all hover:scale-110 group border border-gray-800"
          title="ElizaOS"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="text-gray-400 group-hover:text-purple-400 transition-colors"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </a>

        <a
          href="https://twitter.com/DolphAI_SUI"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 flex items-center justify-center transition-all hover:scale-110 group border border-gray-800"
          title="DolphAI Twitter"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-gray-400 group-hover:text-purple-400 transition-colors"
            fill="currentColor"
          >
            <path d="M18.244 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-16">
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
            <div className="max-w-xl mx-auto">
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
                  className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors whitespace-nowrap"
                  onClick={() => {
                    if (filteredTokens.length > 0) {
                      setSelectedToken(filteredTokens[0]);
                      setShowPreview(true);
                    }
                  }}
                >
                  <TrendingUp className="h-5 w-5" />
                  Analyze token
                </button>
              </div>
              <div className="flex justify-center gap-4 items-center">
                <button
                  onClick={() => setIsWalletConnecting(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {isWalletConnecting ? (
                    <RefreshCcw className="h-5 w-5 animate-spin" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                  {isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
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
              <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Token</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requests</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Links</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {leaderboardTokens.map((token, index) => (
                        <tr key={token.address} className="hover:bg-gray-800/30">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">#{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{token.name}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-300">{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                              <button
                                onClick={() => handleCopyAddress(token.address)}
                                className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                                title="Copy address"
                              >
                                {copiedAddress === token.address ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{(token.requestCount || 0).toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className="flex items-center justify-end gap-3">
                              <a
                                href={token.links?.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                <Globe className="h-4 w-4" />
                              </a>
                              <a
                                href={token.links?.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                <Twitter className="h-4 w-4" />
                              </a>
                              <a
                                href={token.links?.explorer}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <button
                              onClick={() => handleAnalyzeToken(token)}
                              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
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
};

export default TokenPreviewPage;
