/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import DraggableList from 'components/draggableList'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useEffect, useRef, useState } from 'react';
import { IGoal } from 'react-app-env';

const PlansOverview = () => {
    const [wishlist, setWishlist] = useState<IGoal[]>([])
    const textgoalRef = useRef<HTMLInputElement>(null);
    const costgoalRef = useRef<HTMLInputElement>(null);
    const handleNewGoal = () => {

        if (textgoalRef.current!.value !== "" && costgoalRef.current!.value !== "") {
            const text = textgoalRef.current!.value
            const cost = costgoalRef.current!.value as unknown as number

            const newgoal: IGoal = {
                text,
                cost
            }
            setWishlist(wishlist!.concat(newgoal))
            costgoalRef.current!.value = ""
            textgoalRef.current!.value = ""

        }
        else{
            alert("come on bro, type something")
        }

    }


    return (
        <div
            css={css`
                    display: grid; 
                    grid-template-columns: 0.5fr 1.5fr; 
                    gap: 0px 0px;     
                    border: 1px solid #30363C;
                `
            }
        >
            <div
                css={css`
                    border-right: 1px solid #30363C
                    `
                }
            >
                <div style={{ display: 'flex', justifyContent: 'center', flex: '3' }}>
                    <input placeholder={"text"} type="text" ref={textgoalRef} />
                    <input placeholder={"cost"} type="number" ref={costgoalRef} />
                    <AddBoxIcon onClick={handleNewGoal} fontSize="large" style={{ cursor: 'pointer' }} sx={{ color: 'white', transition: 'scale(0.6)' }} />


                </div>
                <DraggableList draggableList={wishlist} />

            </div>
            <div style={{}}>
                bye
            </div>
        </div>
    )
}

export default PlansOverview
