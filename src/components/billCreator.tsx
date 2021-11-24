/** @jsxImportSource @emotion/react */
import { Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from '@chakra-ui/react';
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DatePickerProps } from '@orange_digital/chakra-datepicker/dist/props';
import { Bill } from 'react-app-env';

interface BillCreatorProps {
    _username: string,
    
    handleBillCallback?: (bill: Bill) => void
}


const BillCreator: React.FC<BillCreatorProps> = ({ _username, handleBillCallback }) => {
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

    const addButtonVisibility = () => {
        if (billNameRef.current !== null
            &&
            billCostRef.current !== null
        ) {
            return false
        } else
            return true
    }

    return (
        <>
            <Flex>
                <VStack

                >
                  
                    <Flex
                        p={5}
                    >
                        <FormControl>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <Input
                                ref={billNameRef}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Cost
                            </FormLabel>
                            <Input ref={billCostRef} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
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
                        <FormControl mt={10}>

                            <Checkbox onChange={() => setnewBillFlag(!newBillFlag)} >Already paid</Checkbox>
                        </FormControl>
                        <FormControl mt={7}>

                            <Button
                                onClick={addBillClicked}> + </Button>
                        </FormControl>
                    </Flex>
                </VStack>
            </Flex>
        </>
    )
}


export default BillCreator


// Bills
//             <div
//                 css={css`
//                         display: grid; 
//                         grid-template-columns: 1fr 0.9fr 1.1fr 1fr; 
//                         grid-template-rows: 1fr 1fr; 
//                         gap: 0px 0px; 
//                         grid-template-areas: 
//                             "name name name name"
//                             "cost dueOn paid add";       
//                     `
//                 }>
//                 <div css={css`
//                         grid-area: name;

//                     `
//                 }>
//                     <input type="text" placeholder={"name"} ref={billNameRef} />


//                 </div>
//                 <div css={css`
//                         grid-area: cost;    
//                     `
//                 }>
//                     <input type="text" placeholder={"cost"} ref={billCostRef} />

//                 </div>
//                 <div css={css`
//                         grid-area: dueOn;    
//                     `
//                 }>
//                     <input placeholder={"how much"} ref={billCostRef} type='date'></input>
//                 </div>
//                 <div css={css`
//                         grid-area: paid;    
//                     `
//                 }>
//                     <input
//                         type="checkbox"
//                         checked={newBillFlag}
//                         onChange={() => {
//                             setnewBillFlag(!newBillFlag)
//                         }}
//                     />
//                 </div>
//                 <div css={css`
//                         grid-area: add;    
//                     `
//                 }>
//                     <button
//                         onClick={addBillClicked}
//                     >
//                         +
//                     </button>
//                 </div>
//             </div>
//             <div
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     color: '#fff'
//                 }}>
//                 {uiBills.map((b) => (
//                     <div
//                         key={uuidv4()}
//                         style={{
//                             display: 'flex',
//                         }}
//                     >
//                         <div>
//                             {b.billName}
//                         </div>
//                         <div>
//                             {b.billName}
//                         </div>
//                         <div>
//                             {b.billName}
//                         </div>
//                         <div>
//                             {b.billName}
//                         </div>
//                     </div>
//                 ))}
//             </div>