import React from 'react';
import Select from '../Select';
import { Button, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const options = [
  { label: 'Jack', value: 'Jack' },
  { label: 'Lucy', value: 'Lucy' },
  { label: 'Tom', value: 'Tom' },
];

const asyncOptions = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(options);
    }, 1500);
  });

function AllowClear() {
  const [allowClear, setAllowClear] = React.useState(false);

  return (
    <div>
      <Button
        style={{ margin: '20px 0' }}
        variant="contained"
        onClick={() => setAllowClear((pre) => !pre)}
      >
        allowClear
      </Button>

      <Select
        allowClear={allowClear}
        defaultValue="Jack"
        label={allowClear ? 'allowClear' : 'disabledClear'}
        size="small"
        style={{ width: 300, marginRight: 20 }}
        options={options}
      />
    </div>
  );
}

function Loading() {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<any>();

  const [open, setOpen] = React.useState(false);

  const onOpenChange = (visible: any) => setOpen(visible);

  function getData() {
    setOptions([]);
    setLoading(true);
    setOpen(true);
    asyncOptions().then((res: any) => {
      setLoading(false);
      setOpen(false);
      setOptions(res);
    });
  }

  return (
    <>
      <LoadingButton
        loading={loading}
        style={{ margin: '20px 0' }}
        variant="contained"
        onClick={getData}
      >
        loading
      </LoadingButton>
      <div style={{ display: 'flex' }}>
        <Select
          open={open}
          onOpenChange={onOpenChange}
          loading={loading}
          allowClear
          label="loading"
          size="small"
          style={{ width: 300, marginRight: 20 }}
          options={options}
        />

        <Select
          open={open}
          onOpenChange={onOpenChange}
          notFoundContent={
            loading ? (
              <CircularProgress size={20} color="error" />
            ) : (
              'no Options'
            )
          }
          allowClear
          label="notFoundContent loading"
          size="small"
          style={{ width: 300, marginRight: 20 }}
          options={options}
        />
      </div>
    </>
  );
}

function Disabled() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div>
      <Button
        style={{ margin: '20px 0' }}
        variant="contained"
        onClick={() => setDisabled((pre) => !pre)}
      >
        Disabled
      </Button>

      <Select
        disabled={disabled}
        defaultValue="Jack"
        label={disabled ? 'disabled' : ''}
        size="small"
        style={{ width: 300, marginRight: 20 }}
        options={options}
      />
    </div>
  );
}

function OptionDisabled() {
  const [list, setList] = React.useState(options);

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button
        style={{ margin: '20px 0' }}
        variant="contained"
        onClick={() => {
          setOpen(true);
          setList((pre) => {
            return pre.map((item: any) => {
              if (item.label === 'Jack')
                return { ...item, disabled: !item.disabled };
              return item;
            });
          });
        }}
      >
        Disabled Jack
      </Button>

      <Select
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        getOptionDisabled={(option) => option.disabled}
        size="small"
        style={{ width: 300, marginRight: 20 }}
        options={list}
      />
    </div>
  );
}

function Basic() {
  return (
    <div>
      <AllowClear />
      <div style={{ marginBottom: 20 }} />
      <Loading />
      <div style={{ marginBottom: 20 }} />
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Disabled />
        <OptionDisabled />
      </div>
    </div>
  );
}

export default Basic;
