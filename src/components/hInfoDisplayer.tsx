import { Flex ,Text} from "@chakra-ui/layout"

 const HInfoDisplayer = (props: { _field: string, _value: string }) => {
    return (
        <>
            <Flex w={"100%"} direction="column">

                <Flex width={"100%"} justifyContent="space-between">
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {props._field}
                    </Text>
                    <Text color={'gray.500'} fontSize={'m'} fontWeight="bold" textTransform={'uppercase'}>
                        {props._value}
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default HInfoDisplayer
