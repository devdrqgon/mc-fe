import { Flex } from '@chakra-ui/layout'
import faker from 'faker'
import { motion, usePresence, AnimatePresence, AnimationControls, Transition, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

const MotionList = () => {
    const name = () => `${faker.name.firstName()} ${faker.name.lastName()}`
    const initialState = [...Array(4)].map(name)
    const addAtStart = () => setItems([name(), ...items])

    const [items, setItems] = useState(initialState)
    useEffect(() => {
        setTimeout(() => {
            addAtStart()
        }, 2000);
        
    }, [items])
    return (
        <>
           
            <Flex
                direction="column"
            >
                <AnimatePresence>
                    {[...items].map((name, i) => (
                        <ListItem
                            key={name}>
                            {name}
                        </ListItem>
                    ))}
                </AnimatePresence>
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
        <motion.h2
           
            layout={true}
            initial={'out'}
            animate={'in'}
            whileTap={'tapped'}
            variants={variants}
            transition={transition}>
            {props.children}
        </motion.h2>
    )
}


export default MotionList
