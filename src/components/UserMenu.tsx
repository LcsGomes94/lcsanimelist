import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../assets";
import { useTheme } from "../contexts/ThemeContext"
import SignIn from "./SignIn";
import SignOut from "./SignOut";

export default function UserMenu() {
    const { data: session } = useSession()
    const { theme, handleToggleTheme } = useTheme()
    const [opacity, setOpacity] = useState(0)

    // Makes sure there's no layout shift in the userMenu applying opacity transition.
    useEffect(() => {
        const timeOut = localStorage.getItem('USER_THEME') === 'light' ? 100 : 1
        setTimeout(() => {
            setOpacity(100)
        }, timeOut)
    }, [])

    return (
        <div className={`flex justify-end gap-5 lg:gap-6 flex-1 pr-1.5`}>
            <button onClick={handleToggleTheme} className={`hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-full transition-opacity duration-700
          ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                {theme === 'light' ? <MoonIcon className={`w-[28px] lg:w-[32px] h-[28px] lg-h-[32px]`} /> : <SunIcon className={`w-[28px] lg:w-[32px] h-[28px] lg-h-[32px]`} />}
            </button>
            <div className={`transition-opacity duration-700 ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                {session ? <SignOut /> : <SignIn />}
            </div>
        </div>
    )
}