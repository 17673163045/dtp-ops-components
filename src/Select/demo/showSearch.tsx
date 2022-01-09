import React from 'react';
import { Button } from '@mui/material';
import { Select } from 'dtp-ops-components';

function Search() {
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
        style={{ width: 300, marginLeft: 20 }}
        options={options}
      />
    </div>
  );
}

export default Search;
