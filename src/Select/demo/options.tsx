import React from 'react';
import { Select } from 'dtp-ops-components';

function SelectOptionsWithNumberOrString() {
  const options = [1, '1', 2, '2'];

  return (
    <Select
      allowClear
      label="options is number or string"
      size="small"
      style={{ width: 300, margin: '0 20px 20px 0' }}
      options={options}
    />
  );
}

function SelectOptionsWithLabelValue() {
  const options = [
    { label: 'Jack', value: 'Jack' },
    { label: 'Lucy', value: 'Lucy' },
    { label: 'Tom', value: 'Tom' },
  ];

  return (
    <Select
      label="options is label value object"
      size="small"
      style={{ width: 300, margin: '0 20px 20px 0' }}
      options={options}
    />
  );
}

function SelectOptionsCustomPropName() {
  const options = [
    { name: 'Jack', age: 12 },
    { name: 'Lucy', age: 20 },
    { name: 'Tom', age: 15 },
  ];
  return (
    <Select
      size="small"
      label="options use propNameMap"
      style={{ width: 300, margin: '0 20px 20px 0' }}
      options={options}
      labelMap="name"
      valueMap="age"
    />
  );
}

function Options() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <SelectOptionsWithNumberOrString />
      <SelectOptionsWithLabelValue />
      <SelectOptionsCustomPropName />
    </div>
  );
}

export default Options;
