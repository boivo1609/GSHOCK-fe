/* eslint-disable no-unused-vars */
import { Box, Fade, LinearProgress, Button } from '@mui/material';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import MainCard from 'components/MainCard';
import WrapperTable from 'components/table/WrapperTable';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { string } from 'prop-types';
import * as actions from './api/actions';
import DanhmucCreateDialog from './Create';
import Filter from './Filter';
import ConfirmDialog from 'components/dialog/ConfirmDialog';

const DanhMucList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [selectDanhmucId, setSelectDanhmucId] = React.useState(undefined);
  const [selectDanhmuc, setSelectDanhmuc] = React.useState(undefined);
  const { currentState } = useSelector((state) => ({ currentState: state.danhmucs }), shallowEqual);
  const { data, danhmuc, danhmucId, danhmucForEdit, listLoading, totalElements } = currentState;
  const [filter, setFilter] = useState({ name: '' });
  const navigation = {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getDanhMucPanigation({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage }
      })
    );
  }, [dispatch, danhmuc, danhmucId, danhmucForEdit, page, rowsPerPage, filter]);
  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'name', label: 'Tên danh mục' },
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
    setSelectDanhmuc(item);
    setIsEdit(true);
    setOpen(true);
  }
  function handleDelete(danhmucId) {
    setOpenConfirm(true);
    setSelectDanhmucId(danhmucId);
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
  const handleDeleteDanhmuc = () => {
    dispatch(actions.deleteDanhmuc(selectDanhmucId));
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
            component={'Danhmuc'}
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
      {open && <DanhmucCreateDialog open closeCreateDialog={closeCreateDialog} data={selectDanhmuc} isEdit={isEdit} />}
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Xóa"
          content="Bạn có chắc chắn xóa danh mục này?"
          action={
            <Button variant="contained" color="error" onClick={handleDeleteDanhmuc}>
              Xóa
            </Button>
          }
        />
      )}
    </>
  );
};

export default DanhMucList;
