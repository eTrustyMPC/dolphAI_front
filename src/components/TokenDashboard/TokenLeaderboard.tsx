import React from 'react';
import { Search, X, Globe, Twitter, ExternalLink } from 'lucide-react';
import { mockTokens } from '@/data/mockTokens';

interface TokenLeaderboardProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  variant?: 'preview' | 'dashboard';
  onAnalyze?: (address: string) => void;
}

export const TokenLeaderboard: React.FC<TokenLeaderboardProps> = ({ 
  searchValue, 
  onSearchChange,
  variant = 'preview',
  onAnalyze
}) => {
  const filteredTokens = mockTokens.filter(token => 
    token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={variant === 'preview' ? 'grid grid-cols-1 gap-8' : ''}>
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className={variant === 'preview' ? 'text-2xl font-bold' : 'text-lg font-medium'}>
              Most Analyzed Tokens
            </h2>
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tokens..."
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              {searchValue && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-3 p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                  title="Clear search"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="mt-6">
            <div className="h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
              <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                  <th className="pb-4 font-medium">Token</th>
                  <th className="pb-4 font-medium">Address</th>
                  <th className="pb-4 font-medium text-right">Analysis Calls</th>
                  {variant === 'preview' && (
                    <th className="pb-4 font-medium text-center">Links</th>
                  )}
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr key={token.address} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {token.icon && (
                          <img src={token.icon} alt={token.name} className="w-8 h-8 rounded-full" />
                        )}
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-gray-400 text-sm">{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-gray-400">{token.address}</code>
                        <button className="p-1 hover:bg-gray-700 rounded-md transition-colors" title="Copy address">
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="font-medium">100,000</div>
                    </td>
                    {variant === 'preview' && (
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <Globe className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <Twitter className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <ExternalLink className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                          </button>
                        </div>
                      </td>
                    )}
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => onAnalyze?.(token.address)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-white font-medium"
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
  );
};
