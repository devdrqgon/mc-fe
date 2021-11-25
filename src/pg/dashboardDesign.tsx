import { Box, Center, Container, Heading, HStack, Input, InputGroup, InputLeftAddon, Stack, useColorModeValue, VStack, Text, Divider, Flex } from "@chakra-ui/react"
import BalanceCard, { GenericCard } from "features/dashboard/balance.viewer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
const DashboardDesign = () => {
    const CardMinWidth = "300px"

    return (
        <>
            <Flex direction="column">
                <Center>
                    <Flex direction={{ base: 'column', md: 'row' }}>
                        <BalanceCard _nett={900} _unpaidBills={100} _mainAccountTotalBalance={1000}/>
                        <Divider orientation="vertical" />
                        <GenericCard />
                        <Divider orientation="vertical" />
                        <GenericCard />
                    </Flex>
                </Center>
                <Center>
                    <Flex direction={{ base: 'column', md: 'row' }}>
                        <GenericCard />
                        <Divider orientation="vertical" />
                        <GenericCard />
                        <Divider orientation="vertical" />
                        <GenericCard />
                    </Flex>
                </Center>
            </Flex>
        </>
    )
}

export default DashboardDesign



// <div
// style={
//     {
//         width: "1440px",
//         height: "1048px",
//         backgroundColor: 'red'
//     }
// }>
// </div>