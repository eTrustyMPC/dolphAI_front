import React from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

interface TokenSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchClear: () => void;
  handleAnalyzeToken: (token: Token) => void;
  setSelectedToken: (token: Token | null) => void;
  filteredTokens: Token[];
}

export const TokenSearch: React.FC<TokenSearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchClear,
  handleAnalyzeToken,
  setSelectedToken,
  filteredTokens,
}) => {
  return (
    <div className="flex justify-center mt-8 mb-12">
      <div className="flex gap-3 w-[900px]">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter token name or address to start analysis"
            className="w-full h-14 pl-12 pr-12 bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-xl text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={handleSearchClear}
              className="absolute inset-y-0 right-4 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
            </button>
          )}
        </div>
        <button
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-purple-500/20 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
    </div>
  );
};
