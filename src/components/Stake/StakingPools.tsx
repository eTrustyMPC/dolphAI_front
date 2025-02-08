import React from 'react';
import Image from 'next/image';

interface Pool {
  id: string;
  name: string;
  projectName: string;
  projectIcon: string;
  tvl: number;
  baseApy: number;
  apy: number;
  avgApy30d: number;
}

interface StakingPoolsProps {
  pools: Pool[];
  onProjectClick: (projectName: string) => void;
}

export const StakingPools: React.FC<StakingPoolsProps> = ({ pools, onProjectClick }) => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="w-full h-full bg-[#0B1018] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 text-sm text-gray-400 bg-[#0B1018] border-b border-gray-800/50 sticky top-0 z-10">
        <div className="col-span-2">Pool</div>
        <div>Project</div>
        <div className="text-right">TVL</div>
        <div className="grid grid-cols-3 gap-2 col-span-2">
          <div className="text-right">APY</div>
          <div className="text-right">Base APY</div>
          <div className="text-right">30d Avg APY</div>
        </div>
      </div>

      {/* Pool List */}
      <div className="flex-1 overflow-y-auto">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="grid grid-cols-6 gap-4 px-6 py-4 text-sm hover:bg-gray-800/30 transition-colors border-b border-gray-800/20"
          >
            <div className="col-span-2 text-gray-100 font-medium">
              <span className="text-gray-500 inline-block w-8">{pool.id}</span>
              {pool.name}
            </div>
            <button
              onClick={() => onProjectClick(pool.projectName)}
              className="flex items-center gap-2 text-gray-100 hover:text-blue-400 transition-colors group"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={pool.projectIcon}
                  alt={pool.projectName}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="font-medium group-hover:text-blue-400 transition-colors">{pool.projectName}</span>
            </button>
            <div className="text-right text-gray-100 font-medium">{formatCurrency(pool.tvl)}</div>
            <div className="grid grid-cols-3 gap-2 col-span-2">
              <div className="text-right text-emerald-400 font-medium">
                {formatPercentage(pool.apy)}
              </div>
              <div className="text-right text-gray-100 font-medium">
                {formatPercentage(pool.baseApy)}
              </div>
              <div className="text-right text-gray-100 font-medium">
                {formatPercentage(pool.avgApy30d)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
