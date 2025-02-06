import React from 'react';
import { Globe, MessageSquare } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  date: string;
  type: 'news' | 'social';
  url?: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Latest Updates</h3>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-md hover:bg-gray-800 transition-colors text-purple-500">
            <Globe size={20} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-gray-800 transition-colors text-purple-500">
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {news.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">{item.source}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400">{item.date}</span>
                </div>
              </div>
              {item.type === 'news' ? (
                <Globe size={16} className="text-purple-500 flex-shrink-0 mt-1" />
              ) : (
                <MessageSquare size={16} className="text-purple-500 flex-shrink-0 mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
