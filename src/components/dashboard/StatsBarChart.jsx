import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const StatsBarChart = ({ data }) => {
  const chartData = [
    { name: 'Companies', value: data.companies, color: '#2E7D32' },
    { name: 'Offers', value: data.offers, color: '#43A047' },
    { name: 'Students', value: data.students, color: '#66BB6A' }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: '#2E7D32' }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#2E7D32' }}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          contentStyle={{ 
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        />
        <Bar 
          dataKey="value" 
          radius={[4, 4, 0, 0]}
          barSize={40}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsBarChart; 