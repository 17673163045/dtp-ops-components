import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function RemoveIcon() {
  return (
    <div>
      <Select
        allowClear
        defaultValue="Jack"
        removeIcon={
          <span
            style={{
              color: 'red',
              display: 'inline-block',
              lineHeight: '20px',
              fontSize: 16,
              width: 20,
              height: 20,
            }}
          >
            X
          </span>
        }
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />
    </div>
  );
}

export default RemoveIcon;
