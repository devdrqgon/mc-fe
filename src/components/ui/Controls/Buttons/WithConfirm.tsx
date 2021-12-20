import HContainer from "components/ui/Layout/HContainer"
import { useState } from "react"

const WithConfirm = () => {
    const [mainBtnVisible, setMainBtnVisible] = useState(false)
    const onConfirmClicked = () =>{
        setMainBtnVisible(false)
    }
    const onCancelClicked = () =>{
        setMainBtnVisible(false)
    }
    return (
        <>
            {!mainBtnVisible ?
                <span style={{ background: 'green'}} onClick={() => { setMainBtnVisible(!mainBtnVisible)}}>
                    Mark As Paid
                </span>
                :
                <>
                <HContainer>
                    <button onClick={onConfirmClicked}>
                        confirm
                    </button>
                    <button onClick={onCancelClicked}>
                        cancel
                    </button>
                </HContainer>
                </>

            }
        </>
    )
}

export default WithConfirm
