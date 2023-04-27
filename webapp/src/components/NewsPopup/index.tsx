import { useContext, useState } from "react";
import { INews } from "../../types/INews";
import { NewsContext } from "../../context/NewsContext";
import { Container } from "./Styles";
import Popup from "../PopUp";

interface Props{
    toggleNews:(open: boolean | undefined) => void
    isNewsOpen: boolean
}

function NewsPopup({isNewsOpen, toggleNews } : Props){

    const {state: news} = useContext(NewsContext);
    const pruebaNews:INews[]=[{id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"},
    {id:"1",text:"prueba1",author:"autor1S"}]


    function showNews(){
        return(
            <>
            {pruebaNews.map((n,index)=>(
                <New key={index} {...n} />
            ))}
        </>
        )
    }

    return(
        <>
         {isNewsOpen ?  
         <Popup isOpen={isNewsOpen} closePopup={()=>toggleNews(false)}>
            <Container>
            <h2>Noticias</h2>
            {showNews()}
            </Container>
         </Popup>
            
        : null}
        </> 
    )

}

const New = (inew:INews)=>{
    return(
        <div className="new">
            <p>{inew.author}</p>
            <p>{inew.text}</p>
        </div>
    )
}

export default  NewsPopup;