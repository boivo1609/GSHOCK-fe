/* eslint-disable react/prop-types */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
const CustomerPage = ({ children }) => {
  return (
    <Stack direction="column" justifyContent="space-between">
      <Box>
        <Header></Header>
        <Box sx={{ minHeight: '100vh' }}>{children}</Box>
      </Box>
      <Box flex={1}>
        <Footer></Footer>
      </Box>
    </Stack>
  );
};

export default CustomerPage;
