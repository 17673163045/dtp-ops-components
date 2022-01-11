import React from 'react';
import { Select } from 'dtp-ops-components';

const options1 = ['Jack', 'Lucy', 'disabled', 'Tom'];

const options2 = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

const options3 = [
  { name: 'Jack', lastName: 'Jack' },
  { name: 'Lucy', lastName: 'Lucy' },
  { name: 'Tom', lastName: 'Tom' },
];

function BasicUse() {
  return (
    <div>
      <Select
        defaultValue="Lucy"
        style={{ width: 150, margin: '0 20px 20px 0' }}
        getOptionDisabled={(option: any) => option === 'disabled'}
        options={options1}
      />

      <Select
        defaultValue="Lucy"
        style={{ width: 150, margin: '0 20px 20px 0' }}
        options={options2}
      />

      <Select
        labelInValue
        defaultValue={{ name: 'Lucy', lastName: 'Lucy' }}
        style={{ width: 150, margin: '0 20px 20px 0' }}
        options={options3}
        labelMap="name"
        valueMap="lastName"
      />

      <Select
        disabled
        label="disabled"
        style={{ width: 150, margin: '0 20px 20px 0' }}
        options={options1}
      />

      <Select loading style={{ width: 150, margin: '0 20px 20px 0' }} />
    </div>
  );
}

export default BasicUse;
