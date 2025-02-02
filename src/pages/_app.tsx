import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '@suiet/wallet-kit/style.css'
import ClientOnly from '@/components/ClientOnly'

const WalletKitProvider = dynamic(
  () => import('@suiet/wallet-kit').then((mod) => {
    console.log('App: WalletKitProvider loaded');
    return mod.WalletProvider;
  }),
  { 
    ssr: false,
    loading: () => <div>Loading wallet provider...</div>
  }
);

const CustomWalletProvider = dynamic(
  () => import('@/contexts/WalletContext').then((mod) => {
    console.log('App: CustomWalletProvider loaded');
    return mod.CustomWalletProvider;
  }),
  { 
    ssr: false,
    loading: () => <div>Loading wallet context...</div>
  }
);

const config = {
  chainId: "sui:mainnet",
  supportedWallets: ['Sui Wallet'],
  autoConnect: false,
  dark: true
};

export default function App({ Component, pageProps }: AppProps) {
  console.log('App: Rendering');
  
  return (
    <ClientOnly>
      <WalletKitProvider config={config}>
        <CustomWalletProvider>
          <Component {...pageProps} />
        </CustomWalletProvider>
      </WalletKitProvider>
    </ClientOnly>
  )
}
