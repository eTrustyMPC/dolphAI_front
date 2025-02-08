import React from 'react';
import { Globe, FileText, Check, Twitter, MessageCircle, ExternalLink, Copy, Star } from 'lucide-react';
import { Token } from '@/components/TokenPreview/types';
import { formatNumber } from '@/utils/formatNumber';

interface TokenInfoProps {
  token: Token;
  watchlist: string[];
  copiedAddress: string;
  onToggleWatchlist: (address: string) => void;
  handleCopyAddress: (address: string) => void;
  isWalletConnected: boolean;
}

export const TokenInfo: React.FC<TokenInfoProps> = ({ 
  token,
  watchlist,
  copiedAddress,
  onToggleWatchlist,
  handleCopyAddress,
  isWalletConnected
}) => {
  return (
    <div>
      {/* Token Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <div className="text-2xl font-bold text-blue-400">{token.symbol?.[0]}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{token.name}</h2>
            <div className="flex flex-col gap-0.5 mt-0.5">
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400">{token.symbol}</div>
                <div className="flex items-center gap-1.5">
                <a
                  href={`https://etherscan.io/token/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleCopyAddress(token.address)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {copiedAddress === token.address ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`https://twitter.com/search?q=${token.symbol}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://t.me/s/${token.symbol.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
              </div>
              <div className="text-xs text-gray-500 font-mono">{token.address}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {token.links?.website && (
            <a
              href={token.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
          {token.links?.whitepaper && (
            <a
              href={token.links.whitepaper}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => onToggleWatchlist(token.address)}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            {watchlist.includes(token.address) ? (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-3">
        <div className="text-xl font-bold flex items-center gap-2">
          ${token.price}
          <span className="text-red-500 text-sm">{token.marketCapChange}</span>
        </div>
      </div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-800/50 rounded-lg p-2.5">
          <div className="text-gray-400 text-xs mb-0.5">Market cap</div>
          <div className="text-sm font-semibold">${token.marketCap || '0'}T</div>
          <div className="text-xs text-red-500">{token.marketCapChange}</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2.5">
          <div className="text-gray-400 text-xs mb-0.5">Volume (24h)</div>
          <div className="text-sm font-semibold">${token.volume24h || '0'}B</div>
          <div className="text-xs text-red-500">{token.volumeChange24h}</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2.5">
          <div className="text-gray-400 text-xs mb-0.5">FDV</div>
          <div className="text-sm font-semibold">${token.fdv || '0'}T</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2.5">
          <div className="text-gray-400 text-xs mb-0.5">Vol/Mkt Cap</div>
          <div className="text-sm font-semibold">{token.volMktCap || '0'}%</div>
        </div>
      </div>

      {/* Supply Info */}
      <div className="bg-gray-800/50 rounded-lg p-2.5 space-y-1.5">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">Total supply</div>
          <div className="text-sm font-semibold">{token.totalSupply || '0'}M {token.symbol}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">Max. supply</div>
          <div className="text-sm font-semibold">{token.maxSupply || '0'}M {token.symbol}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">Circulating supply</div>
          <div className="text-sm font-semibold flex items-center gap-1.5">
            {token.circulatingSupply || '0'}M {token.symbol}
            <span className="text-blue-400">✓</span>
          </div>
        </div>
      </div>


    </div>
  );
};


