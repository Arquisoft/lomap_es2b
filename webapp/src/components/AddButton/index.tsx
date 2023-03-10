import { Fab } from '@mui/material'
import { RiMapPinAddFill } from 'react-icons/ri';

interface Props {
    onClick: () => void;
  }

function AddButton( { onClick }: Props) 
 {



    return(
        <Fab onClick={()=>onClick}>
            <RiMapPinAddFill />
        </Fab>
    )
}

export default AddButton;