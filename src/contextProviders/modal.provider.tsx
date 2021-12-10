import Modal from "components/ui/Modal/Modal"
import { createContext, useState } from "react"

interface IModalContext {
    closeModal(): void,
    openModal(_body: JSX.Element): void,
    isOpen: boolean,
    Body: JSX.Element
}
export const ModalContext = createContext<IModalContext>({
    closeModal: () => { },
    openModal: (_body: JSX.Element) => { },
    isOpen: false,
    Body: <> </>
})
const ModalProvider: React.FC = ({ children }) => {
    const [isOpen, setisOpen] = useState(false)
    const [Body, setBody] = useState< JSX.Element>(<></>)
    const openModal = (_body: JSX.Element) => {
        setBody(_body)
        setisOpen(true)

    }
    const closeModal = () => { setisOpen(false) }

    return (
        <ModalContext.Provider value={{ closeModal, openModal, isOpen, Body }}>
            <>
                {children}
            </>
        </ModalContext.Provider>
    )
}

export default ModalProvider

