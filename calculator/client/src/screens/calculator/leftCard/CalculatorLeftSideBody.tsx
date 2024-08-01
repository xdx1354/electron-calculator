import React, { useEffect, useState } from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import CustomInput from "../../../components/FormField";
import styled from "styled-components";
import CustomCheckBox from "../../../components/CustomCheckBox";
import CustomButton from "../../../components/CustomButton";
import { Profile } from "../../../types/types";
import {useLocation} from "react-router-dom";
import {type} from "node:os";

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
    profileProp?: Profile;
}

const CalculatorLeftSideBody: React.FunctionComponent<Props> = () => {

    const location = useLocation();
    const profileProp:Profile = location.state?.profile;

    const [formState, setFormState] = useState<{ [key: string]: any }>({});
    const [profile, setProfile] = useState<Profile | null>(profileProp ?? null);


    useEffect(() => {
        if (profileProp) {
            setProfile(profileProp);
        }
    }, [profileProp]);

    useEffect(() => {
        if (profile) {

            const initialState: { [key: string]: any } = {};

            initialState["krotszy_bok"] = 0;
            initialState["dluzszy_bok"] = 0;
            initialState["ilosc_szt"] = 0;

            profile.dodatki.forEach((field: any) => {
                initialState[field.typ] = false;
            });

            setFormState(initialState);
        }
    }, [profile]);

    const handleChange = (id: string, value: any) => {
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const temp = () => {
        console.log('Printing form data:', formState);
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
                {profile?.dodatki.map((field, index) => (
                    <CustomCheckBox
                        key={field.typ}
                        type="checkbox"
                        label={field.typ.replace(/_/g, ' ')}
                        checked={formState[field.typ]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.typ, e.target.checked)}
                    />
                ))}


                <ButtonWrapper>
                    <CustomButton text={"OBLICZ"} function={temp} />
                </ButtonWrapper>
            </FormWrapper>
        </BodyDiv>
    );
}

export default CalculatorLeftSideBody;
