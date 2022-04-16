import { NewBill } from 'features/auth/SignInCard'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

const PeriodDashboard = () => {
    return (

        <DashboardContainer>
            <Row>
                <VContainer>

                    <Text>
                        From <br></br>Sat 16. April 2022 <br></br> until  <br></br> Wed 31. July 2022
                    </Text>
                </VContainer>
            </Row>
            <Row>
                <VContainer>
                    <Text>
                        Event
                    </Text>
                    <Text>
                        Moving
                    </Text>
                    <Text>
                        Costs
                    </Text>
                    <div>
                        <table style={{ border: '1px solid green' }}>
                            <thead>
                                <tr>
                                    <th>
                                        subEvents
                                    </th>
                                    <th>
                                        cost
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        empty wohnung
                                    </td>
                                    <td>
                                        1500 eurs
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        refund wohnung damage
                                    </td>
                                    <td>
                                        5000 eurs
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Kaution for new home
                                    </td>
                                    <td>
                                        2300 eurs
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        First Rent for new home
                                    </td>
                                    <td>
                                        1100 eurs
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </VContainer>
            </Row>
            <Row>
                <VContainer>
                    <Text>
                        Event
                    </Text>
                    <Text>
                        tunis
                    </Text>
                    <Text>
                        500
                    </Text>

                </VContainer>
            </Row>

            <Row>
                <div>
                    Breakdown
                </div>
                <div>
                    <Row>
                        <VContainer>
                            <Text>
                                From 16.Apr untill 30 April
                            </Text>


                        </VContainer>
                    </Row>
                    <Row>
                        <VContainer>
                            <Text>
                                From 1. Mai untill 31 Mai
                            </Text>


                        </VContainer>
                    </Row>
                    <Row>
                        <VContainer>
                            <Text>
                                From 1. June untill 30 June
                            </Text>


                        </VContainer>
                    </Row>
                    <Row>
                        <VContainer>
                            <Text>
                                From 1. July untill 31 July
                            </Text>


                        </VContainer>
                    </Row>
                </div>
            </Row>

        </DashboardContainer>
    )
}

export default PeriodDashboard

const breakdownGenerator = () => {
    const currentMoney = 9700
    const UpcomingIncomes = [{
        day: moment('28-05-2022', 'DD-MM-YYYY'),
        amount: 3270
    },
    {
        day: moment('28-06-2022', 'DD-MM-YYYY'),
        amount: 3270
    },
    {
        day: moment('28-07-2022', 'DD-MM-YYYY'),
        amount: 3270
    },
    ]
}

interface Breakdown {
    periods: Period[],
}
interface Period {
    type: PeriodType,
    from: moment.Moment,
    until: moment.Moment,
    billsOverview: NewBill[]
    grossBalance: number
    NettoBalance: number
}

enum PeriodType {
    present = "present",
    past = "past",
    future = "future"
}
const DashboardContainer = styled.div`
display: flex;
flex-direction: column; 
`

const Row = styled.div`
    padding: 5px;
    border: 1px solid white;
    margin-top: 8px;
    margin-bottom: 8px;
`
const VContainer = styled.div`
display: flex;
flex-direction: column; 
`

const Text = styled.span`
margin-top: 2px;
margin-bottom: 2px;
`