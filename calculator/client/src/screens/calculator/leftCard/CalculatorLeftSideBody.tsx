import React, { useEffect, useState } from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import CustomInput from "../../../components/FormField";
import styled from "styled-components";
import CustomCheckBox from "../../../components/CustomCheckBox";
import CustomButton from "../../../components/CustomButton";
import { Profile } from "../../../types/types";
import {calculatePrice, setJSON} from "../calculations";
import {CalculatorResult} from "../../../types/calcualtorResult";

const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    background-color: #FBFBFB;
    border-radius: 13px;
    height: 80%;
    width: 40%;
    margin: 1% 1.5%; // top-bottom left-right
    padding: 5%;
    z-index: 2;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 10%;
`;

interface Props {
    profileProp: Profile;
    calculationsResults: CalculatorResult;
    setCalculationsResults: React.Dispatch<React.SetStateAction<CalculatorResult>>;
}

const CalculatorLeftSideBody: React.FC<Props> = ({profileProp, calculationsResults, setCalculationsResults}) => {


    const profile:Profile = profileProp;

    const [formState, setFormState] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        setJSON(profile);

        const initialState: { [key: string]: any } = {};

        initialState["krotszy_bok"] = 0;
        initialState["dluzszy_bok"] = 0;
        initialState["ilosc_szt"] = 0;

        profile.dodatki.forEach((field: any) => {
            initialState[field.typ] = false;
        });

        setFormState(initialState);

    }, [profile]);

    // useState is asynchronous and printing changed data immediately after changing it results in printing old data
    // using useEffect helps here and prints just after the data is really changed
    // this function is for testing purposes only
    useEffect(() => {
        console.log("Calculation results JSON: ", calculationsResults);
    }, [calculationsResults]);

    const handleChange = (id: string, value: any) => {
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const calculate = () => {
        console.log('Printing form data:', formState);
        if (profile){
            let formParams = Object.fromEntries(Object.entries(formState));
            console.log("Form params as json: ", formParams);
            try {
                const result = calculatePrice(formParams);
                console.log("Calculation results const: ", result);
                setCalculationsResults(result);
            } catch (e) {
                throw e;
            }
        } else {
            throw new Error("No profile found.");
        }

    }

    return (
        <BodyDiv>
            <CalculatorHeader title={"Kalkulator"} />
            <FormWrapper>
                <CustomInput
                    key={"krotszy_bok"}
                    type={"number"}
                    placeholder={"wartość"}
                    label={"Krótszy bok"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                />
                <CustomInput
                    key={"dluzszy_bok"}
                    type={"number"}
                    placeholder={"wartość"}
                    label={"Dłuższy bok"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("dluzszy_bok", parseFloat(e.target.value))}
                />
                <CustomInput
                    key={"ilosc_szt"}
                    type={"number"}
                    placeholder={"wartość"}
                    label={"Ilość sztuk"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("ilosc_szt", parseFloat(e.target.value))}
                />
                {profile?.dodatki.map((field) => (
                    <CustomCheckBox
                        key={field.typ}
                        type="checkbox"
                        label={field.typ.replace(/_/g, ' ')}
                        checked={formState[field.typ]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.typ, e.target.checked)}
                    />
                ))}


                <ButtonWrapper>
                    <CustomButton text={"OBLICZ"} function={calculate} />
                </ButtonWrapper>
            </FormWrapper>
        </BodyDiv>
    );
}

export default CalculatorLeftSideBody;
