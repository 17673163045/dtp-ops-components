import React from 'react';
import { Button } from '@mui/material';
import Select from '../Select';

function SelectTest() {
  const [options, setOptions] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<any>(null);

  function getOptions() {
    const data = [
      { label: 'name1', value: 1 },
      { label: 'name2', value: 2 },
      { label: 'name3', value: 3 },
      { label: 'name4', value: 4 },
      { label: 'name5', value: 5 },
      { label: 'name6', value: 6 },
      { label: 'name7', value: 7 },
      { label: 'name8', value: 8 },
      { label: 'name9', value: 9 },
      {
        label:
          'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
        value: 99,
      },
    ];

    const p = new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });

    setLoading(true);
    p.then((res: any) => {
      setLoading(false);
      setOptions(res);
    });
  }

  function getValue() {
    console.log(value);
  }

  function setSelectValue() {
    setValue({ label: 'name2', value: 2 });
  }

  function onChange(newValue: any) {
    setValue(newValue);
  }

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <Button
          style={{ margin: '0 20px 20px 0' }}
          variant="contained"
          onClick={getOptions}
        >
          Get Options
        </Button>
        <Button
          style={{ margin: '0 20px 20px 0' }}
          variant="contained"
          onClick={() => setOptions([])}
        >
          Clear Options
        </Button>
        <Button
          style={{ margin: '0 20px 20px 0' }}
          variant="contained"
          onClick={getValue}
        >
          Get Value
        </Button>
        <Button
          style={{ margin: '0 20px 20px 0' }}
          variant="contained"
          onClick={setSelectValue}
        >
          Set Value
        </Button>
      </div>

      <Select
        labelInValue
        allowClear
        showSearch
        value={value}
        options={options}
        onChange={onChange}
        loading={loading}
        style={{ width: 200 }}
      />
    </div>
  );
}

export default SelectTest;
