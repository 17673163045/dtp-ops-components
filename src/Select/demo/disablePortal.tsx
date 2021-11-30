import React from 'react';
import { Select } from 'dtp-ops-components';
import { Button } from '@mui/material';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function DisablePortal() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (
    <div>
      <p>右击检查弹出层</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <Button
            variant="contained"
            onClick={() => setOpen((pre) => !pre)}
            style={{ margin: '0 20px 20px 0' }}
          >
            Open
          </Button>
          <Select
            label="dropdown渲染在body元素下"
            options={options}
            open={open}
            disablePortal={false}
            style={{ width: 300, margin: '0 20px 20px 0' }}
          />
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => setOpen2((pre) => !pre)}
            style={{ margin: '0 20px 20px 0' }}
          >
            Open
          </Button>
          <Select
            style={{ width: 300, margin: '0 20px 20px 0' }}
            label="dropdown渲染在父元素下"
            options={options}
            open={open2}
            disablePortal
          />
        </div>
      </div>
    </div>
  );
}

export default DisablePortal;
