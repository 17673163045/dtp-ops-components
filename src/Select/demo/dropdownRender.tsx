import React from 'react';
import { TextField, Button } from '@mui/material';
import { Select, Modal } from 'dtp-ops-components';
import { ConstructionOutlined } from '@mui/icons-material';

const defaultOptions = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
  { label: 'Jame', value: 'Jame' },
  { label: 'Lick', value: 'Lick' },
  { label: 'Lisa', value: 'Lisa' },
  { label: 'Jan', value: 'Jan' },
  { label: 'San', value: 'San' },
];

function DropdownRender() {
  const [textValue, setTextValue] = React.useState<any>();
  const [options, setOptions] = React.useState<any>([]);
  const [visible, setVisible] = React.useState<any>(false);

  const [selectValue, setSelectValue] = React.useState<any>([]);

  const addItemDropdownMenu = (originNode: any) => (
    <>
      {originNode}
      <div style={{ padding: 12 }}>
        <Button onClick={() => setVisible(true)}>Add Item</Button>
      </div>
    </>
  );

  const onAddItem = () => {
    if (!textValue) return;
    setOptions((pre: any) => [
      ...pre,
      { label: textValue, value: `${textValue}${pre.length + 1}` },
    ]);
    setVisible(false);
    setTextValue('');
  };

  const selectAllDropdownMenu = (originNode: any) => (
    <>
      <div style={{ padding: '12px 12px 0 12px' }}>
        <Button onClick={onChangeAll}>Select All</Button>
      </div>
      {originNode}
    </>
  );

  function onChangeAll() {
    const allValue = defaultOptions.map((item) => item.value);
    const isSelectedAll = selectValue.length === allValue.length;
    if (isSelectedAll) {
      setSelectValue([]);
    } else {
      setSelectValue(allValue);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Select
          style={{ width: 300, margin: '0 20px 20px 0' }}
          size="small"
          options={options}
          dropdownRender={addItemDropdownMenu}
        />

        <Select
          multiple
          allowClear
          showSearch
          defaultValue={[]}
          value={selectValue}
          onChange={(newValue: any) => {
            setSelectValue(newValue);
          }}
          style={{ width: 300, margin: '0 20px 20px 0' }}
          size="small"
          options={defaultOptions}
          dropdownRender={selectAllDropdownMenu}
        />
      </div>

      <Modal
        visible={visible}
        closable={false}
        onCancel={() => {
          setVisible(false);
          setTextValue('');
        }}
        destroyOnClose
        onOk={onAddItem}
      >
        <TextField
          autoFocus
          fullWidth
          size="small"
          variant="standard"
          defaultValue=""
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default DropdownRender;
