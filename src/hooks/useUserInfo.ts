

import { QueryFunction, QueryKey, useMutation, useQuery } from "react-query";
import axios from "axios";
import { axiosClient } from "config/config";
import { BillResponse, IUserInfoResponse } from "react-app-env";
import { queryClient } from "authApp";

const getUserInfos: QueryFunction<IUserInfoResponse, QueryKey> =
async () => (await axiosClient.get<any>(`/users/info/${localStorage.getItem('username')}`)).data.info[0]


function useGetUserInfos() {
    return useQuery("userinfo", getUserInfos);
}


const userInfoHooks = {
    useGetUserInfos
}

export default userInfoHooks