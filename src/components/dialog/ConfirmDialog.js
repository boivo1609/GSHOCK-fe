/* eslint-disable react/prop-types */
// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';
//

// ----------------------------------------------------------------------

export default function ConfirmDialog({ title, content, action, open, onClose, ...other }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2, fontSize: '15px', fontWeight: '700' }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
