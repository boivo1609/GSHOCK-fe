/* eslint-disable react/prop-types */
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackbarCustom = (props) => {
  console.log(props);
  return (
    <Snackbar sx={{ zIndex: 9990 }} open={props.open} autoHideDuration={1000} onClose={props.handleClose}>
      <Alert severity={props.color} sx={{ width: '100%' }} onClose={props.handleClose}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;
