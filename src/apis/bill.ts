import axios, { AxiosResponse } from "axios"
import { Bill } from "react-app-env"

export  const putBill = async (b: Bill) => {
    try {
        const response: AxiosResponse<any, any> = await axios({
            method: 'PUT',
            url: `http://localhost:8000/bills/${b._id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                billName: b.billName,
                username: b.username,
                paid: b.paid,
                cost: b.cost,
                when: b.when
            },
        })
        console.info("bill update response", response)
        if (response.status === 200) {
            alert("PUT Success")
        }
        else {

        }
    } catch (error) {

    }
}
