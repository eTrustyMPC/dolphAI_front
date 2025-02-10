import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const AgentDashboard = dynamic(
  () => import('./pages/agent-dashboard').then(mod => mod.AgentDashboard),
  { ssr: false }
);

const App: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === '/') {
      router.push('/agent');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0C10]">
      {router.pathname === '/agent' && <AgentDashboard />}
    </div>
  );
};

export default App;
