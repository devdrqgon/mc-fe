import { queryClient } from 'authApp';
import axios from 'axios'
import React, { useRef } from "react";
import {
    useQuery,
    useMutation,
    QueryClientProvider,
    QueryClient,
} from "react-query";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

const OnBoarding = () => {
    const { data: bills } = useQuery<any[]>(
        "bills",
        async () => (await axiosClient.get<any>(`/bills/get/all/${localStorage.getItem('username')}`)).data.bill,
        {
            initialData: [],
        }
    )
    const createMutation = useMutation<Response, unknown, { text: string }>(
        (data) => axiosClient.post("/bills", {
            text: "gbkl",
            sum: 23,
            paid: "true",
            username: localStorage.getItem('username'),
            when: 2

        }),
        {
            onSettled: () => {
                queryClient.invalidateQueries("bills");
                // textRef.current!.value = "";
            },
        }
    )

    const textRef = useRef<HTMLInputElement>(null);

    return (
        <div
            style={{
                display: 'grid',
                gridAutoColumns: '1fr',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '0.1fr 1.9fr',
                gap: '10px 10px',
                gridTemplateAreas: `
                'Title Title'
                'infos bills'
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
                    <input placeholder={"what"} ref={textRef} type={"text"}></input>
                    <input placeholder={"how much"} type={"number"}></input>
                    <input placeholder={"when"} type={"number"}></input>
                    <button
                        onClick={() => {
                            createMutation.mutate({ text: textRef.current!.value ?? "" }) //text: textRef.current!.value ?? ""
                        }}
                    >
                        +
                    </button>
                </div>
                {bills?.map((b) => (
                    <div style={{ display: 'flex' }}>
                        {b.text}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default OnBoarding
