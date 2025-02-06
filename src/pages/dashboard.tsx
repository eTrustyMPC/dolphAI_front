import React from 'react';
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';
import { mockDashboardData } from '@/data/mockDashboardData';
import { Navbar } from '@/components/Navbar';
import { useWallet } from '@suiet/wallet-kit';
import { useCustomWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/router';

const TokenDashboard = dynamic(
  () => import('@/components/TokenDashboard/TokenDashboard').then(mod => ({ default: mod.TokenDashboard })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-6 bg-gray-900 rounded-lg">
        <Loader className="w-6 h-6 text-purple-500 animate-spin" />
      </div>
    )
  }
);

export default function DashboardPage() {
  const router = useRouter();
  const wallet = useWallet();
  const customWallet = useCustomWallet();

  React.useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    // Check wallet connection
    const wasConnected = localStorage.getItem('walletConnected');
    
    if (!wasConnected || !wallet.connected || !wallet.address) {
      router.push('/token-preview');
    }
  }, [wallet.connected, wallet.address, router]);

  if (!customWallet.isInitialized || customWallet.isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-purple-500 animate-spin" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pt-20">
        <TokenDashboard data={mockDashboardData} />
      </main>
    </div>
  );
}
