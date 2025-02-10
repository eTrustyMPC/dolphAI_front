import React from 'react';
import { TrendingUp, Globe, MessageSquare, FileText, ExternalLink, Clock, AlertCircle, CheckCircle, Info, Newspaper, Users, Activity, PieChart, ArrowUpRight, ArrowDownRight, Wallet, ChevronDown, ChevronRight, X, Star } from 'lucide-react';
import { Token, TokenUpdate } from './types';
import { CustomConnectButton } from '../CustomConnectButton';

interface TokenPreviewCardProps {
  token?: Token | null;
  isDashboard?: boolean;
  isWalletConnected?: boolean;
  onConnectSuccess?: () => void;
  onConnectError?: (error: Error) => void;
  onClose?: () => void;
  onAnalyze?: () => void;
  disableAnalyze?: boolean;
  isWatched?: boolean;
  onToggleWatch?: () => void;
}

const UpdateIcon = ({ type }: { type: TokenUpdate['type'] }) => {
  switch (type) {
    case 'warning':
      return <AlertCircle className="text-yellow-400" size={16} />;
    case 'success':
      return <CheckCircle className="text-green-400" size={16} />;
    default:
      return <Info className="text-blue-400" size={16} />;
  }
};

const MarketInfoCard = ({ title, value, change }: { title: string; value: string; change: string }) => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg hover-glow transition-all duration-300 hover:bg-gray-700">
      <p className="text-sm text-gray-400 animate-slide-in">{title}</p>
      <p className="text-lg font-semibold animate-slide-in" style={{animationDelay: '0.1s'}}>{value}</p>
      <div className="flex items-center gap-1 text-green-400 animate-slide-in" style={{animationDelay: '0.2s'}}>
        <TrendingUp size={16} className="animate-float" />
        <span className="text-sm">{change}</span>
      </div>
    </div>
  );
};

