import UserContext from 'contexts/user.context'
import React, { useContext, useEffect } from 'react'

export default function TmpHome() {
    const userContext = useContext(UserContext)
    useEffect(() => {
        console.log("userContext")

        console.log(userContext)
        
    }, [])
    return (
        <div>
            Welcome   {userContext.user} !
        </div>
    )
}
