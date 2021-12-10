

import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import Card from 'components/ui/Layout/Card/Card'
import React, { useState } from 'react'
import { Bill } from 'react-app-env'
import { render } from 'react-dom'
import { useHistory } from 'react-router'

const TestPageHome = () => {
    const [uiBills, setUIBills] = useState<Array<Bill>>([])

    const handleNewBillCallback = (_bill: Bill) => {
        setUIBills(() => [_bill, ...uiBills])
    }
    const history = useHistory()
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div>
                <Card
                >
                    <CardButton onClick={() => { history.push('test/newuser') }}>
                        newuserwizard
                    </CardButton>
                </Card>
            </div>
            <div>
                <Card
                >
                    <CardButton onClick={() => { history.push('test/modal') }}>
                        Modal
                    </CardButton>
                </Card>
            </div>
            <div>
                <Card

                >
                    <CardButton onClick={() => { history.push('test/loading') }}>
                        LoadingMotion
                    </CardButton>
                </Card>
            </div>
            <div>
                <Card
                 

                >
                    <CardButton onClick={() => { history.push('test/bill') }}>
                        BillItem
                    </CardButton>
                </Card>
            </div>
            <div>
                <Card
                   
                

                >
                    <CardButton onClick={() => { history.push('test/list') }}>
                        MotionList
                    </CardButton>
                </Card>
            </div>
            <div>
                <Card
             

                >
                    <CardButton onClick={() => { history.push('test/clonedlist') }}>
                        ClonedMotionList
                    </CardButton>
                </Card>
            </div>
          
        </div>
    )
}

export default TestPageHome


