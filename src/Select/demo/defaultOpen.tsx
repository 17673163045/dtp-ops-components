import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function DefaultOpen() {
  return (
    <div>
      <Select
        defaultOpen
        defaultValue="Jack"
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />
    </div>
  );
}

export default DefaultOpen;
