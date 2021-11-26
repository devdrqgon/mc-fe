import axios, { AxiosResponse } from "axios"
import { UserInfoResponse } from "react-app-env"

export const getUserInfo = async (username:string, token: string, callback: React.Dispatch<React.SetStateAction<UserInfoResponse | null>>) => {
    try {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `http://localhost:8000/users/info/${username}`,
            headers: {
                Authorization: token
            },
        })
        if (response.status === 200) {
            callback(response.data.usrInfo[0])

        }

    } catch (error) {

    }
}