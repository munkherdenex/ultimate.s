import React from 'react';
import { BarChart as ReBarChart, AreaChart as ReAreaChart, Bar, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function BarChart(props){
  const { style, className, data, dataKey, tickFormatter, bars, tipFormatter, legendFormatter, hasLegend, xFormatter } = props;

  return (
    <div style={style} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart
          width={500}
          height={360}
          data={data}
          margin={{ top: 5, right: 15, left: 28, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} tickFormatter={xFormatter} />
          <YAxis tickFormatter={tickFormatter} />
          <Tooltip cursor={{fill: 'transparent'}} formatter={tipFormatter} labelFormatter={xFormatter} />
          {hasLegend && <Legend formatter={legendFormatter} />}
          {bars?.map(item => {
            return (<Bar key={item?.key} maxBarSize={20} dataKey={item?.key} fill={item?.color} />);
          })}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AreaChart(props){
  const { style, className, data, dataKey, tickFormatter, bars, tipFormatter, legendFormatter, hasLegend, xFormatter } = props;
  
  return (
    <div style={style} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReAreaChart
          width={500}
          height={360}
          data={data}
          margin={{ top: 5, right: 15, left: 28, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} tickFormatter={xFormatter} />
          <YAxis tickFormatter={tickFormatter} />
          <Tooltip cursor={{fill: 'transparent'}} formatter={tipFormatter} labelFormatter={xFormatter} />
          {hasLegend && <Legend formatter={legendFormatter} />}
          {bars?.map(item => {
            return (<Area key={item?.key} dataKey={item?.key} fill={item?.fill} stroke={item?.color} dot={{ fill: item?.color, strokeWidth: 1 }} />);
          })}
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  )
}