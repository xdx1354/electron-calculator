import React from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import FormField from "../../../components/FormField";

function CalculatorLeftSideBody() {
    return (
        <div style={{backgroundColor:'#FBFBFB', borderRadius:13, height: 600, width: 425, marginLeft:25, padding:50, display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'flex-start'}}>
            <CalculatorHeader></CalculatorHeader>
            <FormField></FormField>
        </div>
    );
}

export default CalculatorLeftSideBody;


