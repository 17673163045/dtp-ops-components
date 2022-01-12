import React from 'react';
import Select from '../Select';
import { Button } from '@mui/material';

export default function Size() {
  const [size, setSize] = React.useState<any>('small');

  return (
    <div>
      <p>
        <Button
          style={{ margin: '0 20px 20px 0' }}
          variant="contained"
          onClick={() => setSize('small')}
        >
          Small
        </Button>
        <Button
          style={{ margin: '0 20px 20px 0' }}
          variant="contained"
          onClick={() => setSize('middle')}
        >
          Middle
        </Button>
      </p>
      <Select
        size={size}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={['Jack', 'Lucy', 'Tom']}
        defaultValue={'Lucy'}
      />

      <Select
        multiple
        size={size}
        limitTags={2}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={['Jack', 'Lucy', 'Tom']}
        defaultValue={['Jack', 'Lucy', 'Tom']}
      />
    </div>
  );
}
