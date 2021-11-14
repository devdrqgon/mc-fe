import { QueryFunction, QueryKey, useQuery } from "react-query";
import axios from "axios";
import { axiosClient } from "config/config";
import { BillResponse } from "react-app-env";

const getBills: QueryFunction<BillResponse, QueryKey> = async () => (
    await axiosClient.get<BillResponse>(`/bills/get/all/${localStorage.getItem('username')}`)).data


export default function useBills() {
    return useQuery("bills", getBills);
}
