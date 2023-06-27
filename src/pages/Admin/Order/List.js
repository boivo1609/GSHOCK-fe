/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Filter from './Filter';
import { number, string } from 'prop-types';
import ConfirmDialog from 'components/dialog/ConfirmDialog';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import WrapperTable from 'components/table/WrapperTable';
import * as actions from '../Order/api/orderActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Box, Fade, LinearProgress, Card, Button } from '@mui/material';
import DetailOrderCreateDialog from './DetailOrder';
const OrderList = () => {
  const dispatch = useDispatch();
  const navigation = {};
  const [page, setPage] = React.useState(0);
  const [openDetailOrder, setOpenDetailOrder] = React.useState(false);
  const [dataRow, setDataRow] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentState } = useSelector((state) => ({ currentState: state.orders }), shallowEqual);

  const { data, order, orderId, orderForEdit, listLoading, totalElements, duyetDonHangId } = currentState;
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [idOrder, setIdOrder] = React.useState(null);
  const [filter, setFilter] = React.useState({ name: '' });
  useEffect(() => {
    dispatch(
      actions.getOrderPanigation({
        params: { ...filter, current_page: page + 1, per_page: rowsPerPage }
      })
    );
  }, [dispatch, order, orderId, orderForEdit, page, rowsPerPage, filter, duyetDonHangId]);
  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'order_id', label: 'Mã đơn hàng' },
    { id: 'firstName', label: 'Họ ' },
    { id: 'lastName', label: 'Tên' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'ĐChỉ' },
    { id: 'phone', label: 'Phone' },
    { id: 'orderStatus', label: 'Phương thức thanh toán' },
    { id: 'total_price', label: 'Giá ' },
    { id: 'total_product', label: 'Số lượng' },
    { id: 'allow_status', label: 'Trạng thái' },
    { id: 'createdAt', label: 'Ngày đặt hàng' },
    { id: 'action', label: 'Hành động' }
  ];
  const mapKey = [
    { label: 'order_id', type: string },
    { label: 'firstName', type: string },
    { label: 'lastName', type: string },
    { label: 'email', type: string },
    { label: 'address', type: string },
    { label: 'phone', type: number },
    { label: 'orderStatus', type: string },
    { label: 'total_price', type: number },
    { label: 'total_product', type: number },
    { label: 'allow_status', type: string },
    { label: 'createdAt', type: string }
  ];
  function handleChangePage(value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  const handleFilter = (value) => {
    setFilter(value);
  };
  const handleDuyetDonHang = (id) => {
    setOpenConfirm(true);
    setIdOrder(id);
  };
  const handleOpenOrderDetail = (row) => {
    setOpenDetailOrder(true);
    setDataRow(row);
  };
  const conFirmDuyetDonHang = () => {
    dispatch(actions.duyetDonHang(idOrder));
    setOpenConfirm(false);
  };
  return (
    <>
      <Box>
        <Breadcrumbs navigation={navigation} title />
        <Card sx={{ paddingX: 2 }}>
          <Filter onFilter={handleFilter} />
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
            component={'Order'}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={data}
            rowsPerPage={rowsPerPage}
            page={page}
            total={totalElements}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onDuyetDonHang={handleDuyetDonHang}
            onOnpenDetails={handleOpenOrderDetail}
          />
        </Card>
      </Box>

      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          title="Duyệt đơn hàng"
          content="Bạn có chắc chắn duyệt đơn đặt hàng này?"
          action={
            <Button variant="contained" color="error" onClick={conFirmDuyetDonHang}>
              Duyệt đơn hàng
            </Button>
          }
        />
      )}
      {openDetailOrder && <DetailOrderCreateDialog open closeCreateDialog={() => setOpenDetailOrder(false)} data={dataRow} />}
    </>
  );
};

export default OrderList;
