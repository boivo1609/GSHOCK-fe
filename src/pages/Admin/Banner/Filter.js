import { Box, Stack } from '@mui/material';
import { Button } from '../../../../node_modules/@mui/material/index';
import { IoMdAdd } from 'react-icons/io';

const BannerFilter = (props) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <h1 className="font-semibold text-2xl">Banner</h1>
        <Button variant="contained" startIcon={<IoMdAdd />} onClick={() => props.onCreate()}>
          Thêm
        </Button>
      </Stack>
    </Box>
  );
};

export default BannerFilter;
