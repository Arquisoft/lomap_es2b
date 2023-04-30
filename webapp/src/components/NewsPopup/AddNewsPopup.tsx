import { Button, TextField } from "@mui/material";
import Popup from "../PopUp";
import { AddForm ,Error} from "./Styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface PropsAddNewsPoup{
    onClose:()=>void
    addNew:(text:string)=>void
}

const AddNewsPopup = ({onClose, addNew}:PropsAddNewsPoup)=>{
    const { t } = useTranslation()
    const [text,setText] = useState<string>("");
    const maxLong = 500
    const [error,isError] = useState<boolean>(false)

    function handleChangeText(newText:string){
        if(newText.length>maxLong){
          return;
        }
        isError(false)
        setText(newText)
      }

      function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        if(text.trim().length===0){
            isError(true);
            return
        }else{
            isError(false);
        }
        addNew(text)
        onClose();
      }

    return(
        <Popup isOpen={true} closePopup={onClose}>
             <AddForm onSubmit={(e)=>handleSubmit(e)}>
            <h2>{t('news.addNew.title')}</h2>
            <p><label htmlFor="Text">{t('news.addNew.textLabel')}</label></p>
            <TextField className="textField" helperText={text.length+"/"+maxLong} onChange={(e)=>handleChangeText(e.target.value)} value={text} id='Text' label={t('news.addNew.placeHolder')} variant='standard' multiline maxRows={4} />  
            {error ? <Error>{t('news.addNew.error')}</Error>: null}
            <Button className="addNewsButton" type='submit' color='success' variant='contained'>{t('news.addButton')}</Button>
            </AddForm>
        </Popup>
       
    )
}
export default  AddNewsPopup;