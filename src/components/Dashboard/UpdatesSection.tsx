import React from 'react';
import { Newspaper, Clock, AlertTriangle, Info } from 'lucide-react';

interface UpdatesSectionProps {
  className?: string;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ className = '' }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 ${className}`}>
      {/* Latest News */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-3">
        <div className="flex items-center gap-2 mb-3">
          <Newspaper className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-semibold text-white">Latest News</h3>
        </div>
        <div className="space-y-3">
          <a href="#" className="block group">
            <div className="flex items-start gap-2">
              <div className="p-1">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                  Sui Network Announces Major Protocol Upgrade
                </h4>
              </div>
            </div>
          </a>
          <a href="#" className="block group">
            <div className="flex items-start gap-2">
              <div className="p-1">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                  New Partnerships Drive Sui Ecosystem Growth
                </h4>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* On-Chain Updates */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-3">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-semibold text-white">On-Chain Updates</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-200">
                Significant holder distribution change detected
              </div>
              <div className="text-xs text-gray-400">2 hours ago</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-200">
                New contract interaction pattern identified
              </div>
              <div className="text-xs text-gray-400">4 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
