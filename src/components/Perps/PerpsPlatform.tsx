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
          <div className="relative w-8 h-8">
            <Image
              src={platform.icon}
              alt={platform.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
            <span>{platform.network}</span>
            <div className="h-3 border-l border-gray-700" />
            <span>{platform.type}</span>
          </div>
          <div className="ml-auto text-xs text-gray-500">
            #{platform.id}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
            {platform.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {platform.description}
          </p>
        </div>
      </button>
    </div>
  );
};
