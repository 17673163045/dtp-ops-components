import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function Multiple() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        size="small"
        options={options}
        label="single"
      />

      <Select
        multiple
        style={{ width: 300, margin: '0 20px 20px 0' }}
        size="small"
        options={options}
        label="multiple"
      />
    </div>
  );
}

export default Multiple;
