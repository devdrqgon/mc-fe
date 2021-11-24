import { useColorModeValue } from "@chakra-ui/color-mode"
import { Box, Center, Heading, Stack, VStack } from "@chakra-ui/layout"
import { HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Text } from "@chakra-ui/react"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'


const BalanceViewer = () => {
    return (
        <>
            <Center py={12}>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
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
                    <VStack>
                        <Box w="full" justifyContent="flex-start" >
                            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                Main
                            </Heading>
                            <InputGroup size="sm">
                                <InputLeftAddon children="Gross" />
                                <Input placeholder="" value="3333" disabled={true}/>
                            </InputGroup>
                            <InputGroup size="sm">
                                <InputLeftAddon children="nett" />
                                <Input placeholder="" value="222" disabled={true}/>
                            </InputGroup>
                        </Box>
                    </VStack>
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Brand
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Nice Chair, pink
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                $57
                            </Text>
                            <Text textDecoration={'line-through'} color={'gray.600'}>
                                $199
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Center>
        </>
    )
}

export default BalanceViewer