import React from 'react';
import { Select } from 'dtp-ops-components';
import styles from './dropdownClassName.less';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

function DropdownClassName() {
  return (
    <Select
      style={{ width: 300 }}
      size="small"
      options={options}
      dropdownClassName={styles.dropdown}
    >
      DropdownClassName
    </Select>
  );
}

export default DropdownClassName;
