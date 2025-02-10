import React from 'react';
import { useRouter } from 'next/router';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Bubbles } from '@/components/Bubbles/Bubbles';

const TokenPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      <Bubbles count={12} opacity={0.04} maxSize={70} minDuration={22} maxDuration={42} />
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to search
          </Link>
          <button
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            onClick={() => {
              // Add analyze functionality here
            }}
          >
            <TrendingUp className="h-5 w-5" />
            Analyze token
          </button>
        </div>

        {/* Token Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/placeholder-token.png" 
                  alt="Token"
                  className="w-16 h-16 rounded-full bg-gray-800"
                />
                <div>
                  <h1 className="text-2xl font-bold mb-2">Token Name</h1>
                  <p className="text-gray-400 font-mono text-sm">{address}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-400">
                    Token description will be displayed here...
                  </p>
                </div>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Analytics</h2>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                Chart placeholder
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-1">Price</p>
                  <p className="text-2xl font-bold">$0.00</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">24h Volume</p>
                  <p className="text-2xl font-bold">$0.00</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Market Cap</p>
                  <p className="text-2xl font-bold">$0.00</p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Links</h2>
              <div className="space-y-2">
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Website
                </a>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Explorer
                </a>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
