import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function Placeholder() {
  return (
    <div>
      <Select
        allowClear
        style={{ width: 300 }}
        options={options}
        placeholder="this a placeholder"
      />
    </div>
  );
}

export default Placeholder;
