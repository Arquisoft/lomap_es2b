import { IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import { useSession } from '@inrupt/solid-ui-react';
import { saveMarkerToPublic } from '../../helpers/SolidHelper';

interface Props {
    marker: any;
  }

function ShareButton( { marker }: Props) 
 {
    const { session } = useSession();


    const handleClick = () => {
        saveMarkerToPublic(marker,session.info.webId);
    };
    
      


    return(
        <>
        <IconButton onClick={handleClick} >
          <ShareIcon />
        </IconButton>
      </>
    )
}



export default ShareButton;

