interface CetusSwapConfig {
  containerId: string;
  independentWallet?: boolean;
  displayMode?: 'Integrated' | 'Standalone';
  theme?: 'dark' | 'light';
  defaultSlippage?: number;
  walletSigner?: any;
  hideHeader?: boolean;
  hideVolume?: boolean;
  hideFooter?: boolean;
  hideSlippageSettings?: boolean;
}

interface CetusSwap {
  init: (config: CetusSwapConfig) => void;
}

interface Window {
  CetusSwap: CetusSwap;
}
