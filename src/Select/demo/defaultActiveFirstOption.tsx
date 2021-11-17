import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function DefaultActiveFirstOption() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        allowClear
        size="small"
        label="ActiveFirstOption"
        defaultActiveFirstOption={true}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />

      <Select
        allowClear
        size="small"
        label="InactiveFirstOption"
        defaultActiveFirstOption={false}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />
    </div>
  );
}

export default DefaultActiveFirstOption;
