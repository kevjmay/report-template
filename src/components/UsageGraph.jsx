import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { useCsvData } from './useCsvData';
import { calculateUsageTotals } from './calculateUsageTotals';

export function UsageGraph({ type }) {
  const { csv, loading, error } = useCsvData();

  if (loading) return <p>Loading CSV data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!csv || csv.length === 0) return <p>No data available.</p>;

  const totals = calculateUsageTotals(csv);
  console.log('Calculated Totals:', totals);

  const { electricUsage, electricAllowance, gasUsage, gasAllowance } = totals;

  // Data type specific for ShadCN graph
  const data = type === 'Electric'
    ? [{ name: 'Usage', value: electricUsage }, { name: 'Allowance', value: electricAllowance }]
    : [{ name: 'Usage', value: gasUsage }, { name: 'Allowance', value: gasAllowance }];

  const title = `${type} Comparison`;

  return (
    <div className='w-4/3 max-w-[450px] h-[300px] mx-auto'>
      <BarChart
        width={400}
        height={280}
        data={data}
        layout="vertical"
        margin={{
          right: 20,
          left: 20,
          top: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} hide/>
        <XAxis type="number" hide />
        <Bar
          dataKey="value"
          fill="rgba(113, 64, 196, 1)"
          radius={4}
        >
          <LabelList
            dataKey="name" // Labels ("Usage", "Allowance")
            position="insideLeft" 
            fill="white"
            fontSize={14}
            offset={12}
          />
          <LabelList
            dataKey="value" // Actual value inside bars
            position="insideRight"
            fill="white"
            fontSize={14}
            offset={12}
          />
        </Bar>
      </BarChart>
    </div>
  );
}

export default UsageGraph;
