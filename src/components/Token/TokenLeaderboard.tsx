import React, { useMemo } from 'react';
import { Search, X, ChevronRight, BarChart2, Copy, Check } from 'lucide-react';
import { TokenWatchlist } from './TokenWatchlist';
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
  activeTab: 'leaderboard' | 'watchlist';
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
  activeTab,
}) => {
  const displayedTokensToShow = useMemo(() => {
    const filtered = displayedTokens.filter(token => {
      if (activeTab === 'watchlist') {
        return watchlist.includes(token.address);
      }
      return true;
    });
    return showLeaderboard ? filtered : filtered.slice(0, 5);
  }, [displayedTokens, activeTab, watchlist, showLeaderboard]);
  return (
    <div className="transition-all duration-300 ease-in-out border border-blue-500/30 overflow-hidden flex-shrink-0">
      <div className={`flex flex-col ${showLeaderboard ? 'h-[32rem]' : 'h-auto'}`}>

        <div className="sticky top-0 z-10 border-b border-gray-800 ">
          <div className="p-3">
            <div
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="group relative text-white/90 hover:text-white transition-all p-3 hover:bg-[#252A34] flex items-center justify-between w-full cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                <span className="text-xs font-medium">{showLeaderboard ? 'View Top 5' : 'View All'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <div className={`flex-1 overflow-y-auto ${showLeaderboard ? 'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700' : ''}`}>
          <div className="space-y-2 p-3">
            {displayedTokensToShow.map((token, index) => (
              <div
                key={token.address}
                className="group relative w-full text-left cursor-pointer hover:bg-[#252A34] rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyAddress(token.address);
                }}
              >
                <div className="relative flex items-center gap-3 p-3 rounded-lg border border-gray-700/50 hover:border-purple-500/30 hover:bg-[#252A34]">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-400">
                      {index + 1}
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center">
                      <img src="/token-logo.png" alt="token" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{token.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-400">{token.dynamics?.weeklyTxCount ?? 0} weekly txs</div>
                        {(token.dynamics?.weeklyTxCount ?? 0) > 2000 && (
                          <div className="text-[8px] text-amber-400 font-medium">
                            * graduate soon
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-medium text-white">{token.symbol}</div>
                    </div>
                    <div className="p-2 rounded-lg transition-colors">
                      {copiedAddress === token.address && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <TokenWatchlist
                      token={token}
                      watchlist={watchlist}
                      onToggleWatchlist={onToggleWatchlist}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
