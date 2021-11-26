import { useDisclosure } from "@chakra-ui/hooks"
import MCModal from "components/modal"
import React, { useEffect, useState } from "react"
import AccountsCreator, { AccountsInfo } from "./accounts"
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import BudgetConfigCreator from "./budgetConfig";
import { Box, VStack } from "@chakra-ui/layout";
import { Modal } from "@chakra-ui/modal";
import { Button, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import BillInput from "components/billIInput";
import BillViewer from "components/billViewer";
import { Bill, BudgetConfigUI, SalaryInfo } from "react-app-env";
import SalaryInfoCreator from "./SalaryInfo";
import { useHistory } from "react-router";
import BillCreator from "components/BillCreator";


interface NewUserWizardProps {
    _token: string,
    _username: string
}


const NewUserWizard: React.FC<NewUserWizardProps> = (props) => {

    //bills
    const [uiBills, setUIBills] = useState<Array<Bill>>([])

    const handleNewBillCallback = (_bill: Bill) => {
        setUIBills(() => [...uiBills, _bill])
    }
    const calculateBudget = (food: string, others: string) => {
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
    const [uiSalaryInfo, setUISalaryInfo] = useState<SalaryInfo>({
        amount: 0,
        dayOfMonth: 0
    })
    //handler 
    const handleEditSalaryInfoCallback = (_salaryInfo: SalaryInfo) => {
        setUISalaryInfo(_salaryInfo)
    }
    //BudgetConfig
    //hooks
    const [uiBudgetConfig, setUIBudgetConfig] = useState<BudgetConfigUI>({ food: '0', others: '0' })
    //handler 
    const handleEditBudgetConfigCallback = (_c: BudgetConfigUI) => {
        setUIBudgetConfig(_c)
    }
    //UI Behaviour
    const steps: Array<{
        label: string,
        comp: JSX.Element
    }> = [
            { label: 'Accounts', comp: <AccountsCreator _handleChangeCallback={handleEditAccountsDataCallback} /> },
            { label: 'Salary', comp: <SalaryInfoCreator _handleChange={handleEditSalaryInfoCallback} /> },
            { label: 'Budget', comp: <BudgetConfigCreator _handleChange={handleEditBudgetConfigCallback} /> },
            { label: 'Bills', comp: <BillCreator _uiBills={uiBills} _handleNewBillCallback={handleNewBillCallback} /> }
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
    const history = useHistory()
    const terminateOnBoarding = () => {
        onClose()
        history.push("/olduser")
    }
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
                        <Box mt={6} boxShadow="base">
                            {comp}
                        </Box>
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
                        limit: calculateBudget(uiBudgetConfig!.food, uiBudgetConfig!.others),
                        spent: 0
                    }
                },
            })
            if (response.status === 201) {
                setAfterSubmitModalBody(
                    <Box>
                        Success! <Button onClick={terminateOnBoarding}> Go to my Dashboard</Button>
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
                _title={submitClicked === false ? "Let's get you quickly started, Ahmed!" : ""}
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