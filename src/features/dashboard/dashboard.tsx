import { Flex, Box, HStack, VStack, Input, Button, Heading, Divider } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import BillViewer from "components/billViewer"
import { getSumPaidills, getSumUnpaidBills } from "features/timespanPlanner/lib"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Bill, UserInfoResponse } from "react-app-env"

const Dashboard = (props: { _username: string, _token: string }) => {

    // const {data: infos} = userInfoHooks.useGetUserInfos(props._username, props._token)
    // console.log(infos)

    const desireRef = useRef<HTMLInputElement>(null)
    const getSumBills = (_bills: Array<Bill>) => {
        let sum = 0

        _bills.forEach((b) => {
            sum = sum + b.cost
        })
        return sum

    }
    const caluclate = () => {



        const desire = parseFloat(desireRef.current!.value)
        // get netto Balance 
        const netto = getNettoBalance(userInfo?.accounts[0].balance!, getSumBills(userInfo?.bills!))
        // get how many days left till next salary 
        let daysLeft = countDaysUntillNextSalary(16)



    }
    const getNettoBalance = (grossBalance: number, sumBills: number) => {
        return grossBalance - sumBills
    }

    const countDaysUntillNextSalary = (dayOfSalary: number) => {
        const today = new Date().getDate()
        if (today === dayOfSalary) { return 0 }
        if (today < dayOfSalary) {
            return (dayOfSalary - today)
        }
        else {
            //the remaining days of the current month + the days of the next month 
            //count days till end of month
            //get last day of the current month 
            const todayAgain = new Date();
            const lastDayOfMonth = new Date(todayAgain.getFullYear(), todayAgain.getMonth() + 1, 0).getDate()
            let daysleft = lastDayOfMonth - today
            daysleft = daysleft + dayOfSalary
            return daysleft
        }
    }
    const [userInfo, setuserInfo] = useState<null | UserInfoResponse>(null)
    const getUserInfo = async () => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `http://localhost:8000/users/info/${props._username}`,
                headers: {
                    Authorization: props._token
                },
            })
            if (response.status === 200) {
                setuserInfo(response.data.usrInfo[0])

            }

        } catch (error) {

        }
    }

    const calculateActualWeeklyBudget = (nettoBalance: number, daysLeft: number) => {
        return ((nettoBalance / daysLeft) * 7)
    }
    useEffect(() => {
        if (userInfo === null) {
            getUserInfo()
        }
    }, [userInfo])
    return (
        <>
            {userInfo === null ?
                <>
                    <Button onClick={getUserInfo}> get user info!</Button>

                    userInfo is null  ..
                </>
                :
                <>
                    <Box>
                        <VStack >
                            <Box py={10}>
                                <VStack>
                                    <Heading>
                                        Netto Balance: €{getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)).toFixed(2)}
                                    </Heading>
                                </VStack>
                            </Box>
                            <Divider ></Divider>
                            <Box py={10} w="full" >
                                <VStack>
                                    <Heading>
                                        Weekly Budget
                                    </Heading>
                                    <HStack w="full" justifyContent="space-between">
                                        <VStack>
                                            <Box>
                                                <Heading pl={300} >
                                                    preferred:  €{userInfo.weeklyBudget?.limit}
                                                </Heading>
                                            </Box>

                                        </VStack>
                                        <VStack>
                                            <Box>
                                                <Heading pr={300}>
                                                    actual: €{calculateActualWeeklyBudget(
                                                        getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                                        countDaysUntillNextSalary(userInfo.salary.dayOfMonth)).
                                                        toFixed(2)}
                                                </Heading>
                                            </Box>
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </Box>
                            <Divider ></Divider>
                            <Box py={10} w="full" >
                                <VStack>
                                    <Heading>
                                        Bills
                                    </Heading>
                                    <HStack w="full" justifyContent="space-between">
                                        <VStack>
                                            <Heading pl={300} >
                                                Paid:  €{getSumPaidills(userInfo.bills)}
                                            </Heading>
                                            <BillViewer _bills={userInfo.bills.filter((b) => { return b.paid === true })} />
                                        </VStack>
                                        <VStack>
                                            <Heading pr={300}>
                                                Not yet: €{getSumUnpaidBills(userInfo.bills)}
                                            </Heading>
                                            <BillViewer _bills={userInfo.bills.filter((b) => { return b.paid === false })} />
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </Box>
                            <Divider ></Divider>

                            <Box py={10}>
                                <VStack>
                                    <Heading>
                                        Impulse Controller
                                    </Heading>
                                    <Input ref={desireRef} placeholder="How much u wanna spend" />
                                    <Button onClick={caluclate}> calculate!</Button>
                                </VStack>
                            </Box>


                        </VStack>
                    </Box>
                </>
            }
        </>
    )
}

export default Dashboard