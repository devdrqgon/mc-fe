import { Box, Divider, VContainer } from "@chakra-ui/layout"
import { HStack, Text } from "@chakra-ui/react"
import PercentageDisplayer from "components/AmountDisplayer"
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
                        <Text minW={"200px"} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Balance
                        </Text>
                    </HStack>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HStack>
                <VContainer
                    alignItems="flex-start">
                    <Divider mt={2} orientation={'horizontal'}></Divider>
                    <VContainer
                        pr={3}
                        pl={3}
                        pb={1}
                        rounded={'lg'}
                        w={"full"}
                        alignItems="flex-start">
                        <HInfoDisplayer _field={"Main"} _value={`€${props._mainAccountTotalBalance.toFixed(2)}`} />
                        <PercentageDisplayer _nett={props._nett} _unpaidBills={props._unpaidBills} />

                    </VContainer>
                </VContainer>
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