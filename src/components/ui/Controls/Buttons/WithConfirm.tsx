import { AlignmentOptions } from "components/ui/Layout"
import HContainer from "components/ui/Layout/HContainer"
import { useState } from "react"
import CardButton from "./CardButtons"
interface Props {
    _onConfirmCallback(): any,
    _buttonText: string
}
const WithConfirm: React.FC<Props> = ({ _onConfirmCallback,_buttonText }) => {
    const [mainBtnVisible, setMainBtnVisible] = useState(false)
    const onConfirmClicked = () => {
        setMainBtnVisible(false)
        _onConfirmCallback()
    }
    const onCancelClicked = () => {
        setMainBtnVisible(false)
    }
    return (
        <>
            {!mainBtnVisible ?
                <div style={{ padding: '12px 16px' }} onClick={() => { setMainBtnVisible(!mainBtnVisible) }}>
                    {_buttonText}
                </div>
                :
                <>
                    <HContainer>
                        <CardButton style={{margin: '10px'}} onClick={onConfirmClicked}>
                            confirm
                        </CardButton>
                        <CardButton style={{margin: '10px'}} onClick={onCancelClicked}>
                            cancel
                        </CardButton>
                    </HContainer>
                </>

            }
        </>
    )
}

export default WithConfirm
