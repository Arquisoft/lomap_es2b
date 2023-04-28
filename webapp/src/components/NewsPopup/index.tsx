import { useContext, useState } from "react";
import { INews } from "../../types/INews";
import { NewsContext } from "../../context/NewsContext";
import { AddForm, Container,Error } from "./Styles";
import Popup from "../PopUp";
import { Types } from "../../types/ContextActionTypes";
import { useSession } from "@inrupt/solid-ui-react";
import { v4 as uuid } from 'uuid'
import { Button, TextField } from "@mui/material";
import { useTranslation } from 'react-i18next';

interface Props{
    toggleNews:(open: boolean | undefined) => void
    isNewsOpen: boolean
}

function NewsPopup({isNewsOpen, toggleNews } : Props){

    const { t } = useTranslation()

    const {state: news, dispatch} = useContext(NewsContext);

    const {session} = useSession();
    const [showPopupNews,setShowPopupNews] = useState<boolean>(false);


    function showNews(){
        return(
            <>
            {news.length!==0 ? 
            news.map((n,index)=>(
                <New key={index} {...n} />
            )):
            <p>{t('news.noNews')}</p> }
        </>
        )
    }

    function addNew(text:string){
        if(!session.info.webId) return
        dispatch({ type: Types.ADD, payload: { news: {id:uuid(),text:text,author:session.info.webId} } })
    }

    function showAddNewPopup(){
        toggleNews(false);
        setShowPopupNews(true);
    }

    function closeAddNewPopup(){
        setShowPopupNews(false);
        toggleNews(true);
        
    }

    return(
        <>
         {isNewsOpen ?  
         <Popup isOpen={isNewsOpen} closePopup={()=>toggleNews(false)}>
            <Container>
            <h2>{t('news.title')}</h2>
            {showNews()}
            </Container>
            <Button style={{float:'right'}} onClick={showAddNewPopup} color='success' variant='contained'>{t('news.addButton')}</Button>
         </Popup>
        : showPopupNews ? 
            <AddNewsPopup addNew={addNew} onClose={closeAddNewPopup } />
        : null}
        </> 
    )

}

const New = (inew:INews)=>{
    const { t } = useTranslation()
    return(
        <div className="new">
            <p><strong>{t('news.author')}: </strong>{inew.author.split(".")[0].split("//")[1]}</p>
            <p>{inew.text}</p>
        </div>
    )
}

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



export default  NewsPopup;


