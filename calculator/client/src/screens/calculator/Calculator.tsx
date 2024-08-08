import React, {useEffect, useState} from 'react';
import CalculatorLeftSideBody from "./leftCard/CalculatorLeftSideBody";
import {useLocation} from "react-router-dom";
import CalculatorRightSideBody from "./rightCard/CalculatorRightSideBody";
import styled from "styled-components";
import {CalculatorResult} from "../../types/calcualtorResult";
import NavBar from "../../components/NavBar/NavBar";

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
    overflow: hidden;
    
    
`;

function Calculator() {

    // getting profile data form ChooseList
    const location = useLocation();
    const { profile } = location.state || {};

    const [calculationsResults, setCalculationsResults] = useState<CalculatorResult>({
        typ: "",
        dodatki: [],
        cena_netto: 0,
        cena_brutto: 0,
        cena_minimalna_brutto: 0,
        cena_minimalna_netto: 0,
        cena_za_szt_netto: 0,
        ilosc_szt: 0,
        wymiary: {
            krotszy_bok: 0,
            dluzszy_bok: 0
        }
    });

    useEffect(() => {
       console.log('PROFILE RECEIVED', profile);
    }, []);

    return (
        <>
            <NavBar
                isMenu={true}
                menuPath={'/config'}
            />
            <CalculatorCard>
                <CalculatorCardBody>
                    <CalculatorLeftSideBody
                        profileProp={profile}
                        calculationsResults={calculationsResults}
                        setCalculationsResults={setCalculationsResults}
                    />
                    <CalculatorRightSideBody
                        calc={calculationsResults}
                    />
                </CalculatorCardBody>
            </CalculatorCard>
        </>
    );
}

export default Calculator;


