import axios from "axios";
import logging from "config/logging";



async function StoredTokenIsValid(_token: string): Promise<boolean> {
    try {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/users/auth/validate',
            headers: {
                Authorization: `Bearer ${_token}`
            }
        });

        logging.info("sad", "happy", response)

        if (response.status === 200 || response.status === 304) {
            logging.info("localStorageDataIsValid", "Token verified by backend!");
            return true
        }
        else {
            return false
        }

    } catch (e) {
        //! Maybe, When including refresh tokens this has to be updated because currently we are delteing the user from local storage as well
        logging.info("localStorageDataIsValid", "Token was declined by backend!");
        return false
    }
}


export default {
    StoredTokenIsValid
}


