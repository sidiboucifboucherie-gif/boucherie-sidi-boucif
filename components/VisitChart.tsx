import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VISIT_DATA } from '../constants';

const VisitChart: React.FC = () => {
  return (
    <div className="w-full h-64">
      <h4 className="text-burgundy-800 font-bold mb-4 flex items-center text-sm uppercase tracking-wide">
        Affluence Moyenne
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={VISIT_DATA}>
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#666', fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="visitors" radius={[4, 4, 0, 0]}>
            {VISIT_DATA.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.visitors > 75 ? '#d4af37' : '#e5e7eb'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-2 text-center italic">
        * Les barres dorées indiquent les heures de pointe.
      </p>
    </div>
  );
};

export default VisitChart;