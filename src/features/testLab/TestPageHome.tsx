import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
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
                <Box
                 width="50px"
                 height="50px"
                >
                    <Button onClick={() => { history.push('test/newuserwizard') }}>
                        newuserwizard
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                 width="50px"
                 height="50px"
                >
                    <Button onClick={() => { history.push('test/modal') }}>
                        Modal
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                width="50px"
                height="50px"

                >
                    <Button onClick={() => { history.push('test/loading') }}>
                        LoadingMotion
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                    width="50px"
                    height="50px"

                >
                    <Button onClick={() => { history.push('test/bill') }}>
                        BillItem
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                    width="50px"
                    height="50px"

                >
                    <Button onClick={() => { history.push('test/list') }}>
                        MotionList
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                width="50px"
                height="50px"

                >
                    <Button onClick={() => { history.push('test/clonedlist') }}>
                        ClonedMotionList
                    </Button>
                </Box>
            </div>
          
        </div>
    )
}

export default TestPageHome


