import React from 'react';
import Select from '../Select';
import { Button } from '@mui/material';

function CustomLabel() {
  const [options, setOptions] = React.useState<any>();

  React.useEffect(() => {
    setOptions([
      { label: 'Jack', value: 'Jack' },
      { label: 'Lucy', value: 'Lucy' },
      { label: 'Tom', value: 'Tom' },
    ]);
  }, []);

  const valueMapEmoji: any = {
    Jack: '😏😏',
    Lucy: '😪😪',
    Tom: '🐸🐸',
  };

  const getOptionLabel = (option: any, state: any) => {
    const { selected } = state;

    const emoji = valueMapEmoji[option.value];
    return (
      <Button
        style={{
          width: selected ? 350 : 160,
          justifyContent: 'left',
          transition: 'all 1s',
          background: selected ? '#f90' : '',
          color: selected ? '#fff' : '',
        }}
        onClick={() => {
          console.log('option:', option);
          console.log('state:', state);
        }}
      >
        <span style={{ fontSize: 22, marginRight: 10 }}>{emoji}</span>
        {option.label}
      </Button>
    );
  };

  return (
    <>
      <Select
        allowClear
        disableCloseOnSelect
        label="custom option label"
        size="small"
        style={{ width: 300, margin: 20 }}
        options={options}
        getOptionLabel={getOptionLabel}
      />
    </>
  );
}

export default CustomLabel;
