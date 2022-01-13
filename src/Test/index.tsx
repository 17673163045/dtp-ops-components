import React from 'react';
import Select from '../Select';

const options: any[] = [];
for (let i = 10; i < 20; i++) {
  options.push(i.toString(36) + i);
}

export default function TagMode() {
  const [options, setOptions] = React.useState([
    { name: 'Jack', lastName: 'Jack' },
  ]);

  const optionsRef = React.useRef(options);

  return (
    <div>
      <Select
        options={options}
        labelMap="name"
        valueMap="lastName"
        style={{ width: 400, margin: '0 20px 20px 0' }}
      />
    </div>
  );
}
