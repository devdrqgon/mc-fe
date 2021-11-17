import axios from 'axios'
import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4, v4 } from 'uuid'
import Typography from '@mui/material/Typography'
import { useMutation } from "react-query"
import { useHistory } from 'react-router'
import BillCreator from 'components/billCreator'

enum AccountType {
    main = "main",
    saving = "saving"
}

const OnBoarding = (props: { _username: string }) => {
    //Config budget
    //hooks
   
    //refs
    const configBudgetFood = useRef<HTMLInputElement>(null)
    const configBudgetOthers = useRef<HTMLInputElement>(null)
   
    //Salary Info
    //hooks
    const [uiSalaryInfo, setUISalaryInfo] = useState<{
        amount: number,
        dayOfMonth: number
    }>({
        amount: 0,
        dayOfMonth: 0
    })
    //refs
    const currentBalanceRef = useRef<HTMLInputElement>(null)
    const dayOfMonthOfSalaryRef = useRef<HTMLInputElement>(null)

    //handlers
    const UpdateUISalaryInfo = () => {
        //Prepare SalaryInfo Obj 

        //Update hook
        setUISalaryInfo({
            amount: currentBalanceRef.current!.value as unknown as number,
            dayOfMonth: dayOfMonthOfSalaryRef.current!.value as unknown as number
        })
    }



    //Accounts
    //hooks
    const [uiAccounts, setUIAccounts] = useState<Array<{
        accountType: AccountType,
        balance: number,
        active: boolean
    }>>([
        { accountType: AccountType.main, balance: 0, active: true },
        { accountType: AccountType.saving, balance: 0, active: false }
    ])
    //refs
    const mainAccountBalanceRef = useRef<HTMLInputElement>(null)
    const savingAccountBalanceRef = useRef<HTMLInputElement>(null)
    //handlers
    const UpdateUIAccountsClicked = () => {
        setUIAccounts(
            [
                {
                    accountType: AccountType.main,
                    balance: mainAccountBalanceRef.current!.value as unknown as number,
                    active: true
                },
                {
                    accountType: AccountType.saving,
                    balance: savingAccountBalanceRef.current!.value as unknown as number,
                    active: false
                }
            ]
        )
    }

    //Bills
    const [uiBills, setUIBills] = useState<Array<{
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }>>([])
    useEffect(() => {

    }, [uiBills])
    const handleNewBillCallback = (_bill: {
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number
    }) => {
        setUIBills(() => [...uiBills, _bill])
    }


    //Save
    const saveAllinDB = () => {
        createUserInfoMutation.mutate({
            username: props._username,
            salary: {
                amount: uiSalaryInfo.amount,
                dayOfMonth: uiSalaryInfo.dayOfMonth
            },
            bills: uiBills,
            accounts: uiAccounts,
            weeklybudget: {
                limit: configBudgetFood.current!.value as unknown as number,
                spent: 0
            }

        })
    }
    const miscBudgetRef = useRef<HTMLInputElement>(null);



    const history = useHistory()
    const [saved, setSaved] = useState(false)



    const createUserInfoMutation = useMutation<Response, unknown, {
        username: string,
        salary: {
            amount: number,
            dayOfMonth: number
        },
        bills: Array<{
            billName: string,
            username: string
            paid: boolean
            when: number
        }>,
        accounts: Array<{
            accountType: AccountType,
            balance: number
            active: boolean
        }>,
        weeklybudget: {
            limit: number,
            spent: number
        }

    }>((data) => axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).post("/users/info/",
        data),
        {
            onSettled: () => {
                console.info("created user info")
                history.push('/olduser')
            },
        }
    )


    return (
        <div
            style={{
                display: 'grid',
                gridAutoColumns: '1fr',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '0.1fr 1.6fr 0.3fr',
                gap: '10px 10px',
                gridTemplateAreas: `
                'Title Title'
                'infos bills'
                'ops ops'
                `,
                color: '#fff'
            }}>
            <div
                style={{
                    gridArea: 'Title',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '23px'
                }}>
                <Typography variant="h5" component="div">
                    mc needs to know few things....
                </Typography>

            </div>
            <div style={{ gridArea: 'infos', borderRight: '5px #071D24 solid' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Typography variant="h5" component="div">
                        Salary Info
                    </Typography>
                </div>
                <div>
                    <input placeholder={"salary"} ref={currentBalanceRef} type={"number"}></input>
                    <input placeholder={"dayOfMonthOfSalary"} ref={dayOfMonthOfSalaryRef} type={"number"}></input>
                    <button
                        onClick={UpdateUISalaryInfo}>
                        Update UISalaryInfo</button>
                </div>

            </div>

            <div style={{
                gridArea: 'bills',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Typography variant="h5" component="div">
                        Bills, (u can add them later if u lazy)
                    </Typography>
                </div>
                <BillCreator handleBillCallback={handleNewBillCallback} _username={props._username} _uiBillsProp={uiBills}></BillCreator>

            </div>
            <div style={{
                gridArea: 'ops',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
                <div>
                    <Typography variant="h5" component="div">
                        Accounts
                    </Typography>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <input disabled={true} type="text" value={"MainAccount"} />
                        <input ref={mainAccountBalanceRef} type="number" placeholder={"balance"} />

                    </div>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <input disabled={true} type="text" value={"SavingAccount"} />
                        <input ref={savingAccountBalanceRef} type="number" placeholder={"balance"} />

                    </div>
                    <div>
                        <button onClick={UpdateUIAccountsClicked}> Update UIAccounts</button>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" component="div">
                    Config
                </Typography>

                <input type="number" placeholder="food" ref={configBudgetFood} />
                <input type="number" placeholder="others" ref={configBudgetOthers} />
            </div>
            <div>
                <button onClick={saveAllinDB}>SaveALLinDB</button>
            </div>
        </div >
    )
}

export default OnBoarding


// sum: sumRef.current!.value as unknown as number ?? 0,
// text: whatRef.current!.value ?? "",
// username: localStorage.getItem('username')!,
// paid: true,
// when: whenRef.current!.value as unknown as number ?? 1



// createUserInfoMutation.mutate({
//     username: localStorage.getItem('username')!,
//     salary: currentBalanceRef.current!.value as unknown as number,
//     dayOfMonthOfSalary: dayOfMonthOfSalaryRef.current!.value as unknown as number,
//     bills: [],
//     accounts: []
// })