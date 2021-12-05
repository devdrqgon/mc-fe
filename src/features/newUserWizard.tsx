import React, { useEffect, useState } from "react"
import AccountsCreator, { AccountsInfo } from "../components/accountsCreator"
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import BudgetConfigCreator from "../components/budget/budgetConfigCreator";

import axios, { AxiosResponse } from "axios";
import { Bill, BudgetConfigUI, SalaryInfo } from "react-app-env";
import SalaryInfoCreator from "../components/salaryInfo/salaryInfoCreator";
import { useHistory } from "react-router";
import BillInput from "components/bills/billIInput";
import Motionlist from "components/Motionlist";
import ModalPortal from "components/ui/Modal/PortalModal";
import ModalChild from "components/ui/Modal/ModalChild";
import VContainer from "components/ui/Layout/VContainer";
import { Spinner } from "@chakra-ui/react";
import Card from "components/ui/Layout/Card";
import CardButton from "components/ui/Controls/Buttons/CardButtons";


interface NewUserWizardProps {
    _token: string,
    _username: string
}


const NewUserWizard: React.FC<NewUserWizardProps> = (props) => {


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

    //bills
    const [uiBills, setUIBills] = useState<Array<Bill>>([])
    const [_billsJSX, set_billsJSX] = useState<JSX.Element[]>([])

    const handleNewBillCallback = (_bill: Bill) => {
        setUIBills(() => [_bill, ...uiBills])
        set_billsJSX(
            [
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                        <div>
                            {_bill.billName}
                        </div>
                        <div>
                            {_bill.cost}
                        </div>
                    </div>
                </>,
                ..._billsJSX
            ]
        )
    }
    const calculateBudget = (food: string, others: string) => {
        return (parseFloat(food) + parseFloat(others))
    }


    //UI Behaviour
    const steps: Array<{
        label: string,
        comp: JSX.Element
    }> = [
            { label: 'Accounts', comp: <AccountsCreator _handleChangeCallback={handleEditAccountsDataCallback} /> },
            { label: 'Salary', comp: <SalaryInfoCreator _handleChange={handleEditSalaryInfoCallback} /> },
            { label: 'Budget', comp: <BudgetConfigCreator _handleChange={handleEditBudgetConfigCallback} /> },
            {
                label: 'Bills', comp:
                    <>
                        <VContainer>
                            <div>
                                <BillInput _username={localStorage.getItem('username')!} handleBillCallback={handleNewBillCallback} />
                            </div>
                            <div>
                                <Motionlist _items={_billsJSX}></Motionlist>
                            </div>
                        </VContainer>
                    </>
            }
        ]

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    const [afterSubmitModalBody, setAfterSubmitModalBody] = useState<React.ReactNode>(
        <VContainer>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
            <Card>
                Saving your Data..
            </Card>
        </VContainer>
    )
    const [modalOpen, setModalOpen] = useState(false);

    const [submitClicked, setsubmitClicked] = useState(false)
    const history = useHistory()
    const terminateOnBoarding = () => {
        setModalOpen(false)
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
                        <Card >
                            {comp}
                        </Card>
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
                    <Card>
                        <CardButton onClick={terminateOnBoarding}> Go to my Dashboard</CardButton>
                    </Card>
                )
            }
            else {
                setAfterSubmitModalBody(
                    <Card>
                        Failure!
                    </Card>
                )
            }
        } catch (error) {
            setAfterSubmitModalBody(
                <Card>
                    Failure!
                </Card>
            )
        }
    }



    useEffect(() => {
        setModalOpen(true)
    }, [afterSubmitModalBody])
    return (
        <>
            <ModalPortal modalOpen={modalOpen}>
                <ModalChild setModalOpen={setModalOpen} >
                    {submitClicked === false ? generateWizardBody() : afterSubmitModalBody}
                </ModalChild>
            </ModalPortal>
        </>
    )
}

export default NewUserWizard