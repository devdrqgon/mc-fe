import MotionList from 'components/Motionlist'
import { AlignmentOptions } from 'components/ui/Layout'
import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import VSpacer from 'components/ui/Layout/VSpacer'
import { DashboardContext } from 'contextProviders/dashboard.provider'
import { BillsHelpers } from 'features/lib'
import React, { useContext, useEffect, useState } from 'react'
import { Bill } from 'react-app-env'
import styled from 'styled-components'
import PaidBillItem from './PaidBillItem'
import UnpaidBillItem from './UnpaidBillItem'



/**
 * MY problem is I have 
 * 
 * 3 comp: 
 *  1-   Bill Card
 *  2-      expanded Bill Card
 *  3-          BillItem 
 * 
 *  1- user clicks on pay bill in BillItem, bill item shows loading 
 *
 *  Apporach1:
 *      2- BillItem calls backend
 *      3- BillItem unmounts
 *      Problem: cant notify Other components that they should update their state 
 * 
 *  Approach2 : 
 *      2- BillItem fires callback to BillCard 
 *      3- billCard calls backend to update the bill 
 *      4- billCard updates the _bills state hook, which should autmatically udpate children
 *      Problem: in case of err, hard to reupdate that billitem ui state
 * 
 *  Approach 3:
 *      2- billitem calls backend
 *      3a on Error update ui
 *      3b on success fire callback to billcard, to update _bills hook 
 *  
 *  
 */


const ExpandedBillCard = () => {
    const { BillsUI } = useContext(DashboardContext)






    return (
        <>
            {BillsUI === null ?
                <>
                    <h1>BillsUI ===  null </h1>
                </>
                :
                <HContainer>
                    <VContainer
                        justifyContent={AlignmentOptions.center}
                        alignItems={AlignmentOptions.center}>
                            <h6>
                                not yet
                            </h6>
                        {BillsUI.bills.filter(e => e.paid === false).map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {b.friendlyName}
                                </div>
                                <div>
                                    {b.amount.toFixed(0)}€
                                </div>
                            </div>
                        ))}
                        {BillsUI.manualBills.filter(e => e.paid === false).map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {b.friendlyName}
                                </div>
                                <div>
                                    {b.amount.toFixed(0)}€
                                </div>
                            </div>
                        ))}
                        {BillsUI.paypalBills.filter(e => e.paid === false).map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {b.friendlyName}
                                </div>
                                <div>
                                    {b.amount.toFixed(0)}€
                                </div>
                            </div>
                        ))}
                    </VContainer>
                    <VSpacer _space={10}></VSpacer>
                    <VContainer
                        justifyContent={AlignmentOptions.center}
                        alignItems={AlignmentOptions.center}>
                             <h6>
                                paid
                            </h6>
                         {BillsUI.bills.filter(e => e.paid === true).map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {b.friendlyName}
                                </div>
                                <div>
                                    {b.amount.toFixed(0)}€
                                </div>
                            </div>
                        ))}
                        {BillsUI.manualBills.filter(e => e.paid === true).map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {b.friendlyName}
                                </div>
                                <div>
                                    {b.amount.toFixed(0)}€
                                </div>
                            </div>
                        ))}
                        {BillsUI.paypalBills.filter(e => e.paid === true).map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    {b.friendlyName}
                                </div>
                                <div>
                                    {b.amount.toFixed(0)}€
                                </div>
                            </div>
                        ))}
                    </VContainer>
                </HContainer>
            }
        </>
    )
}

export default ExpandedBillCard
