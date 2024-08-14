import React, { useEffect, useState } from 'react';

import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {CalculatorResult} from "../../types/calcualtorResult";
import {Profile} from "../../types/types";
import {setJSON, reversedCalculations} from "../calculator/calculations";
import CalculatorHeader from "../../components/CalculatorHeader";
import CustomInput from "../../components/CustomInput";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomButton from "../../components/CustomButton";
import ModalComponent from "../../components/modal/Modal";

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const onModalReject = () => {
        setIsModalOpen(false);
        navigate('/browse');
    }

    useEffect(() => {
        setJSON(profile);

        validateProfile()?console.log('Profile valid'):setIsModalOpen(true);


        const initialState: { [key: string]: any } = {};

        initialState["krotszy_bok"] = 0;
        initialState["dluzszy_bok"] = 0;
        // initialState["ilosc_szt"] = 0;

        profile.dodatki.forEach((field: any) => {
            initialState[field.typ] = false;
        });

        setFormState(initialState);
    }, [profile]);

    useEffect(() => {
        console.log("Calculation results JSON: ", calculationsResults);
    }, [calculationsResults]);


    const validateProfile = () => {
        return !!(profile.marginesy.wysokosc && profile.marginesy.szerokosc && profile.cena_minimalna && profile.koszt_projektu
            && profile.cena_za_1m_od_powierzchni_naklejki && profile.wymiary.max_dluzszy_bok && profile.wymiary.max_krotszy_bok
            && profile.cena_minimalna && profile.type);
    }

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
                const result = reversedCalculations(formParams);
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
        <>
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
                        max={profileProp.wymiary.max_krotszy_bok}
                    />
                    <CustomInput
                        key={"dluzszy_bok"}
                        type={"number"}
                        placeholder={"wartość"}
                        label={"Dłuższy bok"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("dluzszy_bok", parseFloat(e.target.value))}
                        required={true}
                        min={0}
                        max={profileProp.wymiary.max_dluzszy_bok}
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

            <ModalComponent
                isOpen={isModalOpen}
                onRequestClose={() => onModalReject()}
                title="Czy chcesz kontynuować?"
                onConfirm={() => setIsModalOpen(false)}
            >
                <p>Wykryto błąd w profilu. Zweryfikuj poprawność w edytorze profili. Działanie tego profilu może być nieprzewidziane</p>
            </ModalComponent>
        </>
    );
}

export default CalculatorLeftSideBody;
