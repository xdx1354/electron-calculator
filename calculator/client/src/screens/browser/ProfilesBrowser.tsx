import CalculatorHeader from "../../components/CalculatorHeader";
import React, {useEffect} from "react";
import styled from "styled-components";
import CardsContainer from "./profilesList/CardsContainer";
import CustomButton from "../../components/CustomButton";
import ModalComponent from "../../components/modal/Modal";
import CustomInput from "../../components/CustomInput";
import NavBar from "../../components/NavBar/NavBar";


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

type FileName = string;

const ProfilesBrowser: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newName, setName] = React.useState("");
    const [filesList, setFilesList] = React.useState<FileName[]>([]);
    const [badFileName, setBadFileName] = React.useState<boolean>();

    const handleConfirm = () => {
        if(!badFileName && newName.length > 0){
            handleAddNewProfile();
        }
    }
    const closeModal = () => setIsModalOpen(false);
    const openModal = async () => {
        await fetchFiles();
        setIsModalOpen(true);
    }

    const handleAddNewProfile = async () => {


        const mockData= {
            "type": "profil112",
            "cena_za_1m_od_powierzchni_naklejki": [
                {
                    "id": 1,
                    "wieksze_niz": 0,
                    "mniejsze_rowne_niz": 0,
                    "cena": 0
                },
                {
                    "id": 2,
                    "wieksze_niz": 0,
                    "mniejsze_rowne_niz": 0,
                    "cena": 0
                }
            ],
            "cena_minimalna": 0,
            "koszt_projektu": 0,
            "doplata_za_sztuke": 0,
            "dodatki": [
                {
                    "typ": "szary_klej_maskujacy",
                    "dodatkowo_za_1m": 0,
                    "dodatkowo_do_ceny_minimalnej": 0
                }
            ],
            "rabat": [
                {
                    "wieksze_rowne": 0,
                    "rabat_procenty": 0
                }
            ],
            "wymiary": {
                "max_krotszy_bok": 0,
                "max_dluzszy_bok": 0
            },
            "marginesy": {
                "szerokosc": 0,
                "wysokosc": 0
            }
        }

        let filename = newName.replaceAll(' ', '_');
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

    const isFilenameValid = () => {
        if( newName.length == 0) {
            return false;
        }
        let filename :FileName = newName.replaceAll(' ', '_') + ".json";
        console.log('Checking if:', filename,' is valid!');
        return !filesList.find(item => item === filename);
    }

    useEffect(()=> {
        if(isFilenameValid()) {
            setBadFileName(false);
            console.log('valid!');
        } else {
            setBadFileName(true);
            console.log('INVALID')
        }
    },[newName])

    return(
        <>
            <NavBar
                isMenu={false}
            />
            <Card>
                <CardBody>
                    <HeaderWrapper>
                        <CalculatorHeader title="Profile" color="white"/>
                        <ButtonWrapper>
                            <CustomButton text={"NEW"} function={openModal}/>
                            <ModalComponent
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                title="Dodawanie profilu"
                                onConfirm={handleConfirm}
                            >
                                <div>
                                    <p>Czy chcesz dodać nowy profil? Podaj unikalną nazwę!</p>
                                    {badFileName?<p><b>TA NAZWA JEST BŁĘDNA LUB JUŻ UŻYTA</b></p>:<p><b>Podana nazwa jest dostępna</b></p>}
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
        </>
    );
}
export default ProfilesBrowser;