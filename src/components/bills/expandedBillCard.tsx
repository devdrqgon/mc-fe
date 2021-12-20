import MotionList from 'components/Motionlist'
import { AlignmentOptions } from 'components/ui/Layout'
import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import VSpacer from 'components/ui/Layout/VSpacer'
import { BillsHelpers } from 'features/lib'
import React, { useEffect, useState } from 'react'
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

interface ExpandedBillCardProps {
    _bills: Bill[],
    _handleOnClickPayBill: () => void
}
const ExpandedBillCard: React.FC<ExpandedBillCardProps> = (props) => {
    const [paidBills, setPaidBills] = useState(props._bills.filter(((b) => { return b.paid === true })))
    const [unPaidBills, setUnPaidBills] = useState(props._bills.filter(((b) => { return b.paid === false })))



    const convertPaidBillItemToMotionJSXItems = (_objects: any[]) => {
        let _output: JSX.Element[] = []
        _objects.forEach(element => {
            _output.push(
                <PaidBillItem
                    _bill={element as Bill}
                    _handleMarkAsUnpaid={props._handleOnClickPayBill} />
            )
        })
        return _output
    }


    const convertUnpaidBillItemToMotionJSXItems = (_objects: any[]) => {
        let _output: JSX.Element[] = []
        _objects.forEach(element => {
            _output.push(
                <UnpaidBillItem
                    _bill={element as Bill}
                    _handleMarkAspaid={props._handleOnClickPayBill} />
            )
        })
        return _output
    }

    useEffect(() => {
        setPaidBills(props._bills.filter(((b) => { return b.paid === true })))
        setUnPaidBills(props._bills.filter(((b) => { return b.paid === false })))
    }, [props._bills])
    return (
        <>
            <HContainer>
                <VContainer
                    justifyContent={AlignmentOptions.center}
                    alignItems={AlignmentOptions.center}>
                    <h2> Paid: €{BillsHelpers.getSumAllBills(paidBills).toFixed(1)}</h2>
                    <MotionList _items={convertPaidBillItemToMotionJSXItems(paidBills)} />
                </VContainer>
                <VSpacer _space={10}></VSpacer>
                <VContainer
                    justifyContent={AlignmentOptions.center}
                    alignItems={AlignmentOptions.center}>
                    <h2> not yet: €{BillsHelpers.getSumAllBills(unPaidBills).toFixed(1)}</h2>
                    <MotionList _items={convertUnpaidBillItemToMotionJSXItems(unPaidBills)} />
                </VContainer>
            </HContainer>
        </>
    )
}

export default ExpandedBillCard
