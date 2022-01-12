import React from 'react';
import Select from '../Select';

const options = [
  { country: '中国', en: 'China', short: 'CN' },
  { country: '美国', en: 'USA', short: 'US' },
  { country: '日本', en: 'Japan', short: 'JP' },
  { country: '韩国', en: 'Korea', short: 'KR' },
];

export default function FillText() {
  function getOptionLabel(option: any, { selected }: any) {
    const { country, en, short } = option;
    return (
      <div style={{ fontWeight: selected && 600 }}>
        <span role="img" style={{ fontSize: 12, marginRight: 10 }}>
          {short}
        </span>
        {`${en} (${country})`}
      </div>
    );
  }

  function getInputFillText(option: any) {
    const { en } = option;
    return en;
  }

  return (
    <div>
      <Select
        multiple
        style={{ width: 400, margin: '0 20px 20px 0' }}
        options={options}
        valueMap="en"
        getOptionLabel={getOptionLabel}
        getInputFillText={getInputFillText}
        defaultValue={['China', 'USA']}
      />

      <Select
        style={{ width: 400, margin: '0 20px 20px 0' }}
        options={options}
        valueMap="en"
        getOptionLabel={getOptionLabel}
        getInputFillText={getInputFillText}
        defaultValue={'China'}
      />
    </div>
  );
}
