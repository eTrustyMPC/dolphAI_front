export const formatNumber = (num: number | undefined, options?: {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  compactDisplay?: 'short' | 'long';
}) => {
  if (num === undefined) return '-';

  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    notation = 'compact',
    compactDisplay = 'short'
  } = options || {};

  try {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits,
      maximumFractionDigits,
      notation,
      compactDisplay,
    }).format(num);
  } catch (error) {
    console.error('Error formatting number:', error);
    return num.toString();
  }
};
