/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';

import { BsTrash } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as actions from './api/actionsBanner';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../../../node_modules/@mui/lab/index';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
const BannerCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
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
  const handleDeleteFile = () => {
    setFiles([]);
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
  }, []);
  const handleBanner = () => {
    if (props.isEdit) {
      //xử lý update
    } else {
      const formData = new FormData();
      let file = files?.[0];
      formData.append('image', file);
      dispatch(actions.createBanner(formData));
    }
    handleCloseDialog();
    setFiles([]);
  };
  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <DialogTitle>{'Thêm ảnh Banner'}</DialogTitle>
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
        <DialogActions>
          <Button color="error" onClick={handleCloseDialog} variant="outlined">
            Hủy
          </Button>
          <LoadingButton type="submit" variant="contained" onClick={() => handleBanner()}>
            Thêm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BannerCreateDialog;
