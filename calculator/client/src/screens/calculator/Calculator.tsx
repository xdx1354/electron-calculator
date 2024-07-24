import React from 'react';
import CalculatorLeftSideBody from "./leftCard/CalculatorLeftSideBody";

function Calculator() {
    return (
        <div className="CalculatorCard" style={{height:"100%", width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", backgroundColor:"#1E1C1C"}}>
            <div className="CalculatorCardBody" style={{height:750, width:1050, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", backgroundColor:"#413E3E", marginTop:137, marginBottom:137, marginLeft:195, marginRight:195, borderRadius:25, borderWidth:1, borderColor:"#1E1C1C"}}>
                {/*<div className="CalculatorBodyLeft" style={{backgroundColor:'#FBFBFB', borderRadius:13, height: 700, width: 525, marginLeft:25, zIndex: 1}}>Calculator LEFT</div>*/}
                <CalculatorLeftSideBody></CalculatorLeftSideBody>
                <div className="CalculatorBodyRight" style={{backgroundColor: "#2F2929", marginRight: 25, height:700, width: 525, borderRadius: 13}}>Calculator Right</div>
            </div>
        </div>

    );
}

export default Calculator;


