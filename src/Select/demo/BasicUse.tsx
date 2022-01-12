import React from 'react';
import Select from '../Select';
import { LinearProgress } from '@mui/material';

function BasicUse() {
  return (
    <div>
      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={['Jack', 'Lucy', 'disabled', 'Tom']}
        defaultValue={'Lucy'}
        label={'option type is string'}
        getOptionDisabled={(option) => option === 'disabled'}
      />

      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={[
          { label: 'Jack', value: 'Jack' },
          { label: 'Lucy', value: 'Lucy' },
          { label: 'disabled', value: 'disabled' },
          { label: 'Tom', value: 'Tom' },
        ]}
        label={'option type is label & value object'}
        allowClear={false}
        defaultValue={'Lucy'}
        getOptionDisabled={(option: any) => option.label === 'disabled'}
      />

      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={[
          { name: 'Jack', lastName: 'Jack' },
          { name: 'Lucy', lastName: 'Lucy' },
          { name: 'Tom', lastName: 'Tom' },
        ]}
        label={'option type is name & lastName object'}
        defaultValue={'Lucy'}
        labelMap="name"
        valueMap="lastName"
      />

      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        disabled
        defaultValue={'Lucy'}
      />

      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        loading
        defaultValue={'Lucy'}
        loadingText={<div>疯狂加载中...</div>}
        loadingIndicator={
          <LinearProgress color="error" style={{ width: 30, height: 10 }} />
        }
      />
    </div>
  );
}

export default BasicUse;
