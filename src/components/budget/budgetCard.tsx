import { Box, Divider, Text, HStack, VStack } from "@chakra-ui/layout"
import AmountDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import React from "react"
import { HiDotsVertical } from "react-icons/hi"
import { CgCalculator } from "react-icons/cg"


interface BudgetCardProps {
    _limit: number,
    _spent: number
}
const BudgetCard: React.FC<BudgetCardProps> = (props) => {
    return (
        <>
            <Box
                minW={300}
                p={6}
                m={3}
                w={'full'}
                boxShadow="base"
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <HStack justifyContent={'space-between'}>
                    <HStack>
                        <CgCalculator />
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Budget
                        </Text>
                    </HStack>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HStack>
                <VStack
                    alignItems="flex-start">
                    <Divider mt={2} orientation={'horizontal'}></Divider>
                    <VStack
                        pr={3}
                        pl={3}
                        pb={1}
                        rounded={'lg'}
                        boxShadow="xs"
                        w={"full"}
                        alignItems="flex-start">
                        <HInfoDisplayer _text={"Weekly Budget"} _input={props._limit} />

                    </VStack>
                </VStack>
            </Box>
        </>
    )
}

export default BudgetCard
