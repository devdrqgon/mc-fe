
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bill } from 'react-app-env';
import HContainer from "components/ui/Layout/HContainer";
import VContainer from "components/ui/Layout/VContainer";
import { AlignmentOptions } from "components/ui/Layout";

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
                                <FormLabel>
                                    Cost
                                </FormLabel>
                                <Input ref={billCostRef} />
                            </VContainer>
                            <VContainer>
                                <FormLabel isRequired>
                                    When
                                </FormLabel>
                                <NumberInput defaultValue={1} min={1} max={31}>
                                    <NumberInputField ref={billWhenRef} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </VContainer>
                            <VContainer

                                mt={42}
                                ml={2}
                                w="full"
                                direction={{ base: 'column', sm: 'row' }}
                                align={'center'}
                                justify={'space-between'}>
                                <Text minW={100}>
                                    Already paid
                                </Text>
                                <Checkbox size="lg" colorScheme={"green"} onChange={() => setnewBillFlag(!newBillFlag)} >

                                </Checkbox>
                            </VContainer>
                        </HContainer>
                        <HContainer>
                            <VContainer>
                                <Button
                                    onClick={addBillClicked}> + </Button>
                            </VContainer>
                        </HContainer>
                    </HContainer>

                </VContainer>
            </HContainer>
        </>
    )
}


export default BillInput

