import React from 'react';
import { Select } from 'dtp-ops-components';

const options = [
  { groupLetter: '0-9', label: '1', value: '1' },
  { groupLetter: 'a', label: 'auto', value: 'auto' },
  { groupLetter: '0-9', label: '2', value: '2' },
  { groupLetter: 'b', label: 'bell', value: 'bell' },
  { groupLetter: '0-9', label: '3', value: '3' },
  { groupLetter: 'c', label: 'ceil', value: 'ceil' },
];

export default function GroupBy() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <p>
        使用 groupBy 属性对选项进行分组。
        如果你要这样做，请先确保选项也按照它们分组的相同维度进行排序，
        否则你将会注意到重复的标题。
      </p>
      <Select
        label="no sort group"
        groupBy={(option: any) => option.groupLetter}
        options={options}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />

      <Select
        label="sorted group"
        groupBy={(option: any) => option.groupLetter}
        options={[...options].sort((a, b) =>
          a.groupLetter.localeCompare(b.groupLetter),
        )}
        style={{ width: 300, margin: '0 20px 20px 0' }}
      />
    </div>
  );
}
