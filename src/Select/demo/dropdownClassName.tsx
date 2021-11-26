import React from 'react';
import { Select } from 'dtp-ops-components';
import styles from './dropdownClassName.less';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
  { label: 'Jame', value: 'Jame' },
  { label: 'Lick', value: 'Lick' },
  { label: 'Lisa', value: 'Lisa' },
  { label: 'Jan', value: 'Jan' },
  { label: 'San', value: 'San' },
];

function DropdownClassNameSelect() {
  return (
    <Select
      style={{ width: 300 }}
      size="small"
      options={options}
      dropdownClassName={styles.dropdown}
    />
  );
}

export default DropdownClassNameSelect;
