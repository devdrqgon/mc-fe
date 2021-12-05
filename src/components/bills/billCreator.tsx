import { useEffect, useState } from "react"
import { Bill } from "react-app-env"
import BillInput from "./billIInput"
import MotionList from "components/Motionlist"
import HContainer from "components/ui/Layout/HContainer"
import { AlignmentOptions } from "components/ui/Layout"
import VContainer from "components/ui/Layout/VContainer"
interface BillCreatorProps {
    _handleNewBillCallback?: (_bill: Bill) => void,
    _uiBills?: Bill[]

}
const BillCreator: React.FC<BillCreatorProps> = (props) => {


    const [_billsJSX, set_billsJSX] = useState<JSX.Element[]>([])


    // const add1 = () => {
    //     set_billsJSX(
    //         [
    //             <>
    //                 <div
    //                     style={{
    //                         display: 'flex',
    //                         justifyContent: 'space-around'
    //                     }}>
    //                     <div>
    //                         vodafone
    //                     </div>
    //                     <div>
    //                         $34
    //                     </div>
    //                 </div>
    //             </>,
    //             ..._billsJSX
    //         ]
    //     )
    // }


    // const add2 = () => {
    //     set_billsJSX(
    //         [
    //             <>
    //                 <div
    //                     style={{
    //                         display: 'flex',
    //                         justifyContent: 'space-around'
    //                     }}>
    //                     <div>
    //                         o2
    //                     </div>
    //                     <div>
    //                         $3000
    //                     </div>
    //                 </div>
    //             </>,
    //             ..._billsJSX
    //         ]
    //     )
    // }
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

            <VContainer
                alignItems={AlignmentOptions.center}
            >
                <BillInput
                    _username="tester"
                    handleBillCallback={props._handleNewBillCallback} />
                {_billsJSX.length > 0 ?
                    <>
                        <MotionList _items={_billsJSX} />

                    </>
                    :
                    <></>}
            </VContainer>
        </>
    )
}

// https://fettblog.eu/react-types-for-children-are-broken/
// const Item = (props: { children?: React.ReactNode }) => {
//     return <motion.div layout> {props.children}</motion.div >

// }
export default BillCreator