import React from 'react';
import { useTheme } from '../../hooks/useTheme.js';
import { Moon, Sun } from 'lucide-react';
import Button from '../common/Button.jsx';

const Header = ({ title, subtitle = '', showThemeToggle = false }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="bg-slate-800 dark:bg-slate-800 border-b border-slate-700 dark:border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>
          {showThemeToggle && (
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
