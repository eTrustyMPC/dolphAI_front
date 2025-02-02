import React from 'react';
import { TokenPreviewCard, TokenMetrics, TokenActions } from '@/components/TokenPreview'
import { useTokenData } from '@/hooks/useTokenData';

const TokenPreviewPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isWalletConnecting, setIsWalletConnecting] = React.useState(false);

  const topTokens = [
    { 
      rank: 1, 
      name: 'BTW', 
      address: 'E2RsfZrsxfN7yHraTRyBL8V3GVHto35KVTpUUsEcpump',
      requestCount: 15234,
      links: {
        website: 'https://btw.com',
        twitter: '@btw_official',
        explorer: 'https://explorer.sui.io/btw'
      }
    },
    { 
      rank: 2, 
      name: 'Fartcoin', 
      address: '9BB6NFEcjBCtNLFko2FqVQBq8HHM13kCyYcdQbgpump',
      requestCount: 12123,
      links: {
        website: 'https://fartcoin.com',
        twitter: '@fartcoin',
        explorer: 'https://explorer.sui.io/fart'
      }
    },
    { 
      rank: 3, 
      name: 'MESH', 
      address: 'FnqXjNmCPEBNMTnveAvwuRsCdtKz7qnjJjGB1EwNpump',
      requestCount: 10234,
      links: {
        website: 'https://mesh.network',
        twitter: '@mesh_network',
        explorer: 'https://explorer.sui.io/mesh'
      }
    }
  ];

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

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Restoring <span className="text-purple-500">TRUST</span> in the digital economy
          </h1>
          <p className="text-xl mb-2">Demasking one fraud at a time.</p>
          <p className="text-gray-400 mb-8">
            Because transparency isn't optional... IT'S EVERYTHING.
          </p>

          {/* Wallet Connection Button */}
          <button 
            className="bg-purple-600 hover:bg-purple-700 mb-8"
            onClick={handleWalletConnect}
            disabled={isWalletConnecting}
          >
            <Lock className="mr-2" size={16} />
            {isWalletConnecting ? 'Connecting...' : 'Connect Sui Wallet'}
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-8 bg-gray-900 border-gray-800">
          <div className="pt-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-400 mb-4 text-center">Get preview insights into any token: analyze holder patterns, assess key metrics and track reputation scores</p>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter token address or name..."
                    className="pl-10 pr-4 py-3 w-full bg-gray-800 border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button 
                  className="bg-purple-600 hover:bg-purple-700 px-8 h-[46px]"
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Tokens Table */}
        <div className="bg-gray-900 border-gray-800">
          <div>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} />
                Most Requested Tokens
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="py-3">#</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Address</th>
                    <th className="py-3">Requests</th>
                    <th className="py-3">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {topTokens.map((token) => (
                    <tr key={token.rank} className="border-b border-gray-800">
                      <td className="py-3 text-white">{token.rank}</td>
                      <td className="py-3 font-semibold text-white">{token.name}</td>
                      <td className="py-3 text-gray-400 font-mono text-sm">{token.address}</td>
                      <td className="py-3 text-white">
                        {token.requestCount.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button 
                            className="text-gray-400 hover:text-purple-400"
                            onClick={() => window.open(token.links.website, '_blank')}
                          >
                            <Globe size={16} />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-purple-400"
                            onClick={() => window.open(`https://twitter.com/${token.links.twitter}`, '_blank')}
                          >
                            <Twitter size={16} />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-purple-400"
                            onClick={() => window.open(token.links.explorer, '_blank')}
                          >
                            <ExternalLink size={16} />
                          </button>
                        </div>
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
  );
};

export default TokenPreviewPage;