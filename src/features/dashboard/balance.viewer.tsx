import { useColorModeValue } from "@chakra-ui/color-mode"
import { Box, Center, Divider, Flex, Heading, Stack, VStack } from "@chakra-ui/layout"
import { HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Text } from "@chakra-ui/react"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

const HInfoDisplayer = () => {
    return (
        <>
            <Flex w={"100%"} direction="column">
                
                <Flex mb={4} width={"100%"} justifyContent="space-between">
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        Main
                    </Text>
                    <Text color={'gray.500'} fontSize={'m'} textTransform={'uppercase'}>
                        $5666
                    </Text>
                </Flex>
                <Flex width={"100%"}>

                    <Box width={"50%"}>
                        <Divider mr={3} p={0} borderColor={"#B4E782"} borderWidth={3}></Divider>
                    </Box>
                    <Box width={"25%"} >
                        <Divider m={0} p={0} borderColor={"#E78282"} borderWidth={3}></Divider>
                    </Box>
                    <Box width={"25%"}>
                        <Divider m={0} p={0} borderColor={"#C782E7"} borderWidth={3}></Divider>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}
const DashboardCard = () => {
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
                        <HInfoDisplayer />
                    </VStack>
                </VStack>
            </Box>
        </>
    )
}

export default DashboardCard