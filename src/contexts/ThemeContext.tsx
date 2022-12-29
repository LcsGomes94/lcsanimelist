import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type ThemeContextProviderProps = {
    children: ReactNode
}

type ThemeContextType = {
    theme: 'light' | 'dark'
    handleToggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    // Makes sure theme state is synced with localStorage
    useEffect(() => {
        if (localStorage.getItem('USER_THEME') === 'light') {
            setTheme('light')
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }, [])

    function handleToggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        newTheme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
        localStorage.setItem('USER_THEME', newTheme)
        setTheme(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return (
        useContext(ThemeContext)
    )
}