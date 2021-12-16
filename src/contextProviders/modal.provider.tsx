import Modal from "components/ui/Modal/Modal"
import { createContext, useEffect, useState } from "react"

interface IModalContext {
    closeModal(): void,
    openModal(_body: JSX.Element): void,
    updateBody(_body: JSX.Element): void,
    isOpen: boolean,
    Body: JSX.Element
}
export const ModalContext = createContext<IModalContext>({
    closeModal: () => { },
    openModal: (_body: JSX.Element) => { },
    updateBody: (_body: JSX.Element) => { },

    isOpen: false,
    Body: <> </>
})
const ModalProvider: React.FC = ({ children }) => {
    const [isOpen, setisOpen] = useState(false)
    const [Body, updateBody] = useState<JSX.Element>(<></>)
    const openModal = (_body: JSX.Element) => {
        updateBody(_body)
        setisOpen(true)

    }
    const closeModal = () => {
        console.log("Closing Model ")
        setisOpen(false)
    }
    useEffect(() => {

    }, [isOpen])
    return (
        <ModalContext.Provider value={{ closeModal, openModal, isOpen, Body, updateBody }}>
            <>
                {children}
            </>
        </ModalContext.Provider>
    )
}

export default ModalProvider

