import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useMemo, useRef } from "react";
import { imageCacheCtx } from "./Providers";
import Spinner from "./Spinner";
import { SuspenseImg } from "./SuspenseImage";
import { useOnScreen } from "./useOnScreen";

type ImageWrapperProps = {
    tabnum:number;
    src:string;
    alt?:string | undefined,
    id?:string
    blur?:boolean
}

const variantsWrapper = {
    visible: {opacity:1},
    hidden: {opacity:0.6}
}

const variantsImage = {
    visible: {scale:1.15},
    hidden: {scale:1},
}

const transitionWrapper = {duration:0.3, ease:"easeInOut"}

const transitionImage = {duration:8, delay:0, ease:"circOut"}

// const dragRange = {top:-10,left:-10,right:10, bottom:10} 
  
export default function ImageWrapper({src,alt,id,blur,tabnum}:ImageWrapperProps){
  
    const ref = useRef(null);

    // This is used by animation with strict trashold defining image on viewport
    const [isOnScreen] = useOnScreen(ref);

    // This is used to preload image with dofferent trashhold as animations
    const [isIntersecting, disposeObserver] = useOnScreen(ref,0);

    const isReduced = useReducedMotion();

    const isOnScreenMemorised = useMemo(() => isReduced && isOnScreen? {} : isOnScreen?"visible":"hidden", [isOnScreen, isReduced])

    const imageStyleMemorised = useMemo(() => `xl:object-cover object-contain w-screen h-screen overflow-hidden md:pb-16 bg-black ${(blur || !isReduced)?? isOnScreen ?"blur-none":"blur-sm"}`, [isOnScreen,isReduced,blur])

    const [render,setRender] = useState(false);

    const imgCacheCtx = useContext(imageCacheCtx);

    useEffect(() => {
      if(isIntersecting && !render){
        setRender(true)
        disposeObserver()
      }
    }, [isIntersecting,render,disposeObserver])

    const [animate,setAnimate] = useState(false);

    const handleOnImageReady = useCallback(
      () => {
        setAnimate(true)
      },
      [setAnimate],
    )
    
    return (
      <div  id={id} 
            ref={ref} 
            tabIndex={tabnum}
            className='w-full h-full snap-center overflow-hidden p-4 border-black select-none'>    
        <motion.div
          // whileDrag={{opacity:0}}
          animate={isOnScreenMemorised}
          variants={variantsWrapper}
          transition={transitionWrapper}
          exit={{opacity:0}}
          className='rounded-lg overflow-hidden w-full h-full'>
         <Suspense fallback={<Spinner/>}>
            <AnimatePresence>
                {
                  render &&  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 1 }}
                      transition={{duration:1}}>
                        <SuspenseImg
                            onLoad={handleOnImageReady}
                            hide={!animate}
                            cache={imgCacheCtx?.cache}
                            // drag
                            // dragElastic
                            // dragConstraints={dragRange}
                            animate={isOnScreenMemorised}
                            variants={variantsImage}
                            transition={transitionImage}
                            className={imageStyleMemorised}
                            alt={alt}
                            src={src}/> 
                    </motion.div>
                  }
                </AnimatePresence>
            </Suspense>   
        </motion.div>
      </div>
    )
  }  