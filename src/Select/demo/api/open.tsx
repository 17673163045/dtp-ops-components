import React from 'react';
import { Select } from 'dtp-ops-components';
import { Button } from '@mui/material';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function Open() {
  const [open, setOpen] = React.useState(false);
  const [controlOpen, setControlOpen] = React.useState(false);

  function toggle() {
    setOpen((pre) => !pre);
  }

  function onOpenChange(visible: any) {
    setControlOpen(visible);
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <Button
            variant="contained"
            style={{ margin: '0 20px 20px 0' }}
            onClick={toggle}
          >
            Toggle Open
          </Button>
          <Select
            open={open}
            style={{ width: 300, margin: '0 20px 20px 0' }}
            size="small"
            options={options}
            label={open ? 'open' : 'close'}
          />
        </div>

        <div>
          <Button
            style={{ margin: '0 20px 20px 0' }}
            onClick={() => setControlOpen((pre) => !pre)}
          >
            {controlOpen ? 'opened' : 'closed'}
          </Button>
          <Select
            size="small"
            open={controlOpen}
            onOpenChange={onOpenChange}
            options={options}
            style={{ width: 300, margin: '0 20px 20px 0' }}
          />
        </div>
      </div>
    </>
  );
}

export default Open;
