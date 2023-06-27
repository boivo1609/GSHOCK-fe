/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogTitle, Slide, Button, Typography, Stack, FormControl, Box, IconButton, InputAdornment } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as actions from './api/actionsProduct';
import * as danhmucActions from '../Danhmuc/api/actions';
import NumericFormat from 'react-number-format';

import * as colorActions from '../Mausac/api/actionsColor';
import RHFTextField from 'components/form/RHFTextField';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'components/form/FormProvider';
import RHFAutocomplete from 'components/form/RHFAutocomplete';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { urlToFile } from 'utils/fileUtils';
import RHFTextFieldFormatVND from 'components/form/RHFTextFieldNumber';
import RHFTextFieldNumber from 'components/form/RHFTextFieldNumber';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  marginBottom: 16,
  height: 'auto'
};

const thumb = {
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  width: '100%',
  height: '100%',
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  position: 'relative'
};

const img = {
  // display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const NumericFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});
const ProductCreateDialog = (props) => {
  const dispatch = useDispatch();
  const { currentState, colorState } = useSelector((state) => ({ currentState: state.danhmucs, colorState: state.colors }), shallowEqual);
  const { data: listDanhMuc } = currentState;
  const { data: listColor } = colorState;
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });
  const productSchema = Yup.object().shape({
    name: Yup.string().required('Tên sản phẩm là trường bắt buộc'),
    soLuongSanPham: Yup.string().required('Số lượng là trường bắt buộc')
  });
  const defaultValues = {
    name: '',
    price: 0,
    soLuongSanPham: '',
    discountPercent: '',
    categoryId: null,
    colors: []
  };
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues:
      {
        name: props.data?.name,
        price: props.data?.price.toString(),
        colors: props.data?.colors?.map((item) => ({
          _id: item._id,
          name: item.name
        })),
        soLuongSanPham: props.data?.so_luong?.toString(),
        discountPercent: props.data?.discount.toString(),
        categoryId: {
          id: props.data?.categoryId?._id,
          name: props.data?.categoryId?.name
        }
      } || defaultValues
  });
  useEffect(() => {
    dispatch(danhmucActions.getAllDanhMuc());
    dispatch(colorActions.getAllColor());
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image']
      ]
    }),
    []
  );
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods;
  useEffect(() => {
    if (props.isEdit) {
      const fetchData = async () => {
        if (props.isEdit) {
          if (props.data && props.data.image) {
            const file = await urlToFile(props.data.image);
            setFiles([file]);
          }
          setContent(props.data?.discription);
        }
      };
      fetchData();
    } else {
      handleResetData();
    }
  }, [props.data, props.isEdit, setValue]);
  const onSubmit = async (values) => {
    try {
      if (props.isEdit) {
        const formData = new FormData();
        const transformData = {
          ...values,
          categoryId: values.categoryId.id,
          discription: content
          // imageToDeletePublicId: props.data?.imagePublicId
        };
        formData.append('image', files?.[0]);
        formData.append('data', JSON.stringify(transformData));
        dispatch(actions.updateProduct(props.data._id, formData));
      } else {
        const transformData = {
          ...values,
          categoryId: values.categoryId.id,
          discription: content
        };
        const formData = new FormData();
        formData.append('image', files?.[0]);
        formData.append('data', JSON.stringify(transformData));
        dispatch(actions.createProduct(formData));
      }
      handleCloseDialog();
      reset(defaultValues);
      handleResetData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const handleDeleteFile = () => {
    setFiles([]);
  };
  const handleResetData = () => {
    reset(defaultValues);
    setFiles([]);
    setContent('');
  };
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <IconButton
          sx={{ position: 'absolute', right: 5, top: 5, borderRadius: '50%', background: 'white', zIndex: '100' }}
          className="hover:bg-slate-300"
          onClick={() => handleDeleteFile()}
        >
          <AiOutlineCloseCircle className="w-6 h-6" />
        </IconButton>
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <>
      <Dialog open={props.open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} maxWidth="xl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontSize: '15px', fontWeight: 700 }}>{props.isEdit ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</DialogTitle>

          <DialogContent sx={{ mt: 1, width: ' 730px' }}>
            <Stack direction="row" spacing={2} mb={4}>
              <FormControl fullWidth>
                <Typography mb={1}>Tên sản phẩm</Typography>
                <RHFTextField name="name" />
              </FormControl>
              <Stack direction="row">
                <FormControl width="30">
                  <Typography mb={1}>Số lượng</Typography>
                  <RHFTextField name="soLuongSanPham" disabled={props.isEdit} />
                </FormControl>
                {props.isEdit && !open && (
                  <Button className="w-[200px] h-8 mt-9 ml-1" size="small" variant="text" color="primary" onClick={() => setOpen(true)}>
                    Thêm số lượng
                  </Button>
                )}
              </Stack>
              {open && (
                <Stack direction="row">
                  <FormControl width="30">
                    <Typography mb={1}>Thêm số lượng</Typography>
                    <RHFTextField name="soLuongThem" />
                  </FormControl>
                  <Button variant="text" className="w-[250px] h-8 mt-9 ml-1" size="small" color="error" onClick={() => setOpen(false)}>
                    Xóa thêm số lượng
                  </Button>
                </Stack>
              )}
            </Stack>
            <Stack direction="row" spacing={2} mb={4}>
              <FormControl fullWidth>
                <Typography mb={1}>Màu sắc</Typography>
                <RHFAutocomplete
                  name="colors"
                  multiple
                  fullWidth
                  options={listColor ? listColor.map((item) => ({ _id: item._id.toString(), name: item.name })) : []}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  onChange={(e, newValue) => {
                    setValue('colors', newValue);
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography mb={1}>Danh mục</Typography>
                <RHFAutocomplete
                  name="categoryId"
                  fullWidth
                  options={listDanhMuc ? listDanhMuc.map((item) => ({ id: item._id, name: item.name })) : []}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    setValue('categoryId', newValue);
                  }}
                />
              </FormControl>
            </Stack>
            <Stack direction="column" spacing={1} mb={2}>
              <Typography>Hình ảnh</Typography>
              <section className="container w-[700px] h-auto p-4">
                <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-2 border-sky-500 p-4">
                  <input {...getInputProps()} />
                  <Box className="flex items-center justify-center flex-col" sx={{ height: '150px !important' }}>
                    <p>Kéo thả hoặc tải tệp lên ở đây</p>
                    <img src="/upload.png" alt="" className="w-20 h-20" />
                  </Box>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
            </Stack>
            <Stack direction="row" spacing={2} mb={4}>
              <FormControl fullWidth>
                <Typography mb={1}>Giá </Typography>
                <RHFTextFieldNumber
                  name="price"
                  InputProps={{
                    inputComponent: NumericFormatCustom,
                    endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography mb={1}> % Giảm</Typography>
                <RHFTextFieldNumber
                  name="discountPercent"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                  }}
                />
              </FormControl>
            </Stack>
            <Stack direction="column">
              <Typography mb={1}>Chi tiet sp</Typography>
              <div className="w-full entry-content quill">
                <ReactQuill theme="snow" value={content} modules={modules} onChange={setContent} />
              </div>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCloseDialog} variant="outlined">
              Hủy
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {props.isEdit ? 'Cập nhật' : 'Thêm'}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ProductCreateDialog;
