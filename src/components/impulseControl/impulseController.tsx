import { Box, HStack, Text, VStack, Divider } from '@chakra-ui/layout'
import { Button, Input } from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import { MdOutlineDisabledVisible } from 'react-icons/md'

const ImpulseController = () => {
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
                    <MdOutlineDisabledVisible />
                    <Text minW={"200px"} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        Impulse Control
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
                    alignItems="center">
                        <Input placeholder="Type the amount"></Input>
                        <Button> preview consequence</Button>

                </VStack>
            </VStack>
        </Box>
    )
}

export default ImpulseController
