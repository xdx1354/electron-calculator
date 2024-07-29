import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Configurator from "../../screens/configurator/Configurator";


const FormDiv = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #FBFBFB;
    border-radius: 25px;
    height: 70%;
`
const LabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    margin-left: 15%;
    margin-bottom: 0.5%;
`

const FormLabel = styled.label`
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    font-size: 30px;
`

const StyledInput = styled.input`
    border-radius: 10px;
    width: 85%;
    height: 25%;
    border-color: #c3b5b5;
    border-style: solid;
    border-width: 1px;
    margin-top: 3px;
    background-color: #ffffff;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60%;
    margin-top: 5%;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
    width: 100%;
    height: 20%;
`

const StyledButton = styled.button`
    border-radius: 8px;
    width: 50%;
    height: 100%;
    background-color: rgba(30, 28, 28, 0.91);
    color: white;
`

function ChooseList() {

    const [config, setConfig] = useState<JSON>();
    const [error, setError] = useState<any>(null);

    const navigate = useNavigate();

    const fetchConfig = async () => {
        try {
            const response:Response = await fetch('http://localhost:4001/config');

            if(!response.ok) {
                console.log('Error!');
                throw new Error('Failed to fetch config');
            }

            const data = await response.json(); // parsing response to JSON
            console.log(data);
            setConfig(data);

        } catch (error) {
            setError(error);
            console.error(error);
        }
    }

    const handleClick = () => {

        fetchConfig();
            // .then(() => navigate('/calculator'))

        // navigate('/calculator');
    }

    return (
        <FormDiv>
            <InputWrapper>
                <LabelWrapper>
                    <FormLabel>Wybierz profil do obliczeń</FormLabel>
                </LabelWrapper>

                <datalist id={"profiles"}>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </datalist>

                <StyledInput list={"profiles"} placeholder={"Wybierz z listy"}/>
            </InputWrapper>
            <ButtonWrapper>
                <StyledButton type={"button"} onClick={handleClick}>DALEJ</StyledButton>
            </ButtonWrapper>
        </FormDiv>
    );
}

export default ChooseList;


