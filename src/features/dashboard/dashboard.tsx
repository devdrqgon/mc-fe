import { Flex, Box, HStack } from "@chakra-ui/react"

const Dashboard = () => {
    return (
        <>
            <HStack
                py={3}
                justifyContent="center"
                spacing="24px">
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                >
                    Gross Income
                </Box>
                <Box>
                    Nett Income
                </Box>
                <Box>
                    Days untill next Income
                </Box>
            </HStack>
        </>
    )
}

export default Dashboard