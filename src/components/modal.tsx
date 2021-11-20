import { useDisclosure } from "@chakra-ui/hooks"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { JsxElement } from "typescript"

interface MCModalProps {
    _isOpen : boolean,
    _onClose: () => void,
    _body: ReactNode
}
const MCModal: React.FC<MCModalProps> = ({_isOpen, _onClose, _body}) => {

    return (
        <>

            <Modal id={"mcModal"} isOpen={_isOpen} onClose={_onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            {_body}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={_onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MCModal