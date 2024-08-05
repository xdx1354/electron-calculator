import CalculatorHeader from "../../components/CalculatorHeader";
import React from "react";
import styled from "styled-components";
import Form from "./form/Form";

const Card = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #1E1C1C;
`;

const CardBody = styled.div`
    display: flex;
    height: 75vh;
    width: 60vw;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #413E3E;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: #1E1C1C;
    overflow: hidden;
    padding-top: 10px;
`;


const Editor: React.FC = () => {
    return(
        <Card>
            <CardBody>
                <CalculatorHeader color={"white"} title={"Editor"}/>
                <Form></Form>
            </CardBody>
        </Card>
    );
}

export default Editor;