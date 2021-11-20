import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { SimpleGrid, GridItem, VStack, Heading } from "@chakra-ui/layout"
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/number-input"
import { parse, format } from "path"
import { useState } from "react"

const BudgetConfig = () => {
    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\$/, "")

    const [value, setValue] = useState("1.53")
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
                        <Heading fontSize="30px">
                            Your Budget
                        </Heading>

                        <FormControl>
                            <FormLabel>
                                Food
                            </FormLabel>
                            <NumberInput
                                onChange={(valueString) => setValue(parse(valueString))}
                                value={format(value)}
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
                                onChange={(valueString) => setValue(parse(valueString))}
                                value={format(value)}
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

export default BudgetConfig