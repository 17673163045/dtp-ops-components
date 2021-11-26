import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

export default function DisableCloseOnSelect() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        disableCloseOnSelect
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />

      <Select
        disableCloseOnSelect={false}
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />

      <Select
        multiple
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />

      <Select
        disableCloseOnSelect={false}
        multiple
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />
    </div>
  );
}
