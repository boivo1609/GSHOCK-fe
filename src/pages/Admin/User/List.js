import React, { useEffect } from 'react';
import { string } from 'prop-types';
import MainCard from 'components/MainCard';
import * as actions from './api/UserActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import WrapperTable from 'components/table/WrapperTable';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { Box, Fade, LinearProgress } from '@mui/material';
const UserList = () => {
  const navigation = {};
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { currentState } = useSelector((state) => ({ currentState: state.users }), shallowEqual);

  const { data, user, userId, listLoading, totalElements } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getUserPanigation({
        params: { current_page: page + 1, per_page: rowsPerPage }
      })
    );
  }, [dispatch, user, userId, page, rowsPerPage]);
  function handleChangePage(value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'name', label: 'Tên người dùng' },
    { id: 'email', label: 'Email' },
    { id: 'createdAt', label: 'Ngày tạo' },
    { id: 'status', label: 'Trạng thái' }
  ];
  const mapKey = [
    { label: 'name', type: string },
    { label: 'email', type: string },
    { label: 'createdAt', type: string },
    { label: 'status', type: string }
  ];
  return (
    <>
      <Box>
        <Breadcrumbs navigation={navigation} title />
        <MainCard>
          <Fade
            in={listLoading}
            style={{
              transitionDelay: listLoading ? '800ms' : '0ms'
            }}
            unmountOnExit
          >
            <LinearProgress color="secondary" />
          </Fade>
          <WrapperTable
            component={'active'}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={data}
            rowsPerPage={rowsPerPage}
            page={page}
            total={totalElements}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </MainCard>
      </Box>
    </>
  );
};

export default UserList;
