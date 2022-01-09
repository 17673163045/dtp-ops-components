import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { label: 'Jack a Part Part Part II', value: 'Jack' },
  { label: 'Jan Dark Knight', value: 'Jan' },
  { label: 'Jame Angry Men', value: 'Jame' },
  { label: 'Cor Lord of the Rings', value: 'Cor' },
  { label: 'CooC Star Wars', value: 'CooC' },
  { label: 'Lick Forrest Gum', value: 'Lick' },
  { label: 'Lisa Seven Samurai', value: 'Lisa' },
  { label: 'San Spirited Away', value: 'San' },
  { label: 'Silly Rear Window', value: 'Silly' },
];

function AutoHighlight() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Select
        showSearch
        highlight
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        label="search word match will highlight"
      />

      <Select
        showSearch
        highlight
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        highlightStyle={{
          color: '#6bccb4',
          fontSize: 22,
          transition: 'all 0.15s',
        }}
        label="highlightStyle set match word color"
      />

      <Select
        showSearch
        highlight
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
        highlightOptions={{ insideWords: true, findAllOccurrences: true }}
        label="highlightStyle set match word color"
      />
    </div>
  );
}

export default AutoHighlight;
