import React from 'react';
import { Select } from 'dtp-ops-components';

const options = 'i'
  .repeat(10)
  .split('')
  .map((i, index) => ({ label: `${index}`.repeat(30), value: index }));

function DropdownMatchSelectWidth() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        style={{ width: 150, margin: '0 20px 20px 0' }}
        size="small"
        options={options}
        dropdownMatchSelectWidth={false}
      />
      <Select
        style={{ width: 150, margin: '0 20px 20px 0' }}
        size="small"
        options={options}
        dropdownMatchSelectWidth={true}
      />
    </div>
  );
}

export default DropdownMatchSelectWidth;
