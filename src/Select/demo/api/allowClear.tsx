import React from 'react';
import { Select } from 'dtp-ops-components';
import { Button } from '@mui/material';

const options = [
  { label: 'fsaaaaaaaaaaaaaaaaafsaaaaaaaaaaaaaaaaaaa', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function AllowClear() {
  const [allowClear, setAllowClear] = React.useState(false);

  return (
    <div>
      <Button
        style={{ margin: '0 20px 20px 0' }}
        variant="contained"
        onClick={() => setAllowClear((pre) => !pre)}
      >
        allowClear
      </Button>

      <Select
        showSearch
        allowClear={allowClear}
        defaultValue="Jack"
        label={allowClear ? 'allowClear' : 'disabledClear'}
        size="small"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options}
      />
    </div>
  );
}

export default AllowClear;
