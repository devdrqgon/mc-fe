import { Box, Divider, VStack } from "@chakra-ui/layout"
import { HStack, Text } from "@chakra-ui/react"
import AmountDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'



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
                    <HStack>
                        <FaBalanceScaleLeft />
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Balance
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
                        <HInfoDisplayer _field={"Main"} _value={`€${props._mainAccountTotalBalance.toFixed(2)}`} />
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