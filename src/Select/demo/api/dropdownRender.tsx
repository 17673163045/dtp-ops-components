import React from 'react';
import { TextField, Button } from '@mui/material';
import { Select, Modal } from 'dtp-ops-components';

const defaultOptions = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
  { label: 'Lisa', value: 'Lisa' },
  { label: 'Jan', value: 'Jan' },
];

function DropdownRender() {
  const [textValue, setTextValue] = React.useState<any>();
  const [options, setOptions] = React.useState<any>([]);
  const [visible, setVisible] = React.useState<any>(false);

  const [selectValue, setSelectValue] = React.useState<any>([]);

  const onAddItem = () => {
    if (!textValue) return;
    setOptions((pre: any) => [
      ...pre,
      { label: textValue, value: `${textValue}${pre.length + 1}` },
    ]);
    setVisible(false);
    setTextValue('');
  };

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
          dropdownRender={(originNode: any) => (
            <>
              {originNode}
              <div style={{ padding: 12, textAlign: 'right' }}>
                <Button onClick={() => setVisible(true)}>Add Item</Button>
              </div>
            </>
          )}
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
          dropdownRender={(originNode: any) => (
            <>
              <div>
                <Button
                  variant="text"
                  style={{ width: '100%', textAlign: 'left' }}
                  onClick={onChangeAll}
                >
                  <div style={{ width: '100%', textAlign: 'left' }}>
                    Select All
                  </div>
                </Button>
              </div>
              {originNode}
            </>
          )}
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
        footer={
          <div style={{ textAlign: 'right', padding: '0 12px 10px 0' }}>
            <Button onClick={onAddItem}>Ok</Button>
          </div>
        }
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
