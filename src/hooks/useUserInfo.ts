

import { QueryFunction, QueryKey, useQuery } from "react-query";
import axios from "axios";
import { UserInfoResponse } from "react-app-env";


const blabla = (_username: string, _token: string) => {

    const getUserInfos: QueryFunction<UserInfoResponse, QueryKey> =
        async () => (await axios.create({
            baseURL: "http://localhost:8000/",
            headers: {
                Authorization: `${_token}`
            }
        }).get<any>(`/users/info/${_username}`)).data.usrInfo[0]
    return getUserInfos
}

function useGetUserInfos(_username: string, _token: string) {
    return useQuery("userinfo", blabla(_username, _token))
}

const userInfoHooks = {
    useGetUserInfos
}

export default userInfoHooks