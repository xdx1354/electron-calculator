import React from 'react';
import Modal from 'react-modal';

// Bind modal to app element for accessibility
Modal.setAppElement('#root');

interface ModalComponentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    title: string;
    onConfirm: () => void;
    children: React.ReactNode;
}

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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
                },
                content: {
                    padding: '20px',
                    textAlign: 'center'
                }
            }}
        >
            <h2>{title}</h2>
            <div>{children}</div>
            <button onClick={onRequestClose}>Cancel</button>
            <button onClick={onConfirm}>Confirm</button>
        </Modal>
    );
};

export default ModalComponent;
