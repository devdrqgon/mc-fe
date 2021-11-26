import { Flex ,Text} from "@chakra-ui/layout"

 const HInfoDisplayer = (props: { _text: string, _input: number }) => {
    return (
        <>
            <Flex w={"100%"} direction="column">

                <Flex width={"100%"} justifyContent="space-between">
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {props._text}
                    </Text>
                    <Text color={'#7FCA34'} fontSize={'m'} fontWeight="bold" textTransform={'uppercase'}>
                        €{props._input}
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default HInfoDisplayer
