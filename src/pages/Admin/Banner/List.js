import { Box, Card, Button } from '@mui/material';
import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../components/dialog/ConfirmDialog';
import WrapperTable from '../../../components/table/WrapperTable';

import BannerCreateDialog from './Create';
import Filter from './Filter';
import * as actions from './api/actionsBanner';

const BannerList = () => {
  const defaultFilter = {
    name: ''
  };

  const [filter, setFilter] = React.useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePublicId, setImagePublicId] = useState('');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectCateId, setSelectCateId] = React.useState(undefined);
  const [selectCate, setSelectCate] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentState } = useSelector((state) => ({ currentState: state.banners }), shallowEqual);
  const { data, banner, bannerId, listLoading, totalElements } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getBannerPanigation({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage }
      })
    );
  }, [dispatch, banner, bannerId, filter, page, rowsPerPage]);

  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'imageBanner', label: 'Hình ảnh' },
    { id: 'status', label: 'Trạng thái' },
    { id: 'createdAt', label: 'Ngày tạo' },
    { id: 'action', label: 'Hành động' }
  ];
  const mapKey = [
    { label: 'imageBanner', type: string },
    { label: 'status', type: string },
    { label: 'createdAt', type: string }
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
  function handleDelete(id, imagePublicId) {
    setOpenDelete(true);
    setSelectCateId(id);
    setImagePublicId(imagePublicId);
  }

  function handleEdit(item) {
    setSelectCate(item);
    setIsEdit(true);
    setOpen(true);
  }

  function handleSearch(filter) {
    setFilter(filter);
  }
  function handleChangePage(value) {
    setPage(value);
  }
  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  const handleDeleteBanner = () => {
    dispatch(actions.deleteBanner(selectCateId, imagePublicId));
    setOpenDelete(false);
  };
  return (
    <Box>
      <Card sx={{ padding: '20px' }}>
        <Filter onCreate={openCreateDialog} onSearch={handleSearch} />
        <Box mt={4}>
          <WrapperTable
            component={'Banner'}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={data}
            onDeleteRowImage={handleDelete}
            onEditRow={handleEdit}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            listLoading={listLoading}
            total={totalElements}
          />
        </Box>
      </Card>
      {open && <BannerCreateDialog open closeCreateDialog={closeCreateDialog} data={selectCate} isEdit={isEdit} />}
      {openDelete && (
        <ConfirmDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title="Xóa"
          content="Bạn có chắc chắn xóa banner này?"
          action={
            <Button variant="contained" color="error" onClick={handleDeleteBanner}>
              Xóa
            </Button>
          }
        />
      )}
    </Box>
  );
};

export default BannerList;
