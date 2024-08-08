import React, { useEffect, useState } from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import CustomInput from "../../../components/CustomInput";
import styled from "styled-components";
import CustomCheckBox from "../../../components/CustomCheckBox";
import CustomButton from "../../../components/CustomButton";
import { Profile } from "../../../types/types";
import { calculatePrice, setJSON } from "../calculations";
import { CalculatorResult } from "../../../types/calcualtorResult";

const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    background-color: #FBFBFB;
    border-radius: 13px;
    height: 80%;
    width: 40%;
    margin: 0.5% 1.5%; // top-bottom left-right
    padding: 5%;
    z-index: 2;
`;

const FormWrapper = styled.form`
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

const CalculatorLeftSideBody: React.FC<Props> = ({ profileProp, calculationsResults, setCalculationsResults }) => {
    const [profile, setProfile] = useState<Profile>(profileProp);
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
        if (profile) {
            let formParams = Object.fromEntries(Object.entries(formState));
            console.log("form params as json: ", formParams);
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        calculate(); // Call the custom calculation function
    }

    return (
        <BodyDiv>
            <CalculatorHeader title={"Kalkulator"} />
            <h3>Profil: {profileProp.type}</h3>
            <FormWrapper onSubmit={handleSubmit}>
                <CustomInput
                    key={"krotszy_bok"}
                    type={"number"}
                    placeholder={"wartość"}
                    label={"Krótszy bok"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                    required={true}
                    min={0}
                    max={134}
                />
                <CustomInput
                    key={"dluzszy_bok"}
                    type={"number"}
                    placeholder={"wartość"}
                    label={"Dłuższy bok"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("dluzszy_bok", parseFloat(e.target.value))}
                    required={true}
                    min={0}
                    max={9999}
                />
                <CustomInput
                    key={"ilosc_szt"}
                    type={"number"}
                    placeholder={"wartość"}
                    label={"Ilość sztuk"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("ilosc_szt", parseFloat(e.target.value))}
                    required={true}
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
                    <CustomButton type={'submit'} text={"OBLICZ"} />
                </ButtonWrapper>
            </FormWrapper>
        </BodyDiv>
    );
}

export default CalculatorLeftSideBody;
