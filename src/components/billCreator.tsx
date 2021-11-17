import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface BillCreatorProps {
    _username: string,
    _uiBillsProp: Array<{
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }>,
    handleBillCallback: (bill: {
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }) => void
}
const BillCreator: React.FC<BillCreatorProps> = ({_username,handleBillCallback,_uiBillsProp}) => {
    const billNameRef = useRef<HTMLInputElement>(null)
    const billWhenRef = useRef<HTMLInputElement>(null)
    const billCostRef = useRef<HTMLInputElement>(null)

    const [newBillFlag, setnewBillFlag] = useState(false)

    const [uiBills, setUIBills] = useState<Array<{
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }>>(_uiBillsProp)
    useEffect(() => {

    }, [uiBills])
    const addBillClicked = () => {
        const _bill: {
            billName: string,
            username: string
            paid: boolean
            cost: number,
            when: number
        } = {
            billName: billNameRef.current!.value! as string,
            username: _username,
            paid: newBillFlag,
            cost: billCostRef.current!.value! as unknown as number,
            when: billWhenRef.current!.value! as unknown as number,
        }
        handleBillCallback(_bill)


        setUIBills(() => [...uiBills, _bill])

    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <input placeholder={"what"} ref={billNameRef} type={"text"}></input>
                <input placeholder={"how much"} ref={billCostRef} type={"number"}></input>
                <input placeholder={"when"} ref={billWhenRef} type={"number"}></input>
                <div>
                    <input
                        type="checkbox"
                        checked={newBillFlag}
                        onChange={() => {
                            setnewBillFlag(!newBillFlag)
                        }}
                    />

                </div>
                <button
                    onClick={addBillClicked}
                >
                    +
                </button>

            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#fff'
                }}>
                {uiBills.map((b) => (
                    <div
                        key={uuidv4()}
                        style={{
                            display: 'flex',
                        }}
                    >
                        <div>
                            {b.billName}
                        </div>
                        <div>
                            {b.billName}
                        </div>
                        <div>
                            {b.billName}
                        </div>
                        <div>
                            {b.billName}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BillCreator