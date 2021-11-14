import { QueryFunction, QueryKey, useMutation, useQuery } from "react-query";
import axios from "axios";
import { axiosClient } from "config/config";
import { BillResponse } from "react-app-env";
import { queryClient } from "authApp";

const getBills: QueryFunction<BillResponse, QueryKey> = async () => (
    await axiosClient.get<BillResponse>(`/bills/get/all/${localStorage.getItem('username')}`)).data


function useGetUserAllBills() {
    return useQuery("bills", getBills);
}




export const usePostBill = () =>
    useMutation<Response, unknown, {
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

const billHooks = {
    useGetUserAllBills,
    usePostBill
}

export default billHooks