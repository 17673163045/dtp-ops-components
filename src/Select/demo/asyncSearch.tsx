import React from 'react';
import { CircularProgress } from '@mui/material';
import Select from '../Select';

function AsyncSearch() {
  const asyncGetOptions = (inputValue: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!inputValue) resolve([]);
        resolve([
          { label: `${inputValue}1`, value: 1 },
          { label: `${inputValue}2`, value: 2 },
          { label: `${inputValue}3`, value: 3 },
        ]);
      }, 2500);
    });
  };

  const [searchValue, setSearchValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<any>();

  function onSearch(value: string) {
    setSearchValue(value);
    if (!value) return;
    setLoading(true);
    asyncGetOptions(value).then((res) => {
      setLoading(false);
      console.log(res);
      setOptions(res);
    });
  }

  return (
    <Select
      searchValue={searchValue}
      showSearch
      filterOption={false}
      loading={loading}
      notFoundContent={
        loading ? <CircularProgress size={20} color="error" /> : 'no Options'
      }
      onSearch={onSearch}
      allowClear
      label="input to search options"
      size="small"
      style={{ width: 300, marginRight: 20 }}
      options={options}
    />
  );
}

export default AsyncSearch;
