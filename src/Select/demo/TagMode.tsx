import React from 'react';
import Select from '../Select';

const options: any[] = [];
for (let i = 10; i < 20; i++) {
  options.push(i.toString(36) + i);
}

export default function TagMode() {
  return (
    <div>
      <Select
        multiple
        tagMode
        options={options}
        style={{ width: 400, margin: '0 20px 20px 0' }}
      />

      <Select
        tagMode
        options={options}
        style={{ width: 400, margin: '0 20px 20px 0' }}
      />

      <Select
        options={[{ name: 'Jack', lastName: 'Jack' }]}
        style={{ width: 400, margin: '0 20px 20px 0' }}
        filterOptions={(options, { inputValue }) => {
          console.log(options, inputValue);
          return [];
        }}
      />
    </div>
  );
}
