/* eslint-disable jsx-a11y/alt-text */
import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as actions from '../../Admin/User/api/UserActions';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import { urlToFile } from 'utils/fileUtils';
// import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, FormControl, Box, IconButton } from '@mui/material';
import FormProvider from 'components/form/FormProvider';
import RHFTextField from '../../../components/form/RHFTextField';
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
  width: '80%',
  height: '80%',
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
const UpdateUser = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { authState, userState } = useSelector((state) => ({ authState: state.auth, userState: state.users }), shallowEqual);
  const { user, userForEdit } = userState;
  useEffect(() => {
    dispatch(actions.getUserById({ params: { id: authState?.authToken?.user?._id } }));
  }, [authState?.authToken?.user?._id, dispatch, userForEdit]);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const userSchema = Yup.object().shape({
    name: Yup.string().required('Tên tài khoản là trường bắt buộc'),
    firstName: Yup.string().required('Họ là trường bắt buộc'),
    lastName: Yup.string().required('Tên là trường bắt buộc'),
    address: Yup.string().required('Địa chỉ là trường bắt buộc'),
    phone: Yup.string().matches(phoneRegExp, 'Số điện thoại phải đúng định dạng'),
    email: Yup.string().email('Email phải đúng định dạng').max(255).required('Email là trường bắt buộc')
  });
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
  const defaultValues = {
    name: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: ''
  };
  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues
  });
  useEffect(() => {
    setValue('name', user?.name);
    setValue('firstName', user?.firstName);
    setValue('lastName', user?.lastName);
    setValue('address', user?.address);
    setValue('phone', user?.phone);
    setValue('email', user?.email);
  }, [user]);
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;
  useEffect(() => {
    const fetchData = async () => {
      if (user?.image) {
        const file = await urlToFile(user?.image);
        setFiles([file]);
      }
    };
    fetchData();
  }, [user?.image]);
  const handleDeleteFile = () => {
    setFiles([]);
  };
  const handleResetData = () => {
    reset(defaultValues);
    setFiles([]);
  };
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      const transformData = {
        ...values

        // imageToDeletePublicId: props.data?.imagePublicId
      };

      formData.append('image', files?.[0]);

      formData.append('data', JSON.stringify(transformData));
      dispatch(actions.updateUser(authState?.authToken?.user?._id, formData));

      handleResetData();
    } catch (error) {
      console.error(error);
    }
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
    <CustomerPage>
      <Box>
        <h2 className="p-3">THÔNG TIN TÀI KHOẢN</h2>
        <MainCard>
          <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
            <div className="max-w-[1430px]   w-full mx-auto">
              <div className="-mx-4 w-auto max-w-[1430px] flex px-0 ">
                <div className="max-w-[60%] basis-[60%] col">
                  <Stack direction="row" spacing={2} mb={4}>
                    <FormControl fullWidth>
                      <Typography mb={1} fontWeight="bold">
                        Tên
                      </Typography>
                      <RHFTextField name="lastName" />
                    </FormControl>
                    <FormControl fullWidth>
                      <Typography mb={1} fontWeight="bold">
                        Họ
                      </Typography>
                      <RHFTextField name="firstName" />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2} mb={4}>
                    <FormControl fullWidth>
                      <Typography mb={1} fontWeight="bold">
                        Tên tài khoản
                      </Typography>
                      <RHFTextField name="name" />
                    </FormControl>
                    <FormControl fullWidth>
                      <Typography mb={1} fontWeight="bold">
                        Địa chỉ nhận hàng
                      </Typography>
                      <RHFTextField name="address" />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2} mb={4}>
                    <FormControl fullWidth>
                      <Typography mb={1} fontWeight="bold">
                        Số điện thoại
                      </Typography>
                      <RHFTextField name="phone" />
                    </FormControl>
                    <FormControl fullWidth>
                      <Typography mb={1} fontWeight="bold">
                        Email
                      </Typography>
                      <RHFTextField name="email" />
                    </FormControl>
                  </Stack>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    CẬP NHẬT
                  </LoadingButton>
                </div>
                <div className="col  max-w-[40%] basis-[40%]">
                  <Stack direction="column" spacing={1} mb={2}>
                    <Typography fontWeight="bold">Ảnh đại diện</Typography>
                    <section className="container w-[500px] h-auto p-4">
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
                </div>
              </div>
            </div>
          </FormProvider>
        </MainCard>
      </Box>
    </CustomerPage>
  );
};

export default UpdateUser;
