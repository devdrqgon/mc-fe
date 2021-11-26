import { VStack } from "@chakra-ui/layout"
import { Bill } from "react-app-env"
import BillInput from "./billIInput"
import BillViewer from "./billViewer"
interface BillCreatorProps {
    _handleNewBillCallback:(_bill: Bill) => void,
    _uiBills: Bill[]

}
const BillCreator: React.FC<BillCreatorProps> = (props) => {
    return (

        <>
            <BillInput
                _username="tester"
                handleBillCallback={props._handleNewBillCallback} />
            <VStack
                overflowY="scroll"
                maxH={"200px"}>

                <BillViewer _bills={props._uiBills} />
            </VStack>
        </>

    )
}

export default BillCreator