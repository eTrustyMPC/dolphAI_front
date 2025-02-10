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
    <div className="flex justify-center mt-0 mb-1">
      <div className="flex gap-3 w-[900px]">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              // Prevent Enter key from triggering analysis
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            placeholder="Enter token name or address to start analysis"
            className="w-full h-14 pl-12 pr-12 bg-gray-900/60 border border-blue-500/30 rounded-xl text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                handleSearchClear();
                setSearchQuery('');
              }}
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
            </button>
          )}
        </div>
        <button
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-purple-500/20 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          onClick={() => {
            console.log('Analyze button clicked');
            console.log('Search query:', searchQuery);
            console.log('Filtered tokens:', filteredTokens);
            
            // Find the token by exact ID match
            const token = filteredTokens.find(t => t.id === searchQuery);
            console.log('Found token:', token);
            
            if (token) {
              console.log('Analyzing token:', token.id);
              setSelectedToken(token);
              handleAnalyzeToken(token);
            } else {
              console.log('No token found with ID:', searchQuery);
            }
          }}
          disabled={!searchQuery}
        >
          <TrendingUp className="h-5 w-5" />
          Analyze token
        </button>
      </div>
    </div>
  );
};
