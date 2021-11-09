import { queryClient } from 'authApp';
import axios from 'axios'
import React, { useRef, useState } from "react";
import { v4 as uuidv4, v4 } from 'uuid';

import { Bill } from 'react-app-env';
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
    const { data: bills } = useQuery<any[]>(
        "bills",
        async () => (await axiosClient.get<any>(`/bills/get/all/${localStorage.getItem('username')}`)).data.bill,
        {
            initialData: [],
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
                `
            }}>
            <div
                style={{
                    gridArea: 'Title'
                }}>
                mc needs to know few things....

            </div>
            <div style={{ gridArea: 'infos', borderRight: '5px green solid' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <h3>
                        Infos
                    </h3>
                </div>
                <div>
                    <input placeholder={"current gross balance"} ref={currentBalanceRef} type={"text"}></input>
                    <button
                        onClick={() => {
                            createUserInfoMutation.mutate({
                                grossBalance: 200,
                                username: localStorage.getItem('username')!,
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
                    <h3>
                        Bills
                    </h3>
                </div>
                <div style={{ display: 'flex' }}>
                    <input placeholder={"what"} ref={whatRef} type={"text"}></input>
                    <input placeholder={"how much"} ref={sumRef} type={"number"}></input>
                    <input placeholder={"when"} ref={whenRef} type={"number"}></input>
                    <button
                        onClick={() => {
                            createBillMutation.mutate({
                                sum: 20,
                                text: whatRef.current!.value ?? "",
                                username: localStorage.getItem('username')!,
                                paid: true,
                                when: 4

                            }) //text: textRef.current!.value ?? ""
                        }}
                    >
                        +
                    </button>
                </div>
                {bills?.map((b) => (
                    <div key={uuidv4()} style={{ display: 'flex' }}>
                        {b.text} , {b.sum} , {b.when}
                    </div>
                ))}
            </div>
            <div style={{
                gridArea: 'ops',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
                <button
                    onClick={() => {history.push("/olduser")}}
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