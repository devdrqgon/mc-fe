import { queryClient } from 'authApp';
import axios from 'axios'
import React, { useRef, useState } from "react";
import { v4 as uuidv4, v4 } from 'uuid';
import Typography from '@mui/material/Typography';

import { Bill, BillResponse } from 'react-app-env';
import {
    useQuery,
    useMutation,
    QueryClientProvider,
    QueryClient,
} from "react-query";
import { useHistory } from 'react-router';



const OnBoarding = () => {
    const history = useHistory()

    const [saved, setSaved] = useState(false)
    const axiosClient = axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    const { data: bills } = useQuery<BillResponse>(
        "bills",
        async () => (await axiosClient.get<any>(`/bills/get/all/${localStorage.getItem('username')}`)).data.bill,
        {
            initialData: undefined,
        }
    )
    const createBillMutation = useMutation<Response, unknown, {
        sum: number,
        text: string,
        username: string,
        paid: boolean,
        when: number
    }>((data) => axiosClient.post("/bills",
        data),
        {
            onSettled: () => {
                queryClient.invalidateQueries("bills");
                whatRef.current!.value = "";
            },
        }
    )
    const createUserInfoMutation = useMutation<Response, unknown, {
        username: string,
        grossBalance: number,
        daySalary: number,
        foodBudget: number,
        miscBudget: number,

    }>((data) => axiosClient.post("/users/info/",
        data),
        {
            onSettled: () => {
                setSaved(true)
            },
        }
    )

    const whatRef = useRef<HTMLInputElement>(null);
    const whenRef = useRef<HTMLInputElement>(null);
    const sumRef = useRef<HTMLInputElement>(null);
    const currentBalanceRef = useRef<HTMLInputElement>(null);
    const daySalaryRef = useRef<HTMLInputElement>(null);
    const miscBudgetRef = useRef<HTMLInputElement>(null);

    const foodBudgetRef = useRef<HTMLInputElement>(null);

    const [newBillFlag, setnewBillFlag] = useState(false)

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
                height: '90vh',
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
                        Infos
                    </Typography>
                </div>
                <div>
                    <input placeholder={"how much is your salary"} ref={currentBalanceRef} type={"number"}></input>
                    <input placeholder={"day of month u get ur salary"} ref={daySalaryRef} type={"number"}></input>
                    <input placeholder={"food budget per week"} ref={foodBudgetRef} type={"number"}></input>
                    <input placeholder={"misc budget per week"} ref={miscBudgetRef} type={"number"}></input>
                    <button
                        onClick={() => {
                            createUserInfoMutation.mutate({
                                grossBalance: currentBalanceRef.current!.value as unknown as number,
                                username: localStorage.getItem('username')!,
                                daySalary: daySalaryRef.current!.value as unknown as number,
                                miscBudget: miscBudgetRef.current!.value as unknown as number,
                                foodBudget: foodBudgetRef.current!.value as unknown as number,
                            }) //text: textRef.current!.value ?? ""
                        }}
                    >save</button>
                </div>
                {saved === true ?
                    <p>saved</p> : <> </>}
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
                <div style={{ display: 'flex' }}>
                    <input placeholder={"what"} ref={whatRef} type={"text"}></input>
                    <input placeholder={"how much"} ref={sumRef} type={"number"}></input>
                    <input placeholder={"when"} ref={whenRef} type={"number"}></input>
                    <div>
                        <input
                            type="checkbox"
                            checked={newBillFlag}
                            onChange={() => {
                                setnewBillFlag(!newBillFlag)
                            }}
                        />

                    </div>
                    <button
                        onClick={() => {
                            createBillMutation.mutate({
                                sum: sumRef.current!.value as unknown as number ?? 0,
                                text: whatRef.current!.value ?? "",
                                username: localStorage.getItem('username')!,
                                paid: newBillFlag,
                                when: whenRef.current!.value as unknown as number ?? 0,

                            }) //text: textRef.current!.value ?? ""
                        }}
                    >
                        +
                    </button>
                </div>
                {bills?
                    <>

                        {bills?.bills.map((b) => (
                            <div key={uuidv4()} style={{ display: 'flex' }}>
                                {b.text} , {b.sum} , {b.when}
                            </div>
                        ))}
                    </>
                    :
                    <></>

                }
            </div>
            <div style={{
                gridArea: 'ops',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
                <button
                    disabled={!saved}
                    onClick={() => { history.push("/olduser") }}
                >Terminate Init</button>
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