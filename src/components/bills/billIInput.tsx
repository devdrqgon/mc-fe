
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


    const [isPaidBill, setIsPaidBill] = useState(false)


    const [cost, setCost] = useState<null | number>(null)
    const [name, setName] = useState<null | string>(null)
    const [when, setWhen] = useState<null | number>(null)



    const onAddBillClicked = () => {
        if (cost && name && when) {
            handleBillCallback!({
                billName: name,
                username: _username,
                paid: isPaidBill,
                cost: cost,
                when
            })
        }
    }



    const onCostChanged = (_newCost: number) => {
        setCost(_newCost)
    }
    const onNameChanged = (_newName: string) => {
        setName(_newName)
    }
    const onWhenChanged = (_newName: number) => {
        setWhen(_newName)
    }

    
    useEffect(() => {
       
    }, [])




    return (
        <>
            <HContainer
            >
                <VContainer>
                    <VContainer>
                        <h6>
                            Name
                        </h6>
                        <input
                            onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onNameChanged(valueString.target.value)}
                            value={name ? name : ''}
                        />
                    </VContainer>
                    <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                        <HContainer>
                            <VContainer>
                                <h6>
                                    Cost
                                </h6>
                                <input
                                    type="number"
                                    onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onCostChanged(parseFloat(valueString.target.value))}
                                    value={cost ? cost : ''}
                                />
                            </VContainer>
                            <VContainer>
                                <h6 >
                                    When
                                </h6>
                                <input
                                    type="number"
                                    onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onWhenChanged(parseFloat(valueString.target.value))}
                                    value={when ? when : ''}
                                />
                            </VContainer>
                            <VContainer

                                alignItems={AlignmentOptions.center}
                                justifyContent={AlignmentOptions.spaceBetween}>
                                <h1>
                                    Already paid

                                </h1>
                                <input type="checkbox" onChange={() => setIsPaidBill(!isPaidBill)} />

                            </VContainer>
                        </HContainer>
                        <HContainer>
                            <VContainer>
                                <CardButton
                                    onClick={handleBillCallback? () => onAddBillClicked() : () => {}}> + </CardButton>
                            </VContainer>
                        </HContainer>
                    </HContainer>

                </VContainer>
            </HContainer>
        </>
    )
}


export default BillInput

