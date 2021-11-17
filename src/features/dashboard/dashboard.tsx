// import axios from "axios"
// import { UserContext } from "contexts/user.context"
// import React, { useState } from "react"
// import { BillResponse } from "react-app-env"

// const Dashboard = () => {
//     // get username & token 
//     const useUser = React.useContext(UserContext)
//     const [userBills, setUserBills] = useState()
//     const effect: React.EffectCallback = () => {

//         const getBills = async (): Promise<BillResponse> => {
//             const response = await axios({
//                 method: 'GET',
//                 url: `http://localhost:8000/bills/get/all/${useUser.user}`,
//                 headers: {
//                     Authorization: `Bearer ${useUser.token}`
//                 }
//             })

//             if(response.status === 200){
//                 setUserBills(response.data as BillResponse)
//             }

//         }


//         // Get User Infos 

//         //When got setUserInfoReady(true)
//         // Get User Bills 
//         //When got setUserBillsIsReady(true)
//     }
//     React.useEffect(effect, [])
//     return (
//         <>
//         </>

//     )
// }

// export default Dashboard

export{}