import React from 'react';
import { Star, Copy, Check, Globe, Twitter, MessageCircle, FileCode, Search } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';

interface TokenInfoProps {
  token: Token;
  watchlist: string[];
  copiedAddress: string;
  onToggleWatchlist: (address: string) => void;
  handleCopyAddress: (address: string) => void;
  isWalletConnected?: boolean;
}

export const TokenInfo: React.FC<TokenInfoProps> = ({
  token,
  watchlist,
  copiedAddress,
  onToggleWatchlist,
  handleCopyAddress,
  isWalletConnected = false,
}) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-2.5">
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center text-white font-semibold">
                {token.symbol?.[0]}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
              <Check className="w-2 h-2 text-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto flex-1 min-w-0">
          <div className="flex flex-col min-w-[120px] justify-center py-1">
            <h3 className="text-sm font-semibold truncate flex items-center gap-2">
              {token.name}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400">
                  {token.symbol}
                </span>
                <button
                  onClick={() => isWalletConnected ? onToggleWatchlist(token.address) : undefined}
                  className={`p-1 rounded-lg transition-all ${!isWalletConnected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800/50'}`}
                  title={!isWalletConnected ? 'Connect wallet to use watchlist' : watchlist.includes(token.address) ? 'Remove from watchlist' : 'Add to watchlist'}
                  disabled={!isWalletConnected}
                >
                  <Star className={`w-4 h-4 ${watchlist.includes(token.address) ? 'text-yellow-400 fill-yellow-400 stroke-yellow-400' : 'text-yellow-400 hover:text-yellow-500'}`} />
                </button>
              </div>
            </h3>
            <button 
              onClick={() => handleCopyAddress(token.address)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedAddress === token.address ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {token.address.slice(0, 6)}...{token.address.slice(-4)}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                Price
              </span>
              <span className="text-sm font-semibold">${token.price}</span>
            </div>
            
            <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                Market Cap
              </span>
              <span className="text-sm font-semibold">${token.marketCapChange}</span>
            </div>
            
            <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                Volume
              </span>
              <span className="text-sm font-semibold">${token.volumeChange24h}M</span>
            </div>
            
            <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                Holders
              </span>
              <span className="text-sm font-semibold">{token.holdersChange}K</span>
            </div>
            
            <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-teal-400"></div>
                Transactions
              </span>
              <span className="text-sm font-semibold">{token.transactions}K</span>
            </div>
            
            <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-sky-400"></div>
                Liquidity
              </span>
              <span className="text-sm font-semibold">${token.liquidity}M</span>
            </div>
          </div>

          {/* Token links */}
          <div className="flex items-center gap-2 ml-auto">
            {token.links?.website && (
              <a
                href={token.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
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
                className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {token.links?.discord && (
              <a
                href={token.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
                title="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
            {token.links?.contract && (
              <a
                href={token.links.contract}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
                title="Contract"
              >
                <FileCode className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      </div>
      {!token && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <div className="text-center px-4">
            <Search className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400 mb-1">Enter token address in the search bar above</p>
            <p className="text-xs text-gray-500">Press <span className="text-blue-400 font-medium">Analyze</span> button to start exploration</p>
          </div>
        </div>
      )}
    </div>
  );
};


