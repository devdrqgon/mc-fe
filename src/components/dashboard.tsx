import { Box, HStack, VContainer, Input, Button, Heading, Divider } from "@chakra-ui/react"
import { getUserInfo } from "apiAdapter"
import axios, { AxiosResponse } from "axios"
import BillViewer from "components/bills/billViewer"
import { calculateActualWeeklyBudget, calculateDailyBudget, countDaysUntillNextSalary, getNettoBalance, getSumPaidills, getSumUnpaidBills } from "features/lib"
import { useEffect, useRef, useState } from "react"
import { Bill, UserInfoResponse } from "react-app-env"

const Dashboard = (props: { _username: string, _token: string }) => {

    const [showImpulseController, setshowImpulseController] = useState(false)
    const [weeklyIC, setWeeklyIC] = useState(0)
    const [dailyIC, setDailyIC] = useState(0)

    const desireRef = useRef<HTMLInputElement>(null)

    const caluclateImpulse = () => {

        setshowImpulseController(true)

        const desire = parseFloat(desireRef.current!.value)

        // get netto Balance 
        const netto = getNettoBalance(userInfo?.accounts[0].balance!, getSumUnpaidBills(userInfo?.bills!))
        // get how many days left till next salary 
        let daysLeft = countDaysUntillNextSalary(userInfo?.salary.dayOfMonth!)
        const res = netto - desire
        setWeeklyIC(calculateActualWeeklyBudget(res, daysLeft))
        setDailyIC(calculateDailyBudget(res, daysLeft))

    }

    const [userInfo, setuserInfo] = useState<null | UserInfoResponse>(null)



    useEffect(() => {
        if (userInfo === null) {
            getUserInfo(props._username, props._token, setuserInfo)
        }
    }, [userInfo])
    return (
        <>
            {userInfo === null ?
                <>
                    userInfo is null  ..
                </>
                :
                <>
                    <Box>
                        <VContainer >
                            <HStack w="full" justifyContent="space-around">
                                <VContainer>
                                    <Box>
                                        <Heading>
                                            Netto Balance: €{getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)).toFixed(2)}
                                        </Heading>
                                    </Box>
                                </VContainer>
                                <VContainer>
                                    <Box>
                                        <Heading>
                                            Days left : {countDaysUntillNextSalary(userInfo.salary.dayOfMonth)}
                                        </Heading>
                                    </Box>
                                </VContainer>
                            </HStack>
                            <Divider ></Divider>
                            <Box py={10} w="full" >
                                <VContainer>
                                    <Heading>
                                        Budget
                                    </Heading>
                                    <HStack w="full" justifyContent="space-between">
                                        <VContainer>
                                            <Box>
                                                <Heading pl={300} >
                                                    weekly: €{calculateActualWeeklyBudget(
                                                        getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                                        countDaysUntillNextSalary(userInfo.salary.dayOfMonth)).
                                                        toFixed(2)}
                                                </Heading>
                                            </Box>
                                        </VContainer>
                                        <VContainer>
                                            <Box>
                                                <Heading pr={300}>
                                                    daily: €{calculateDailyBudget(
                                                        getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                                        countDaysUntillNextSalary(userInfo.salary.dayOfMonth)).
                                                        toFixed(2)}
                                                </Heading>
                                            </Box>
                                        </VContainer>
                                    </HStack>
                                </VContainer>
                            </Box>
                            <Divider ></Divider>
                            <Box py={10}>
                                <VContainer>
                                    <Heading>
                                        Impulse Controller
                                    </Heading>
                                    <Input onChange={(e) => {
                                        if (e.target.value == "") { setshowImpulseController(false) }
                                    }} ref={desireRef} placeholder="How much u wanna spend" />
                                    <Button onClick={caluclateImpulse}> calculate!</Button>
                                </VContainer>
                            </Box>
                            {showImpulseController === true ?
                                <Box py={10}>
                                    <HStack>
                                        <VContainer>
                                            <div> Daily </div>
                                            <Input value={dailyIC} />
                                        </VContainer>
                                        <VContainer>
                                            <div> Weekly </div>
                                            <Input value={weeklyIC} />
                                        </VContainer>

                                    </HStack>
                                </Box>
                                :
                                <> </>
                            }
                            <Divider ></Divider>

                            <Box py={10} w="full" >
                                <VContainer>
                                    <Heading>
                                        Bills
                                    </Heading>
                                    <HStack w="full" justifyContent="space-between">
                                        <VContainer>
                                            <Heading pl={300} >
                                                Paid:  €{getSumPaidills(userInfo.bills)}
                                            </Heading>
                                            <BillViewer _bills={userInfo.bills.filter((b) => { return b.paid === true })} />
                                        </VContainer>
                                        <VContainer>
                                            <Heading pr={300}>
                                                Not yet: €{getSumUnpaidBills(userInfo.bills)}
                                            </Heading>
                                            <BillViewer _bills={userInfo.bills.filter((b) => { return b.paid === false })} />
                                        </VContainer>
                                    </HStack>
                                </VContainer>
                            </Box>
                        </VContainer>
                    </Box>
                </>
            }
        </>
    )
}

export default Dashboard