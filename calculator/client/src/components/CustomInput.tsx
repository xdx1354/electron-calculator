import React, { useState } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    border-radius: 10px;
    height: 60px;
    width: 100%;
    border-color: #c3b5b5;
    border-style: solid;
    border-width: 1px;
    margin-top: 3px;
    //padding-left: 15px;
`;


const StyledLabel = styled.label`
    
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 70px;
    width: 100%;
`;

const CustomInput = ({ ...props }) => {
    return (
        <>
            <StyledDiv className="input_wrapp">
                <StyledLabel htmlFor="shorter-edge" className="input_label">{props.label}</StyledLabel>
                <StyledInput
                    type={props.type}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                    name={props.name}
                    required={props.required}
                    min={props.min}
                    max={props.max}
                />
            </StyledDiv>
        </>
    )
}


export default CustomInput
