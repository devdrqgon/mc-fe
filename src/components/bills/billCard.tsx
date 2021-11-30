import { Box, HStack, VStack, Divider, Text } from '@chakra-ui/layout'
import HInfoDisplayer from 'components/hInfoDisplayer'
import { Bill } from 'react-app-env'
import { RiBillLine } from 'react-icons/ri'
import { BsArrowsAngleExpand } from 'react-icons/bs'

interface BillCardProps{
    _total: number,
    _paid: number,
    _unpaid: number,
    _bills: Bill[]
}
const BillCard: React.FC<BillCardProps> = (props) => {
    return (
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
                    <RiBillLine />
                    <Text minW={"200px"}  color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        Bills
                    </Text>
                </HStack>
                <BsArrowsAngleExpand style={{ 'cursor': 'pointer' }} />
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
                  <HInfoDisplayer _field={"total"} _value={`€${props._total.toFixed(2)}`} />
                  <HInfoDisplayer _field={"paid"} _value={`€${props._paid.toFixed(2)}`} />
                  <HInfoDisplayer _field={"not yet"} _value={`€${props._unpaid.toFixed(2)}`} />

                </VStack>
            </VStack>
        </Box>
    )
}

export default BillCard
