import React from 'react'

export const ModeA = () => {

    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridAutoRows: 'minmax(150px, auto)',
                    gap: '5px 5px',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#F6D55C',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                >
                    <div>
                        <div>
                            food
                        </div>
                        <div>
                            <input type={"number"}></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            other
                        </div>
                        <div>
                            <input type={"number"}></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            Save
                        </div>
                        <div>
                            <input type={"number"}></input>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: '#3CAEA3',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                >
                    budget plan
                </div>
            </div>
        </>
    )
}
