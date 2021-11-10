import { queryClient } from 'authApp';
import axios from 'axios'
import Bill from 'features/bill/bill';
import { userInfo } from 'os'
import React, { useRef, useState } from 'react'
import {
    useQuery,
    useMutation,
    QueryClientProvider,
    QueryClient,
    UseQueryOptions,
} from "react-query"
import { v4 as uuidv4, v4 } from 'uuid';
import Typography from '@mui/material/Typography';


function OldUser() {
    const axiosClient = axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
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
    const { data: userinfo } = useQuery<any>(
        "userinfo",
        async () => (await axiosClient.get<any>(`/users/info/${localStorage.getItem('username')}`)).data.info[0],
        {
            initialData: [],

        }
    )
    const { data: bills } = useQuery<any[]>(
        "bills",
        async () => (await axiosClient.get<any>(`/bills/get/all/${localStorage.getItem('username')}`)).data.bill,
        {
            initialData: [],
        }
    )

    const [newBillFlag, setnewBillFlag] = useState(false)

    const whatRef = useRef<HTMLInputElement>(null);
    const whenRef = useRef<HTMLInputElement>(null);
    const sumRef = useRef<HTMLInputElement>(null);
    const currentBalanceRef = useRef<HTMLInputElement>(null);

    return (
        <div style={{
            fontSize: '35px',
            marginTop: '10px',
            display: 'grid',
            gridAutoColumns: '1fr',
            gridAutoRows: '1fr',
            gridTemplateColumns: '0.9fr 1.1fr 1fr',
            gridTemplateRows: '0.3fr 0.6fr',
            gap: '30px 30px',
            margin: '25px 15px 5px 15px',
            gridTemplateAreas: `
            'balance savings nxtIncome'
            'insights transactions bills'
            `,
            height: '88vh',
            backgroundColor: '#0F1218',
            color: '#fff'


        }}>
            <div style={{
                gridArea: 'balance',
                // border: '1px solid #F99A20'
                // borderRadius: '10%',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                backgroundColor: '#17191E'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Typography variant="h6" component="div">
                        balance
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" component="div">
                        {userinfo?.grossBalance}€
                    </Typography>
                </div>
            </div>

            <div style={{
                gridArea: 'savings',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#17191E'

            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" component="div">
                        savings
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" component="div">
                        0€
                    </Typography>
                </div>
            </div>

            <div style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                gridArea: 'nxtIncome',
                backgroundColor: '#17191E',


            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" component="div">
                        untill next income
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" component="div">
                        6 days
                    </Typography>
                </div>
            </div>

            <div style={{
                gridArea: 'bills',
                display: 'flex',
                padding: '15px',
                flexDirection: 'column',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                backgroundColor: '#17191E',

            }}>
                <div style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" component="div">
                            Bills
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', height: '30px', width: '84%' }}>
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
                                style={{
                                    backgroundColor: '#66FF75',
                                    fontSize: '25px',
                                    height: '100%',
                                    width: '50px'
                                }}> +</button>
                        </div>
                    </div>


                </div>

                {bills?.map((b) => (
                    <div style={{ marginBottom: '10px' }} key={uuidv4()}>
                        <Bill paid={b.paid} text={b.text} sum={b.sum} due={b.when} />

                    </div>
                ))}
            </div>

            <div style={{
                gridArea: 'transactions',
                backgroundColor: '#17191E',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',


            }}>
                transactions: <button>  TODO:: Connect your bank </button>
            </div>
            <div style={{
                gridArea: 'insights',
                backgroundColor: '#17191E',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',


            }}>
                Insights TODO
            </div>
        </div>
    )
}

export default OldUser
