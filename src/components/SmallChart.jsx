import React from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function SmallChart({ coinSparkline, change, coinUUID }) {
const data = [];
for(let i = 0; i < coinSparkline.length; i += 1){
    data.push({
      date: i,
      value: parseFloat(coinSparkline?.[i]),
    });
}
const chartColor = change >= 0 ? '#32CD32' : '#EE4B2B';

  return (
    <div className='w-full h-fit'>
      <ResponsiveContainer width="80%" height={50} className='ml-auto' >
          <AreaChart data={data}>
          <defs>
            <linearGradient id={`color${coinUUID}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
              <stop offset="75%" stopColor={chartColor} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke={chartColor} fill={`url(#color${coinUUID})`} />
          </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SmallChart;
