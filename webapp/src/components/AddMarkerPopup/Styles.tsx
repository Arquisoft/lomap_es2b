import styled from 'styled-components'

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin:1em;
    padding-bottom: 0.5em;

    img{
        max-width: 100%;
        max-height: 100%;
        margin: auto;
    }

    input#image{
        position:absolute;
	    top:0px;
	    left:0px;
	    right:0px;
	    bottom:0px;
	    width:100%;
	    height:100%;
	    opacity: 0;
    }

    div#div_file{
	position:relative;
	margin-bottom:1em;
	padding:auto;
	width:100%;
	background-color: #2499e3;
	-webkit-border-radius:5px;
	-webkit-box-shadow:0px 3px 0px #1a71a9;
    cursor: pointer;
    
    }


    p#texto{
	text-align: center;
	color:white;
    }
`
export const ContentDiv = styled.form`
    height: 85%;
    overflow: hidden;
    
   
`
export const Title = styled.h2`
    height: 15%;
    margin: 0;
`

export const ScrollDiv = styled.div`
     display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
`


export const Error = styled.p`
    color: red;
`