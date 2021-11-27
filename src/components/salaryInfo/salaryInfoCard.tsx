import { Box, Divider, Text, HStack, VStack } from "@chakra-ui/layout"
import HInfoDisplayer from "components/hInfoDisplayer"
import React from "react"
import { HiDotsVertical } from "react-icons/hi"
import { GrMoney } from "react-icons/gr"


interface SalaryCardProps {
    _amount: number,
    _daysLeft: number
}
const SalaryCard: React.FC<SalaryCardProps> = (props) => {
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
                        <GrMoney />
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Salary
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
                        w={"full"}
                        alignItems="flex-start">
                        <HInfoDisplayer _field={"amount"} _value={`€${props._amount}`} />
                        <HInfoDisplayer _field={"next salary in"} _value={`${props._daysLeft.toString()} days`} />
                    </VStack>
                </VStack>
            </Box>
        </>
    )
}

export default SalaryCard
