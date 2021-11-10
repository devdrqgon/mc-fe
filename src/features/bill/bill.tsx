import React from 'react'
import Typography from '@mui/material/Typography';

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
                return 'red'
            case BillStatus.paid:
                return 'green'
        }
    }
    return (
        <div
            style={{
                border: '1px solid #A89B93',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1.8fr 0.2fr',
                gap: '0px 0px',
                gridTemplateAreas: `
                'main'
                'footer'
                `
            }}>
            <div style={{
                fontSize: '25px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 2fr 0.6fr 0.6fr 1fr',
                gridTemplateRows: '1fr',
                gap: '0px 0px',
                gridTemplateAreas: `
                'pay text sum due actions'
                `,
                gridArea: 'main',
            }}>
                <div style={{
                    gridArea: 'pay',
                    borderRight: '1px solid #A89B93',

                }}>
                    <button style={{
                        color: 'white',
                        backgroundColor: '#333333',
                        width: '100%',
                        height: '100%',
                        display: 'block'
                    }}>
                        mark as paid
                    </button>
                </div>
                <div style={{
                    gridArea: 'text',
                    borderRight: '1px solid #A89B93',
                }}>
                    <Typography variant="h6" component="div">
                        {props.text}
                    </Typography>

                </div>
                <div style={{
                    gridArea: 'sum',
                    borderRight: '1px solid #A89B93',
                }}>
                    <Typography variant="h6" component="div">
                        {props.sum}€
                    </Typography>
                </div>
                <div style={{
                    gridArea: 'due',
                    borderRight: '1px solid #A89B93',
                }}>
                    <Typography variant="h6" component="div">
                        {props.due}th
                    </Typography>

                </div>
                <div style={{
                    gridArea: 'actions',

                }}>
                    <button style={{backgroundColor: '#333333' , color: "#fff"}}> actions</button>
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
