import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { MarkerContext, Types } from '../../context/MarkersContext';
import { useContext,useState} from "react";

interface Props {
    name: any;
  }

function DeleteButton( { name }: Props) 
 {
    const [open, setOpen] = useState(false);
    const { dispatch } = useContext(MarkerContext)


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleCloseAccept = () => {
        dispatch({ type: Types.DELETE, payload: { name: name } })
        setOpen(false);
      };

      const handleCloseCancel = () => {
        setOpen(false);
      };


    return(
        <>
        <IconButton onClick={handleClickOpen}>
          <CloseIcon />
        </IconButton>
        <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro de que quiere borrar el marcador?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Una vez borrado el marcador no habrá forma de recuperar la información.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>Cancelar</Button>
          <Button onClick={handleCloseAccept} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}



export default DeleteButton;

