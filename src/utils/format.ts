export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (numPrice >= 1) {
    return numPrice.toFixed(2);
  } else if (numPrice >= 0.01) {
    return numPrice.toFixed(4);
  } else {
    return numPrice.toFixed(8);
  }
};

export const formatPriceChange = (change: number | null | undefined): string => {
  if (change === null || change === undefined) return '0%';
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
};
