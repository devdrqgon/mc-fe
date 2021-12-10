
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bill } from 'react-app-env';
import HContainer from "components/ui/Layout/HContainer";
import VContainer from "components/ui/Layout/VContainer";
import { AlignmentOptions } from "components/ui/Layout";
import CardButton from "components/ui/Controls/Buttons/CardButtons";

interface BillCreatorProps {
    _username: string,

    handleBillCallback?: (bill: Bill) => void
}


const BillInput: React.FC<BillCreatorProps> = ({ _username, handleBillCallback }) => {
    const billNameRef = useRef<HTMLInputElement>(null)
    const billWhenRef = useRef<HTMLInputElement>(null)
    const billCostRef = useRef<HTMLInputElement>(null)

    const [newBillFlag, setnewBillFlag] = useState(false)


    const addBillClicked = () => {
        const _bill: Bill = {
            billName: billNameRef.current!.value! as string,
            username: _username,
            paid: newBillFlag,
            cost: billCostRef.current!.value as unknown as number,
            when: billWhenRef.current!.value as unknown as number,
        }
        if (handleBillCallback) { handleBillCallback(_bill) }
    }



    return (
        <>
            <HContainer
            >
                <VContainer>
                    <VContainer>
                        <h6>
                            Name
                        </h6>
                        <input type="text"
                            ref={billNameRef}
                        />
                    </VContainer>
                    <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                        <HContainer>
                            <VContainer>
                                <h6>
                                    Cost
                                </h6>
                                <input type="number" ref={billCostRef} />
                            </VContainer>
                            <VContainer>
                                <h6 >
                                    When
                                </h6>
                                <input type="number" defaultValue={1} min={1} max={31} />

                            </VContainer>
                            <VContainer

                                alignItems={AlignmentOptions.center}
                                justifyContent={AlignmentOptions.spaceBetween}>
                                <h1>
                                    Already paid

                                </h1>
                                <input type="checkbox" onChange={() => setnewBillFlag(!newBillFlag)} />

                            </VContainer>
                        </HContainer>
                        <HContainer>
                            <VContainer>
                                <CardButton
                                    onClick={addBillClicked}> + </CardButton>
                            </VContainer>
                        </HContainer>
                    </HContainer>

                </VContainer>
            </HContainer>
        </>
    )
}


export default BillInput

