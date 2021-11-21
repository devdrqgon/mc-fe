import Bill from 'features/bill/bill';
import { useRef, useState } from 'react'
import {
    useQuery
} from "react-query"
import { v4 as uuidv4 } from 'uuid';
import budgetCore from 'features/budget/budgetCalculator.core'
import { axiosClient } from 'config/config';
import billHooks from 'hooks/useBills';
import userInfoHooks from 'hooks/useUserInfo'
import axios from 'axios';
import { InfosOfUser } from 'react-app-env';
function OldUser() {

    //accounts
    const [grossBalance, setgrossBalance] = useState<number>(0)
    // const { status: getBillsStatus, data: bills, error: getBillsError, isFetching: getBillsIsFetching } = billHooks.useGetUserAllBills();
    // const { status, data: userinfo, error, isFetching } = userInfoHooks.useGetUserInfos()
    const createPost = billHooks.usePostBill()
    const [newBillFlag, setnewBillFlag] = useState(false)
    const [openBillDialog, setOpenBillDialog] = useState(false)
    const [openSavingDialog, setOpenSavingDialog] = useState(false);

    const { data: infoOfUser } = useQuery<
        InfosOfUser>(
            "infoOfUser",
            async () => (await axios.create({
                baseURL: "http://localhost:8000/",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).get<InfosOfUser>(`/users/info/${localStorage.getItem('username')}`)).data,

            {
                onSettled: (e) => {
                    setgrossBalance(e!.accounts[0].balance!)
                }
            }
        )

    //bills
    const sumBills = () => {
        let sum = 0
        infoOfUser?.bills.forEach(element => {
            sum = element.cost + sum
        })
        return sum
    }


    // const createUserInfoMutation = useQuery<Response, unknown, >((data) => axios.create({
    //     baseURL: "http://localhost:8000/",
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    // }).post("/users/info/",
    //     data),
    //     {
    //         onSettled: () => {
    //             console.info("created user info")
    //             history.push('/olduser')
    //         },
    //     }
    // )


    const whatRef = useRef<HTMLInputElement>(null);
    const whenRef = useRef<HTMLInputElement>(null);
    const sumRef = useRef<HTMLInputElement>(null);

    const countDaysUntillNextSalary = (dayOfMonthOfSalary: number) => {
        const today = new Date().getDate()
        if (today === dayOfMonthOfSalary) { return 0 }
        if (today < dayOfMonthOfSalary) {
            return (dayOfMonthOfSalary - today)
        }
        else {
            //the remaining days of the current month + the days of the next month 
            return dayOfMonthOfSalary - today
        }
    }
    const handleClickDialogSavingOpen = () => {
        setOpenSavingDialog(true);
    };

    const handleClickDialogSavingClose = () => {
        setOpenSavingDialog(false);
    }
    const handleClickBillDialogOpen = () => {
        setOpenBillDialog(true);
    };

    const handleClickDialogBillClose = () => {
        setOpenBillDialog(false);
    }


    const handleBillDialogSubmit = () => {
        createPost.mutate({
            sum: sumRef.current!.value as unknown as number ?? 0,
            text: whatRef.current!.value ?? "",
            username: localStorage.getItem('username')!,
            paid: newBillFlag,
            when: whenRef.current!.value as unknown as number ?? 0,
        })
        setOpenBillDialog(false)

    }
    return (
        <>

        </>
    )
}

export default OldUser



// {infoOfUser !== undefined ?
//     <>
//         <div style={{
//             display: 'grid',
//             gridAutoFlow: 'column',
//             gridAutoColumns: '1fr',
//             gridAutoRows: '1fr',
//             gap: '15px 15px',
//             color: '#fff',
//             marginTop: '25px'

//         }}>

//             <div style={{
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',

//                 border: '1px solid #30363C',
//                 borderRadius: '6px'

//             }}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                     Gross balance

//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     {infoOfUser?.accounts[0].balance}€

//                 </div>
//             </div>
//             <div style={{
//                 border: '1px solid #30363C',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',
//             }}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                     Income After Bills
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     {infoOfUser?.accounts[0].balance - sumBills()}€

//                 </div>
//             </div>

//             <div style={{
//                 border: '1px solid #30363C',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',
//             }}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                     Saved

//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     {budgetCore.getRestMoney(
//                         infoOfUser?.accounts[0].balance!,
//                         sumBills(),
//                         infoOfUser?.weeklybudget.limit)
//                     }€
//                 </div>
//             </div>

//             <div style={{
//                 border: '1px solid #30363C',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',

//             }}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                     weekly budget
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     {infoOfUser?.weeklybudget.limit}€
//                 </div>
//             </div>
//             <div style={{
//                 border: '1px solid #30363C',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',
//             }}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                     Wishlist
//                 </div>

//             </div>
//             <div style={{
//                 border: '1px solid #30363C',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',
//             }}>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                     next income on the

//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     {infoOfUser.salary.dayOfMonth}

//                 </div>
//             </div>

//         </div>
//         <div style={{
//             fontSize: '35px',
//             marginTop: '10px',
//             display: 'grid',
//             gridAutoColumns: '1fr',
//             gridAutoRows: '1fr',
//             gridTemplateColumns: '0.9fr 1.1fr 1fr',
//             gridTemplateRows: '0.6fr',
//             gap: '30px 30px',
//             margin: '25px 15px 5px 15px',
//             gridTemplateAreas: `
//             'insights transactions bills'
//             `,
//             color: '#fff',

//         }}>


//             <div style={{
//                 gridArea: 'bills',
//                 border: '1px solid #30363C',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                 transition: '0.3s',
//                 display: 'flex',
//                 padding: '15px',
//                 flexDirection: 'column',
//                 maxHeight: '70vh',

//             }}>
//                 <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: '1.7fr 0.3fr',
//                     gridTemplateRows: '1fr',
//                     gap: '0px 0px',
//                     gridTemplateAreas: `
//    'title ops'
//    `

//                 }}>
//                     <div
//                         style={{ gridArea: 'title' }}
//                     >
//                         Bills
//                     </div>
//                     <div
//                         style={{ gridArea: 'ops' }}
//                     >
//                         <button
//                             onClick={handleClickBillDialogOpen}
//                             style={{
//                                 backgroundColor: '#01FFA4', //071D24  66FF75
//                                 fontSize: '25px',
//                                 height: '100%',
//                                 width: '50px'
//                             }}> +</button>
//                     </div>
//                 </div>
//                 <div
//                     style={{
//                         display: 'grid',
//                         gridTemplateColumns: '1fr 1fr 1fr',
//                         gridTemplateRows: '1fr',
//                         gap: '5px 5px',
//                         gridTemplateAreas: `
//         'paid left total'
//         `,
//                         borderTop: '1px solid #232529',
//                         borderBottom: '1px solid #232529',
//                         marginTop: "30px",
//                         marginBottom: "30px"


//                     }}>

//                     <div
//                         style={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             overflowY: 'scroll'
//                         }}
//                     >
//                         {infoOfUser?.bills.map((b: any) => (
//                             <div style={{ marginBottom: '10px' }} key={uuidv4()}>
//                                 <Bill paid={b.paid} text={b.text} sum={b.cost} due={b.when} />

//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={{
//                     gridArea: 'transactions',
//                     border: '1px solid #30363C',
//                     borderRadius: '6px',
//                     boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                     transition: '0.3s',
//                     display: 'flex',
//                     padding: '15px',
//                     flexDirection: 'column',
//                     maxHeight: '70vh',

//                 }}>
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>

//                         Transactions

//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         TODO

//                     </div>
//                 </div>
//                 <div style={{
//                     gridArea: 'insights',
//                     border: '1px solid #30363C',
//                     borderRadius: '6px',
//                     boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                     transition: '0.3s',
//                     display: 'flex',
//                     padding: '15px',
//                     flexDirection: 'column',
//                     maxHeight: '70vh',


//                 }}>
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>

//                         Insights
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         TODO
//                     </div>
//                 </div>


//             </div >
//         </>
//         :
//         <>
//             <div style={{ color: '#fff' }}>
//                 <h1>no data </h1> no data
//             </div>
//         </>}

