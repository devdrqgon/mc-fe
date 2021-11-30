import { Box, HStack, VStack, Input, Button, Heading, Divider } from "@chakra-ui/react"
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
                        <VStack >
                            <HStack w="full" justifyContent="space-around">
                                <VStack>
                                    <Box>
                                        <Heading>
                                            Netto Balance: €{getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)).toFixed(2)}
                                        </Heading>
                                    </Box>
                                </VStack>
                                <VStack>
                                    <Box>
                                        <Heading>
                                            Days left : {countDaysUntillNextSalary(userInfo.salary.dayOfMonth)}
                                        </Heading>
                                    </Box>
                                </VStack>
                            </HStack>
                            <Divider ></Divider>
                            <Box py={10} w="full" >
                                <VStack>
                                    <Heading>
                                        Budget
                                    </Heading>
                                    <HStack w="full" justifyContent="space-between">
                                        <VStack>
                                            <Box>
                                                <Heading pl={300} >
                                                    weekly: €{calculateActualWeeklyBudget(
                                                        getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                                        countDaysUntillNextSalary(userInfo.salary.dayOfMonth)).
                                                        toFixed(2)}
                                                </Heading>
                                            </Box>
                                        </VStack>
                                        <VStack>
                                            <Box>
                                                <Heading pr={300}>
                                                    daily: €{calculateDailyBudget(
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
                            <Box py={10}>
                                <VStack>
                                    <Heading>
                                        Impulse Controller
                                    </Heading>
                                    <Input onChange={(e) => {
                                        if (e.target.value == "") { setshowImpulseController(false) }
                                    }} ref={desireRef} placeholder="How much u wanna spend" />
                                    <Button onClick={caluclateImpulse}> calculate!</Button>
                                </VStack>
                            </Box>
                            {showImpulseController === true ?
                                <Box py={10}>
                                    <HStack>
                                        <VStack>
                                            <div> Daily </div>
                                            <Input value={dailyIC} />
                                        </VStack>
                                        <VStack>
                                            <div> Weekly </div>
                                            <Input value={weeklyIC} />
                                        </VStack>

                                    </HStack>
                                </Box>
                                :
                                <> </>
                            }
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
                        </VStack>
                    </Box>
                </>
            }
        </>
    )
}

export default Dashboard