import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { SimpleGrid, GridItem, VStack, Heading } from "@chakra-ui/layout"
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/number-input"
import { Text } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { SalaryInfoUI } from "react-app-env"

interface SalaryInfoProps {
    _handleChange?: (s: SalaryInfoUI) => void
}
const SalaryInfo: React.FC<SalaryInfoProps> = ({ _handleChange }) => {
    //refs

    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\€/, "")

    const [amountSalary, setAmountSalary] = useState("0")
    const [dayOfMonthOfSalary, setDayOfMonthOfSalary] = useState("1")

    const onChangeAmount = (newAmount: string) => {
        if (_handleChange) {
            _handleChange({
                amount: parseFloat(parse(newAmount)),
                dayOfMonth: parseInt(dayOfMonthOfSalary)
            })
        }
        setAmountSalary(parse(newAmount))
    }
    const onChangeDay = (newDay: string) => {

        if (_handleChange) {
            _handleChange({
                amount: parseFloat(amountSalary),
                dayOfMonth: parseInt(newDay)
            })
        }
        setDayOfMonthOfSalary(newDay)
    }

    return (
        <>
            <SimpleGrid columns={8}>
                <GridItem colSpan={8}>
                    <VStack
                        w="full"
                        h="full"
                        alignItems="flex-start"
                        spacing={10}
                        p={10}
                    >
                        

                        <FormControl>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <NumberInput
                                onChange={(newValue) => onChangeAmount(newValue)}
                                value={format(amountSalary)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                When
                            </FormLabel>
                            <NumberInput
                                defaultValue={dayOfMonthOfSalary}
                                min={1} max={31}
                                onChange={(newValue) => onChangeDay(newValue)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </>
    )
}

export default SalaryInfo