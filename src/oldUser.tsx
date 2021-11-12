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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
                // whatRef.current!.value = "";
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
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleClickDialogClose = () => {
        setOpenDialog(false);
    }

    const handleBillDialogSubmit = () => {
        createBillMutation.mutate({
            sum: sumRef.current!.value as unknown as number ?? 0,
            text: whatRef.current!.value ?? "",
            username: localStorage.getItem('username')!,
            paid: newBillFlag,
            when: whenRef.current!.value as unknown as number ?? 0,

        })
        setOpenDialog(false)

    }
    return (
        <>
            <div style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: '1fr',
                gridAutoRows: '1fr',
                gap: '15px 15px',
                color: '#fff',
                marginTop: '25px'

            }}>

                <div style={{
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',

                    border: '1px solid #30363C',
                    borderRadius: '6px'

                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Typography variant="body1" component="div">
                            Gross balance
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" component="div">
                            {userinfo?.grossBalance}€
                        </Typography>
                    </div>
                </div>
                <div style={{
                    border: '1px solid #30363C',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Typography variant="body1" component="div">
                            Nett balance
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" component="div">
                            {userinfo?.grossBalance}€
                        </Typography>
                    </div>
                </div>

                <div style={{
                    border: '1px solid #30363C',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',

                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Typography variant="body1" component="div">
                            Savings
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" component="div">
                            0€
                        </Typography>
                    </div>
                </div>

                <div style={{
                    border: '1px solid #30363C',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Typography variant="body1" component="div">
                            next income
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" component="div">
                            5 days
                        </Typography>
                    </div>
                </div>

            </div>
            <div style={{
                fontSize: '35px',
                marginTop: '10px',
                display: 'grid',
                gridAutoColumns: '1fr',
                gridAutoRows: '1fr',
                gridTemplateColumns: '0.9fr 1.1fr 1fr',
                gridTemplateRows: '0.6fr',
                gap: '30px 30px',
                margin: '25px 15px 5px 15px',
                gridTemplateAreas: `
                'insights transactions bills'
                `,
                color: '#fff',

            }}>


                <div style={{
                    gridArea: 'bills',
                    border: '1px solid #30363C',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                    display: 'flex',
                    padding: '15px',
                    flexDirection: 'column',
                    maxHeight: '70vh',

                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.7fr 0.3fr',
                        gridTemplateRows: '1fr',
                        gap: '0px 0px',
                        gridTemplateAreas: `
                   'title ops'
                   `

                    }}>
                        <div
                            style={{ gridArea: 'title' }}
                        >
                            <Typography variant="h6" component="div">
                                Bills
                            </Typography>
                        </div>
                        <div
                            style={{ gridArea: 'ops' }}
                        >
                            <button
                                onClick={handleClickDialogOpen}
                                style={{
                                    backgroundColor: '#01FFA4', //071D24  66FF75
                                    fontSize: '25px',
                                    height: '100%',
                                    width: '50px'
                                }}> +</button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gridTemplateRows: '1fr',
                            gap: '5px 5px',
                            gridTemplateAreas: `
                        'paid left total'
                        `,
                            borderTop: '1px solid #232529',
                            borderBottom: '1px solid #232529',
                            marginTop: "30px",
                            marginBottom: "30px"


                        }}>
                        <div style={{ gridArea: 'paid', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="div">
                                paid
                            </Typography>
                            <Typography variant="body1" component="div">
                                25
                            </Typography>
                        </div>
                        <div style={{ gridArea: 'left', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="div">
                                left
                            </Typography>
                            <Typography variant="body1" component="div">
                                40
                            </Typography>

                        </div>
                        <div style={{ gridArea: 'total', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="div">
                                total
                            </Typography>
                            <Typography variant="body1" component="div">
                                65
                            </Typography>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            overflowY: 'scroll'
                        }}
                    >
                        {bills?.map((b) => (
                            <div style={{ marginBottom: '10px' }} key={uuidv4()}>
                                <Bill paid={b.paid} text={b.text} sum={b.sum} due={b.when} />

                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    gridArea: 'transactions',
                    border: '1px solid #30363C',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                    display: 'flex',
                    padding: '15px',
                    flexDirection: 'column',
                    maxHeight: '70vh',

                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Typography variant="h6" component="div">
                            Transactions
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" component="div">
                            TODO
                        </Typography>
                    </div>
                </div>
                <div style={{
                    gridArea: 'insights',
                    border: '1px solid #30363C',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                    display: 'flex',
                    padding: '15px',
                    flexDirection: 'column',
                    maxHeight: '70vh',


                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Typography variant="h6" component="div">
                            Insights
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" component="div">
                            TODO
                        </Typography>
                    </div>
                </div>
                <Dialog open={openDialog} onClose={handleClickDialogClose}>
                    <DialogTitle style={{ backgroundColor: '#071D24', color: '#fff' }}>New Bill</DialogTitle>
                    <DialogContent style={{ backgroundColor: '#17191E', color: '#fff' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px', width: "auto" }}>
                            <div>
                                <input placeholder={"what"} ref={whatRef} type={"text"}></input>
                                <input placeholder={"how much"} ref={sumRef} type={"number"}></input>
                                <input placeholder={"when"} ref={whenRef} type={"number"}></input>

                            </div>
                            <div
                                style={{ display: 'flex' }}
                            >
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={newBillFlag}
                                        onChange={() => {
                                            setnewBillFlag(!newBillFlag)
                                        }}
                                    />
                                </div>
                                <div>
                                    Alread Paid?
                                </div>
                            </div>

                        </div>
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: '#071D24' }}>
                        <Button onClick={handleClickDialogClose}>Cancel</Button>
                        <Button onClick={handleBillDialogSubmit}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div ></>
    )
}

export default OldUser
