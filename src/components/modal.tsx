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
interface MCModalProps {
    _isOpen: boolean,
    _onClose: () => void,
    _body: ReactNode,
    _title: string,
    _nextStep?: () => void,
    _disableCloseBtn?: boolean,
    _backBtn?: () => void,
    _submitBtn?: () => void,
    _hideFooter?: boolean,
    _closeOnOverlayClick?: true
}
const MCModal: React.FC<MCModalProps> = (props) => {

    return (
        <>
            <Modal
                id={"mcModal"}
                isOpen={props._isOpen}
                onClose={props._onClose}
                closeOnOverlayClick={props._closeOnOverlayClick? false : true}>
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
                    {props._hideFooter && props._hideFooter === true ?

                        <> </>
                        :
                        <ModalFooter>
                            {props._backBtn ?
                                <HStack pl={5} pr={5} w="full" justify="space-between">
                                    <Button onClick={props._backBtn}>
                                        Back
                                    </Button>
                                    {props._submitBtn ?
                                        <Button color="green.400" onClick={props._submitBtn}>
                                            submit
                                        </Button>
                                        :
                                        <Button color="green.400" onClick={props._nextStep}>
                                            Next
                                        </Button>}
                                </HStack>
                                :
                                <>
                                    {props._submitBtn ?
                                        <Button color="green.400" onClick={props._submitBtn}>
                                            submit
                                        </Button>
                                        :
                                        <Button color="green.400" onClick={props._nextStep}>
                                            Next
                                        </Button>
                                    }
                                </>
                            }
                        </ModalFooter>}
                </ModalContent>
            </Modal>
        </>
    )
}

export default MCModal