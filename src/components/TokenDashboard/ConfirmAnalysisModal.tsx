import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tokenAddress: string;
  isExistingToken: boolean;
}

export const ConfirmAnalysisModal: React.FC<ConfirmAnalysisModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tokenAddress,
  isExistingToken,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-start gap-4 mb-4">
          <AlertCircle className="text-yellow-500 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {isExistingToken ? 'Reanalyze Token?' : 'New Token Analysis'}
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              {isExistingToken
                ? 'This token has been analyzed before. Would you like to perform a new analysis?'
                : 'Would you like to analyze this token?'}
            </p>
            <p className="text-gray-300 text-sm font-mono break-all">{tokenAddress}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            {isExistingToken ? 'Reanalyze' : 'Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};
