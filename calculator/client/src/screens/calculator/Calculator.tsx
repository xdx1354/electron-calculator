import React, {useEffect} from 'react';
import CalculatorLeftSideBody from "./leftCard/CalculatorLeftSideBody";
import {useLocation} from "react-router-dom";
import CalculatorRightSideBody from "./rightCard/CalculatorRightSideBody";
import styled from "styled-components";

const CalculatorCard = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #1E1C1C;
`;

const CalculatorCardBody = styled.div`
    display: flex;
    height: 75vh;
    width: 60vw;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #413E3E;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: #1E1C1C;
    
    
`;

function Calculator() {

    // getting profile data form ChooseList
    const location = useLocation();
    const { profile } = location.state || {};

    useEffect(() => {
       console.log('PROFILE RECEIVED', profile);
    }, []);

    return (

        <CalculatorCard>
            <CalculatorCardBody>
                <CalculatorLeftSideBody profile={profile}></CalculatorLeftSideBody>
            </CalculatorCardBody>
        </CalculatorCard>

    );
}

export default Calculator;


