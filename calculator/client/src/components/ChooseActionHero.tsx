import React from 'react';
import styled from 'styled-components';
import Calculator from "../screens/calculator/Calculator";
import CalculatorHeader from "./CalculatorHeader";
import ChooseCardHeader from "./chooseActionScreenComponents/ChooseCardHeader";
import ChooseList from "./chooseActionScreenComponents/ChooseList";


const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 30vh;
    width: 30vw;
    background-color: #413E3E;
    border-radius: 25px;
    padding: 1.5vw;
`;

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #1E1C1C;
`;


function ChooseActionHero() {
    return (
        <ContainerDiv>
            <StyledDiv>
                <ChooseCardHeader></ChooseCardHeader>
                <ChooseList></ChooseList>
            </StyledDiv>
        </ContainerDiv>

    );
}

export default ChooseActionHero;


