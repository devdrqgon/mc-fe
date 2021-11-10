import axios from 'axios'
import { userInfo } from 'os'
import React from 'react'
import {
    useQuery,
    useMutation,
    QueryClientProvider,
    QueryClient,
    UseQueryOptions,
} from "react-query"
import { v4 as uuidv4, v4 } from 'uuid';


function OldUser() {
    const axiosClient = axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
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
    return (
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
                gridArea: 'balance',
                backgroundColor: '#F99A20'

            }}>
                Your current balance:   {userinfo?.grossBalance}

            </div>

            <div style={{
                gridArea: 'savings',
                backgroundColor: '#63B246'
            }}>
                savings: 0
            </div>

            <div style={{
                backgroundColor: ' #7E3896',
                gridArea: 'nxtIncome'
            }}>
                nxt Income in xx days
            </div>

            <div style={{
                gridArea: 'bills',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F8BB19'
            }}>
                <h5>your bills</h5>
                {bills?.map((b) => (
                    <div key={uuidv4()} style={{ display: 'flex' }}>
                        {b.text} , {b.sum} , {b.when}
                    </div>
                ))}
            </div>

            <div style={{
                gridArea: 'transactions',
                backgroundColor: '#95CBBB'

            }}>
                transactions
            </div>
            <div style={{
                gridArea: 'insights',
                backgroundColor: '#BCCCE3'
            }}>
                    Insights
            </div>
        </div>
    )
}

export default OldUser
