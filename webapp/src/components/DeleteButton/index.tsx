import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { MarkerContext } from '../../context/MarkersContext';
import { useContext,useState} from "react";
import { Types } from '../../types/ContextActionTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    id: string;
  }

function DeleteButton( { id }: Props) {
    
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(MarkerContext)


  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleCloseAccept = () => {
    dispatch({ type: Types.DELETE, payload: { id } })
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={ t('sidebar.list.delete.tooltip') }>
        <IconButton onClick={handleClickOpen}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { t('sidebar.list.delete.confirm.title') }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          { t('sidebar.list.delete.confirm.body') }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>{ t('sidebar.list.delete.confirm.no') }</Button>
          <Button onClick={handleCloseAccept}>
          { t('sidebar.list.delete.confirm.yes') }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteButton;