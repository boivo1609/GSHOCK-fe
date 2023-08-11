import WrapperTable from 'components/table/WrapperTable';
import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import React, { useEffect } from 'react';
import { Box, Button, LinearProgress, Fade, Typography } from '@mui/material';
import ConfirmDialog from 'components/dialog/ConfirmDialog';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import MainCard from 'components/MainCard';
import { NavLink } from 'react-router-dom';
import { string, number } from 'prop-types';
import * as actions from '../../Admin/Order/api/orderActions';
import DetailOrderCreateDialog from 'pages/Admin/Order/DetailOrder';
const OrderHistory = () => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [dataRow, setDataRow] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openDetailOrder, setOpenDetailOrder] = React.useState(false);
  const [idCancleOrder, setIdCancleOrder] = React.useState(null);
  const { orderState, currentState } = useSelector((state) => ({ orderState: state.orders, currentState: state.auth }), shallowEqual);

  const { orderHistory, deleteOrderId, listLoading, totalElements } = orderState;
  const user = currentState?.authToken?.user?._id;

  useEffect(() => {
    dispatch(
      actions.getOrderByUser({
        params: { current_page: page, per_page: rowsPerPage, user_id: user }
      })
    );
  }, [dispatch, rowsPerPage, user, page, deleteOrderId]);

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
  const handleOpenOrderDetail = (row) => {
    setOpenDetailOrder(true);
    setDataRow(row);
  };
  const handleCancle = (id) => {
    setOpenConfirm(true);
    setIdCancleOrder(id);
  };
  const conFirmHuyDonHang = () => {
    dispatch(actions.deleteOrderUser(idCancleOrder));
    setOpenConfirm(false);
  };
  return (
    <CustomerPage>
      <Box>
        <h2 className="p-3">LỊCH SỬ ĐẶT HÀNG</h2>
        {orderHistory?.length > 0 ? (
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
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={rowsPerPage}
              page={page}
              onHuyDonHang={handleCancle}
              component={'Order'}
              total={totalElements}
              data={orderHistory}
              displayTableTitle={headRows}
              displayRowData={mapKey}
              onOnpenDetails={handleOpenOrderDetail}
            />
            {openConfirm && (
              <ConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                title="Hủy đơn hàng"
                content="Bạn có chắc chắn hủy đơn đặt hàng này?"
                action={
                  <Button variant="contained" color="error" onClick={conFirmHuyDonHang}>
                    Hủy đơn hàng
                  </Button>
                }
              />
            )}
            {openDetailOrder && <DetailOrderCreateDialog open closeCreateDialog={() => setOpenDetailOrder(false)} data={dataRow} />}
          </MainCard>
        ) : (
          <div className="flex flex-col items-center">
            <img src="/2038854.png" alt="" className="w-[16rem] h-[16rem] mb-6" />
            <Typography sx={{ p: 2, fontWeight: 'bold', textTransform: 'uppercase', fontSize: '20px' }}>
              Chưa đặt hàng, không thể xem lịch sử đơn hàng
            </Typography>
            <NavLink
              to="/products"
              className="text-[#ed1c24] mt-10  border-2 text-xs border-solid  border-current bg-transparent leading-[2.19em] button border-cart uppercase"
            >
              ← Quay trở lại cửa hàng{' '}
            </NavLink>
          </div>
        )}
      </Box>
    </CustomerPage>
  );
};

export default OrderHistory;
