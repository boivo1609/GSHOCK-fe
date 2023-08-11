/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { IconButton, Stack, TablePagination, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Label from 'components/label/Label';
import SimpleBarScroll from 'components/third-party/SimpleBar';
import moment from 'moment';
import vi from 'moment/locale/vi';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai';
import { convertToVND } from 'utils/convertPrice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
const WrapperTable = (props) => {
  const dispatch = useDispatch();
  const { currentState } = useSelector((state) => ({ currentState: state.auth }), shallowEqual);
  console.log(currentState);

  const handeDelete = (id) => {
    props.onDeleteRow(id);
  };
  function handleEdit(row) {
    props.onEditRow(row);
  }
  const handeDeleteImage = (id, imagePublicId) => {
    props.onDeleteRowImage(id, imagePublicId);
  };
  function handleChangePage(event, newPage) {
    props.onChangePage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    props.onChangeRowsPerPage(+event.target.value);
  }

  return (
    <>
      <TableContainer>
        <SimpleBarScroll>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: '#F8F8F8' }}>
              <TableRow>
                {props.displayTableTitle.map((row) => (
                  <TableCell key={'h' + row.id}>
                    <span className="font-weight-bolder text-white-75 font-size-lg">{row.label}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data?.map((row, index) => {
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                    <TableCell align="left">{index + 1}</TableCell>
                    {props.displayRowData.map((item, idx) => {
                      if (item.label === 'status') {
                        if (row.status === 'active') {
                          if (props.component === 'Product') {
                            return (
                              <TableCell key={idx}>
                                <Label
                                  variant="soft"
                                  color="success"
                                  className="cursor-pointer"
                                  onClick={() => props.onUpdateStatus(row._id)}
                                >
                                  Hoạt động
                                </Label>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={idx}>
                              <Label variant="soft" color="success">
                                Hoạt động
                              </Label>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={idx}>
                              <Label variant="soft" color="error">
                                Dừng hoạt động
                              </Label>
                            </TableCell>
                          );
                        }
                      }
                      if (item.label === 'allow_status') {
                        if (row.allow_status === 0) {
                          if (currentState?.authToken?.user?.role === 'admin') {
                            return (
                              <TableCell key={idx}>
                                <Label
                                  variant="soft"
                                  color="warning"
                                  className="cursor-pointer"
                                  onClick={() => props.onDuyetDonHang(row._id)}
                                >
                                  Chưa duyệt
                                </Label>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={idx}>
                              <Label variant="soft" color="warning">
                                Chưa duyệt
                              </Label>
                            </TableCell>
                          );
                        }
                        if (row.allow_status === 2) {
                          return (
                            <TableCell key={idx}>
                              <Label variant="soft" color="error">
                                Đã hủy đơn
                              </Label>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={idx}>
                            <Label variant="soft" color="success">
                              Đã duyệt
                            </Label>
                          </TableCell>
                        );
                      }
                      if (item.label === 'createdAt') {
                        return <TableCell key={idx}>{moment(row[item.label]).locale('vi', vi).format('L')}</TableCell>;
                      }
                      if (item.label === 'categoryId') {
                        return (
                          <TableCell sx={{ minWidth: '150px' }} key={idx}>
                            {row?.categoryId?.name}
                          </TableCell>
                        );
                      }
                      if (item.label === 'price' || item.label === 'price_discount' || item.label === 'total_price') {
                        return (
                          <TableCell sx={{ minWidth: '120px' }} key={idx}>
                            {convertToVND(row[item.label])}
                          </TableCell>
                        );
                      }
                      if (item.label === 'discount') {
                        return (
                          <TableCell sx={{ minWidth: '120px' }} key={idx}>
                            {`${row[item.label]}%`}
                          </TableCell>
                        );
                      }
                      if (item.label === 'colors') {
                        return (
                          <TableCell key={idx} sx={{ minWidth: '150px' }}>
                            <Stack flexWrap={'wrap'} direction="row" gap={1}>
                              {row?.colors?.map((item) => (
                                <Label key={item._id} variant="soft" color="primary">
                                  {item.name}
                                </Label>
                              ))}
                            </Stack>
                          </TableCell>
                        );
                      }
                      if (item.label === 'imageBanner' || item.label === 'image') {
                        return (
                          <TableCell key={idx} sx={{ minWidth: '100px' }}>
                            <img src={row[item.label]} alt="Ảnh lỗi" className="w-full h-[70px]" />
                          </TableCell>
                        );
                      }
                      if (item.label === 'orderStatus') {
                        if (row.orderStatus == 'cash') {
                          return (
                            <TableCell sx={{ minWidth: '150px' }} key={idx}>
                              Tiền mặt
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell sx={{ minWidth: '150px' }} key={idx}>
                            ZaloPay
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={idx} sx={{ minWidth: '150px' }}>
                          {row[item.label]}
                        </TableCell>
                      );
                    })}
                    {(props.component === 'Danhmuc' || props.component === 'Color') && (
                      <TableCell align="left" sx={{ minWidth: '150px' }}>
                        <Stack direction="row">
                          <Tooltip title="Cập nhật">
                            <IconButton onClick={(e) => handleEdit(row)}>
                              <FiEdit className="text-blue-500"></FiEdit>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton onClick={(e) => handeDelete(row._id)}>
                              <BsTrash className="text-red-500"></BsTrash>
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    )}
                    {props.component === 'Banner' && (
                      <TableCell align="left" sx={{ minWidth: '150px' }}>
                        <Tooltip title="Xóa">
                          <IconButton onClick={(e) => handeDeleteImage(row._id, row.imagePublicId)}>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                    {props.component === 'Product' && (
                      <TableCell align="left" sx={{ minWidth: '150px' }}>
                        <Stack direction="row">
                          <Tooltip title="Cập nhật">
                            <IconButton onClick={(e) => handleEdit(row)}>
                              <FiEdit className="text-blue-500"></FiEdit>
                            </IconButton>
                          </Tooltip>
                          {row.status === 'reject' && (
                            <Tooltip title="Xóa">
                              <IconButton onClick={(e) => handeDelete(row._id)}>
                                <BsTrash className="text-red-500"></BsTrash>
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    )}
                    {props.component === 'Order' && (
                      <TableCell align="left" sx={{ minWidth: '100px' }}>
                        <Stack direction="row">
                          <Tooltip title="Chi tiết đơn hàng">
                            <IconButton onClick={(e) => props.onOnpenDetails(row)}>
                              <AiFillEye className="text-blue-500"></AiFillEye>
                            </IconButton>
                          </Tooltip>
                          {currentState?.authToken?.user?.role === 'user' && row.allow_status === 0 && (
                            <Tooltip title="Hủy đơn hàng">
                              <IconButton onClick={(e) => props.onHuyDonHang(row._id)}>
                                <BsTrash className="text-red-500"></BsTrash>
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SimpleBarScroll>
        {!props.isPagination && (
          <TablePagination
            component="div"
            labelRowsPerPage="Số dòng mỗi trang"
            rowsPerPageOptions={[5, 10, 25]}
            count={props.total || 0}
            rowsPerPage={props.rowsPerPage || 10}
            page={props.page || 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </>
  );
};

export default WrapperTable;
