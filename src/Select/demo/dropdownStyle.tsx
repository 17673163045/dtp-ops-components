import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function DropdownStyle() {
  return (
    <Select
      style={{ width: 300 }}
      size="small"
      options={options}
      dropdownStyle={{ background: '#222', color: '#fff' }}
    />
  );
}

export default DropdownStyle;
