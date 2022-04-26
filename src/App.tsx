import  { useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import ImageWrapper from './Components/ImageWrapper';
import  LandingInfo  from './Components/LadingInfo';
import Providers from './Components/Providers';
import { GetDriveUri, Images } from './Constants';
import clsx from 'clsx';
import { useKeyDownHold } from './Components/useKeyHold';

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

  const [current, setCurrent] = useState<string|undefined>("");

  const setId = useCallback((index:number)=>`img_${index+1}`,[])

  const keyHold = useKeyDownHold(ref);

  useEffect(() => {
    
    if(current !== null && current !== undefined && current !== ""){
      const handler = function(){
        // Handle autoscroll...
      } 
      
      var timeout = setTimeout(handler,10000);  
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [current,setId])
  

  const onScreenHandler = useCallback(
    (state:boolean, id?:string) => {

      if(state){
        setCurrent(id)
      }
    },
    [],
  )

  const handleKeyDownGlob = useCallback(
    (e:React.KeyboardEvent<HTMLDivElement>) => {
      if(keyHold){
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [keyHold],
  )
  
  return (
    <div onKeyDown={handleKeyDownGlob} tabIndex={0} ref={ref} className={clsx(
      "snap-y bg-black snap-mandatory scroll-smooth overflow-y-scroll h-screen",
      "first:pt-4 pt-10 pb-10 px-4 md:px-6 lg:px-10 xl:px-12",
      "scrollbarhide scrollbarhide2 relative pointer-events-auto",
      "border-0 focus:border-0 outline-none focus:outline-none",
      "focus-within:outline-none")}>
      {children}

      {
        Images.map((src,index)=>{
          return <ImageWrapper 
          onScreen={onScreenHandler}
          id={setId(index)}
          tabnum={index+1}
          key={index}
          src={GetDriveUri(src)} />
        })
      }

    </div>
  )
}

export default App;