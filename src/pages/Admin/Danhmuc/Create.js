/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogTitle, Slide, Button, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import * as actions from './api/actions';
import RHFTextField from 'components/form/RHFTextField';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'components/form/FormProvider';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DanhmucCreateDialog = (props) => {
  const dispatch = useDispatch();

  const danhMucSchema = Yup.object().shape({
    name: Yup.string().required('Tên danh mục là trường bắt buộc')
  });

  const defaultValues = {
    name: props.data?.name || ''
  };

  const methods = useForm({
    resolver: yupResolver(danhMucSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (values) => {
    try {
      if (props.isEdit) {
        dispatch(actions.updateDanhmuc(props.data._id, values));
      } else {
        dispatch(actions.createDanhmuc(values));
      }
      handleCloseDialog();
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      setValue('name', props.data.name);
    } else if (!props.isEdit) {
      setValue('name', '');
    }
  }, [props.data, props.isEdit, setValue]);
  return (
    <>
      <Dialog open={props.open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} maxWidth="lg">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontSize: '15px', fontWeight: 700 }}>{props.isEdit ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}</DialogTitle>

          <DialogContent sx={{ mt: 1 }}>
            <Typography sx={{ mb: 1 }}>Tên danh mục</Typography>
            <RHFTextField name="name" sx={{ minWidth: '300px' }} />
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

export default DanhmucCreateDialog;
