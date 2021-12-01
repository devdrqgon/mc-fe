import { Box, Flex, Heading, VStack } from "@chakra-ui/layout"
import { useEffect, useState } from "react"
import { Bill } from "react-app-env"
import BillInput from "./billIInput"
import { AnimatePresence, motion } from 'framer-motion'
import { popperCSSVars } from "@chakra-ui/popper"
import MotionList from "components/Motionlist"
interface BillCreatorProps {
    _handleNewBillCallback?: (_bill: Bill) => void,
    _uiBills?: Bill[]

}
const BillCreator: React.FC<BillCreatorProps> = (props) => {
    // const addAtStart = () => set_internalBills([
    //     {
    //         billName: "billanme",
    //         cost: 45,
    //         when: 2,
    //         username: "username",
    //         paid: true
    //     },
    //     ..._internalBills])
    // const addAtStart2 = () => set_internalBills([
    //     {
    //         billName: "samir",
    //         cost: 4,
    //         when: 2,
    //         username: "username",
    //         paid: true
    //     },
    //     ..._internalBills])
    // const addAtStart3 = () => set_internalBills([
    //     {
    //         billName: "med",
    //         cost: 4,
    //         when: 2,
    //         username: "username",
    //         paid: true
    //     },
    //     ..._internalBills])

    const [_billsJSX, set_billsJSX] = useState<JSX.Element[]>([])


    const add1 = () => {
        set_billsJSX(
            [
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                        <div>
                            vodafone
                        </div>
                        <div>
                            $34
                        </div>
                    </div>
                </>,
                ..._billsJSX
            ]
        )
    }


    const add2 = () => {
        set_billsJSX(
            [
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                        <div>
                            o2
                        </div>
                        <div>
                            $3000
                        </div>
                    </div>
                </>,
                ..._billsJSX
            ]
        )
    }
    useEffect(() => {
        let _a: JSX.Element[] = []

        if (props._uiBills) {
            props._uiBills.forEach(element => {
                _a.push(
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                            <div>
                                vodafone
                            </div>
                            <div>
                                $34
                            </div>
                        </div>
                    </>,
                    ..._a
                )
            })

            set_billsJSX(_a)
        }
    }, [props._uiBills])

    return (
        <>
            <button className="add" onClick={add1}>
                Add
            </button>
            <button className="add" onClick={add2}>
                Add2
            </button>
            <button className="add" onClick={() => { }}>
                Add3
            </button>
            <Flex
                alignItems="center"
                direction="column">
                <BillInput
                    _username="tester"
                    handleBillCallback={props._handleNewBillCallback} />
                {_billsJSX.length > 0 ?
                    <>
                        <MotionList _items={_billsJSX} />

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