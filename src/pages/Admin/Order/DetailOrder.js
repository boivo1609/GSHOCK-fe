import React from 'react';
import { string, number } from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import WrapperTable from 'components/table/WrapperTable';

import { Dialog, DialogTitle, Slide, Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailOrderCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };

  const headRows = [
    { id: 'stt', label: 'STT' },
    { id: 'name', label: 'Tên sp' },
    { id: 'image', label: 'Hình ảnh' },
    { id: 'categoryId', label: 'Danh mục' },
    { id: 'cartQuantity', label: 'Số lượng' },
    { id: 'price_discount', label: 'Giá tiền' }
  ];
  const mapKey = [
    { label: 'name', type: string },
    { label: 'image', type: string },
    { label: 'categoryId', type: string },
    { label: 'cartQuantity', type: number },
    { label: 'price_discount', type: number }
  ];
  return (
    <>
      <Dialog open={props.open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} maxWidth="xl">
        <DialogTitle sx={{ fontSize: '15px', fontWeight: 700 }}>Chi tiết đơn hàng</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Box sx={{ width: '800px' }}>
            <WrapperTable isPagination displayTableTitle={headRows} displayRowData={mapKey} data={props?.data?.cart} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailOrderCreateDialog;
