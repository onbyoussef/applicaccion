import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DailyAreaChart = ({ data = [] }) => {
  if (data.length === 0) {
    return (
      <div className="w-full h-64 bg-slate-700 dark:bg-slate-700 rounded-lg flex items-center justify-center">
        <p className="text-slate-400">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="day" stroke="#94A3B8" />
        <YAxis stroke="#94A3B8" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#FFF' }}
        />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#4F46E5" 
          fillOpacity={1} 
          fill="url(#colorAmount)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailyAreaChart;
