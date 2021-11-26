import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'A1b1C5', value: 1 },
  { label: 'a2B2c4', value: 2 },
  { label: 'a3B3C3', value: 3 },
  { label: 'a4B4c3', value: 4 },
  { label: 'a5B5C1', value: 5 },
];

const userInfoOptions = [
  { code: '15474D', id: 1, email: '123@qq.com', name: 'wee' },
  { code: '16352F', id: 2, email: '456@qq.com', name: 'rtt' },
  { code: '13650F', id: 3, email: '789@qq.com', name: 'yuu' },
];

function FilterOption() {
  const defaultFilterOption = (inputValue: any, option: any) => {
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  };

  const filterOption = (inputValue: any, option: any) => {
    return option.label.indexOf(inputValue) >= 0;
  };

  return (
    <div>
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
      <Select
        allowClear
        showSearch
        options={userInfoOptions}
        placeholder="search by user's name or email"
        labelMap="name"
        valueMap="id"
        size="small"
        getOptionLabel={(option: any) => `${option.name} (${option.code})`}
        filterOption={(inputValue: any, option: any) => {
          return (
            option.name.indexOf(inputValue) >= 0 ||
            option.email.indexOf(inputValue) >= 0
          );
        }}
        style={{ width: 300, margin: '20px 20px 20px 0' }}
      />
    </div>
  );
}

export default FilterOption;
