import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar';

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
        <Navbar />
        <main className="min-h-screen pt-14">
          {children}
        </main>
      </div>
    </>
  );
};
