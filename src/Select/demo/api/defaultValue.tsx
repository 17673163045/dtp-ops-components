import React from 'react';
import { Select } from 'dtp-ops-components';

const options1 = [1, '1'];

const options2 = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

const options3 = [
  { name: 'Tom', id: 11 },
  { name: 'Jack', id: 12 },
  { name: 'Lucy', id: 14 },
];

function DefaultValue() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        defaultValue={1}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options1}
      />

      <Select
        defaultValue="Jack"
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options2}
      />

      <Select
        multiple
        labelMap="name"
        valueMap="id"
        defaultValue={[12, 14]}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options3}
      />
    </div>
  );
}

export default DefaultValue;
