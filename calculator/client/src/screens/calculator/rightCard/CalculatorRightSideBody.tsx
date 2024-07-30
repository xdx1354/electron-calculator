import React from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import CustomInput from "../../../components/FormField";
import styled from "styled-components";

const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
`

function CalculatorRightSideBody() {
    return (
        <StyledBody>
            <CalculatorHeader></CalculatorHeader>
        </StyledBody>

        //
        // <div style={{backgroundColor:'#FBFBFB', borderRadius:13, height: 600, width: 425, marginLeft:25, padding:50, display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'flex-start'}}>
        //     <CustomInput type={"number"} placeholder={"wartość"} label={"Krótszy bok"}></CustomInput>
        // </div>
    );
}

export default CalculatorRightSideBody;


