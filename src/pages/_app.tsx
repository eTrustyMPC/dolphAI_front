import '@suiet/wallet-kit/style.css'
import '@/styles/globals.css'
import '@/styles/scrollbar.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const DynamicWalletProvider = dynamic(
  () => import('@suiet/wallet-kit').then(mod => mod.WalletProvider),
  { ssr: false }
);

const DynamicCustomWalletProvider = dynamic(
  () => import('@/contexts/WalletContext'),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="wkit-dark">
      <DynamicWalletProvider>
        <DynamicCustomWalletProvider>
          <Component {...pageProps} />
        </DynamicCustomWalletProvider>
      </DynamicWalletProvider>
    </div>
  )
}
