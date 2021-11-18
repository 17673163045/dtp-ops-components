import React from 'react';
import { Select } from 'dtp-ops-components';
import styles from './dropdownClassName.less';

const options = 'i'
  .repeat(100)
  .split('')
  .map((i, index) => ({
    label: `label${index} label${index} label${index} label${index} label${index} label${index}`,
    value: index,
  }));

function DropdownClassName() {
  return (
    <Select
      style={{ width: 300 }}
      size="small"
      options={options}
      dropdownClassName={styles.dropdown}
    />
  );
}

export default DropdownClassName;
