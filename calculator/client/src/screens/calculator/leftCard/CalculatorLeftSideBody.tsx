import React from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import CustomInput from "../../../components/FormField";
import styled from "styled-components";

const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    background-color: #FBFBFB;
    border-radius: 13px;
    height: 80%;
    width: 40%;
    margin: 1% 1.5%; // top-bottom left-right
    padding: 5%;
`


function CalculatorLeftSideBody() {
    return (
        <BodyDiv>
            <CalculatorHeader title={"Kalkulator"} />
            <CustomInput type={"number"} placeholder={"wartość"} label={"Krótszy bok"}></CustomInput>
        </BodyDiv>

    );
}

export default CalculatorLeftSideBody;


