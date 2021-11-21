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
    Box,
    HStack,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { JsxElement } from "typescript"

interface MCModalProps {
    _isOpen: boolean,
    _onClose: () => void,
    _body: ReactNode,
    _title: string,
    _nextStep?: () => void,
    _disableCloseBtn?: boolean,
    _BackBtn?: () => void,
}
const MCModal: React.FC<MCModalProps> = (props) => {

    return (
        <>
            <Modal
                id={"mcModal"} isOpen={props._isOpen} onClose={props._onClose}>
                <ModalOverlay />

                <ModalContent>

                    <ModalHeader fontSize={23}>
                        {props._title}
                    </ModalHeader>
                    {props._disableCloseBtn === true ?
                        <> </>
                        :
                        <ModalCloseButton />
                    }
                    <ModalBody>

                        {props._body}
                    </ModalBody>
                    <ModalFooter>
                        <HStack pl={5} pr={5} w="full" justify="space-between">
                            <Button>
                                Back
                            </Button>
                            <Button color="green.400" mr={3} onClick={props._nextStep}>
                                Next
                            </Button>
                        </HStack>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MCModal