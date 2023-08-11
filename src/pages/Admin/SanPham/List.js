import { Box, Fade, LinearProgress, Button, Card } from '@mui/material';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
// import MainCard from 'components/MainCard';
import WrapperTable from 'components/table/WrapperTable';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { number, string } from 'prop-types';
import * as actions from './api/actionsProduct';
import ConfirmDialog from 'components/dialog/ConfirmDialog';
import Filter from './Filter';
import ProductCreateDialog from './Create';
const ProductList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [selectProductId, setSelectProductId] = React.useState(undefined);
  const [selectProduct, setSelectProduct] = React.useState(undefined);
  const { currentState } = useSelector((state) => ({ currentState: state.products }), shallowEqual);
  const [openConfirmUpdateStatus, setOpenConfirmUpdateStatus] = React.useState(false);
  const { data, product, productId, productForEdit, listLoading, totalElements, productIdUpdated } = currentState;
  const [filter, setFilter] = useState({ name: '' });
  const navigation = {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getProductPanigation({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage }
      })
    );
  }, [dispatch, product, productId, productForEdit, page, rowsPerPage, filter, productIdUpdated]);
  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'name', label: 'Tên sản phẩm' },
    { id: 'categoryId', label: 'Danh mục' },
    { id: 'image', label: 'Hình ảnh' },
    { id: 'colors', label: 'Màu sắc' },
    { id: 'price', label: 'Giá' },
    { id: 'discount', label: ' % Giảm giá' },
    { id: 'price_discount', label: 'Giá chính thức' },
    { id: 'so_luong', label: 'Số lượng' },
    { id: 'soluong_conlai', label: 'Số lượng còn lại' },
    { id: 'createdAt', label: 'Ngày tạo' },
    { id: 'status', label: 'Trạng thái' },
    { id: 'action', label: 'Hành động' }
  ];
  const mapKey = [
    { label: 'name', type: string },
    { label: 'categoryId', type: string },
    { label: 'image', type: string },
    { label: 'colors', type: string },
    { label: 'price', type: number },
    { label: 'discount', type: number },
    { label: 'price_discount', type: number },
    { label: 'so_luong', type: number },
    { label: 'soluong_conlai', type: number },
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
    setSelectProduct(item);
    setIsEdit(true);
    setOpen(true);
  }
  function handleDelete(colorId) {
    setOpenConfirm(true);
    setSelectProductId(colorId);
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
  const handleDeleteProduct = () => {
    dispatch(actions.deleteProduct(selectProductId));
    handleCloseConfirm();
  };
  const handleUpdateStatus = (id) => {
    setOpenConfirmUpdateStatus(true);
    setSelectProductId(id);
  };
  const handleChangeStatusProduct = () => {
    dispatch(actions.updateStatusProduct(selectProductId));
    setOpenConfirmUpdateStatus(false);
  };
  return (
    <>
      <Box>
        <Breadcrumbs navigation={navigation} title />
        <Card sx={{ paddingX: 2 }}>
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
            component={'Product'}
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
            onUpdateStatus={handleUpdateStatus}
          />
        </Card>
      </Box>
      {open && <ProductCreateDialog open closeCreateDialog={closeCreateDialog} data={selectProduct} isEdit={isEdit} />}
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Xóa"
          content="Bạn có chắc chắn xóa sản phẩm này?"
          action={
            <Button variant="contained" color="error" onClick={handleDeleteProduct}>
              Xóa
            </Button>
          }
        />
      )}
      {openConfirmUpdateStatus && (
        <ConfirmDialog
          open={openConfirmUpdateStatus}
          onClose={() => setOpenConfirmUpdateStatus(false)}
          title="Chuyển trạng thái"
          content="Bạn có chắc chắn chuyển trạng thái sản phẩm này?"
          action={
            <Button variant="contained" color="error" onClick={handleChangeStatusProduct}>
              Chuyển trạng thái
            </Button>
          }
        />
      )}
    </>
  );
};

export default ProductList;
