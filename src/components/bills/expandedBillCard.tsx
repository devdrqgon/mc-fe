import { Box, Flex, Heading, VStack } from '@chakra-ui/layout'
import HInfoDisplayer from 'components/hInfoDisplayer'
import React from 'react'
import { Bill } from 'react-app-env'
import BillViewer from './billViewer'

interface ExpandedBillCardProps {
    _bills: Bill[]
}
const ExpandedBillCard: React.FC<ExpandedBillCardProps> = (props) => {
    return (
        <>
            <Box
                boxShadow="base"
            >
                <VStack
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
                            <VStack>
                                <Heading size="md">
                                    Paid
                                </Heading>
                                <BillViewer _bills={props._bills.filter((b) => {
                                    return b.paid === true
                                })} />
                            </VStack>
                        </Box>
                        <Box boxShadow="base"
                        >
                            <VStack>
                                <Heading size="md">
                                    Not yet
                                </Heading>
                                <BillViewer _bills={props._bills.filter((b) => {
                                    return b.paid === false
                                })} />
                            </VStack>
                        </Box>
                    </Flex>
                </VStack>
            </Box>
        </>
    )
}

export default ExpandedBillCard
