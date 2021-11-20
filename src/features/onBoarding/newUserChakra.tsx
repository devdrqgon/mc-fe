import { Button, Container, Divider, Flex, FormControl, FormLabel, GridItem, Heading, Input, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react"
import BillCreator from "components/billCreator"
import BillViewer from "components/billViewer"
import MCModal from "components/modal"
import { useRef, useState } from "react"
import { BudgetConfigUI } from "react-app-env"
import Accounts, { AccountsInfo as AccountsInfoUI } from "./accounts"
import BudgetConfig from "./budgetConfig"
import SalaryInfo from "./SalaryInfo"

export interface SalaryInfoUI {
    amount: number,
    dayOfMonth: number
}
const NewUserChakra = () => {

    //Bills
    const [uiBills, setUIBills] = useState<Array<{
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }>>([])

    const handleNewBillCallback = (_bill: {
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }) => {
        setUIBills(() => [...uiBills, _bill])
    }

    //Salary Info
    //hooks
    const [uiSalaryInfo, setUISalaryInfo] = useState<SalaryInfoUI>({
        amount: 0,
        dayOfMonth: 0
    })
    //handler 
    const handleEditSalaryInfoCallback = (_salaryInfo: SalaryInfoUI) => {
        setUISalaryInfo(_salaryInfo)
    }

    //Accounts
    //hooks
    const [uiAccounts, setUIAccounts] = useState<AccountsInfoUI[]>([])
    const handleEditAccountsDataCallback = (_a: AccountsInfoUI[]) => {
        setUIAccounts(_a)
    }

    //BudgetConfig
    //hooks
    const [uiBudgetConfig, setUIBudgetConfig] = useState<BudgetConfigUI | null>(null)
    //handler 
    const handleEditBudgetConfigCallback = (_c: BudgetConfigUI) => {
        setUIBudgetConfig(_c)
    }


    const { isOpen, onOpen, onClose } = useDisclosure({ id: 'mcModal' })

    return (
        <>
            <Flex
                direction="column"
            >
                <Flex

                    direction={{ base: 'column', md: 'row' }}
                >
                    <VStack
                        w="full"
                        p={10}
                        spacing={10}
                        alignItems="flex-start "
                    // bg="red.100"

                    >
                        <Button onClick={onOpen}>Open MModal</Button>

                        <MCModal _isOpen={isOpen} _onClose={onClose}
                            _body={<div>
                                        Hey Ahmed! u rock! 
                            </div>} />
                        <Accounts _handleChangeCallback={handleEditAccountsDataCallback} />
                    </VStack>
                    <Divider orientation="vertical" />
                    <VStack
                        w="full"
                        p={10}
                        spacing={10}
                        alignItems="flex-start "
                    // bg="blue.100"
                    >
                        <SalaryInfo _handleChange={handleEditSalaryInfoCallback} />
                    </VStack>
                    <Divider orientation="vertical" />
                    <VStack
                        w="full"
                        p={10}
                        spacing={10}
                        alignItems="flex-start "
                    // bg="yellow.100"
                    >
                        <BudgetConfig _handleChange={handleEditBudgetConfigCallback} />
                    </VStack>
                </Flex>
                <Divider orientation="horizontal" />
                <VStack>
                    <BillCreator _uiBillsProp={uiBills} handleBillCallback={handleNewBillCallback} _username="tester"></BillCreator>
                    <BillViewer _bills={uiBills} />
                </VStack>
                <Divider orientation="horizontal" />
                <Button> Save</Button>
            </Flex>
        </>
    )
}

export default NewUserChakra