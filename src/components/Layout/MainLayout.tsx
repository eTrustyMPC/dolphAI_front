import React from 'react';
import Head from 'next/head';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>DolphAI - Token Analysis</title>
        <meta name="description" content="AI-powered token analysis and insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-[#0A0C10]">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
};
