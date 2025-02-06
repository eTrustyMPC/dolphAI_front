import { useMemo } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

type Props = {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  leaderboardSearch: string;
  setLeaderboardSearch: (search: string) => void;
  tokens: Token[];
  handleTokenSelect: (token: Token) => void;
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
  copiedAddress,
  handleCopyAddress,
}: Props) => {
  const displayedTokens = useMemo(
    () => tokens
      .filter(token => 
        token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        token.symbol.toLowerCase().includes(leaderboardSearch.toLowerCase())
      )
      .slice(0, 5),
    [tokens, leaderboardSearch]
  );

  return (
    <div className="flex gap-8">
      <div className={`transition-all duration-300 ease-in-out ${showLeaderboard ? 'w-1/3' : 'w-48'} bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex-shrink-0`}>
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg flex-shrink-0"
                  title={showLeaderboard ? 'Hide leaderboard' : 'Show leaderboard'}
                >
                  {showLeaderboard ? (
                    <ChevronLeft className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
                <h2 className="text-xl font-bold truncate">
                  Most Analyzed Tokens
                </h2>
              </div>
            </div>
          </div>

          {showLeaderboard && (
            <>
              <div className="p-4 border-b border-gray-800">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={leaderboardSearch}
                    onChange={(e) => setLeaderboardSearch(e.target.value)}
                    placeholder="Search tokens..."
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  {leaderboardSearch && (
                    <button
                      onClick={() => setLeaderboardSearch('')}
                      className="absolute inset-y-0 right-3 p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                      title="Clear search"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
                {displayedTokens.map((token) => (
                  <div
                    key={token.address}
                    onClick={() => handleTokenSelect(token)}
                    className="w-full px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {token.icon && (
                          <img src={token.icon} alt={token.name} className="w-8 h-8 rounded-full" />
                        )}
                        <div className="text-left">
                          <div className="font-medium">{token.name}</div>
                          <div className="text-sm text-gray-400">{token.symbol}</div>
                          <div className="text-xs text-purple-400 mt-1">
                            {token.transactions.toLocaleString()} transactions
                          </div>
                          {(token.volume24h ?? 0) > 1000 && (
                            <div className="text-xs text-yellow-500 mt-1 flex items-center gap-1">
                              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                              Soon to graduate
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAddress(token.address);
                        }}
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                        title="Copy address"
                      >
                        {copiedAddress === token.address ? (
                          <span className="text-green-500">Copied!</span>
                        ) : (
                          token.address.slice(0, 6) + '...' + token.address.slice(-4)
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { TokenTableSection };
TokenTableSection.displayName = 'TokenTableSection';
