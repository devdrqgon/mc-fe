// import {
//     chakra,
//     Container,
//     HTMLChakraProps
// } from "@chakra-ui/react";
// import { HTMLMotionProps, motion } from "framer-motion";
// import * as React from "react";

// type Merge<P, T> = Omit<P, keyof T> & T;

// type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

// export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);


// const LoadingMotion = () => {

//     return (
//         <MotionBox
//             as="aside"
//             animate={{
//                 scale: [0.5, 1, 1, 0.5, 0.5],
//                 rotate: [0, 0, 270, 270, 0],
//                 borderRadius: ["20%", "20%", "50%", "50%", "20%"]
//             }}
//             transition={{
//                 duration: 2,
//                 ease: "easeInOut",
//                 times: [0, 0.2, 0.5, 0.8, 1],
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 repeatDelay: 1
//             }}
//             padding="2"
//             bgGradient="linear(to-l, #7928CA, #FF0080)"
//             width="12"
//             height="12"
//             display="flex"
//         />
//     )
// }

// export default LoadingMotion


export {}