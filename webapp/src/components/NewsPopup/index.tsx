import { useContext, useState } from "react";
import { INews } from "../../types/INews";
import { NewsContext } from "../../context/NewsContext";
import { AddForm, Container,Error } from "./Styles";
import Popup from "../PopUp";
import { Types } from "../../types/ContextActionTypes";
import { useSession } from "@inrupt/solid-ui-react";
import { v4 as uuid } from 'uuid'
import { Button, TextField } from "@mui/material";

interface Props{
    toggleNews:(open: boolean | undefined) => void
    isNewsOpen: boolean
}

function NewsPopup({isNewsOpen, toggleNews } : Props){

    const {state: news, dispatch} = useContext(NewsContext);
    const pruebaNews:INews[]=[{id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"pruecsdddddddccddcsdcsdcrgtehryhtegfwefcrthgyreeargtraergeargerfba1",author:"autor1S"}]

    const {session} = useSession();
    const [showPopupNews,setShowPopupNews] = useState<boolean>(false);


    function showNews(){
        return(
            <>
            {news.length!==0 ? 
            news.map((n,index)=>(
                <New key={index} {...n} />
            )):
            <p>Aquí se mostrarán las noticias</p> }
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
            <h2>Noticias</h2>
            {showNews()}
            </Container>
            <Button style={{float:'right'}} onClick={showAddNewPopup} color='success' variant='contained'>Añadir noticia</Button>
         </Popup>
        : showPopupNews ? 
            <AddNewsPopup addNew={addNew} onClose={closeAddNewPopup } />
        : null}
        </> 
    )

}

const New = (inew:INews)=>{
    return(
        <div className="new">
            <p><strong>Autor: </strong>{inew.author.split(".")[0].split("//")[1]}</p>
            <p>{inew.text}</p>
        </div>
    )
}

interface PropsAddNewsPoup{
    onClose:()=>void
    addNew:(text:string)=>void
}

const AddNewsPopup = ({onClose, addNew}:PropsAddNewsPoup)=>{
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
            <h2>Introduce la noticia</h2>
            <p><label htmlFor="Text">Texto:</label></p>
            <TextField className="textField" helperText={text.length+"/"+maxLong} onChange={(e)=>handleChangeText(e.target.value)} value={text} id='Text' label="Noticia" variant='standard' multiline maxRows={4} />  
            {error ? <Error>El texto no puede estar vacío</Error>: null}
            <Button className="addNewsButton" type='submit' color='success' variant='contained'>Añadir noticia</Button>
            </AddForm>
        </Popup>
       
    )
}



export default  NewsPopup;


