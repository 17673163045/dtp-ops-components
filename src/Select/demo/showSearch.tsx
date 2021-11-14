import React from 'react';
import { Button } from '@mui/material';
import Select from '../Select';

function ToggleShowSearch() {
  const options = [
    { label: 'Jack', value: 'Jack' },
    { label: 'Lucy', value: 'Lucy' },
    { label: 'Tom', value: 'Tom' },
  ];

  const [showSearch, setShowSearch] = React.useState(false);

  const toggle = () => setShowSearch((pre) => !pre);

  return (
    <div style={{ padding: '20px 0' }}>
      <Button variant="contained" onClick={toggle}>
        Toggle showSearch
      </Button>
      <Select
        showSearch={showSearch}
        placeholder={showSearch ? 'input to search' : ''}
        size="small"
        style={{ width: 300, marginTop: 20 }}
        options={options}
      />
    </div>
  );
}

function FilterOption() {
  const options = [
    { label: 'A1b1C5', value: 1 },
    { label: 'a2B2c4', value: 2 },
    { label: 'a3B3C3', value: 3 },
    { label: 'a4B4c3', value: 4 },
    { label: 'a5B5C1', value: 5 },
  ];

  const defaultFilterOption = (inputValue: any, option: any) => {
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  };

  const filterOption = (inputValue: any, option: any) => {
    return option.label.indexOf(inputValue) >= 0;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        allowClear
        showSearch
        options={options}
        size="small"
        label="no filter option"
        filterOption={false}
        style={{ width: 300, margin: '20px 20px 20px 0' }}
        placeholder="input search not filter option"
      />
      <Select
        allowClear
        showSearch
        options={options}
        size="small"
        label="default filterOption"
        filterOption={defaultFilterOption}
        style={{ width: 300, margin: '20px 20px 20px 0' }}
      />

      <Select
        allowClear
        showSearch
        options={options}
        size="small"
        label="区分大小写"
        filterOption={filterOption}
        style={{ width: 300, margin: '20px 20px 20px 0' }}
      />
    </div>
  );
}

function Search() {
  return (
    <div>
      <ToggleShowSearch />
      <FilterOption />
    </div>
  );
}

export default Search;
