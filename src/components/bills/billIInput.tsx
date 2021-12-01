/** @jsxImportSource @emotion/react */
import { Button, Text, Checkbox, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, VStack, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Bill } from 'react-app-env';

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
            <Flex
                p={5}

            >
                <VStack>
                    <FormControl isRequired>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <Input
                            ref={billNameRef}
                        />
                    </FormControl>
                    <HStack justify="space-between">
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel>
                                    Cost
                                </FormLabel>
                                <Input ref={billCostRef} />
                            </FormControl>
                            <FormControl>
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
                            </FormControl>
                            <VStack

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
                            </VStack>
                        </HStack>
                        <HStack>
                            <FormControl>
                                <Button
                                    onClick={addBillClicked}> + </Button>
                            </FormControl>
                        </HStack>
                    </HStack>

                </VStack>
            </Flex>
        </>
    )
}


export default BillInput

   