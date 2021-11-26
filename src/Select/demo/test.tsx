import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

export default function aaa() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />

      <Select
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />

      <Select
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />
    </div>
  );
}