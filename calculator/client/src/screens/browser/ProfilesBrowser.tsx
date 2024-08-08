import CalculatorHeader from "../../components/CalculatorHeader";
import React from "react";
import styled from "styled-components";
import CardsContainer from "./profilesList/CardsContainer";
import CustomButton from "../../components/CustomButton";
import ModalComponent from "../../components/modal/Modal";
import CustomInput from "../../components/CustomInput";


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
    padding-top: 3vh;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30%;
    margin: 2vh 0;
`

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15vh;
`


const ProfilesBrowser: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newName, setName] = React.useState("");

    const handleConfirm = () => handleAddNewProfile();
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const handleAddNewProfile = async () => {


        const mockData={
            "type": "profil112",
            "cena_za_1m_od_powierzchni_naklejki": [
                {
                    "id": 1,
                    "wieksze_niz": 0,
                    "mniejsze_rowne_niz": 4.5,
                    "cena": 169
                },
                {
                    "id": 2,
                    "wieksze_niz": 4.5,
                    "mniejsze_rowne_niz": 9999,
                    "cena": 84.5
                }
            ],
            "cena_minimalna": 96,
            "koszt_projektu": 24,
            "doplata_za_sztuke": 0,
            "dodatki": [
                {
                    "typ": "szary_klej_maskujacy",
                    "dodatkowo_za_1m": 41,
                    "dodatkowo_do_ceny_minimalnej": 48
                }
            ],
            "rabat": [
                {
                    "wieksze_rowne": 1,
                    "rabat_procenty": 2
                },
                {
                    "wieksze_rowne": 2,
                    "rabat_procenty": 4
                },
                {
                    "wieksze_rowne": 3,
                    "rabat_procenty": 6
                },
                {
                    "wieksze_rowne": 4,
                    "rabat_procenty": 8
                },
                {
                    "wieksze_rowne": 5,
                    "rabat_procenty": 10
                },
                {
                    "wieksze_rowne": 6,
                    "rabat_procenty": 12
                },
                {
                    "wieksze_rowne": 7,
                    "rabat_procenty": 14
                },
                {
                    "wieksze_rowne": 8,
                    "rabat_procenty": 16
                },
                {
                    "wieksze_rowne": 9,
                    "rabat_procenty": 18
                },
                {
                    "wieksze_rowne": 10,
                    "rabat_procenty": 20
                },
                {
                    "wieksze_rowne": 11,
                    "rabat_procenty": 22
                },
                {
                    "wieksze_rowne": 12,
                    "rabat_procenty": 24
                },
                {
                    "wieksze_rowne": 13,
                    "rabat_procenty": 25
                },
                {
                    "wieksze_rowne": 14,
                    "rabat_procenty": 25
                },
                {
                    "wieksze_rowne": 15,
                    "rabat_procenty": 25
                }
            ],
            "wymiary": {
                "max_krotszy_bok": 134,
                "max_dluzszy_bok": 999
            },
            "marginesy": {
                "szerokosc": 0.2,
                "wysokosc": 0.2
            }
        }
        let filename = newName;
        mockData.type = filename;
        const data = {profile: mockData};
        console.log("New Profile: ", data);

        //saving
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
        closeModal();
        window.location.reload();
};

    return(
        <Card>
            <CardBody>
                <HeaderWrapper>
                    <CalculatorHeader title="Profile" color="white"/>
                    <ButtonWrapper>
                        <CustomButton text={"NEW"} function={openModal}/>
                        <ModalComponent
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            title="Confirm Action"
                            onConfirm={handleConfirm}
                        >
                            <div>
                                <p>Czy chcesz dodać nowy profil? Podaj unikalną nazwę!</p>
                                    <CustomInput
                                        key="name"
                                        placeholder="text"
                                        type="text"
                                        defaultValue={newName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setName(e.target.value)
                                        }
                                    />
                            </div>
                        </ModalComponent>
                    </ButtonWrapper>
                </HeaderWrapper>
                <CardsContainer/>
            </CardBody>
        </Card>
    );
}
export default ProfilesBrowser;