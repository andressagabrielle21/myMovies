import { createContext } from "react";

interface IIsLiked {
    isLiked: boolean,
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToggleToLikeContext = createContext<IIsLiked>({
    isLiked: false,
    setIsLiked: () => {}
})

