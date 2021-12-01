import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { render } from 'react-dom'
import { useHistory } from 'react-router'

const TestPageHome = () => {
    const history = useHistory()
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit)'
        }}>
            <div>
                <Box
                    width="150px"
                    height="150px"

                >
                    <Button onClick={() => { history.push('test/newuserwizard') }}>
                        newuserwizard
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                    width="150px"
                    height="150px"

                >
                    <Button onClick={() => { history.push('test/loading') }}>
                        LoadingMotion
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                    width="150px"
                    height="150px"

                >
                    <Button onClick={() => { history.push('test/list') }}>
                    MotionList
                    </Button>
                </Box>
            </div>
            <div>
                <Box
                    width="150px"
                    height="150px"

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


