


export default function Scroller(){

    return (
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2">
            <div className="flex flex-col mt-10 relative text-center opacity-30">
                <div className="relative flex flex-coll text center w-20 h-20 m-auto">
                    <div className="scroll-downs">
                        <div className="mousey">
                            <div className="scroller"></div>
                        </div>
                    </div>
                </div>
                <span className="text-white font-semibold">Scroll down</span>
            </div>
        </div>
    )
}