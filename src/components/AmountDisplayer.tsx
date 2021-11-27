import { Flex, Box, Divider } from "@chakra-ui/layout"
import { Tooltip } from "@chakra-ui/react"
import { useState, useEffect } from "react"

const AmountDisplayer = (props: { _nett: number, _unpaidBills: number }) => {
    const [nettPercentage, setNettPercentage] = useState<string | null>(null)
    const [unpaidBillsPercentage, setUnpaidBillsPercentage] = useState<string | null>(null)

    useEffect(() => {
        const whole = props._nett + props._unpaidBills

        // Caluclate Percentage of nett 
        const nettPercentage = (props._nett / whole) * 100
        const unpaidBillsPercentage = (props._unpaidBills / whole) * 100
        setNettPercentage(`${nettPercentage.toString()}%`)
        setUnpaidBillsPercentage(`${unpaidBillsPercentage.toString()}%`)

    }, [nettPercentage, unpaidBillsPercentage])
    return (
        <>
            <Flex width={"100%"}>
                <Tooltip label={<> <Flex minW="100px" justifyContent="space-between"> <div> Nett </div>  <div>  €{props._nett.toFixed(2)} </div> </Flex> </>}>
                    <Box width={nettPercentage!}>
                        <Divider mr={3} p={0} borderColor={"#7FCA34"} borderWidth={3}></Divider>
                    </Box>
                </Tooltip>

                {props._unpaidBills !== 0 ?
                    <Tooltip label={<> <Flex minW="150px" justifyContent="space-between"> <div> Unpaid bills </div>  <div> €{props._unpaidBills.toFixed(2)}</div> </Flex> </>}>
                        <Box width={unpaidBillsPercentage!} >
                            <Divider m={0} p={0} borderColor={"#E78282"} borderWidth={3}></Divider>
                        </Box>
                    </Tooltip>
                    :
                    <></>}
            </Flex>
        </>
    )
}
export default AmountDisplayer