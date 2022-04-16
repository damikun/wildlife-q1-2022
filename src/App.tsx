import  { RefObject, Suspense, useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import ImageWrapper from './Components/ImageWrapper';
import  LandingInfo  from './Components/LadingInfo';
import Providers, { imageCacheCtx } from './Components/Providers';
import { loadImages } from './Components/SuspenseImage';
import { GetDriveUri, Images } from './Constants';
import clsx from 'clsx';

function App() {

  useEffect(() => {
    document.oncontextmenu = () => false;
  }, [])

  return (
    <Providers>
      {/* <Suspense fallback={<LandingInfo />}> */}
        <Container>
          <LandingInfo/>
        </Container>
      {/* </Suspense> */}
    </Providers>
  );
}

type ContainerProps = {
  children: React.ReactNode;
}

function Container({children}:ContainerProps){

  // const imgCacheCtx = useContext(imageCacheCtx);
  
  // // Prefetch
  // loadImages(Images.map((img)=>GetDriveUri(img)).slice(0,2),imgCacheCtx?.cache);

  // if(!imgCacheCtx || imgCacheCtx?.cache?.size < 2){
  //   return null;
  // }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if(ref!= null){
      ref?.current?.focus();
    }
  }, [ref])
  
  return (
    <div tabIndex={0} ref={ref} className={clsx(
      "snap-y bg-black snap-mandatory overflow-y-scroll h-screen",
      "first:pt-4 pt-10 pb-10 px-4 md:px-6 lg:px-10 xl:px-12",
      "scrollbarhide scrollbarhide2 relative pointer-events-auto",
      "border-0 focus:border-0 outline-none focus:outline-none",
      "focus-within:outline-none")}>
      {children}

      {
        Images.map((src,index)=>{
          return <ImageWrapper tabnum={index+1} key={index} src={GetDriveUri(src)} />
        })
      }

    </div>
  )
}

export default App;