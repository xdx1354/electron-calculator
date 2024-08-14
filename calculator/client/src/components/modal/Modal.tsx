import React from 'react';
import Modal from 'react-modal';
import styled from "styled-components";
import CustomButton from "../CustomButton";

// Bind modal to app element for accessibility
Modal.setAppElement('#root');

interface ModalComponentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    title: string;
    onConfirm: () => void;
    children: React.ReactNode;
}

const ModalContent = styled.div `
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 5vh 4vw;
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-between;
    align-items: center;
`

const ModalComponent: React.FC<ModalComponentProps> = ({
                                                           isOpen,
                                                           onRequestClose,
                                                           title,
                                                           onConfirm,
                                                           children

                                                       }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999
                },
                content: {
                    width: '30vw',
                    height: '40vh',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '20px',
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }
            }}
        >
            <h2>{title}</h2>
            <ModalContent>{children}</ModalContent>
            <ButtonsWrapper>
                <CustomButton function={onConfirm} text={"Confirm"}/>
                <CustomButton function={onRequestClose} text={"Cancle"}/>
            </ButtonsWrapper>
        </Modal>
    );
};

export default ModalComponent;
