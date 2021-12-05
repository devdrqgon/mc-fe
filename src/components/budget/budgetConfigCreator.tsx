import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { SimpleGrid, GridItem, Heading } from "@chakra-ui/layout"
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/number-input"
import VContainer from "components/ui/Layout/VContainer"
import { parse, format } from "path"
import { useEffect, useState } from "react"
import { BudgetConfigUI } from "react-app-env"

interface BudgetConfigProps {
    _handleChange?: (c: BudgetConfigUI) => void
}
const BudgetConfigCreator: React.FC<BudgetConfigProps> = ({ _handleChange }) => {

    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\€/, "")

    const [food, setFood] = useState("0")
    const [others, setOthers] = useState("0")
    const onDataChanged = () => {
        // get main balance
        const f = parse(food)
        const o = parse(others)

        _handleChange!({
            food: f,
            others: o
        })
    }

    useEffect(() => {
        if (_handleChange)
            onDataChanged()
    }, [food, others])
    return (
        <>
            <SimpleGrid columns={8}>
                <GridItem colSpan={8}>
                    <VContainer
                    >
                      

                        <FormControl>
                            <FormLabel>
                                Food
                            </FormLabel>
                            <NumberInput
                                onChange={(valueString) => setFood(parse(valueString))}
                                value={format(food)}
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
                                Other stuff
                            </FormLabel>
                            <NumberInput
                                onChange={(valueString) => setOthers(parse(valueString))}
                                value={format(others)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </VContainer>
                </GridItem>
            </SimpleGrid>
        </>
    )
}

export default BudgetConfigCreator