import { Flex, Box, Text, VStack, Input, Button, Heading, Divider, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spinner } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import BillCard from "components/bills/billCard"
import ExpandedBillCard from "components/bills/expandedBillCard"
import BudgetCard from "components/budget/budgetCard"
import ImpulseController from "components/impulseControl/impulseController"
import SalaryCard from "components/salaryInfo/salaryInfoCard"
import SavingPlan from "components/savingPlan/savingPlanCard"
import SavingPlanCreator from "components/savingPlan/savingPlanCreator"
import { getSumPaidills, getSumUnpaidBills } from "features/lib"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Bill, UserInfoResponse } from "react-app-env"
import BalanceCard, { GenericCard } from "../../components/balance.card"

const NewDashboard = (props: { _username: string, _token: string }) => {

    // const {data: infos} = userInfoHooks.useGetUserInfos(props._username, props._token)
    // console.log(infos)
    const [showImpulseController, setshowImpulseController] = useState(false)
    const [weeklyIC, setWeeklyIC] = useState(0)
    const [dailyIC, setDailyIC] = useState(0)

    const desireRef = useRef<HTMLInputElement>(null)
    const getSumBills = (_bills: Array<Bill>) => {
        let sum = 0

        _bills.forEach((b) => {
            sum = sum + b.cost
        })
        return sum

    }
    const caluclateConsequenceIC = () => {

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
    const getNettoBalance = (grossBalance: number, sumUnpaidBills: number) => {
        return grossBalance - sumUnpaidBills
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

    const calculateDailyBudget = (nettoBalance: number, daysLeft: number) => {
        return ((nettoBalance / daysLeft))
    }
    useEffect(() => {
        if (userInfo === null) {
            getUserInfo()
        }
    }, [userInfo])

    //Modal
    const { isOpen, onOpen, onClose } = useDisclosure({ id: 'dashboardModal' })
    const [loading, setLoading] = useState<React.ReactNode>(
        <VStack>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
            <Box>
                loading your Data..
            </Box>
        </VStack>
    )
    const [modalBody, setmodalBody] = useState<any>()
    const OnsavingPlanModalExpand = () => {

        setmodalBody(<SavingPlanCreator
            _userMinBudget={userInfo!.weeklyBudget?.limit! / 7}
            _currentDailyBudget={calculateDailyBudget(
                getNettoBalance(userInfo!.accounts[0].balance, getSumUnpaidBills(userInfo!.bills)),
                countDaysUntillNextSalary(userInfo!.salary.dayOfMonth))}
            _daysTillNxtSalary={countDaysUntillNextSalary(userInfo!.salary.dayOfMonth)}
        />)
        onOpen()
    }


    const handleMarkBillAsPaid = (b: Bill) => {

        console.info("bill", b)
        let copyUserInfo = { ...userInfo! }
        let IndexBill = userInfo!.bills.findIndex(_b => _b._id === b._id)

        console.info("IndexBill", IndexBill)
        // copyUserInfo.bills[IndexBill].paid = true
        console.info("REAL.bills[IndexBill].paid ", userInfo!.bills[IndexBill].paid)

        console.info("copyUserInfo.bills[IndexBill].paid ", copyUserInfo.bills[IndexBill].paid)



        // b.paid = true
        // let copyBills = [...userInfo!.bills]

        // copyBills[IndexBill].paid = true
        // let copyUserInfo = userInfo!
        // copyUserInfo.bills = copyBills
        // setuserInfo(copyUserInfo)

    }
    const OnBillsModalExpand = () => {

        setmodalBody(
            <ExpandedBillCard
                _handleMarkBillAsPaid={handleMarkBillAsPaid}
                _bills={userInfo!.bills} />
        )
        onOpen()
    }
    return (
        <>
            {userInfo === null ?
                <>
                    {loading}
                </>
                :
                <>
                    <Flex direction="column">
                        <Center>
                            <Flex direction={{ base: 'column', md: 'row' }}>
                                <BalanceCard
                                    _mainAccountTotalBalance={userInfo.accounts[0].balance!}
                                    _nett={getNettoBalance(userInfo.accounts[0].balance!, getSumUnpaidBills(userInfo.bills))}
                                    _unpaidBills={getSumUnpaidBills(userInfo.bills)} />
                                <Divider orientation="vertical" />
                                <BudgetCard
                                    _weekly={calculateActualWeeklyBudget(
                                        getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                        countDaysUntillNextSalary(userInfo.salary.dayOfMonth))}
                                    _daily={calculateDailyBudget(
                                        getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                        countDaysUntillNextSalary(userInfo.salary.dayOfMonth))} />
                                <Divider orientation="vertical" />
                                <SalaryCard
                                    _amount={userInfo.salary.amount}
                                    _daysLeft={countDaysUntillNextSalary(userInfo.salary.dayOfMonth)}
                                />
                            </Flex>
                        </Center>
                        <Center>
                            <Flex direction={{ base: 'column', md: 'row' }}>
                                <BillCard
                                    _bills={userInfo.bills}
                                    _total={getSumBills(userInfo.bills)}
                                    _unpaid={getSumUnpaidBills(userInfo.bills)}
                                    _paid={getSumPaidills(userInfo.bills)}
                                    _hanldeExpandCard={OnBillsModalExpand} />
                                <Divider orientation="vertical" />
                                <ImpulseController />
                                <Divider orientation="vertical" />
                                <SavingPlan _handleCreatePlanClick={OnsavingPlanModalExpand} />
                            </Flex>
                        </Center>
                    </Flex>
                    <Modal
                        closeOnOverlayClick={false}
                        onClose={onClose}
                        size="xl"
                        id={"dashboardModal"}
                        isOpen={isOpen}>
                        <ModalOverlay />
                        <ModalContent maxW="70rem">
                            <Flex mt={3} mb={6} justifyContent="center">
                                <Text fontSize="30px">
                                    Create a saving plan
                                </Text>
                            </Flex>
                            <ModalCloseButton />
                            <ModalBody>
                                {modalBody}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </>
            }
        </>
    )
}

export default NewDashboard