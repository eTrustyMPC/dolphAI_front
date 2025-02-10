import React from 'react';
import Image from 'next/image';

interface PerpsPlatformProps {
  onPlatformClick: (url: string) => void;
}

const platform = {
  id: 1,
  name: 'Bluefin',
  icon: '/images/projects/bluefin.png',
  network: 'SUI',
  type: 'PERPS',
  description: 'Decentralized Perpetual Exchange on Sui Network',
  url: 'https://trade.bluefin.io',
};

export const PerpsPlatform: React.FC<PerpsPlatformProps> = ({ onPlatformClick }) => {
  return (
    <div className="flex justify-center items-center h-full p-6">
      <button
        onClick={() => onPlatformClick(platform.url)}
        className="flex flex-col gap-3 p-5 bg-[#0B1018] rounded-2xl hover:bg-gray-800/30 transition-colors text-left group border border-gray-800/50 w-full max-w-md"
      >
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12 bg-gray-800/50 rounded-xl overflow-hidden">
            <Image
              src={platform.icon}
              alt={platform.name}
              fill
              className="object-contain p-2.5 hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
              <span>{platform.network}</span>
              <div className="h-3 border-l border-gray-700" />
              <span>{platform.type}</span>
              <div className="ml-2 text-xs text-gray-500">
                #{platform.id}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-100 group-hover:text-primary-400 transition-colors">
              {platform.name}
            </h3>
          </div>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {platform.description}
        </p>
      </button>
    </div>
  );
};
