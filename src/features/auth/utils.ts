import axios from "axios";
import logging from "config/logging";

const SaveLoginData = (_user: string, _token: string) => {
    try {
        localStorage.setItem('user', JSON.stringify(_user));
        localStorage.setItem('token', _token);
        return true
    } catch (error) {
        logging.error("SaveLoginData","Could not save login data in localStorage",error)
        return false
    }

}

const ResetUserData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}
const VerifyLocalStorageCredentials = async ( _user: string, _token: string) => {
    try {
        let _parsedUser = JSON.parse(_user)
        console.log(_parsedUser)
        let response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/users/validate',
            headers: {
                Authorization: `Bearer ${_token}`
            }
        })

        if (response.status === 200 || response.status === 304) {
            logging.info("VerifyLocalStorageCredentials", 'credentials valid')
            SaveLoginData(_parsedUser, _token)
            return true

        }
        else {
            logging.info("VerifyLocalStorageCredentials", 'credentials no longer valid')
            ResetUserData()
            return false
        }
    } catch (error) {
        logging.error("VerifyLocalStorageCredentials", (error as Error).message, error)
        ResetUserData()
    }
}


export default {
    SaveLoginData,
    ResetUserData,
    VerifyLocalStorageCredentials
}