import React from 'react';
import Select from '../Select';
import { TextField, Button } from '@mui/material';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function SizeAndLabel() {
  const [size, setSize] = React.useState<any>('small');
  const [label, setLabel] = React.useState<any>();

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button
          style={{ marginRight: 20 }}
          variant="contained"
          onClick={() => setSize('small')}
        >
          small
        </Button>
        <Button
          style={{ marginRight: 20 }}
          variant="contained"
          onClick={() => setSize('default')}
        >
          default
        </Button>

        <TextField
          style={{ width: 160, marginRight: 20 }}
          placeholder="input Select label"
          size="small"
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div></div>
      <Select
        style={{ width: 383 }}
        allowClear
        label={label}
        size={size}
        options={options}
      />
    </div>
  );
}

export default SizeAndLabel;
