import React, { useState, Suspense, lazy } from 'react';
import { useTheme } from '../../hooks/useTheme.js';
import { useBudget } from '../../hooks/useBudget.js';
import BottomNav from './BottomNav.jsx';
import AddTransactionForm from '../forms/AddTransactionForm.jsx';
import LoadingSkeleton from '../common/LoadingSkeleton.jsx';

const Home = lazy(() => import('../../pages/Home.jsx'));
const Transactions = lazy(() => import('../../pages/Transactions.jsx'));
const Analytics = lazy(() => import('../../pages/Analytics.jsx'));
const Budgets = lazy(() => import('../../pages/Budgets.jsx'));
const Settings = lazy(() => import('../../pages/Settings.jsx'));
const Onboarding = lazy(() => import('../../pages/Onboarding.jsx'));

const LoadingFallback = () => (
  <div className="p-4 space-y-4">
    <LoadingSkeleton height="h-32" />
    <LoadingSkeleton height="h-32" />
    <LoadingSkeleton height="h-32" />
  </div>
);

const AppLayout = () => {
  const [activePage, setActivePage] = useState('home');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const { isFirstRun, isLoading } = useBudget();
  const { isDark } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (isFirstRun) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <Suspense fallback={<LoadingFallback />}>
          <Onboarding onComplete={() => setActivePage('home')} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Suspense fallback={<LoadingFallback />}>
        {activePage === 'home' && <Home onAddTransaction={() => setIsAddTransactionOpen(true)} />}
        {activePage === 'transactions' && <Transactions onAddTransaction={() => setIsAddTransactionOpen(true)} />}
        {activePage === 'analytics' && <Analytics />}
        {activePage === 'budgets' && <Budgets />}
        {activePage === 'settings' && <Settings />}
      </Suspense>
      
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
      
      {/* Add Transaction Modal */}
      <AddTransactionForm 
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
