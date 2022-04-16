import React from "react";
import { useMemo } from "react"

type ProgressProps = {
    progress:number,
    className?:string
}

function Progress({progress, className}:ProgressProps){

    const memorised = useMemo(() => {
        if(progress >100) return 100;

        if(progress < 0) return 0;

        return Math.round(progress)
        
    }, [progress])

    return(
        <div className={`${className} h-1 rounded-lg w-full whitespace-pre overflow-hidden transition-all duration-500`}>
            <div 
            style={{width:`${memorised}%`}}
            className="h-full whitespace-pre bg-white transition-all delay-500 duration-1000"></div>
        </div>
    )
}

export default React.memo(Progress);