import React, { useRef, useEffect } from 'react';
import { Star, Globe, MessageSquare, FileText, ExternalLink, Copy, Check, X } from 'lucide-react';
import { TokenCardData } from '../TokenCard/types';
import Image from 'next/image';

interface WatchlistPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  watchedTokens?: TokenCardData[];
  onTokenSelect?: (token: TokenCardData) => void;
  onRemoveToken?: (token: TokenCardData) => void;
  isWalletConnected?: boolean;
}

export const WatchlistPanel: React.FC<WatchlistPanelProps> = ({
  isOpen,
  onToggle,
  watchedTokens = [],
  onTokenSelect,
  onRemoveToken,
  isWalletConnected = false
}) => {
  const [copiedAddress, setCopiedAddress] = React.useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const toggleButton = document.querySelector('[aria-label="Close watchlist"]');
      
      if (!isOpen) return;
      
      // Don't close if clicking the toggle button
      if (toggleButton && toggleButton.contains(target)) return;
      
      // Close if clicking outside the panel
      if (panelRef.current && !panelRef.current.contains(target)) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="relative">
      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-[64px] bottom-0 bg-[#151820] border-l border-blue-500/30 transition-all duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '320px' }}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={`absolute left-0 top-4 -translate-x-full bg-[#151820] border border-blue-500/30 rounded-l-xl p-2 hover:bg-[#252A34] transition-colors ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label={isOpen ? 'Close watchlist' : 'Open watchlist'}
        >
          <Star 
            className={`h-5 w-5 ${isOpen ? 'text-yellow-400 fill-yellow-400 stroke-yellow-400' : 'text-yellow-400 hover:text-yellow-500'}`} 
          />
        </button>

        {/* Panel Content */}
        <div className="p-4 border-b border-blue-500/30">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Watchlist</h2>
          </div>

          {!isWalletConnected ? (
            <div className="text-center py-12 px-4">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-white font-medium mb-2 text-lg">
                Connect your wallet to enable watchlist
              </p>
              <p className="text-gray-400 text-sm">
                Track and monitor your favorite tokens
              </p>
            </div>
          ) : watchedTokens.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" fill="currentColor" />
              <p className="text-white font-medium mb-2 text-lg">
                Your watchlist is empty
              </p>
              <p className="text-gray-400 text-sm">
                Click the star icon on any token to add it here
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto px-2">
                {watchedTokens.map((token) => (
                  <div 
                    key={token.address} 
                    className="group p-4 bg-[#0B1018] hover:bg-[#151820] rounded-xl transition-colors relative border border-blue-500/20 cursor-pointer"
                    onClick={() => onTokenSelect?.(token)}
                  >
                    {/* Remove Button */}
                    {onRemoveToken && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveToken(token);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#0B1018] hover:bg-red-900/30 hover:text-red-400 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Remove from watchlist"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    <div className="flex flex-col space-y-3">
                      {/* Token Info */}
                      <div className="flex items-center space-x-3">
                        {token.icon && (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={token.icon}
                              alt={token.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{token.name}</span>
                          <span className="text-sm text-gray-400">{token.symbol}</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 font-mono truncate max-w-[180px]">
                          {token.address.slice(0, 6)}...{token.address.slice(-4)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyAddress(token.address);
                          }}
                          className="p-1 hover:bg-[#252A34] rounded transition-colors"
                          title="Copy address"
                        >
                          {copiedAddress === token.address ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-400">
                        {token.description || 'No description available'}
                      </p>

                      {/* Links */}
                      <div className="flex items-center space-x-2">
                        {token.links?.website && (
                          <a 
                            href={token.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-[#252A34] rounded transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Website"
                          >
                            <Globe className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                        {token.links?.telegram && (
                          <a 
                            href={token.links.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-[#252A34] rounded transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Telegram"
                          >
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                        {token.links?.whitepaper && (
                          <a 
                            href={token.links.whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-[#252A34] rounded transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Whitepaper"
                          >
                            <FileText className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                        {token.links?.explorer && (
                          <a 
                            href={token.links.explorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-[#252A34] rounded transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Explorer"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
