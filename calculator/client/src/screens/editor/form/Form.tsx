import CustomInput from "../../../components/CustomInput";
import React, {useState} from "react";
import {Dodatek, JsonResponse, Profile, RabatValue} from "../../../types/types";
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
const Form: React.FC<Props> = (props) => {

    const [formData, setFormData] = useState<Profile>(props.profile);

    const handleInputChange = (section: keyof Profile, field: string, index: number|undefined, value: any) => {
        if (index !== undefined) {
            const updatedSection = [...formData[section] as any[]];
            updatedSection[index][field] = value;
            setFormData({ ...formData, [section]: updatedSection });
        } else {
             if (field === "") {
                 setFormData({ ...formData, [section]: { ...formData[section] as object, value } });

             }
            setFormData({ ...formData, [section]: { ...formData[section] as object, [field]: value } });
        }
    };

    const handleSave = async () => {
        // creating valid json
        const data: JsonResponse = {profile: formData};

        console.log("Prepared data: ", data);
    }

    const addField = (section: string ): void => {
        if( section === "rabat" ) {
            const newRabat: RabatValue = { wieksze_rowne: 0, rabat_procenty: 0 };
            setFormData({...formData, rabat: [...formData.rabat, newRabat]});
        } else if (section === "dodatek") {
            const newDodatek: Dodatek = { typ: "", dodatkowo_do_ceny_minimalnej: 0, dodatkowo_za_1m: 0 };
            setFormData({...formData, dodatki: [...formData.dodatki, newDodatek]});
        }
    }

    return(
        <FormWrapper>
            <h1>DODAĆ INPUT NA NAZWĘ</h1>
            <EditorSection>
                <h2>Podstawowe informacje</h2>
                <GridContainer3>
                    <GridItem>
                        <CustomInput
                            key={"cena_minimalna"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Cena minimalna netto"}
                            defaultValue={props?.profile?.cena_minimalna}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_minimalna", "", undefined, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"koszt_projektu"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Koszt projektu"}
                            defaultValue={props?.profile?.koszt_projektu}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("koszt_projektu", "", undefined, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"doplata_za_sztuke"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Dopłata za sztukę"}
                            defaultValue={props.profile?.doplata_za_sztuke}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("doplata_za_sztuke", "", undefined, parseFloat(e.target.value))
                            }
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
                            defaultValue={props.profile.wymiary.max_krotszy_bok}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("wymiary", "max_krotszy_bok", undefined, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"szerokosc"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Margines na stronę poziom"}
                            defaultValue={props.profile.marginesy.szerokosc}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("marginesy", "szerokosc", undefined, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wysokosc"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Margines na stronę pion"}
                            defaultValue={props.profile.marginesy.wysokosc}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("marginesy", "wysokosc", undefined, parseFloat(e.target.value))
                            }
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
                            defaultValue={props.profile.cena_za_1m_od_powierzchni_naklejki[0].wieksze_niz}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_za_1m_od_powierzchni_naklejki", "wieksze_niz", 0, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"mniejsze_rowne_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki do (włącznie)"}
                            defaultValue={props.profile.cena_za_1m_od_powierzchni_naklejki[0].mniejsze_rowne_niz}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_za_1m_od_powierzchni_naklejki", "mniejsze_rowne_niz", 0, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"cena"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"cena za metr kwadratowy"}
                            defaultValue={props.profile.cena_za_1m_od_powierzchni_naklejki[0].cena}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_za_1m_od_powierzchni_naklejki", "cena", 0, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>

                    <GridItem>
                        <CustomInput
                            key={"wieksze_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki od (wyłącznie)"}
                            defaultValue={props.profile.cena_za_1m_od_powierzchni_naklejki[1].wieksze_niz}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_za_1m_od_powierzchni_naklejki", "wieksze_niz", 1, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"mniejsze_rowne_niz"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"Powierzchnia naklejki do (włącznie)"}
                            defaultValue={props.profile.cena_za_1m_od_powierzchni_naklejki[1].mniejsze_rowne_niz}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_za_1m_od_powierzchni_naklejki", "mniejsze_rowne_niz", 1, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            key={"cena"}
                            type={"number"}
                            placeholder={"wartość"}
                            label={"cena za metr kwadratowy"}
                            defaultValue={props.profile.cena_za_1m_od_powierzchni_naklejki[1].cena}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("cena_za_1m_od_powierzchni_naklejki", "cena", 1, parseFloat(e.target.value))
                            }
                        />
                    </GridItem>
                </GridContainer3>
            </EditorSection>

            <HorizontalLine/>

            <EditorSection>
                <h2>Dodatki</h2>
                <GridContainer3>
                    {formData.dodatki.map((dodatek, index: number) => (
                        <>
                            <GridItem>
                                <CustomInput
                                    key={"typ"}
                                    type={"text"}
                                    placeholder={"wartość"}
                                    label={"Nazwa dodatkowej opcji"}
                                    defaultValue={props.profile?.dodatki?.[index]?.typ.replaceAll('_', " ")}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("dodatki", "typ", index, e.target.value)
                                    }
                                />
                            </GridItem>

                            <GridItem>
                                <CustomInput
                                    key={"dodatkowo_za_1m"}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Cena za 1m kwadratowy"}
                                    defaultValue={props.profile?.dodatki?.[index]?.dodatkowo_za_1m}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("dodatki", "dodatkowo_za_1m", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>

                            <GridItem>
                                <CustomInput
                                    key={"dodatkowo_do_ceny_minimalnej"}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Kwota do ceny minimalnej"}
                                    defaultValue={props.profile?.dodatki?.[index]?.dodatkowo_do_ceny_minimalnej}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("dodatki", "dodatkowo_za_1m", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>
                        </>
                    ))}

                    <CustomButton text={"+"} function={() => addField("dodatek")}/>

                </GridContainer3>
            </EditorSection>

            <HorizontalLine/>

            <EditorSection>
                <h2>Rabatowanie</h2>
                <GridContainer2>

                    {formData.rabat.map((rabat, index: number) => (
                        <>

                            <GridItem>
                                <CustomInput
                                    key={"wieksze_rowne"}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Powierzchnia zamównienia od:"}
                                    defaultValue={props.profile?.rabat?.[index]?.wieksze_rowne}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("rabat", "wieksze_rowne", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>
                            <GridItem>
                                <CustomInput
                                    key={"rabat_procenty"}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Rabat w procentach"}
                                    defaultValue={props.profile?.rabat?.[index]?.rabat_procenty}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("rabat", "rabat_procenty", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>

                        </>

                    ))}

                    <CustomButton text={"+"} function={() => addField("rabat")}/>
                </GridContainer2>
            </EditorSection>

            <HorizontalLine/>
            <ButtonWrapper>
                <CustomButton text="ZAPISZ" function={handleSave}/>
            </ButtonWrapper>

        </FormWrapper>

    );
}

export default Form;