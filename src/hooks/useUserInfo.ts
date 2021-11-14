

import { QueryFunction, QueryKey, useQuery } from "react-query";
import { axiosClient } from "config/config";
import { IUserInfoResponse } from "react-app-env";

const getUserInfos: QueryFunction<IUserInfoResponse, QueryKey> =
async () => (await axiosClient.get<any>(`/users/info/${localStorage.getItem('username')}`)).data.info[0]


function useGetUserInfos() {
    return useQuery("userinfo", getUserInfos);
}


const userInfoHooks = {
    useGetUserInfos
}

export default userInfoHooks