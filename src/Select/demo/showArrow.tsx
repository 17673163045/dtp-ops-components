import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function ShowArrow() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        allowClear
        showArrow={false}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />

      <Select
        allowClear
        showArrow={true}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />

      <Select
        allowClear
        showArrow={<span style={{ color: 'red' }}>^😏^</span>}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />
    </div>
  );
}

export default ShowArrow;
