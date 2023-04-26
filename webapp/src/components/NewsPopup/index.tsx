import { useContext, useState } from "react";
import { INews } from "../../types/INews";
import { NewsContext } from "../../context/NewsContext";
import { Container } from "./Styles";

function NewsPopup(){

    const {state: news} = useContext(NewsContext);



    function showNews(){
        return(
            <>
            {news.map((n)=>(
                <New {...n} />
            ))}
        </>
        )
    }

    return(
       <Container>
            <h2>Noticias</h2>
            {showNews()}
       </Container>
       
      
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