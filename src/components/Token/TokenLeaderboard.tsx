import React from 'react';
import { Search, X, ChevronRight, BarChart2, Copy, Check, Star } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

interface TokenLeaderboardProps {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  leaderboardSearch: string;
  setLeaderboardSearch: (search: string) => void;
  displayedTokens: Token[];
  handleTokenSelect: (token: Token) => void;
  getGradientClass: (index: number) => string;
  copiedAddress: string;
  handleCopyAddress: (address: string) => void;
  watchlist: string[];
  onToggleWatchlist: (address: string) => void;
}

export const TokenLeaderboard: React.FC<TokenLeaderboardProps> = ({
  showLeaderboard,
  setShowLeaderboard,
  leaderboardSearch,
  setLeaderboardSearch,
  displayedTokens,
  handleTokenSelect,
  getGradientClass,
  copiedAddress,
  handleCopyAddress,
  watchlist,
  onToggleWatchlist,
}) => {
  return (
    <div className={`transition-all duration-300 ease-in-out bg-gray-900/40 border border-blue-500/30 rounded-2xl overflow-hidden flex-shrink-0 backdrop-blur-sm ${showLeaderboard ? 'h-[32rem]' : 'h-auto'}`}>
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
          <div className="p-3">
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="group relative text-white/90 hover:text-white transition-all p-3 hover:bg-purple-500/10 rounded-xl flex items-center justify-between w-full border border-purple-500/20 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.98]"  
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                <span className="text-sm font-medium">{showLeaderboard ? 'View Top 5' : 'View All'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="space-y-2 p-3">
            {displayedTokens.map((token, index) => (
              <button
                key={token.address}
                onClick={() => handleCopyAddress(token.address)}
                className="group relative w-full text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <div className="relative flex items-center gap-3 p-3 rounded-lg bg-gray-900/40 border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-400">
                      {index + 1}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center">
                      <img src="/token-logo.png" alt="token" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{token.name}</div>
                      <div className="text-sm text-gray-400">{token.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-medium text-white">{token.symbol}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyAddress(token.address);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                      title="Copy address"
                    >
                      {copiedAddress === token.address ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(token.address);
                      }}
                      className={`p-2 rounded-lg hover:bg-gray-800/50 transition-colors ${watchlist.includes(token.address) ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-yellow-400'}`}
                      title="Add to watchlist"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
