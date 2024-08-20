import CustomInput from "../../../components/CustomInput";
import React, {useEffect, useState} from "react";
import {Dodatek, JsonResponse, Profile, RabatValue} from "../../../types/types";
import styled from "styled-components";
import CustomButton from "../../../components/CustomButton";
import {useNavigate} from "react-router-dom";
import ModalComponent from "../../../components/modal/Modal";

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

const FormWrapper = styled.form`
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
    justify-content: space-around;
    align-items: center;
    height: 20vh;
    width: 20vw;
    //margin: 5vh;
`

const ButtonSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`

type FileName = string;

const Form: React.FC<Props> = (props) => {

    const navigate = useNavigate();

    const [isModalSaveOpen, setIsModalSaveOpen] = React.useState<boolean>(false);
    const [isModalExitOpen, setIsModalExitOpen] = React.useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState<boolean>(false);

    const [formData, setFormData] = useState<Profile>(props.profile);

    const [editingFileName, setEditingFileName] = useState<string>("");
    const [filesList, setFilesList] = useState<FileName[]>([]);

    useEffect( () => {
            if(props.profile.type) {
                setEditingFileName(props.profile.type);
            }
    });

    const handleInputChange = (section: keyof Profile, field: string, index: number | undefined, value: any) => {
        if (index !== undefined) {
            const updatedSection = [...(formData[section] as any[])];
            updatedSection[index][field] = value;
            setFormData({ ...formData, [section]: updatedSection });
        } else {
            if (section === "type") {
                setFormData({ ...formData, [section]: value });
            } else {
                if (field === "") {
                    setFormData({ ...formData, [section]: value });
                } else {
                    setFormData({ ...formData, [section]: { ...(formData[section] as object), [field]: value } });
                }
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        await fetchFiles().then(openSaveModal);
        // openSaveModal();
    }

    /**
     * This function takes packed into JsonResponse FormData and sorts the 'rabat' based on 'rabat.wieksze_rowne'.
     * Then all the fields with null values are deleted.
     * @param data  JsonResponse data containing all the info about profile
     */
    const normalizeData = (data : JsonResponse)  => {

        // sorting in ascending order with pushing nulls at the end
        data.profile.rabat.sort((a, b) => {
            if (a.wieksze_rowne === null && b.wieksze_rowne === null) return 0;
            if (a.wieksze_rowne === null) return 1;
            if (b.wieksze_rowne === null) return -1;

            console.log("a: ", a, " and b: ", b, " are not null");

            return a.wieksze_rowne - b.wieksze_rowne; // compare based on the numeric property
        });

        // filtering out all the empty fields
        data.profile.rabat = data.profile.rabat.filter((a) => {return a.wieksze_rowne !== null && a.rabat_procenty !== null});

        return data;
    }

    const handleSave = async () => {
        let filename = formData.type.replaceAll(' ', '_');
        const data : JsonResponse = normalizeData({ profile: formData });

        const preparedData = JSON.stringify(data);

        try {
            const response = await fetch('http://localhost:4001/save/' + filename, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: preparedData
            });

            if (response.ok) {
                const result = await response.text();
                console.log("Server response: ", result);
            } else {
                console.error("Error saving config:", response.statusText);
            }
        } catch (err) {
            console.error("Error making request: ", err);
        }

        // deleting the old one if name was changed
        if (formData.type !== editingFileName) {
            const url = 'http://localhost:4001/delete/' + editingFileName;

            try {
                const response = await fetch(url, { method: 'DELETE' }); // Ensure method is DELETE
                if (response.ok) {
                    console.log("File ", filename, " deleted successfully. ", response.statusText);
                    navigate('/editor', { state: { profile: formData } });
                } else {
                    console.error("Error deleting:", response.statusText);
                }
            } catch (err) {
                console.error("Error deleting:", err);
            }
        }
    };

    const handleDelete = async () => {
        let filename = formData.type.replace(' ', '_');
        const url = 'http://localhost:4001/delete/' + filename;

        try {
            const response = await fetch(url, { method: 'DELETE' }); // Ensure method is DELETE
            if (response.ok) {
                console.log("File ", filename, " deleted successfully. ", response.statusText);
                navigate('/browse');
            } else {
                console.error("Error deleting:", response.statusText);
            }
        } catch (err) {
            console.error("Error deleting:", err);
        }
    }

    const fetchFiles = async () => {
        try {
            const response : Response = await fetch('http://localhost:4001/files');

            if(!response.ok) {
                console.log('Error!');
            }

            const data = await response.json(); // parsing response to JSON
            console.log(data);
            setFilesList(data.files);

        } catch (error) {
            console.error(error);
        }
    }


    const openSaveModal = () => setIsModalSaveOpen(true);
    const closeSaveModal = () => setIsModalSaveOpen(false);

    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeDeleteModal = () => setIsModalDeleteOpen(false);

    const openExitModal = () => setIsModalExitOpen(true);
    const closeExitModal = () => setIsModalExitOpen(false);

    const handleConfirmSave = () => {
        handleSave().then(closeSaveModal);
    };

    const handleConfirmExit = () => {
        closeExitModal();
        navigate('/browse');
    };
    const handleConfirmDelete = () => {
        console.log('About to delete a file!');
        handleDelete().then(closeDeleteModal).catch(console.error);
        navigate('/browse');

    }

    const addField = (section: string ): void => {
        if( section === "rabat" ) {
            const newRabat: RabatValue = { wieksze_rowne: 0, rabat_procenty: 0 };
            setFormData({...formData, rabat: [...formData.rabat, newRabat]});
        } else if (section === "dodatek") {
            const newDodatek: Dodatek = { typ: "", dodatkowo_za_1m: 0, dodatkowo_do_ceny_minimalnej: 0 };
            setFormData({...formData, dodatki: [...formData.dodatki, newDodatek]});
        }
    }

    const isFilenameValid = () => {
        if(formData.type === editingFileName) {
            return true;
        }
        let filename :FileName = formData.type.replaceAll(' ', '_') + ".json";
        return !filesList.find(item => item === filename);
    }

    return(
        <FormWrapper onSubmit={handleSubmit}>
            <EditorSection>
                <h2>Edytowany profil: {editingFileName.replaceAll('_', ' ')}</h2>
                <GridContainer3>
                    <GridItem>
                        <CustomInput
                            key="type"
                            type="text"
                            placeholder="tekst"
                            label="Nazwa"
                            defaultValue={props?.profile?.type.replaceAll('_', ' ')}
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("type", "", undefined, e.target.value)
                            }
                        />
                    </GridItem>
                </GridContainer3>

            </EditorSection>

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
                            required={true}
                            step={0.01}
                            min={0}
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
                            required={true}
                            step={0.01}
                            min={0}
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
                            required={true}
                            step={0.01}
                            min={0}
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
                            defaultValue={props?.profile?.wymiary.max_krotszy_bok}
                            required={true}
                            step={0.01}
                            min={0.01} //TODO: check the value!
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
                            defaultValue={props?.profile?.marginesy.szerokosc}
                            required={true}
                            step={0.01}
                            min={0} // TODO: check value
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
                            defaultValue={props.profile?.marginesy.wysokosc}
                            required={true}
                            step={0.01}
                            min={0.0} // TODO: check value
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
                            defaultValue={props?.profile?.cena_za_1m_od_powierzchni_naklejki[0]?.wieksze_niz}
                            required={true}
                            min={0}
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
                            defaultValue={props?.profile?.cena_za_1m_od_powierzchni_naklejki[0]?.mniejsze_rowne_niz}
                            required={true}
                            step={0.01}
                            min={0}
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
                            defaultValue={props?.profile?.cena_za_1m_od_powierzchni_naklejki[0]?.cena}
                            required={true}
                            step={0.01}
                            min={0}
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
                            defaultValue={props?.profile?.cena_za_1m_od_powierzchni_naklejki[1]?.wieksze_niz}
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
                            defaultValue={props?.profile?.cena_za_1m_od_powierzchni_naklejki[1]?.mniejsze_rowne_niz}
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
                            defaultValue={props?.profile?.cena_za_1m_od_powierzchni_naklejki[1]?.cena}
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
                    {formData?.dodatki?.map((dodatek, index: number) => (
                        <>
                            <GridItem>
                                <CustomInput
                                    key={`typ_${index}`}
                                    type={"text"}
                                    placeholder={"wartość"}
                                    label={"Nazwa dodatkowej opcji"}
                                    defaultValue={props.profile?.dodatki?.[index]?.typ.replaceAll('_', " ")}
                                    required={true}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("dodatki", "typ", index, e.target.value)
                                    }
                                />
                            </GridItem>

                            <GridItem>
                                <CustomInput
                                    key={`dodatkowo_za_1m_${index}`}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Cena za 1m kwadratowy"}
                                    defaultValue={props.profile?.dodatki?.[index]?.dodatkowo_za_1m}
                                    required={true}
                                    min={0}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("dodatki", "dodatkowo_za_1m", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>

                            <GridItem>
                                <CustomInput
                                    key={`dodatkowo_do_ceny_minimalnej_${index}`}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Kwota do ceny minimalnej"}
                                    defaultValue={props.profile?.dodatki?.[index]?.dodatkowo_do_ceny_minimalnej}
                                    required={true}
                                    min={0}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("dodatki", "dodatkowo_do_ceny_minimalnej", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>
                        </>
                    ))}

                    <CustomButton type="button" text={"+"} function={() => addField("dodatek")}/>

                </GridContainer3>
            </EditorSection>

            <HorizontalLine/>

            <EditorSection>
                <h2>Rabatowanie</h2>
                <GridContainer2>

                    {formData?.rabat?.map((rabat, index: number) => (
                        <>
                            <GridItem>
                                <CustomInput
                                    key={`wieksze_rowne_${index}`}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Powierzchnia zamównienia od:"}
                                    defaultValue={props.profile?.rabat?.[index]?.wieksze_rowne}
                                    min={0}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("rabat", "wieksze_rowne", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>
                            <GridItem>
                                <CustomInput
                                    key={`rabat_procenty_${index}`}
                                    type={"number"}
                                    placeholder={"wartość"}
                                    label={"Rabat w procentach"}
                                    min={0}
                                    defaultValue={props.profile?.rabat?.[index]?.rabat_procenty}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange("rabat", "rabat_procenty", index, parseFloat(e.target.value))
                                    }
                                />
                            </GridItem>
                        </>
                    ))}

                </GridContainer2>
                <ButtonSection>
                        <CustomButton type="button" text={"+"} function={() => addField("rabat")}/>
                </ButtonSection>
            </EditorSection>

            <HorizontalLine/>
            <ButtonSection>
                <ButtonWrapper>
                    <CustomButton type="submit" text="ZAPISZ"/>
                    <ModalComponent
                        isOpen={isModalSaveOpen}
                        onRequestClose={closeSaveModal}
                        title="Confirm Action"
                        onConfirm={handleConfirmSave}
                    >
                        {isFilenameValid() ? <p>Saving won't affect any other files!</p> :
                            <p>THIS NAME IS ALREADY TAKEN!!!</p>}
                        <p>Do you want to proceed with this action?</p>
                    </ModalComponent>
                </ButtonWrapper>

                <ButtonWrapper>
                    <CustomButton type="button" text="DELETE" function={openDeleteModal}/>
                    <ModalComponent
                        isOpen={isModalDeleteOpen}
                        onRequestClose={closeDeleteModal}
                        title="Confirm Action"
                        onConfirm={handleConfirmDelete}
                    >
                        <p>Czy chcesz usunąć ten plik? </p>
                    </ModalComponent>
                </ButtonWrapper>

                <ButtonWrapper>
                    <CustomButton type="button" text="EXIT" function={openExitModal}/>
                    <ModalComponent
                        isOpen={isModalExitOpen}
                        onRequestClose={closeExitModal}
                        title="Confirm Action"
                        onConfirm={handleConfirmExit}
                    >
                        <p>Czy chcesz wyjść? Niezapisane zmiany zostaną utracone! </p>
                    </ModalComponent>
                </ButtonWrapper>
            </ButtonSection>

        </FormWrapper>
    );
}

export default Form;