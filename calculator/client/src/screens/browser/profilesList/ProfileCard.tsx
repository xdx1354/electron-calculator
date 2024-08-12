import React from "react";
import styled from "styled-components";
import CustomButton from "../../../components/CustomButton";
import {JsonResponse} from "../../../types/types";
import {useNavigate} from "react-router-dom";
import ModalComponent from "../../../components/modal/Modal";
import CustomInput from "../../../components/CustomInput";

const Card = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    height: 20vh; // does not work 
    padding: 1vh 3vh;
    margin: 1vh;
    background-color: #FBFBFB;
    border-radius: 8px;
`
const CardTitle = styled.div`
    display: flex;
    width: 60%;
    flex-direction: row;
    justify-content: flex-start;
`

const ButtonSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
`

type Props = {
    name: string;
    fetchConfig: () => Promise<JsonResponse>;
}


const ProfileCard: React.FC<Props> = (props) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState<boolean>(false);
    const [isModalCopyOpen, setIsModalCopyOpen] = React.useState<boolean>(false);
    const [newName, setName] = React.useState<string>("");


    const navigate = useNavigate();

    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeDeleteModal = () => setIsModalDeleteOpen(false);

    const openCopyModal = () => setIsModalCopyOpen(true);
    const closeCopyModal = () => setIsModalCopyOpen(false);

    const handleConfirmDelete = () => {
        console.log('About to delete a file!');
        handleDelete().then(closeDeleteModal).catch(console.error);
        window.location.reload();
    }

    const handleCopyProfile = async () => {

        const newProfile = await props.fetchConfig();

        let filename = newName;
        newProfile.profile.type = filename;
        console.log("New Profile: ", newProfile);

        //saving
        const preparedData = JSON.stringify(newProfile);

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
        closeCopyModal();
        window.location.reload();
    };

    const getName = () => {
        return props.name.substring(0, props.name.length - 5);
    }

    const handleEditClick = async () => {
        try {
            console.log('Selected profile name:', props.name);
            const fetchedConfig= await props.fetchConfig();
            console.log('CONFIG:', fetchedConfig); // Should log the updated config

            navigate('/editor', { state: { profile: fetchedConfig.profile } });
        } catch (error) {
            console.error('Error navigating:', error);
        }
    }

    const handleDelete = async () => {
        console.log('Selected profile for deleting:', props.name.substring(0, props.name.length - 5));
        let filename = props.name.substring(0, props.name.length - 5);
        const url = 'http://localhost:4001/delete/' + filename;
        try {
            const response = await fetch(url, { method: 'DELETE' }); // Ensure method is DELETE
            if (response.ok) {
                console.log("File ", filename, " deleted successfully. ", response.statusText);
            } else {
                console.error("Error deleting:", response.statusText);
            }
        } catch (err) {
            console.error("Error deleting:", err);
        }
    }

    return(
        <Card>
            <CardTitle>
                <h3>{getName()}</h3>
            </CardTitle>

            <ButtonSection>
                <ButtonWrapper>
                    <CustomButton text="EDIT" function={handleEditClick} />
                </ButtonWrapper>
                <ButtonWrapper>
                    <CustomButton text="DELETE" function={openDeleteModal} />
                </ButtonWrapper>
                <ButtonWrapper>
                    <CustomButton text="COPY" function={openCopyModal}/>
                </ButtonWrapper>
            </ButtonSection>

            <ModalComponent
                isOpen={isModalDeleteOpen}
                onRequestClose={closeDeleteModal}
                title="Confirm Action"
                onConfirm={handleConfirmDelete}
            >
                <p>Czy chcesz usunąć ten plik? </p>
            </ModalComponent>


            <ModalComponent
                isOpen={isModalCopyOpen}
                onRequestClose={closeCopyModal}
                title="Confirm Action"
                onConfirm={handleCopyProfile}
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

        </Card>
    )
}

export default ProfileCard