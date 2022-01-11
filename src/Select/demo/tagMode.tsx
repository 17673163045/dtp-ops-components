import React from 'react';
import { Select } from 'dtp-ops-components';

const defaultOptions: any[] = [];
for (let i = 10; i < 16; i++) {
  defaultOptions.push(i.toString(36) + i);
}

function BasicUse() {
  return (
    <div>
      <Select
        multiple
        tagMode
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={defaultOptions}
      />

      <Select
        tagMode
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={defaultOptions}
      />
    </div>
  );
}

export default BasicUse;
