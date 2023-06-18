import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import './loading.scss';
import { Backdrop, CircularProgress } from '../../../node_modules/@mui/material/index';
const Loading = () => {
  const { currentState } = useSelector((state) => ({ currentState: state.roots }), shallowEqual);
  const { isLoading } = currentState;
  return (
    <>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Loading;
