import { createContext, useContext, useState, ReactNode } from "react";

type MenuContextProviderProps = {
    children: ReactNode
}

type MenuContextType = {
    isMenuOpen: boolean
    handleToggleMenu: () => void
}

const MenuContext = createContext<MenuContextType>({} as MenuContextType)

export function MenuContextProvider({ children }: MenuContextProviderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    function handleToggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <MenuContext.Provider value={{ isMenuOpen, handleToggleMenu }}>
            {children}
        </MenuContext.Provider>
    )
}

export function useMenu() {
    return (
        useContext(MenuContext)
    )
}