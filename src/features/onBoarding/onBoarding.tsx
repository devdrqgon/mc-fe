import React, { ChangeEvent } from 'react'

function OnBoarding() {
    const [grossBalance, setGrossBalance] = React.useState<number>()

    return (
        <div>
            Money Coach needs to know few things....
            <br />
            <div>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setGrossBalance(e.target.value as unknown as number) }} type={"number"}></input>
            </div>
            <br />
            <button> Save</button>
        </div>
    )
}

export default OnBoarding
