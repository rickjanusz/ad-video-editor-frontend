import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Too big</DialogTitle>
      Get yo life together.
    </Dialog>
  );
}

export default function DialogAlert() {
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        dialogOpen={dialogOpen}
        onClose={handleClose}
      />
    </div>
  );
}
