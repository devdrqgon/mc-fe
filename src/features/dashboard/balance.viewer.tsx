import { useColorModeValue } from "@chakra-ui/color-mode"
import { Box, Center, Divider, Flex, Heading, Stack, VStack } from "@chakra-ui/layout"
import { HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Text, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

const AmountDisplayer = (props: { _nett: number, _unpaidBills: number }) => {
    const [nettPercentage, setNettPercentage] = useState<string | null>(null)
    const [unpaidBillsPercentage, setUnpaidBillsPercentage] = useState<string | null>(null)

    useEffect(() => {
        const whole = props._nett + props._unpaidBills

        // Caluclate Percentage of nett 
        const nettPercentage = (props._nett / whole) * 100
        const unpaidBillsPercentage  = (props._unpaidBills / whole) * 100
        setNettPercentage(`${nettPercentage.toString()}%`)
        setUnpaidBillsPercentage(`${unpaidBillsPercentage.toString()}%`)

    }, [nettPercentage,unpaidBillsPercentage])
    return (
        <>
            <Flex width={"100%"}>
                <Tooltip label={<> <Flex minW="100px" justifyContent="space-between"> <div> Nett </div>  <div>  €{props._nett} </div> </Flex> </>}>
                    <Box width={nettPercentage!}>
                        <Divider mr={3} p={0} borderColor={"#7FCA34"} borderWidth={3}></Divider>
                    </Box>
                </Tooltip>

                <Tooltip label={<> <Flex minW="150px" justifyContent="space-between"> <div> Unpaid bills </div>  <div> €{props._unpaidBills}</div> </Flex> </>}>
                    <Box width={unpaidBillsPercentage!} >
                        <Divider m={0} p={0} borderColor={"#E78282"} borderWidth={3}></Divider>
                    </Box>
                </Tooltip>

            </Flex>
        </>
    )
}
const HInfoDisplayer = (props: { _input: number }) => {
    return (
        <>
            <Flex w={"100%"} direction="column">

                <Flex mb={4} width={"100%"} justifyContent="space-between">
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        Main
                    </Text>
                    <Text color={'#7FCA34'} fontSize={'m'} fontWeight="bold"  textTransform={'uppercase'}>
                    €{props._input}
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

interface BalanceCardProps {
    _mainAccountTotalBalance: number
    _nett: number
    _unpaidBills: number
}
const BalanceCard: React.FC<BalanceCardProps> = (props) => {
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
                    <Box>
                        <HStack>
                            <FaBalanceScaleLeft />
                            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                Balance
                            </Text>
                        </HStack>

                    </Box>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HStack>
                <VStack alignItems="flex-start">
                    <Divider mt={7} orientation={'horizontal'}></Divider>
                    <VStack w={"full"} alignItems="flex-start">
                        <HInfoDisplayer _input={props._mainAccountTotalBalance} />
                        <AmountDisplayer _nett={props._nett} _unpaidBills={props._unpaidBills} />

                    </VStack>
                </VStack>
            </Box>
        </>
    )
}



export const GenericCard = () => {
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
                EMpty
            </Box>
        </>
    )
}
export default BalanceCard