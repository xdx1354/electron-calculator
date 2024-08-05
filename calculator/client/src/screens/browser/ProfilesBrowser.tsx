import CalculatorHeader from "../../components/CalculatorHeader";
import React from "react";
import styled from "styled-components";
import ProfileCard from "./profilesList/ProfileCard";
import CardsContainer from "./profilesList/CardsContainer";


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

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15vh;
`

const ProfilesBrowser: React.FC = () => {
    return(
        <Card>
            <CardBody>
                <HeaderWrapper>
                    <CalculatorHeader title="Profile" color="white"/>
                </HeaderWrapper>
                <CardsContainer/>
            </CardBody>
        </Card>
    );
}
export default ProfilesBrowser;