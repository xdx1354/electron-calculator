import CalculatorHeader from "../../components/CalculatorHeader";
import React from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import ChooseCardHeader from "../../components/chooseActionScreenComponents/ChooseCardHeader";
import CustomButton from "../../components/CustomButton";

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
    height: 40vh;
    width: 30vw;
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
    height: 90%;
    width: 95%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #FBFBFB;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: #1E1C1C;
    overflow: hidden;
    padding-top: 10px;
`;


const Menu: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return(
        <Screen>
            <Card>
                <CardBody>
                    <CalculatorHeader color={"black"} title={"Menu"}/>
                    <CustomButton text="Kalkulator" function={() => navigate("/config")}/>
                    <CustomButton text="Edycja profili" function={() => navigate("/browse")}/>
                </CardBody>
            </Card>
        </Screen>

    );
}

export default Menu;