import { ConstructionOutlined } from '@mui/icons-material';
import React from 'react';
import Select from '../Select';

const options = 'i'
  .repeat(30)
  .split('')
  .map((i, index) => ({
    label: `labelelabelelabelellllabelel${index}`,
    value: index,
  }));

function SelectTest() {
  return (
    <div>
      <Select
        options={options}
        dropdownMatchSelectWidth={false}
        style={{ width: 200, margin: '0 20px 20px 0' }}
      />

      <Select
        open
        disablePortal
        options={options}
        style={{ width: 200, margin: '0 20px 20px 0' }}
        onPopupScrollBottom={() => {
          console.log(1);
        }}
      />
    </div>
  );
}

export default SelectTest;
