import React, { useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import FilterInput from 'components/search/FilterInput';

const Filter = (props) => {
  const [value, setValue] = useState({ lastName: '' });
  const handleChange = (e) => {
    const { lastName, value } = e.target;
    setValue({
      ...value,
      [lastName]: value
    });
  };
  const handleFilter = () => {
    props.onFilter(value);
  };
  return (
    <Box sx={{ paddingY: 3, display: 'flex', alignItem: 'center', justifyContent: 'space-between' }}>
      <Stack direction="row" spacing={4}>
        <FilterInput value={value.name} onChange={handleChange} name="lastName" />
        <Button variant="contained" onClick={handleFilter}>
          Lọc
        </Button>
      </Stack>
    </Box>
  );
};

export default Filter;
