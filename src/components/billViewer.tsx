import { Box, Flex, VStack } from "@chakra-ui/layout"
import { v4 as uuidv4 } from 'uuid';
import { Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { Bill } from "react-app-env"

interface BillsViewerProps {
    _bills: Array<Bill>
}

const BillViewer: React.FC<BillsViewerProps> = ({ _bills }) => {
    return (
        <>
            {_bills.length > 0 ?
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th isNumeric>cost</Th>
                            <Th isNumeric>when</Th>
                            <Th isNumeric>paid</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {_bills.map((b) => (
                            <Tr key={uuidv4()}>
                                <Td> {b.billName}</Td>
                                <Td isNumeric>  €{b.cost}</Td>
                                <Td isNumeric> {b.when}</Td>
                                <Td isNumeric>
                                    {b.paid === true ?
                                        <>
                                            1
                                        </> :
                                        <>
                                            0
                                        </>
                                    }
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                :
                <></>
            }
        </>
    )
}

export default BillViewer


// <Flex
// direction='row'
// >
// <Box>
//     {_bills.map((b) => (
//         <Box>
//             <Flex>
//                 <Text>
//                     {b.billName}
//                 </Text>
//                 <Text>
//                     {b.cost}
//                 </Text>
//             </Flex>
//         </Box>
//     ))}
// </Box>
// </Flex>