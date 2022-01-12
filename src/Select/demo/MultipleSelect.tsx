import React from 'react';
import Select from '../Select';

export default function MultipleSelect() {
  return (
    <div>
      <Select
        multiple
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={['Jack', 'Lucy', 'disabled', 'Tom']}
        defaultValue={['Lucy']}
        getOptionDisabled={(option) => option === 'disabled'}
      />

      <Select
        multiple
        limitTags={1}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={['Jack', 'Lucy', 'disabled', 'Tom']}
        defaultValue={['Jack', 'Lucy', 'Tom']}
        getOptionDisabled={(option) => option === 'disabled'}
      />

      <Select
        multiple
        limitTags={2}
        disabled
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={['Jack', 'Lucy', 'Tom']}
        defaultValue={['Jack', 'Lucy', 'Tom']}
        getOptionDisabled={(option) => option === 'disabled'}
      />
    </div>
  );
}
