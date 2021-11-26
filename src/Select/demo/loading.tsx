import React from 'react';
import { Select } from 'dtp-ops-components';
import { CircularProgress } from '@mui/material';
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
        style={{ margin: '0 20px 20px 0' }}
        variant="contained"
        onClick={getData}
      >
        loading
      </LoadingButton>

      <LoadingButton
        style={{ margin: '0 20px 20px 0' }}
        variant="contained"
        onClick={() => setOptions([])}
      >
        Clear
      </LoadingButton>
      <div style={{ display: 'flex' }}>
        <Select
          open={open}
          onOpenChange={onOpenChange}
          loading={loading}
          loadingText={<CircularProgress size={20} color="error" />}
          allowClear
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

export default Loading;
