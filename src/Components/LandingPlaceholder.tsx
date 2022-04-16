import clsx from "clsx";
import Progress from "./Progress";

export function LandingPlaceHolder(){
    
    return(
        <div className={clsx("h-screen first:pt-4 pt-10 pb-10 bg-black px-4 md:px-6",
                            "lg:px-10 xl:px-12 scrollbarhide scrollbarhide2")}>
            <div className={clsx("h-screen relative justify-center align-middle",
                                "content-center flex overflow-hidden select-none")}>
                <div className='flex flex-col my-auto text-right'>
                
                    <h1 className={clsx("text text-7xl md:text-9xl text-white font-bold",
                                        "font-mono drop-shadow-lg shadow-white opacity-90")}>
                    Q1 2022
                    </h1>
            
                    <div className="w-full max-w-full mt-3">
                        <Progress progress={100} />
                    </div>

                    <h2 className={clsx("text-white text text-lg md:text-xl",
                                         "font-mono opacity-50 uppercase")}>
                    © Dalibor Kundrat
                    </h2>

                </div>
            </div>
        </div>
    )
}