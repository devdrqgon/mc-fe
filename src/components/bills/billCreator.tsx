import { Box, Flex, Heading, VStack } from "@chakra-ui/layout"
import { useEffect, useState } from "react"
import { Bill } from "react-app-env"
import BillInput from "./billIInput"
import { AnimatePresence, motion } from 'framer-motion'
import { popperCSSVars } from "@chakra-ui/popper"
interface BillCreatorProps {
    _handleNewBillCallback?: (_bill: Bill) => void,
    _uiBills?: Bill[]

}
const BillCreator: React.FC<BillCreatorProps> = (props) => {
    const [_internalBills, set_internalBills] = useState<Array<Bill>>([])
    const addAtStart = () => set_internalBills([
        {
            billName: "billanme",
            cost: 45,
            when: 2,
            username: "username",
            paid: true
        },
        ..._internalBills])
    const addAtStart2 = () => set_internalBills([
        {
            billName: "samir",
            cost: 4,
            when: 2,
            username: "username",
            paid: true
        },
        ..._internalBills])
    const addAtStart3 = () => set_internalBills([
        {
            billName: "med",
            cost: 4,
            when: 2,
            username: "username",
            paid: true
        },
        ..._internalBills])

    return (
        <>
            <button className="add" onClick={addAtStart}>
                Add
            </button>
            <button className="add" onClick={addAtStart2}>
                Add2
            </button>
            <button className="add" onClick={addAtStart3}>
                Add3
            </button>
            <Flex
                alignItems="center"
                direction="column">
                <BillInput
                    _username="tester"
                    handleBillCallback={props._handleNewBillCallback} />
                {_internalBills ?
                    <>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {[..._internalBills].map((b, i) => (
                                <AnimatePresence>
                                    {/* <ListItem */}

                                        {/* key={i}> */}
{/* <div
    style={{
        display: 'flex',
        justifyContent: 'space-around'
    }}>
    <div>
        {b.billName}
    </div>
    <div>
        {b.cost}
    </div>
</div> */}
                                        {/* {b.billName} */}
                                    {/* </ListItem> */}
                                </AnimatePresence>


                            ))}
                        </div>
                    </>
                    :
                    <></>}
            </Flex>
        </>
    )
}

// https://fettblog.eu/react-types-for-children-are-broken/
// const Item = (props: { children?: React.ReactNode }) => {
//     return <motion.div layout> {props.children}</motion.div >

// }
export default BillCreator