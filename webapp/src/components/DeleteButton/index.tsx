import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MarkerContext } from '../../context/MarkersContext';
import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { RoutesContext } from '../../context/RoutesContext';
import { Types } from '../../types/ContextActionTypes';

interface Props {
  id: string;
  type: 'marker' | 'route';
}

function DeleteButton({ id, type }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { dispatch: markerDispatch } = useContext(MarkerContext);
  const { dispatch: routeDispatch } = useContext(RoutesContext); // Obtener el dispatch del contexto de las rutas
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAccept = () => {
    if (type === 'marker') {
      markerDispatch({ type: Types.DELETE, payload: { id } }); // Usar el tipo de acci贸n correspondiente a la eliminaci贸n de marcadores
    } else if (type === 'route') {
      routeDispatch({ type: Types.DELETE, payload: { id } }); // Usar el tipo de acci贸n correspondiente a la eliminaci贸n de rutas
    }
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={t('sidebar.list.delete.tooltip')}>
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
          {t( type === 'marker' ? 'sidebar.list.delete.confirm.title' : 'sidebar.routes.delete.confirm.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t( type === 'marker' ? 'sidebar.list.delete.confirm.title' : 'sidebar.routes.delete.confirm.body')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>{t('sidebar.list.delete.confirm.no')}</Button>
          <Button onClick={handleCloseAccept}>
            {t('sidebar.list.delete.confirm.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;