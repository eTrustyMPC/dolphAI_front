import { useMemo } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Star, BarChart2, Copy, Check, Globe, Twitter } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

type Props = {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  leaderboardSearch: string;
  setLeaderboardSearch: (search: string) => void;
  tokens: Token[];
  handleTokenSelect: (token: Token) => void;
  watchlist: string[];
  onToggleWatchlist: (address: string) => void;
  copiedAddress: string;
  handleCopyAddress: (address: string) => void;
};

const TokenTableSection = ({
  showLeaderboard,
  setShowLeaderboard,
  leaderboardSearch,
  setLeaderboardSearch,
  tokens,
  handleTokenSelect,
  watchlist,
  onToggleWatchlist,
  copiedAddress,
  handleCopyAddress,
}: Props) => {
  const sortedTokens = useMemo(
    () => tokens.sort((a, b) => (b.transactions ?? 0) - (a.transactions ?? 0)),
    [tokens]
  );

  const displayedTokens = useMemo(
    () => {
      const filtered = sortedTokens.filter(token => 
        token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        token.symbol.toLowerCase().includes(leaderboardSearch.toLowerCase())
      );
      return showLeaderboard ? filtered : filtered.slice(0, 5);
    },
    [sortedTokens, leaderboardSearch, showLeaderboard]
  );

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-purple-500 to-purple-400',
      'from-purple-400 to-purple-300',
      'from-purple-300 to-purple-200',
      'from-purple-200 to-purple-100',
      'from-purple-100 to-purple-50',
    ];
    return gradients[Math.min(index, gradients.length - 1)];
  };

  return (
    <div className="flex gap-8">
      <div className={`transition-all duration-300 ease-in-out ${showLeaderboard ? 'w-1/3' : 'w-64'} bg-gray-900/40 border border-blue-500/30 rounded-2xl overflow-hidden flex-shrink-0 backdrop-blur-sm ${showLeaderboard ? 'h-[32rem]' : 'h-auto'}`}>
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
            <div className="p-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="group relative text-white/90 hover:text-white transition-all p-3 hover:bg-purple-500/10 rounded-xl flex-shrink-0 w-full flex items-center justify-center gap-2 border border-purple-500/20 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.98]"  
                  title={showLeaderboard ? 'Show top 5' : 'View full leaderboard'}
                >
                  <BarChart2 className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {showLeaderboard ? 'Show Top 5' : 'View All'}
                  </span>
                  {!showLeaderboard && (
                    <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
                {showLeaderboard && (
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={leaderboardSearch}
                        onChange={(e) => setLeaderboardSearch(e.target.value)}
                        placeholder="Search tokens..."
                        className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      {leaderboardSearch && (
                        <button
                          onClick={() => setLeaderboardSearch('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600 min-h-0">
            <div className="divide-y divide-gray-800">
              {displayedTokens.map((token, index) => (
                <div
                  key={token.address}
                  className="hover:bg-gray-800/50 transition-colors cursor-pointer relative overflow-hidden group"
                  onClick={(e) => {
                    if (e.target instanceof HTMLButtonElement && e.target.closest('[data-watchlist-button]')) {
                      return;
                    }
                    handleTokenSelect(token);
                  }}
                >
                  {showLeaderboard ? (
                    <div className="py-2 px-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                            {index + 1}
                          </div>
                          {token.icon && (
                            <img 
                              src={token.icon} 
                              alt={token.name} 
                              className="w-4 h-4 rounded-full absolute -bottom-1 -right-1" 
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium truncate">{token.name}</h3>
                            <span className="text-sm text-gray-400">{token.symbol}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">
                                  {token.transactions ?? 0} requests
                                </span>
                                <button
                                  data-watchlist-button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleWatchlist(token.address);
                                  }}
                                  className={`p-1 rounded-md transition-colors ${watchlist.includes(token.address) ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-300'}`}
                                  title={watchlist.includes(token.address) ? 'Remove from watchlist' : 'Add to watchlist'}
                                >
                                  <Star className="w-4 h-4" fill={watchlist.includes(token.address) ? 'currentColor' : 'none'} />
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyAddress(token.address);
                                }}
                                className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                                title="Copy address"
                              >
                                {copiedAddress === token.address ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {token.links?.website && (
                              <a
                                href={token.links.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-400 hover:text-white transition-colors"
                                title="Website"
                              >
                                <Globe className="w-4 h-4" />
                              </a>
                            )}
                            {token.links?.twitter && (
                              <a
                                href={token.links.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-400 hover:text-white transition-colors"
                                title="Twitter"
                              >
                                <Twitter className="w-4 h-4" />
                              </a>
                            )}
                            {token.links?.explorer && (
                              <a
                                href={token.links.explorer}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                                title="View in Explorer"
                              >
                                Explorer
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 px-4 flex items-start gap-4 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 text-lg font-medium">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
                        <div className="text-base font-medium text-white">{token.name}</div>
                        <div className="flex items-center justify-between gap-1 text-gray-400">
                          <div className="truncate text-xs text-gray-400">{token.address}</div>
                          <button
                            data-watchlist-button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWatchlist(token.address);
                            }}
                            className={`p-1 rounded-md transition-colors ${watchlist.includes(token.address) ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-300'}`}
                            title={watchlist.includes(token.address) ? 'Remove from watchlist' : 'Add to watchlist'}
                          >
                            <Star className="w-4 h-4" fill={watchlist.includes(token.address) ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyAddress(token.address);
                            }}
                            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                            title="Copy address"
                          >
                            {copiedAddress === token.address ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div 
                    className={`absolute inset-0 opacity-10 bg-gradient-to-r ${getGradientClass(index)} group-hover:opacity-20 transition-opacity`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TokenTableSection };
TokenTableSection.displayName = 'TokenTableSection';
