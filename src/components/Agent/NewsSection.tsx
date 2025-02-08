import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { NewsItem } from '@/types/agent';

interface TokenInfo {
  name: string;
  address: string;
  symbol: string;
}

const getSentimentClass = (sentiment: 'positive' | 'negative' | 'neutral') => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-500/20 text-green-300';
    case 'negative':
      return 'bg-red-500/20 text-red-300';
    case 'neutral':
      return 'bg-gray-500/20 text-gray-300';
    default:
      return '';
  }
};

interface Props {
  token: TokenInfo | null;
  news?: NewsItem[];
}

export const NewsSection: React.FC<Props> = ({ token, news }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-3">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="w-5 h-5 text-purple-400" />
        <h3 className="text-base font-semibold text-white">Latest {token?.name} News</h3>
      </div>
      <div className="space-y-3">
        {/* Dynamic news items */}
        {news?.map((item) => (
          <a 
            key={item.id}
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group hover:bg-blue-500/5 rounded-lg p-2 -mx-2 transition-colors"
          >
            <div className="flex items-start gap-2">
              <div className="p-1">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white shrink-0 mt-0.5" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-400">{item.source}</p>
                  <span className="text-xs text-gray-500">•</span>
                  <p className="text-xs text-gray-400">{item.date}</p>
                  {item.sentiment && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getSentimentClass(item.sentiment)}`}>
                      {item.sentiment}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
