import React from 'react';
import { Select } from 'dtp-ops-components';
import { Button } from '@mui/material';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function Size() {
  const [size, setSize] = React.useState<any>('small');

  return (
    <div style={{ display: 'inline-block', width: '50%' }}>
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
          onClick={() => setSize('middle')}
        >
          middle
        </Button>
      </div>
      <Select
        allowClear
        label={size}
        size={size}
        options={options}
        style={{ width: 300 }}
      />
    </div>
  );
}

export default Size;
