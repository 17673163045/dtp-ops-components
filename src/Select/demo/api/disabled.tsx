import React from 'react';
import { Select } from 'dtp-ops-components';
import { Button } from '@mui/material';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function Disabled() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div>
      <Button
        style={{ margin: '0 20px 20px 0' }}
        variant="contained"
        onClick={() => setDisabled((pre) => !pre)}
      >
        toggle disabled
      </Button>

      <Select
        allowClear
        disabled={disabled}
        label={disabled ? 'disabled' : 'no disabled'}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />
    </div>
  );
}

export default Disabled;
