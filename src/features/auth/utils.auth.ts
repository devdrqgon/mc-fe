import axios from "axios";
import logging from "config/logging";


const ResetUserData = () => {
    localStorage.removeItem('tokenFlag');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

const localStorageHasData = () => {
    let _token = localStorage.getItem('token')
    let _user = localStorage.getItem('user')
    if (_user === null || _token === null) {
        logging.info("localStorageHasData", " [404] token or user not found in local storage")
        return false
    }
    logging.info("localStorageHasData", "[200] token AND user FOUND in local storage")
    return true

}

async function StoredTokenIsValid(_token: string): Promise<boolean> {
    try {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/users/validate',
            headers: {
                Authorization: `Bearer ${_token}`
            }
        });

        if (response.status === 200 || response.status === 304) {
            logging.info("localStorageDataIsValid", "Token verified by backend!");
            localStorage.setItem('tokenFlag', 'valid');

        }else{
            logging.info("localStorageDataIsValid", "Token was declined by backend!");
           localStorage.setItem('tokenFlag', 'invalid');

        }

        return true;
    } catch (e) {
        logging.info("localStorageDataIsValid",(e as Error).message,e);
        return false;
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
    ResetUserData,
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