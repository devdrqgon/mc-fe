import { queryClient } from 'authApp';
import axios from 'axios'
import React, { useEffect, useRef, useState } from "react";
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
import { axiosClient } from 'config/config';
import useBills from 'hooks/useBills';
import BillCreator from 'features/bill/billCreator';



const OnBoarding = () => {

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

    const currentBalanceRef = useRef<HTMLInputElement>(null);
    const miscBudgetRef = useRef<HTMLInputElement>(null);
    const dayOfMonthOfSalaryRef = useRef<HTMLInputElement>(null);


    const history = useHistory()
    const [saved, setSaved] = useState(false)



    const createUserInfoMutation = useMutation<Response, unknown, {
        username: string,
        salary: number,
        dayOfMonthOfSalary: number,
        bills: Array<{
            billName: string,
            username: string
            paid: boolean
            when: number
        }>,
        accounts: Array<{
            accountType: string,
            balance: string
            active: boolean
        }>

    }>((data) => axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).post("/users/info/",
        data),
        {
            onSettled: () => {
                setSaved(true)
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
                    <input placeholder={"salary"} ref={currentBalanceRef} type={"number"}></input>
                    <input placeholder={"dayOfMonthOfSalary"} ref={dayOfMonthOfSalaryRef} type={"number"}></input>
                    <button
                        onClick={() => {
                            createUserInfoMutation.mutate({
                                username: localStorage.getItem('username')!,
                                salary: currentBalanceRef.current!.value as unknown as number,
                                dayOfMonthOfSalary: dayOfMonthOfSalaryRef.current!.value as unknown as number,
                                bills: [],
                                accounts: []
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
                <BillCreator handleBillCallback={handleNewBillCallback} _username={"ad"} _uiBillsProp={uiBills}></BillCreator>

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