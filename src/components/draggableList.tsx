/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ReorderIcon from '@mui/icons-material/Reorder'
import { useEffect, useState } from 'react';
import { v4 as uuidv4, v4 } from 'uuid'

const DraggableList = () => {


    const [draggableList, setdraggableList] = useState([
        1,
        2,
        3,
        4,
        5,
    ])
    const color = 'white'
    const [indexDragFromElement, setIndexDragFromElement] = useState<number>()
    const [indexDragToElement, setIndexDragToElement] = useState<number>()

    //https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    function array_move(arr: any[], old_index : number, new_index: number) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    }
    const startDragging = (event: React.DragEvent<HTMLDivElement>, indexFrom: number) => {

        (event.target as HTMLDivElement).style.backgroundColor = "#1D232A"
        setIndexDragFromElement(indexFrom)

    }

    const handleOnDrop = (event: React.DragEvent<HTMLDivElement>, indexTo: number) => {
        (event.target as HTMLDivElement).style.backgroundColor = 'transparent'
        setIndexDragToElement(indexTo)

        setdraggableList(array_move(draggableList, indexDragFromElement!, indexTo))

    }

    useEffect(() => {
        console.log(array_move([3,2,1], 2,0))
    }, [])
    return (
        <>

            {/* <div
                css={css`
                padding: 32px;
                background-color: hotpink;
                font-size: 24px;
                border-radius: 4px;
                &:hover {
                    color: ${color};
                }
                `}
            >
                Hover to change color.
            </div > */}
            <ul
                className={"draggable-list"}
                style={{
                    padding: '0',
                    listStyleType: 'none',
                    color: '#fff'
                }}>
                {
                    draggableList.map(element => (
                        <li
                            key={draggableList.indexOf(element)}

                            css={css`
                                display: flex;
                                flex: 1;
                                &:not(:last-of-type){
                                border-bottom: 1px solid #ef3;
                                }       
                                `
                            }
                        >
                            <div
                                className="draggable"
                                onDragStart={(event) => { startDragging(event, draggableList.indexOf(element)) }}
                                onDragEnter={(event) => { (event.target as HTMLDivElement).style.backgroundColor = "#595e64" }}
                                onDragLeave={(event) => { (event.target as HTMLDivElement).style.backgroundColor = "transparent" }}
                                // onDropCapture={()=>alert("onDropCapture")}
                                onDrop={(event) => { handleOnDrop(event, draggableList.indexOf(element)) }}

                                onDragOver={(event) => { event.preventDefault() }}
                                // onDrop={()=> setdragging(false)}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '15px',
                                    flex: '1',
                                }}
                                draggable={true}>

                                {element}
                                <ReorderIcon />
                            </div>
                        </li>
                    ))
                }
            </ul >
        </>
    )
}

export default DraggableList


    // display: 'flex',
    //             flexDirection: 'column',
    //             alignItems: 'center',
    //             justifyContent: 'flex-start',
    //             height: '100vh',
    //             margin: '0',

