import { useEffect, useState } from "react";

export function useKeyDownHold(ref:React.RefObject<Element>): boolean {

    const [keyHold, setKeyHold] = useState(false);
  
    function downHandler({key}:any) {
      if(key === "ArrowDown" || key === "ArrowUp")
        ref && setKeyHold(true);
    }
  
    function upHandler({key}:any) {
      if(key === "ArrowDown" || key === "ArrowUp")
        setKeyHold(false);
    }
  
    useEffect(() => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, []);

    return keyHold
}