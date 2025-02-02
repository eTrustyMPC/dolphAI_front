import '@suiet/wallet-kit/style.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import ClientOnly from '@/components/ClientOnly'
import { WalletProvider } from '@suiet/wallet-kit'

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

export default function App({ Component, pageProps }: AppProps) {
  console.log('App: Rendering');
  
  return (
    <div className="wkit-dark">
      <ClientOnly>
        <WalletProvider>
          <CustomWalletProvider>
            <Component {...pageProps} />
          </CustomWalletProvider>
        </WalletProvider>
      </ClientOnly>
    </div>
  )
}
