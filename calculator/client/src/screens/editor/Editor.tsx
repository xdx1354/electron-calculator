import CalculatorHeader from "../../components/CalculatorHeader";
import React from "react";
import styled from "styled-components";
import Form from "./form/Form";
import {useLocation} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const Screen = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #1E1C1C;
`

const Card = styled.div`
    display: flex;
    height: 75vh;
    width: 60vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #413E3E;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: #1E1C1C;
`;

const CardBody = styled.div`
    display: flex;
    height: 95%;
    width: 95%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #FBFBFB;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: #1E1C1C;
    overflow: hidden;
    padding-top: 10px;
`;


const Editor: React.FC = () => {

    const location = useLocation();
    const { profile } = location.state || {};

    return(
        <>
            <NavBar
                isMenu={true}
                menuPath={'/browse'}
            />
            <Screen>
                <Card>
                    <CardBody>
                        <CalculatorHeader color={"black"} title={"Editor"}/>
                        <Form profile={profile}/>
                    </CardBody>
                </Card>
            </Screen>
        </>


    );
}

export default Editor;