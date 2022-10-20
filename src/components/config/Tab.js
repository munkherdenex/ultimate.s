import React from 'react';
import { Tabs } from 'antd';

import { Additional, Type, Cashier } from './tabs';

export function Tab(props){
  const { selectedKeys } = props;

  const items = [
    { key: 'additional', children: <Additional /> },
    { key: 'type', children: <Type /> },
    { key: 'cashier', children: <Cashier /> },
  ];

  return <Tabs activeKey={selectedKeys && selectedKeys[0]} defaultActiveKey='additional' items={items} />;
}