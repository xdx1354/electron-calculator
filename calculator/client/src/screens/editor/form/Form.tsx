import CustomInput from "../../../components/CustomInput";
import React from "react";
import {Profile} from "../../../types/types";
import styled from "styled-components";
import CustomButton from "../../../components/CustomButton";

type Props = {
    profile: Profile;
}

const GridContainer3 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    width: 100%;
    justify-content: space-around;
`;

const GridContainer2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    width: 80%;
    justify-content: space-around;
`;

const GridItem = styled.div`
    padding: 1vh  1vw;
`

const FormWrapper = styled.div`
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    //background-color: #069a68;
`;

const EditorSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const HorizontalLine = styled.hr`
    border-top: 1px solid #aea7a7;
    margin-top: 20px;
    width: 90%;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 20vh;
    width: 20vw;
    margin: 5vh;
`
const Form: React.FC<Props> = () => {
    return(
        <FormWrapper>

            <EditorSection>
                <h2>Podstawowe informacje</h2>
                <GridContainer3>
                    <GridItem>
                        <CustomInput
                            key={"cena_minimalna"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Cena minimalna netto"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"koszt_projektu"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Koszt projektu"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"doplata_za_sztuke"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Dopłata za sztukę"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                </GridContainer3>
            </EditorSection>

            <HorizontalLine/>

            {/* Wymiary*/}
            <EditorSection>
                <h2>Wymiary</h2>
                <GridContainer3>
                    <GridItem>
                        <CustomInput
                            key={"max_krotszy_bok"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Max szerokość krótszego boku"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"szerokosc"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Margines na stronę poziom"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wysokosc"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Margines na stronę pion"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                </GridContainer3>
                Uwaga! Marginesy podawane są na strone, tzn. że do wymiaru dolicza się 2x podana wartość.
            </EditorSection>

            <HorizontalLine/>


            <EditorSection>
                <h2>Cena od wielkości naklejki</h2>
                <GridContainer3>
                    <GridItem>
                        <CustomInput
                            key={"wieksze_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki od (wyłącznie)"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"mniejsze_rowne_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki do (włącznie)"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"cena"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"cena za metr kwadratowy"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki od (wyłącznie)"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"mniejsze_rowne_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki do (włącznie)"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"cena"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"cena za metr kwadratowy"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                </GridContainer3>
            </EditorSection>

            <HorizontalLine/>

            <EditorSection>
                <h2>Dodatki</h2>
                <GridContainer3>
                    <GridItem>
                        <CustomInput
                            key={"typ"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Nazwa dodatkowej opcji"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_za_1m"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Cena za 1m kwadratowy"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_do_ceny_minimalnej"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Kwota do ceny minimalnej"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"typ"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Nazwa dodatkowej opcji"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_za_1m"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Cena za 1m kwadratowy"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_do_ceny_minimalnej"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Kwota do ceny minimalnej"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"typ"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Nazwa dodatkowej opcji"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_za_1m"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Cena za 1m kwadratowy"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_do_ceny_minimalnej"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Kwota do ceny minimalnej"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"typ"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Nazwa dodatkowej opcji"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_za_1m"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Cena za 1m kwadratowy"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"dodatkowo_do_ceny_minimalnej"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Kwota do ceny minimalnej"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                </GridContainer3>
            </EditorSection>

            <HorizontalLine/>

            <EditorSection>
                <h2>Rabatowanie</h2>
                <GridContainer2>
                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_rowne"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia zamównienia od:"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"rabat_procenty"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Rabat w procentach"}
                            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
                        />
                    </GridItem>
                </GridContainer2>
            </EditorSection>

            <HorizontalLine/>
            <ButtonWrapper>
                <CustomButton text="ZAPISZ"/>
            </ButtonWrapper>

        </FormWrapper>

    );
}

export default Form;