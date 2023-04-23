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
        display: block;
        margin: auto;
    }
`

export const Error = styled.p`
    color: red;
`