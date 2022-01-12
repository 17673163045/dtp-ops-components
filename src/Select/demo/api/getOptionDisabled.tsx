import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

export default function GetOptionDisabled() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        getOptionDisabled={(option: any) => option.value === 'Jack'}
      />
    </div>
  );
}
