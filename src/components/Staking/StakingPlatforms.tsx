import React from 'react';
import Image from 'next/image';

interface Platform {
  id: number;
  name: string;
  icon: string;
  network: string;
  type: string;
  description: string;
  url: string;
}

interface StakingPlatformsProps {
  onPlatformClick: (url: string) => void;
}

const platforms: Platform[] = [
  {
    id: 1,
    name: 'SuiLend',
    icon: '/images/projects/suilend.png',
    network: 'SUI',
    type: 'STAKING',
    description: 'Decentralised Sui staking protocol',
    url: 'https://suilend.fi/',
  },
  {
    id: 2,
    name: 'Cetus',
    icon: '/images/projects/cetus.png',
    network: 'SUI',
    type: 'STAKING',
    description: 'Sui liquidity staking and yield farming',
    url: 'https://www.cetus.zone/',
  },
  {
    id: 3,
    name: 'Bluefin',
    icon: '/images/projects/bluefin.png',
    network: 'SUI',
    type: 'STAKING',
    description: 'Decentralized staking platform on Sui Network',
    url: 'https://trade.bluefin.io',
  },
  {
    id: 4,
    name: 'Scallop',
    icon: '/images/projects/scallop.png',
    network: 'SUI',
    type: 'STAKING',
    description: 'An #FHE Lending Layer for PoS and #AI Networks',
    url: 'https://app.scallop.io/',
  },
];

export const StakingPlatforms: React.FC<StakingPlatformsProps> = ({ onPlatformClick }) => {
  return (
    <div className="flex justify-center items-center min-h-[520px] p-6">
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onPlatformClick(platform.url)}
          className="flex flex-col gap-3 p-5 bg-[#0B1018] rounded-2xl hover:bg-gray-800/30 transition-colors text-left group border border-gray-800/50 h-full"
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
      ))}
      </div>
    </div>
  );
};