export const TokenPreviewCard: React.FC<TokenPreviewCardProps> = ({ 
  token = null, 
  isDashboard = false,
  isWalletConnected = false,
  onConnectSuccess,
  onConnectError,
  onClose,
  onAnalyze,
  disableAnalyze = false,
  isWatched = false,
  onToggleWatch,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  if (!token) {
    return null;
  }

  const formatNumber = (num?: number) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    return `${diffInHours} hours ago`;
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6 animate-slide-in hover-glow">
      {/* Header Section with Collapse/Close Controls */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-gray-500 hover:text-purple-400 transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <img src={token.icon} alt={token.name} className="w-10 h-10 rounded-full animate-float" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold hover-scale">{token.name}</h2>
                <span className="text-sm font-medium text-gray-400 animate-pulse-fast">{token.symbol}</span>
                {onToggleWatch && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatch();
                    }}
                    className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                    title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    <Star className={`h-4 w-4 ${isWatched ? 'text-yellow-500 fill-yellow-500 animate-scale' : 'text-gray-400 hover-scale'}`} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-400">{token.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {onAnalyze && !disableAnalyze && (
            <button
              onClick={onAnalyze}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors hover-glow animate-pulse-fast"
            >
              <TrendingUp className="w-4 h-4" />
              Analyze
            </button>
          )}
          <div className="flex items-center gap-2 border-r border-gray-800 pr-3 mr-3">
            {token.links.website && (
              <a 
                href={token.links.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {token.links.telegram && (
              <a 
                href={token.links.telegram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Telegram"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            )}
            {token.links.whitepaper && (
              <a 
                href={token.links.whitepaper} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Whitepaper"
              >
                <FileText className="w-4 h-4" />
              </a>
            )}
            {token.links.explorer && (
              <a 
                href={token.links.explorer} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Market Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            <MarketInfoCard
              title="Price"
              value={`$${token.price}`}
              change={token.priceChange24h ? `+${token.priceChange24h}%` : 'N/A'}
            />
            <MarketInfoCard
              title="Market Cap"
              value={`$${formatNumber(token.marketCap)}`}
              change={token.marketCapChange}
            />
            <MarketInfoCard
              title="Volume (24h)"
              value={`$${formatNumber(token.volume24h)}`}
              change={token.volumeChange24h}
            />
            <MarketInfoCard
              title="Market Cap"
              value={`$${formatNumber(token.marketCap)}`}
              change={token.marketCapChange}
            />
            <MarketInfoCard
              title="Holders"
              value={formatNumber(token.holders)}
              change={token.dynamics?.weeklyHolderChange?.toString() + '%' || '0%'}
            />
            <MarketInfoCard
              title="Weekly Txs"
              value={formatNumber(token.dynamics?.weeklyTxCount)}
              change={token.dynamics?.weeklyVolumeChange?.toString() + '%' || '0%'}
            />
          </div>

          {/* Value Proposition and AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {token.valueProp && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={18} className="text-purple-400" />
                  <h4 className="text-sm font-semibold">Value Proposition</h4>
                </div>
                <p className="text-sm text-gray-300">{token.valueProp}</p>
              </div>
            )}

            {token.llmSummary && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={18} className="text-purple-400" />
                  <h4 className="text-sm font-semibold">AI Analysis</h4>
                </div>
                <p className="text-sm text-gray-300">{token.llmSummary}</p>
              </div>
            )}
          </div>

          {/* Connect Wallet Promo */}
          {!isWalletConnected && onConnectSuccess && onConnectError && (
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 mb-4">
              <div className="text-center">
                <h4 className="text-base font-semibold mb-2">Get More Insights</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Connect your wallet to get <span className="text-purple-400 font-medium">DETAILED</span> analytics about {token.name} and to find <span className="text-purple-400 font-medium">BEST</span> staking opportunities and loan options
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  <a 
                    href="https://bluefin.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className="p-1 bg-blue-500/10 rounded">
                      <TrendingUp className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-xs font-medium group-hover:text-blue-400 transition-colors">Bluefin</span>
                  </a>

                  <a 
                    href="https://suilend.fi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className="p-1 bg-green-500/10 rounded">
                      <FileText className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-xs font-medium group-hover:text-green-400 transition-colors">SuiLend</span>
                  </a>

                  <a 
                    href="https://app.naviprotocol.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className="p-1 bg-yellow-500/10 rounded">
                      <FileText className="h-3 w-3 text-yellow-400" />
                    </div>
                    <span className="text-xs font-medium group-hover:text-yellow-400 transition-colors">Navi</span>
                  </a>

                  <a 
                    href="https://app.turbos.finance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className="p-1 bg-red-500/10 rounded">
                      <TrendingUp className="h-3 w-3 text-red-400" />
                    </div>
                    <span className="text-xs font-medium group-hover:text-red-400 transition-colors">Turbo</span>
                  </a>
                </div>

                <CustomConnectButton 
                  onSuccess={onConnectSuccess}
                  onError={onConnectError}
                />
              </div>
            </div>
          )}

          {/* Updates and News */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {token.recentUpdates && token.recentUpdates.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} className="text-purple-400" />
                  <h4 className="text-sm font-semibold">On-Chain Updates</h4>
                </div>
                <div className="space-y-2">
                  {token.recentUpdates.slice(0, 3).map((update, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <UpdateIcon type={update.type} />
                      <div>
                        <p className="text-gray-300">{update.message}</p>
                        <p className="text-gray-500 text-xs">{formatTimeAgo(update.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {token.recentArticles && token.recentArticles.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Newspaper size={18} className="text-purple-400" />
                  <h4 className="text-sm font-semibold">Latest News</h4>
                </div>
                <div className="space-y-2">
                  {token.recentArticles.slice(0, 3).map((article, index) => (
                    <a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white group text-sm"
                    >
                      <ExternalLink size={14} className="group-hover:text-purple-400" />
                      <span className="line-clamp-1">{article.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
