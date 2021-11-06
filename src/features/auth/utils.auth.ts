import axios from "axios";
import logging from "config/logging";


const ResetUserLocalData = () => {
    localStorage.setItem('tokenFlag', 'invalid')
    localStorage.setItem('user', 'undef')
    localStorage.setItem('token', 'undef')
}




const localStorageHasData = () => {
    let _token = localStorage.getItem('token')
    let _user = localStorage.getItem('user')
    let _tokenValid = localStorage.getItem('tokenFlag')

    if (_user === null || _token === null  || _tokenValid === null ) {
        logging.info("localStorageHasData", " [404] token, user or tokenFlag not found in local storage")
        ResetUserLocalData()
        return false
    }
    logging.info("localStorageHasData", "[200] token AND user AND TokenFlag FOUND in local storage")
    return true

}

async function StoredTokenIsValid(_token: string): Promise<void> {
    try {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/users/validate',
            headers: {
                Authorization: `Bearer ${_token}`
            }
        });

        logging.info("sad", "happy", response)

        if (response.status === 200 || response.status === 304) {
            logging.info("localStorageDataIsValid", "Token verified by backend!");
            localStorage.setItem('tokenFlag', 'valid');
        }
        else{
            ResetUserLocalData()

        }

    } catch (e) {
        //! Maybe, When including refresh tokens this has to be updated because currently we are delteing the user from local storage as well
        logging.info("localStorageDataIsValid", "Token was declined by backend!");
        ResetUserLocalData()
    }
}

const SaveLoginData = (_user: string, _token: string) => {
    try {
        localStorage.setItem('user', JSON.stringify(_user));
        localStorage.setItem('token', _token);
        localStorage.setItem('tokenFlag', 'valid');
        return true
    } catch (error) {
        logging.error("SaveLoginData", "Could not save login data in localStorage", error)
        return false
    }

}

export default {
    SaveLoginData,
    ResetUserLocalData,
    localStorageHasData,
    StoredTokenIsValid
}


// async function localStorageDataIsValid(_token: string): Promise<boolean> {
//     try {
//         await axios({
//             method: 'GET',
//             url: 'http://localhost:8000/users/validate',
//             headers: {
//                 Authorization: `Bearer ${_token}`
//             }
//         });
//         return true;
//     } catch (e) {
//         return false;
//     }
// }