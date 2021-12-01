import { Box, Flex, Heading, VStack } from "@chakra-ui/layout"
import { useState } from "react"
import { Bill } from "react-app-env"
import BillInput from "./billIInput"
import { motion } from 'framer-motion'
interface BillCreatorProps {
    _handleNewBillCallback: (_bill: Bill) => void,
    _uiBills: Bill[]

}
const BillCreator: React.FC<BillCreatorProps> = (props) => {
    return (
        <>
            <Flex
                alignItems="center"
                direction="column">
                <BillInput
                    _username="tester"
                    handleBillCallback={props._handleNewBillCallback} />
                <Flex
                    alignItems="center"
                    direction="column"
                    overflowY="scroll"
                    maxH={"400px"}>

                    {[...props._uiBills].map((b) => (
                        <Item key={b._id}>
                            {/* <Flex bg="tomato" mt={1} mb={1} w="full" justify="space-around"
                            >
                                <Box>
                                    {b.billName}
                                </Box>
                                <Box>
                                   $ {b.cost}
                                </Box>
                                <Box>
                                    {b.when}
                                </Box>
                            </Flex> */}
                            {b.billName}
                        </Item>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

// https://fettblog.eu/react-types-for-children-are-broken/
const Item = (props: { children?: React.ReactNode }) => {
    return <motion.h1 layout> {props.children}</motion.h1 >

}
export default BillCreator