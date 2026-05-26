import React, { Suspense } from 'react';
import { BudgetProvider } from './context/BudgetContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BudgetProvider>
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-slate-900">Loading...</div>}>
          <AppLayout />
        </Suspense>
      </BudgetProvider>
    </ThemeProvider>
  );
}

export default App;
