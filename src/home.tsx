import axios, { AxiosResponse } from "axios"
import logging from "config/logging";
import { UserContext } from "contexts/user.context";
import OnBoarding from "features/onBoarding/onBoarding";
import { TimespanPlanner } from "features/timespanPlanner/timeSpanPlanner"
import React, { ChangeEvent } from "react";
import { useContext, useEffect, useState } from "react"
import { Bill } from "react-app-env";
import { useHistory } from "react-router";

const Home = () => {
    const [newUser, setNewUser] = useState<boolean>()
    const { user, token } = useContext(UserContext)
    const history = useHistory()
    const [bills, setBills] = useState<Array<any>>([])
    const [bill, setBill] = useState<Bill>()
    const [whatBill, setwhatBill] = useState<string>()
    const [whenBill, setwhenBill] = useState<number>()
    const [howMuchBill, setHowMuchBill] = useState<number>()
    const [billPaid, setBillPaid] = useState<boolean>(false)

    const [grossBalance, setGrossBalance] = React.useState<number>()
    const [currentGrossBalance, setCurrentGrossBalance] = React.useState<number>()
    const saveInitInfoClicked = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/info/',
                data: {
                    username: user,
                    grossBalance
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                setNewUser(false)
            }
        } catch (error) {
            logging.error("ONBoarding", (error as Error).message)
        }
    }
    const NewBillClicked = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/bills/',
                data: {
                    sum: howMuchBill,
                    text: whatBill,
                    username: user,
                    paid: billPaid,
                    when: whenBill
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                setNewUser(false)
                const getAllhisBills: AxiosResponse<any, any> = await axios({
                    method: 'GET',
                    url: 'http://localhost:8000/bills/get/all/' + user,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (getAllhisBills.status === 200) {
                    setBills(getAllhisBills.data.bill)
                }
            }
        } catch (error) {
            logging.error("ONBoarding", (error as Error).message)
        }
    }

    useEffect(() => {
        async function fetchUserInfo() {
            const result: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `http://localhost:8000/users/info/${localStorage.getItem('username')}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (result.data.usrInfo.length === 0) {
                setNewUser(true)
            } else {
                setNewUser(false)
                setCurrentGrossBalance(result.data.usrInfo[0].grossBalance)
            }
        }

        fetchUserInfo()

    }, [bills])

    return (
        <>
            {newUser === true ?
                <div>
                    Money Coach needs to know few things....
                    <br />
                    <div>
                        <p>
                            How much money do you currently own?
                        </p>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setGrossBalance(e.target.value as unknown as number) }} type={"number"}></input>
                    </div>
                    <br />
                    Add your recurrings expenses, stuff that you pay for every month like rent, netflix..
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <div>
                            <input placeholder={"what"} onChange={(e: ChangeEvent<HTMLInputElement>) => { setwhatBill(e.target.value as unknown as string) }} type={"text"}></input>
                            <input placeholder={"how much"} onChange={(e: ChangeEvent<HTMLInputElement>) => { setHowMuchBill(e.target.value as unknown as number) }} type={"number"}></input>
                            <input placeholder={"when"} onChange={(e: ChangeEvent<HTMLInputElement>) => { setwhenBill(e.target.value as unknown as number) }} type={"number"}></input>
                            <button onClick={NewBillClicked}> add new bill to db </button>
                        </div>
                    </div>

                    {bills.length > 0 ?
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            {bills!.map((b) => {
                                <div
                                    style={{
                                        display: 'flex',
                                    }}>
                                    <div>
                                        {b.text}
                                    </div>
                                    <div>
                                        {b.sum}
                                    </div>
                                    <div>
                                        {b.when}
                                    </div>

                                </div>
                            })}
                        </div>
                        :
                        <>  no bills yet</>
                    }

                    <button onClick={saveInitInfoClicked}> Save</button>
                </div>
                :
                <>
                    <div style={{
                        display: 'grid',
                        gridAutoColumns: '1fr',
                        gridAutoRows: '1fr',
                        gridTemplateColumns: '0.9fr 1.1fr 1fr',
                        gridTemplateRows: '0.3fr 1.7fr',
                        gap: '0px 0px',
                        gridTemplateAreas: `
                        'balance savings nxtIncome'
                        'insights transactions bills'
                        `
                    }}>
                        <div style={{
                            gridArea: 'balance'

                        }}>
                            Your current balance: {currentGrossBalance}
                        </div>

                        <div style={{
                            gridArea: 'savings'
                        }}>
                            savings: 0
                        </div>

                        <div style={{
                            gridArea: 'nxtIncome'
                        }}>
                            nxt Income in xx days
                        </div>

                        <div style={{
                            gridArea: 'bills'
                        }}>
                            bills
                        </div>

                        <div style={{
                            gridArea: 'transactions'
                        }}>
                            transactions
                        </div>
                        <div style={{
                            gridArea: 'insights'
                        }}>
                            Your nett balance is:

                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home