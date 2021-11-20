import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { SimpleGrid, GridItem, VStack, Heading } from "@chakra-ui/layout"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { useState } from "react"

const Accounts = () => {
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
                            Your Accounts
                        </Heading>

                        <FormControl>
                            <FormLabel>
                                Main Account
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
                                Saving Account
                            </FormLabel>
                            <NumberInput
                                onChange={(valueString) => setValue(parse(valueString))}
                                value={format(value)}
                                max={50}
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

export default Accounts