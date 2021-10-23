import React from 'react'

interface TimeSpanAdjuster {
    setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>
}
const TimeSpanAdjuster: React.FC<TimeSpanAdjuster> = ({ setStartDate }) => {
    return (
        <div
            style={{
                backgroundColor: 'rgb(237, 85, 59)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}
        >
            <div>
                <div>
                    Timespan starts on
                </div>
                <div>
                    <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value)} type="date" />
                </div>
            </div>
            <div>
                <div>
                    Timespan ends on
                </div>
                <div>
                    <input type="date" />
                </div>
            </div>
            <div>
                <div>
                    Plan  timespan:
                </div>
                <div>
                    2 weeks and 3 days
                </div>
            </div>
        </div>
    )
}

export default TimeSpanAdjuster


// 'rgb(237, 85, 59)',