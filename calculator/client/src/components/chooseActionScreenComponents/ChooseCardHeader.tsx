import React from 'react';
import styled from 'styled-components';
import CalculatorHeader from "../CalculatorHeader";


const HeaderDiv = styled.div`
    width: 100%;
    //background-color: #61dafb;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-left: 5%;
`;

function ChooseCardHeader() {
    return (
        <HeaderDiv>
            <CalculatorHeader title={"Konfiguracja"} color={"#ffffff"}/>
        </HeaderDiv>

    );
}

export default ChooseCardHeader;


