import { Button, Container, Divider, Flex, FormControl, FormLabel, GridItem, Heading, Input, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import BillCreator from "components/billCreator"
import BillViewer from "components/billViewer"
import MCModal from "components/modal"
import React, { ReactNode, useRef, useState } from "react"
import { BudgetConfigUI, SalaryInfoUI } from "react-app-env"
import { setTimeout } from "timers"
import Accounts, { AccountsInfo as AccountsInfoUI } from "./accounts"
import BudgetConfig from "./budgetConfig"
import SalaryInfo from "./SalaryInfo"


const NewUserChakra = (props: {
    _username: string,
    _token: string //change this
}) => {

    //Modal 
    const { isOpen, onOpen, onClose } = useDisclosure({ id: 'mcModal' })

    const [modalBody, setModalBody] = useState<ReactNode>(
        <>
            
        </>
    )

    const showSuccess = () => {
        setModalBody(
            <div>
                Success, Redirecting you in 3...
            </div>
        )
        setTimeout(() => {
            setModalBody(<div>
                Success, Redirecting you in 2...
            </div>)
        }, 1500)
        setTimeout(() => {
            setModalBody(<div>
                Success, Redirecting you in 1...
            </div>)
        }, 3000)
    }
    //Save AllInfos
    const onSaveClicked = async () => {
        onOpen()
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/info/',
                headers: {
                    Authorization: props._token
                },
                data: {
                    username: props._username,
                    salary: {
                        amount: 200,
                        dayOfMonth: 4
                    },
                    bills: [],
                    accounts: []
                },
            })
            if (response.status === 201) {
                showSuccess()
            }
            else {
                setModalBody(
                    <div>
                        Some Error Happened!
                    </div>
                )
            }
        } catch (error) {
            setModalBody(
                <div>
                    Some Error Happened! catch block
                </div>
            )
        }
    }
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

                        <MCModal _title="" _isOpen={isOpen} _onClose={onClose}
                            _body={modalBody} />
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
                <Button onClick={onSaveClicked}>Save</Button>

            </Flex>
        </>
    )
}

export default NewUserChakra