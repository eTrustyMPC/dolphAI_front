import React from 'react';
import { Activity } from 'lucide-react';

interface ValueAgentProps {
  data: {
    mcCap: string;
    supply: string;
    price: string;
    description: string;
  };
}

export const ValueAgent: React.FC<ValueAgentProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-purple-500" size={20} />
        <h3 className="text-lg font-medium">Value Agent</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
            <div className="font-medium">{data.mcCap}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Supply</div>
            <div className="font-medium">{data.supply}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Price</div>
            <div className="font-medium">{data.price}</div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm text-gray-400 mb-2">On-Chain Description</h4>
          <p className="text-sm">{data.description}</p>
        </div>
      </div>
    </div>
  );
};
