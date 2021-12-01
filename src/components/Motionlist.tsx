import { Flex } from '@chakra-ui/layout'
import faker from 'faker'
import { motion, usePresence, AnimatePresence, AnimationControls, Transition, Variants } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4, v4 } from 'uuid'


const MotionList = (props: { items: Array<JSX.Element> }) => {
    return (
        <>

            <Flex
                direction="column"
            >
                {[...props.items].map((item, i) => (
                    <>
                        {i === 0 ?
                            <ListItem
                                key={uuidv4()}>
                                {item}
                            </ListItem> :
                            <UnanimatedListItem
                                key={uuidv4()}>
                                {item}
                            </UnanimatedListItem>
                        }
                    </>
                ))}
            </Flex>
        </>
    )
}


const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 }
function ListItem(props: { children: any }) {
    const variants: Variants = {
        in: { scaleY: 1, opacity: 1 },
        out: { scaleY: 0, opacity: 0, zIndex: -1 },
        tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } }
    }

    return (
        <motion.div

            layout={true}
            initial={'out'}
            animate={'in'}
            whileTap={'tapped'}
            variants={variants}
            transition={transition}>
            {props.children}
        </motion.div>
    )
}


function UnanimatedListItem(props: { children: any }) {

    return (
        <motion.div
        >
            {props.children}
        </motion.div>
    )
}


export default MotionList
