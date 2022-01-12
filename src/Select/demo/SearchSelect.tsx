import React from 'react';
import Select from '../Select';
import { LinearProgress } from '@mui/material';

const options1 = ['Jack', 'Lucy', 'Tom'];

const options2 = [
  { name: 'Jack', email: '1266666@gmail.com', phone: '22222222', id: 1 },
  { name: 'Lucy', email: '12aafcc@gmail.com', phone: '77777777', id: 2 },
  { name: 'Tom', email: '12AAFCC@gmail.com', phone: '55555555', id: 3 },
];

export default function SearchSelect() {
  return (
    <div>
      <Select
        showSearch={false}
        placeholder="disabled Search"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options1}
        label="禁用输入框"
      />

      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options1}
        placeholder="input search a person"
        label="默认的搜索过滤函数"
      />

      <Select
        filterOption={false}
        placeholder="disabled filter function"
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options1}
        label="可以输入但取消过滤"
      />

      <Select
        style={{ width: 300, margin: '0 20px 20px 0' }}
        options={options2}
        placeholder="可根据用户姓名,email, phone搜索"
        label="自定义搜索过滤函数"
        labelMap="name"
        valueMap="id"
        getOptionLabel={(option: any) => {
          const { name, email, phone } = option;
          return (
            <div>
              <div>name: {name}</div>
              <div>email: {email}</div>
              <div>phone: {phone}</div>
            </div>
          );
        }}
        filterOption={(inputValue, option: any) => {
          const { name, email, phone } = option;
          return (
            (inputValue && name.indexOf(inputValue) > -1) ||
            email.indexOf(inputValue) > -1 ||
            phone.indexOf(inputValue) > -1
          );
        }}
      />
    </div>
  );
}
