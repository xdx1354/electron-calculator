import React, { useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: 40%;
    height: 4vh;
    border-radius: 8px;
    background-color: #282c34;
    color: white;
`

interface Props {
    function?: () => void;
    color?: string;
    text?: string;
}


const CustomButton: React.FC<Props> = ( props ) => {
    return (
        <>
            <StyledButton onClick={props.function}>{props.text}</StyledButton>
        </>
    )
}


export default CustomButton
