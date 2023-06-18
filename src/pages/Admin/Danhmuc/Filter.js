/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import FilterInput from 'components/search/FilterInput';
import { IoMdAdd } from 'react-icons/io';
const Filter = (props) => {
  const [value, setValue] = useState({ name: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...value,
      [name]: value
    });
  };
  const handleFilter = () => {
    props.onFilter(value);
  };
  return (
    <Box sx={{ paddingY: 3, display: 'flex', alignItem: 'center', justifyContent: 'space-between' }}>
      <Stack direction="row" spacing={4}>
        <FilterInput value={value.name} onChange={handleChange} name="name" />
        <Button variant="contained" onClick={handleFilter}>
          Lọc
        </Button>
      </Stack>
      <Button variant="contained" startIcon={<IoMdAdd />} onClick={() => props.onCreate()}>
        Thêm mới
      </Button>
    </Box>
  );
};

export default Filter;
