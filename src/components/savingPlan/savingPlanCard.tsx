import { Box, HStack, Text, VStack, Divider } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import { FaReact } from 'react-icons/fa'

const SavingPlan = (props: {_handleCreatePlanClick: ()=>void}) => {
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
                    <FaReact />
                    <Text minW={"200px"} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        Saving Plan
                    </Text>
                </HStack>
                <HiDotsVertical style={{ 'cursor': 'pointer' }} />
            </HStack>
            <VStack
                mt={7}
                pr={3}
                pl={3}
                pb={1}
                rounded={'lg'}
                w={"full"}
                alignItems="center">
                <Button onClick={props._handleCreatePlanClick}> Create a plan</Button>
            </VStack>
        </Box>
    )
}

export default SavingPlan
