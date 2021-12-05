import { Box, Flex, Heading, VContainer } from '@chakra-ui/layout'
import HInfoDisplayer from 'components/hInfoDisplayer'
import MotionList from 'components/Motionlist'
import React, { useEffect, useState } from 'react'
import { Bill } from 'react-app-env'
import { emitKeypressEvents } from 'readline'
import BillItem from './BillItem'



/**
 * MY problem is I have 
 * 
 * 3 comp: 
 *  1-   Bill Card
 *  2-      expanded Bill Card
 *  3-          BillItem 
 * 
 *  1- user clicks on pay bill in BillItem, bill item shows loading 
 *
 *  Apporach1:
 *      2- BillItem calls backend
 *      3- BillItem unmounts
 *      Problem: cant notify Other components that they should update their state 
 * 
 *  Approach2 : 
 *      2- BillItem fires callback to BillCard 
 *      3- billCard calls backend to update the bill 
 *      4- billCard updates the _bills state hook, which should autmatically udpate children
 *      Problem: in case of err, hard to reupdate that billitem ui state
 * 
 *  Approach 3:
 *      2- billitem calls backend
 *      3a on Error update ui
 *      3b on success fire callback to billcard, to update _bills hook 
 *  
 *  
 */

interface ExpandedBillCardProps {
    _bills: Bill[],
    _handleOnClickPayBill: () => void
}
const ExpandedBillCard: React.FC<ExpandedBillCardProps> = (props) => {
    const [paidBills, setPaidBills] = useState(props._bills.filter(((b) => { return b.paid === true })))
    const [unPaidBills, setUnPaidBills] = useState(props._bills.filter(((b) => { return b.paid === false })))



    const convertBillItemToMotionJSXItems = (_objects: any[]) => {
        let _output: JSX.Element[] = []
        _objects.forEach(element => {
            _output.push(
                <BillItem
                    _bill={element as Bill}
                    _handleMarkAspaid={props._handleOnClickPayBill} />
            )
        })
        return _output
    }

    useEffect(() => {
        setPaidBills(props._bills.filter(((b) => { return b.paid === true })))
        setUnPaidBills(props._bills.filter(((b) => { return b.paid === false })))
    }, [props._bills])
    return (
        <>
            <Box
                boxShadow="base"
            >
                <VContainer
                    align="center"
                    justify="center"
                >
                    <Flex mt={10} mb={10} w="full" justify="space-around"
                    >
                        <Box>
                            <HInfoDisplayer _field="Total" _value="320" />
                        </Box>
                        <Box>
                            <HInfoDisplayer _field="Paid" _value="32" />
                        </Box>
                        <Box>
                            <HInfoDisplayer _field="not yet" _value="122" />
                        </Box>
                    </Flex>
                    <Flex w="full" justifyContent="space-around">
                        <Box boxShadow="base"
                        >
                            <VContainer>
                                <Heading size="md">
                                    Paid
                                </Heading>
                                <MotionList _items={convertBillItemToMotionJSXItems(paidBills)} />
                            </VContainer>
                        </Box>
                        <Box boxShadow="base"
                        >
                            <VContainer>
                                <Heading size="md">
                                    Not yet
                                </Heading>
                                <MotionList _items={convertBillItemToMotionJSXItems(unPaidBills)} />
                            </VContainer>
                        </Box>
                    </Flex>
                </VContainer>
            </Box>
        </>
    )
}

export default ExpandedBillCard
