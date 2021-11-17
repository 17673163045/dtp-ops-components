import React from 'react';

import Select from '../Select';
import styles from './test.less';

const options = 'i'
  .repeat(100)
  .split('')
  .map((item, index) => {
    return {
      label: `indexindexindexindexindexindexindexindexindexindexindexindex${index}`,
      value: index,
    };
  });

function Test() {
  return (
    <Select
      options={[
        { label: 'Jack', value: 'Jack' },
        { label: 'Lucy', value: 'Lucy' },
        { label: 'Tom', value: 'Tom' },
      ]}
      style={{ width: 300 }}
    />
  );
}

export default Test;
