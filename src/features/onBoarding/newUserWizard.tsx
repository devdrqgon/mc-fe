import { useDisclosure } from "@chakra-ui/hooks"
import MCModal from "components/modal"
import React, { useEffect, useState } from "react"
import Accounts, { AccountsInfo } from "./accounts"
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import SalaryInfo from "./SalaryInfo";
import BudgetConfig from "./budgetConfig";
import { Box, VStack } from "@chakra-ui/layout";
import { Modal } from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import BillCreator from "components/billCreator";
import BillViewer from "components/billViewer";
import { BudgetConfigUI, SalaryInfoUI } from "react-app-env";


interface NewUserWizardProps {
    _token: string,
    _username: string
}


const NewUserWizard: React.FC<NewUserWizardProps> = (props) => {

    //bills
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
    const calculateBudget = (food: string, others: string) =>{
        return (parseFloat(food) + parseFloat(others))
        }

    //Accounts
    //hooks
    const [uiAccounts, setUIAccounts] = useState<AccountsInfo[]>([])
    const handleEditAccountsDataCallback = (_a: AccountsInfo[]) => {
        setUIAccounts(_a)
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
 //BudgetConfig
    //hooks
    const [uiBudgetConfig, setUIBudgetConfig] = useState<BudgetConfigUI>({food: '0', others: '0'})
    //handler 
    const handleEditBudgetConfigCallback = (_c: BudgetConfigUI) => {
        setUIBudgetConfig(_c)
    }
    //UI Behaviour
    const steps: Array<{
        label: string,
        comp: JSX.Element
    }> = [
            { label: 'Accounts', comp: < Accounts _handleChangeCallback={handleEditAccountsDataCallback} /> },
            { label: 'Salary', comp: < SalaryInfo  _handleChange={handleEditSalaryInfoCallback}/> },
            { label: 'Budget', comp: < BudgetConfig _handleChange={handleEditBudgetConfigCallback} /> },
            {
                label: 'Bills', comp: <VStack>
                    <BillCreator
                        _username="tester"
                        handleBillCallback={handleNewBillCallback} />
                    <BillViewer _bills={uiBills} />
                </VStack>
            }
        ]

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    const [afterSubmitModalBody, setAfterSubmitModalBody] = useState<React.ReactNode>(
        <VStack>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
            <Box>
                Saving your Data..
            </Box>
        </VStack>
    )
    const [submitClicked, setsubmitClicked] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure({ id: 'mcModal' })
    const submitInitUserInfo = () => {
        setsubmitClicked(true)
        setTimeout(() => {
            callBE()
        }, 500)

    }
    const generateWizardBody = () => {
        return (
            <Steps activeStep={activeStep}>
                {steps.map(({ label, comp }) => (
                    <Step label={label} key={label}>
                        {comp}
                    </Step>
                ))}
            </Steps>
        )

    }

    const callBE = async () => {
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
                        amount: uiSalaryInfo.amount,
                        dayOfMonth: uiSalaryInfo.dayOfMonth
                    },
                    bills: uiBills,
                    accounts: uiAccounts,
                    weeklyBudget: {
                        limit: calculateBudget(uiBudgetConfig!.food , uiBudgetConfig!.others),
                        spent: 0
                    }
                },
            })
            if (response.status === 201) {
                setAfterSubmitModalBody(
                    <Box>
                        Success!
                    </Box>
                )
            }
            else {
                setAfterSubmitModalBody(
                    <Box>
                        Failure!
                    </Box>
                )
            }
        } catch (error) {
            setAfterSubmitModalBody(
                <Box>
                    Failure!
                </Box>
            )
        }
    }



    useEffect(() => {
        onOpen()
    }, [afterSubmitModalBody])
    return (
        <>
            <MCModal
                _title={"Let's get you quickly started, Ahmed!"}
                _body={submitClicked === false ? generateWizardBody() : afterSubmitModalBody}
                _isOpen={isOpen}
                _onClose={onClose}
                _nextStep={nextStep}
                _disableCloseBtn={true}
                _backBtn={activeStep === 0 ? undefined : prevStep}
                _submitBtn={activeStep !== steps.length - 1 ? undefined : submitInitUserInfo}
                _hideFooter={submitClicked}
                _closeOnOverlayClick
            />
        </>
    )
}

export default NewUserWizard