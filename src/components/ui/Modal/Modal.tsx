import { ModalContext } from "contextProviders/modal.provider"
import React, { useContext, useEffect } from "react"
import { createPortal } from "react-dom"
import { ModalWrapper, ModalCard, CloseButton, Background } from "./Modal.styled"
import SignUpCard from 'features/auth/SignUpCard';

const Portal: React.FC = ({ children }) => {
    const modalRoot = document.getElementById("modal")
    const docElement = document.createElement("div")
    docElement.style.backgroundColor = "green"

    useEffect(() => {
        modalRoot!.appendChild(docElement)
    }, []);
    // useEffect(() => {
    //     return () => { modalRoot!.removeChild(docElement) }
    // });
    return createPortal(children, docElement)
}

const Modal: React.FC = ({ children }) => {
    const { isOpen, closeModal, Body } = useContext(ModalContext)

    useEffect(() => {

    }, [isOpen, Body])

    if (isOpen === false) return null
    return (
        <Portal>
             <Background/>
             <ModalWrapper>
            
                    <ModalCard>
                        <CloseButton onClick={closeModal}>
                            close
                        </CloseButton>
                        {Body}
                    </ModalCard>
                </ModalWrapper>
        </Portal>)
}

export default Modal

// <Portal>
// <ModalWrapper>
//     <ModalCard>
//         <CloseButton onClick={closeModal}>
//             close
//         </CloseButton>
//         { Body }
//     </ModalCard>
//     <Background /> {/*    :onClick={_onCloseCallback} <= activate this when u want to close modal on WrapperClick */}
// </ModalWrapper>
// </Portal>