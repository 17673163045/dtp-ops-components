import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { groupLetter: 'a', label: 'auto', value: '1' },
  { groupLetter: 'b', label: 'bell', value: '2' },
  { groupLetter: 'c', label: 'ceil', value: '3' },
];

export default function GroupBy() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        groupBy={(option: any) => option.groupLetter}
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />
    </div>
  );
}
