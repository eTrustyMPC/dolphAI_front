import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { MainLayout } from '../components/Layout/MainLayout';

// Dynamically import AgentDashboard with no SSR to avoid hydration issues
const AgentDashboard = dynamic(
  () => import('../components/Agent/AgentDashboard').then(mod => mod.AgentDashboard),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <MainLayout>
      <AgentDashboard />
    </MainLayout>
  );
};

export default Home;
