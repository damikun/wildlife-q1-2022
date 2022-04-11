import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMemo, useRef } from "react";
import Progress from "./Progress";
import Scroller from "./Scroller";
import { useOnScreen } from "./useOnScreen";

const variantsWrapper = {
    visible: {opacity:1},
    hidden: {opacity:0.2}
}

const variantsText = {
    visible: {scale:1.2},
    hidden: {scale:1},
}

const transitionWrapper = {duration:0.3, ease:"easeInOut"}

const transitionText = {duration:0.4, delay:0.1, ease:"linear"}

const initialOptacity = {opacity:1}

const initialScale = {scale:1.2}

type LandingInfoProps = {
    loadingState?: boolean
}
function LandingInfo({loadingState = false}:LandingInfoProps){

    const ref = useRef(null);
    
    const isOnScreen = useOnScreen(ref);

    const isOnScreenMemorised = useMemo(() => isOnScreen  ?"visible":"hidden", [isOnScreen])    
    
    const [fakeLoading, setFakeLoading] = useState(!loadingState?0:100);

    useEffect(() => {
        if(ref !== null && ref !== undefined){
            setFakeLoading(100);
        }
    }, [ref])
    
    return(
        <motion.div
            key={"landing"}
            ref={ref}
            initial={initialOptacity}
            animate={isOnScreenMemorised}
            variants={variantsWrapper}
            transition={transitionWrapper}
            className='h-screen bg-black relative snap-start justify-center align-middle content-center flex overflow-hidden select-none'>
        
            <motion.div
                initial={initialScale}
                animate={isOnScreenMemorised}
                variants={variantsText}
                transition={transitionText}
                className='flex flex-col my-auto text-right'>
                    
                <h1 className=' text text-7xl md:text-9xl text-white font-bold font-mono drop-shadow-lg shadow-white opacity-90'>
                Q1 2022
                </h1>
        
                {/* <div className="w-full max-w-full mt-3 flex flex-col ">
                    <Progress progress={fakeLoading} />
                </div> */}

                <h2 className='text-white text text-lg md:text-xl font-mono opacity-50 uppercase'>
                © Dalibor Kundrat
                </h2>

                <Scroller/>
            </motion.div>
        </motion.div>
    )
}

export default React.memo(LandingInfo)