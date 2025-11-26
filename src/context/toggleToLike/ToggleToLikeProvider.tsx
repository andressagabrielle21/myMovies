import { useState } from "react"
import { ToggleToLikeContext } from "./ToggleToLikeContext"


export function ToggleToLikeProvider({children} : {children: React.ReactNode}) {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    return (
        <ToggleToLikeContext.Provider value={{isLiked, setIsLiked}}>
            {children}
        </ToggleToLikeContext.Provider>
    )
};