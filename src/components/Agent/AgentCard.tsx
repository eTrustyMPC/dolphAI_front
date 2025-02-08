import React from 'react';
import Image from 'next/image';
import { InfoIcon } from 'lucide-react';
import { Agent, ValueAgent, ScoringAgent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  isComingSoon?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isComingSoon }) => {
  const isValueAgent = (agent: Agent): agent is ValueAgent => {
    return 'description' in agent;
  };

  const isScoringAgent = (agent: Agent): agent is ScoringAgent => {
    return 'score' in agent && 'indicators' in agent;
  };

  if (isComingSoon) {
    return (
      <div className="relative rounded-lg h-full overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-14 h-14">
            <Image
              src={agent.imageUrl}
              alt={agent.name}
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
            <div className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full w-fit mt-1">
              Score: 8.8
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Indicators Used</h4>
            <div className="flex flex-wrap gap-2">
              <div className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-lg">
                Tokenomics
              </div>
              <div className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-lg">
                Utility Score
              </div>
              <div className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-lg">
                Ecosystem Growth
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">AI Analysis</h4>
            <div className="text-gray-300 space-y-2 text-sm">
              <p>SUI demonstrates strong utility with Move language enabling secure smart contract development and efficient resource management.</p>
              <p>The tokenomics model shows balanced distribution with effective staking mechanisms and validator incentives.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isValueAgent(agent)) {
    return (
      <div className="relative rounded-lg p-4 h-full overflow-hidden">
        <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-14 h-14">
            <Image
              src={agent.imageUrl}
              alt={agent.name}
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="bg-emerald-500/10 rounded-lg p-2">
            <h4 className="text-[10px] font-medium text-emerald-400 mb-1">Analysis Summary</h4>
            <div className="text-gray-300 space-y-2">
              {agent.description.split('. ').map((sentence, index) => (
                <p key={index} className="text-[11px] leading-relaxed">
                  {sentence.trim() + (index < agent.description.split('. ').length - 1 ? '.' : '')}
                </p>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  if (isScoringAgent(agent)) {
    return (
      <div className="relative rounded-lg p-2 h-full overflow-hidden">
        <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image
              src={agent.imageUrl}
              alt={agent.name}
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate mb-1">{agent.name}</h3>
            <div className="flex items-center gap-2">
              <div 
                className={`px-2.5 py-1 rounded relative group inline-flex items-center gap-1.5 ${
                  agent.score >= 7 ? 'bg-emerald-600/90' :
                  agent.score >= 4 ? 'bg-amber-500/90' :
                  'bg-red-600/90'
                }`}
              >
                <span className="text-white/90 font-medium text-sm">Score: {agent.score}</span>
                <InfoIcon className="w-4 h-4 text-white/80 hover:text-white cursor-help transition-colors" />
                
                {/* Tooltip */}
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-0 mb-2 w-64 p-3 bg-[#252A34] rounded-lg shadow-xl z-10">
                  <div className="text-sm text-white">
                    <p className="font-semibold mb-1">Calculation Logic:</p>
                    <p className="text-gray-300">{agent.calculationLogic}</p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-[#252A34] transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-500/10 rounded-lg p-2">
            <h4 className="text-[14px] font-medium text-blue-400 mb-1">Indicators Used</h4>
            <div className="flex flex-wrap gap-x-1 gap-y-0.5">
              {agent.indicators.map((indicator, index) => (
                <div
                  key={index}
                  className="relative group inline-flex items-center"
                >
                  <div className={`px-1 py-0.5 rounded-sm bg-blue-500/20 flex items-center gap-0.5`}>
                    <span className="text-[11px] text-blue-200 leading-none">{indicator.name}</span>
                    <InfoIcon className="w-2.5 h-2.5 text-blue-300/60 group-hover:text-blue-300 cursor-help transition-colors" />
                  </div>
                  
                  {/* Tooltip with score */}
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-0 mb-2 w-48 p-2 bg-[#252A34] rounded-lg shadow-xl z-10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-blue-300">{indicator.name}</span>
                      <span className="text-xs text-blue-200">Score: {indicator.value}</span>
                    </div>
                    <p className="text-[10px] text-gray-300">{indicator.tooltip}</p>
                    {/* Arrow */}
                    <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-[#252A34] transform rotate-45"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 rounded-lg p-2">
            <h4 className="text-[14px] font-medium text-emerald-400 mb-1">AI Analysis</h4>
            <div className="text-gray-300 space-y-2">
              {agent.aiSummary.split('. ').map((sentence, index) => (
                <p key={index} className="text-[12px] leading-relaxed">
                  {sentence.trim() + (index < agent.aiSummary.split('. ').length - 1 ? '.' : '')}
                </p>
              ))}
            </div>
          </div>

          {agent.links.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {agent.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {link.text} →
                </a>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }

  return null;
};
