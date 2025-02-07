import React from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchClear: () => void;
  handleAnalyzeToken: (token: Token) => void;
  filteredTokens: Token[];
  setSelectedToken: (token: Token | null) => void;
  wallet: { isInitialized: boolean };
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchClear,
  handleAnalyzeToken,
  filteredTokens,
  setSelectedToken,
  wallet,
}) => {
  return (
    <div>
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
          {searchQuery && (
            <button
              onClick={handleSearchClear}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
            </button>
          )}
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            if (searchQuery && filteredTokens.length > 0) {
              setSelectedToken(filteredTokens[0]);
              handleAnalyzeToken(filteredTokens[0]);
            }
          }}
          disabled={!searchQuery || filteredTokens.length === 0}
        >
          <TrendingUp className="h-5 w-5" />
          Analyze token
        </button>
      </div>
      {searchQuery && filteredTokens.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          {filteredTokens.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                setSelectedToken(token);
                handleAnalyzeToken(token);
              }}
              className="w-full px-4 py-3 hover:bg-gray-800 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                {token.icon && (
                  <img src={token.icon} alt={token.name} className="w-8 h-8 rounded-full" />
                )}
                <div className="text-left">
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-gray-400">{token.symbol}</div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnalyzeToken(token);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-medium transition-colors"
                disabled={!wallet.isInitialized}
                title={!wallet.isInitialized ? 'Connect wallet to analyze' : 'Analyze token'}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Analyze
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
