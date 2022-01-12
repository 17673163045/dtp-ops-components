import React from 'react';
import { CircularProgress } from '@mui/material';
import { Select } from 'dtp-ops-components';

const asyncGetOptions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = 'i'
        .repeat(13)
        .split('')
        .map(() => Math.floor(Math.random() * 1000));
      resolve(list);
    }, 600);
  });
};

function OnPopupScrollBottom() {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    if (loading) return;
    setLoading(true);
    const list = await asyncGetOptions();
    setLoading(false);
    setOptions((pre) => pre.concat(list as any));
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        size="small"
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        onPopupScrollBottom={async () => {
          getData();
        }}
        dropdownRender={(list: any) => {
          return (
            <>
              {list}
              {loading && (
                <CircularProgress
                  color="error"
                  size="20px"
                  style={{ margin: '0 12px 12px 12px' }}
                />
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export default OnPopupScrollBottom;
