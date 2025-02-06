import React from 'react';
import { CustomWalletContextType } from '@/contexts/WalletContext';
import { Token } from '@/components/TokenPreview/types';
import { TokenPreviewCard } from '@/components/TokenPreview/TokenPreviewCard';

interface PreviewSectionProps {
  showPreview: boolean;
  selectedToken: Token | null;
  handleClosePreview: () => void;
  handleAnalyzeToken: (token: Token) => void;
  wallet: CustomWalletContextType;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  showPreview,
  selectedToken,
  handleClosePreview,
  handleAnalyzeToken,
  wallet,
}) => {
  if (!showPreview || !selectedToken) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6 relative">
        <TokenPreviewCard
          token={selectedToken}
          isDashboard={true}
          isWalletConnected={wallet.isInitialized}
          onClose={handleClosePreview}
          onAnalyze={() => handleAnalyzeToken(selectedToken)}
          disableAnalyze={!wallet.isInitialized}
          isWatched={false}
          onToggleWatch={undefined}
        />
      </div>
    </div>
  );
};
