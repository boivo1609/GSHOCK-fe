/* eslint-disable react/prop-types */
// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const FilterInput = ({ name, value, onChange, placeholder = 'Nhập để tìm kiếm...' }) => (
  <Box sx={{ width: '200px', height: '12px', ml: { xs: 0, md: 1 } }}>
    <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
      <OutlinedInput
        name={name}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start" sx={{ mr: -0.5 }}>
            <SearchOutlined />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          'aria-label': 'weight'
        }}
        placeholder={placeholder}
        sx={{
          '& .css-3udo70-MuiInputBase-input-MuiOutlinedInput-input': {
            padding: '9px'
          }
        }}
      />
    </FormControl>
  </Box>
);

export default FilterInput;
