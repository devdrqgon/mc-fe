import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { SimpleGrid, GridItem, Heading } from "@chakra-ui/layout"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import VContainer from "./ui/Layout/VContainer"


export enum AccountType {
    main = "main",
    saving = "saving"
}

export interface AccountsInfo {
    accountType: AccountType,
    balance: number,
    active: boolean
}
interface AccountsProps {
    _handleChangeCallback?: (_a: AccountsInfo[]) => void
}

const AccountsCreator: React.FC<AccountsProps> = ({ _handleChangeCallback }) => {


    const [mainBalance, setMainBalance] = useState('0')
    const [savingBalance, setSavingBalance] = useState('0')

    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\€/, "")


    const onDataChanged = () => {
        // get main balance
        const m = parse(mainBalance)
        const s = parse(savingBalance)
        _handleChangeCallback!([
            {
                accountType: AccountType.main,
                balance: parseFloat(m),
                active: true
            },
            {
                accountType: AccountType.saving,
                balance: parseFloat(s),
                active: true
            }
        ])
    }

    const onMainChanged = (_newMain: string) => {
        setMainBalance(_newMain)
    }


    const onSavingChanged = (_newSaving: string) => {
        setSavingBalance(_newSaving)
    }

    useEffect(() => {
        if (_handleChangeCallback)
            onDataChanged()
    }, [mainBalance, savingBalance])
    return (
        <>
            <SimpleGrid columns={8}>
                <GridItem colSpan={8}>
                    <VContainer
                    >
                      

                        <FormControl>
                            <FormLabel>
                                Main Account
                            </FormLabel>
                            <NumberInput
                                onChange={(valueString) => onMainChanged(parse(valueString))}
                                value={format(mainBalance)}
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
                                onChange={(valueString) => onSavingChanged(parse(valueString))}
                                value={format(savingBalance)}
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

export default AccountsCreator