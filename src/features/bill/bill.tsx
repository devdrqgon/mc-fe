import React from 'react'

enum BillStatus {
    paid = "paid",
    overdue = "overdue",
    early = "early",
}
interface BillProps {
    text: string,
    sum: number,
    due: number,
    paid: boolean

}
const Bill: React.FC<BillProps> = (props) => {
    const getStatus = (_due: number) => {
        const today = new Date().getDate()
        if (props.paid === true) {
            return BillStatus.paid
        }
        else {
            if (props.due > today) {
                return BillStatus.early
            }
            else {
                return BillStatus.overdue
            }
        }
        //
    }

    const getStatusColor = (val: BillStatus) => {
        switch (val) {
            case BillStatus.early:
                return 'yellow'

            case BillStatus.overdue:
                return '#f8334d'
            case BillStatus.paid:
                return '#01FFA4'
        }
    }
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1.8fr 0.2fr',
                gap: '0px 0px',
                gridTemplateAreas: `
                'main'
                'footer'
                `,
                backgroundColor: '#333333'
            }}>
            <div style={{
                fontSize: '25px',
                display: 'grid',
                gridTemplateColumns: '2fr 0.3fr 0.2fr 0.1fr',
                gridTemplateRows: '1fr',
                gap: '0px 0px',
                gridTemplateAreas: `
                 'text sum due actions'
                `,
                gridArea: 'main',
            }}>

                <div style={{
                    gridArea: 'text',
                    borderRight: '1px solid #A89B93',
                }}>
                  {props.text}

                </div>
                <div style={{
                    gridArea: 'sum',
                    borderRight: '1px solid #A89B93',
                }}>
                   {props.sum}€
                </div>
                <div style={{
                    gridArea: 'due',
                    borderRight: '1px solid #A89B93',
                }}>
                     {props.due}th

                </div>
                <div style={{
                    gridArea: 'actions',

                }}>
                    act
                </div>
            </div>
            <div style={{
                gridArea: 'footer',
                borderTop: '1px solid #A89B93',
                backgroundColor: getStatusColor(getStatus(props.due)),
            }}>
                <div
                    style={{
                        height: '3px'
                    }}>

                </div>
            </div>

        </div>
    )
}

export default Bill
