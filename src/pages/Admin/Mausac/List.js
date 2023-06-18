/* eslint-disable no-unused-vars */
import { Box, Fade, LinearProgress, Button } from '@mui/material';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import MainCard from 'components/MainCard';
import WrapperTable from 'components/table/WrapperTable';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { string } from 'prop-types';
import * as actions from './api/actionsColor';
import ColorCreateDialog from './Create';
import Filter from './Filter';
import ConfirmDialog from 'components/dialog/ConfirmDialog';

const ColorList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [selectColorId, setSelectColorId] = React.useState(undefined);
  const [selectColor, setSelectColor] = React.useState(undefined);
  const { currentState } = useSelector((state) => ({ currentState: state.colors }), shallowEqual);
  const { data, color, colorId, colorForEdit, listLoading, totalElements } = currentState;
  const [filter, setFilter] = useState({ name: '' });
  const navigation = {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getColorPanigation({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage }
      })
    );
  }, [dispatch, color, colorId, colorForEdit, page, rowsPerPage, filter]);
  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'name', label: 'Tên màu sắc' },
    { id: 'createdAt', label: 'Ngày tạo' },
    { id: 'status', label: 'Trạng thái' },
    { id: 'action', label: 'Hành động' }
  ];
  const mapKey = [
    { label: 'name', type: string },
    { label: 'createdAt', type: string },
    { label: 'status', type: string }
  ];
  function openCreateDialog() {
    setIsEdit(false);
    setOpen(true);
  }
  function closeCreateDialog(status) {
    if (status === false) {
      setOpen(status);
    }
  }

  function handleEdit(item) {
    setSelectColor(item);
    setIsEdit(true);
    setOpen(true);
  }
  function handleDelete(colorId) {
    setOpenConfirm(true);
    setSelectColorId(colorId);
  }
  function handleCloseConfirm() {
    setOpenConfirm(false);
  }
  function handleChangePage(value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  const handleFilter = (value) => {
    setFilter(value);
  };
  const handleDeleteColor = () => {
    dispatch(actions.deleteColor(selectColorId));
    handleCloseConfirm();
  };
  return (
    <>
      <Box>
        <Breadcrumbs navigation={navigation} title />
        <MainCard>
          <Filter onCreate={openCreateDialog} onFilter={handleFilter} />
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
            component={'Color'}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={data}
            onDeleteRow={handleDelete}
            onEditRow={handleEdit}
            rowsPerPage={rowsPerPage}
            page={page}
            total={totalElements}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </MainCard>
      </Box>
      {open && <ColorCreateDialog open closeCreateDialog={closeCreateDialog} data={selectColor} isEdit={isEdit} />}
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Xóa"
          content="Bạn có chắc chắn xóa màu sắc này?"
          action={
            <Button variant="contained" color="error" onClick={handleDeleteColor}>
              Xóa
            </Button>
          }
        />
      )}
    </>
  );
};

export default ColorList;
