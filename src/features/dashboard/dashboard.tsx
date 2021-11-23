import { Flex, Box, HStack, VStack, Input, Button } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import { axiosClient } from "config/config"
import userInfoHooks from "hooks/useUserInfo"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const Dashboard = (props: { _username: string, _token: string }) => {

    const {data: infos} = userInfoHooks.useGetUserInfos(props._username, props._token)
    console.log(infos)
    const tmp = [{username: "haha"},{username: "haha"}, {username: "haha"}, {username: "haha"},  ]
    console.log(tmp)
    const desireRef = useRef<HTMLInputElement>(null)
    const getSumBills = (_bills: Array<{
        billName: string,
        username: string
        paid: boolean
        cost: number,
        when: number,
        _id: string
    }>) => {
        let sum = 0

        _bills.forEach((b) => {
            sum = sum + b.cost
        })
        alert(sum)
        return sum

    }
    const caluclate = () => {

       

        const desire = parseFloat(desireRef.current!.value)
        // get netto Balance 
        // const sumBills: number = getSumBills(userInfo.bills)
        // get how many days left till next salary 

    }
    // const getUserInfo = async () => {
    //     try {
    //         const response: AxiosResponse<any, any> = await axios({
    //             method: 'GET',
    //             url: `http://localhost:8000/users/info/${props._username}`,
    //             headers: {
    //                 Authorization: props._token
    //             },
    //         })
    //         if (response.status === 200) {
    //             setUserInfo(response.data.usrInfo[0])
    //             console.log(response.data.usrInfo[0].bills[0])

    //         }

    //     } catch (error) {

    //     }
    // }


    // useEffect(() => {
    //     if (userInfo === null) {
    //         getUserInfo()
    //     }
    // }, [userInfo])
    return (
        <>
            {/* {userInfo === null ?
                <>
                    <Button onClick={getUserInfo}> get user info!</Button>

                    userInfo is null  ..
                </>
                :
                <>
                    <Box>
                        <VStack >
                            <Box>
                              
                            </Box>
                            <Input ref={desireRef} placeholder="How much u wanna spend" />
                            <h1>   {userInfo.username}</h1>
                            <Button onClick={caluclate}> calculate!</Button>
                        </VStack>
                    </Box>
                </>
            } */}
        </>
    )
}

export default Dashboard