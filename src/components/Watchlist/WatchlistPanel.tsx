import React, { useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Globe, Twitter, MessageSquare, Copy, Check, X } from 'lucide-react';
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
        className={`fixed right-0 top-[64px] bottom-0 bg-gray-900 border-l border-gray-800 transition-all duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '320px' }}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={`absolute left-0 top-4 -translate-x-full bg-gray-900 border border-gray-800/50 rounded-l-xl p-2 hover:bg-gray-800/50 transition-colors ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label={isOpen ? 'Close watchlist' : 'Open watchlist'}
        >
          <Star 
            className={`h-5 w-5 ${isOpen ? 'text-yellow-400 fill-yellow-400 stroke-yellow-400' : 'text-yellow-400 hover:text-yellow-500'}`} 
          />
        </button>

      {/* Panel Content */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Watchlist</h2>
        </div>

        {!isWalletConnected ? (
          <div className="text-center py-8 px-4">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-gray-300 font-medium mb-1">
              Connect your wallet to enable watchlist
            </p>
            <p className="text-gray-500 text-sm">
              Track and monitor your favorite tokens
            </p>
          </div>
        ) : watchedTokens.length === 0 ? (
          <div className="text-center py-8 px-4">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" fill="currentColor" />
            <p className="text-gray-300 font-medium mb-1">
              Your watchlist is empty
            </p>
            <p className="text-gray-500 text-sm">
              Click the star icon on any token to add it here
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto px-2">
            {watchedTokens.map((token) => (
              <div key={token.address} className="group p-4 bg-gray-900/40 hover:bg-gray-800/50 rounded-xl transition-colors relative border border-gray-800/50">
                {/* Remove Button */}
                {onRemoveToken && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveToken(token);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-900/80 hover:bg-red-500/20 hover:text-red-400 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Remove from watchlist"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <div className="flex items-center gap-3 mb-2">
                  {token.icon && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={token.icon}
                        alt={token.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTokenSelect?.(token)}
                        className="text-base font-medium text-white hover:text-purple-400 transition-colors"
                      >
                        {token.name}
                      </button>
                      <span className="text-sm text-gray-400 ml-1">{token.symbol}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span>{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAddress(token.address);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Copy address"
                      >
                        {copiedAddress === token.address ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Token Stats */}
                {token.description && (
                  <div className="text-sm text-gray-500 mt-3 mb-3 line-clamp-2">
                    {token.description}
                  </div>
                )}

                {/* Social Links */}
                <div className="flex items-center gap-3 text-gray-400">
                  {token.links?.website && (
                    <a
                      href={token.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-gray-800/80 rounded-lg transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {token.links?.twitter && (
                    <a
                      href={token.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-gray-800/80 rounded-lg transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {token.links?.discord && (
                    <a
                      href={token.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-gray-800/80 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
        </div>
      </div>
      
      {/* Fixed Toggle Button when panel is closed */}
      <button
        onClick={onToggle}
        className={`fixed right-0 top-[80px] bg-gray-900 border-t border-l border-b border-gray-800/50 rounded-l-xl p-2 hover:bg-gray-800/50 transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
        aria-label="Open watchlist"
      >
        <div className="flex items-center gap-2">
          <Star 
            className="h-5 w-5 text-yellow-400 hover:text-yellow-500"
          />
          <span className="text-sm text-gray-400">Watchlist</span>
        </div>
      </button>
    </div>
  );
};
