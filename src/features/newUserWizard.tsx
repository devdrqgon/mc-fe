import React, { useContext, useEffect, useState } from "react"
import AccountsCreator, { AccountsInfo } from "../components/accountsCreator"
import BudgetConfigCreator from "../components/budget/budgetConfigCreator";

import axios, { AxiosResponse } from "axios";
import { Bill, BudgetConfigUI, SalaryInfo } from "react-app-env";
import SalaryInfoCreator from "../components/salaryInfo/salaryInfoCreator";
import { useHistory } from "react-router";
import BillInput from "components/bills/billIInput";
import VContainer from "components/ui/Layout/VContainer";
import CardButton from "components/ui/Controls/Buttons/CardButtons";
import Card from "components/ui/Layout/Card/Card";
import Steps from "./Steps";
import BillItem from "components/bills/BillItem";
import HContainer from "components/ui/Layout/HContainer";
import { UserContext } from "contextProviders/user.context";




const NewUserWizard: React.FC = () => {

    const { user, token } = useContext(UserContext);

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
    const [uiBudgetConfig, setUIBudgetConfig] = useState<BudgetConfigUI>({ food: 0, others: 0 })
    //handler 
    const handleEditBudgetConfigCallback = (_c: BudgetConfigUI) => {
        setUIBudgetConfig(_c)
    }

    //bills
    const [uiBills, setUIBills] = useState<Bill[]>([])

    const handleNewBillCallback = (_bill: Bill) => {
        setUIBills([...uiBills, _bill])

    }
    const calculateBudget = (food: number, others: number) => {
        return (food + others)
    }
    const convertBillItemToMotionJSXItems = (_objects: any[]) => {
        let _output: JSX.Element[] = []
        _objects.forEach(element => {
            _output.push(
                <BillItem
                    _bill={element as Bill} />
            )
        })
        return _output
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
                                {/* <Motionlist _items={convertBillItemToMotionJSXItems(uiBills)}></Motionlist> */}
                                {uiBills.length > 0 ?

                                    <VContainer>
                                        {uiBills.map((item, i) => (
                                            <HContainer key={i}>
                                                <div>
                                                    {item.billName}
                                                </div>
                                                <div>
                                                    {item.cost}
                                                </div>
                                                <div>
                                                    {item.when}
                                                </div>
                                            </HContainer>
                                        ))}
                                    </VContainer> :
                                    <h1> Empty</h1>
                                }
                            </div>
                        </VContainer>
                    </>
            }
        ]


    const [afterSubmitModalBody, setAfterSubmitModalBody] = useState<React.ReactNode>(
        <VContainer>
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


    const callBE = async () => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/info/',
                headers: {
                    Authorization: token!
                },
                data: {
                    username: user!,
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


    return (
        <>
            <Steps _submitCallback={submitInitUserInfo} _steps={steps} />
        </>
    )
}

export default NewUserWizard

