import React from 'react'

const DraggableList = () => {

    const richestPeople = [
        'Jeff Bezos',
        'Bill Gates',
        'Warren Buffett',
        'Bernard Arnault',
        'Carlos Slim Helu',
        'Amancio Ortega',
        'Larry Ellison',
        'Mark Zuckerberg',
        'Michael Bloomberg',
        'Larry Page'
    ];
    return (
        <ul style={{
            padding: '0',
            listStyleType: 'none',
            color: '#fff'
        }}>
            {
                richestPeople.map(element => (

                    <li style={{
                        display: 'flex',
                        flex: '1'
                    }}>
                        hi
                    </li>
                ))
            }
        </ul >
    )
}

export default DraggableList


// display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//             height: '100vh',
//             margin: '0',