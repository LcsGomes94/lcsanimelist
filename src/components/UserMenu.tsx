import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GitHubIcon, MoonIcon, SearchIcon, SunIcon } from "../assets";
import { useTheme } from "../contexts/ThemeContext"
import { useModal } from "../contexts/ModalContext"
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useRouter } from "next/router";
import { useSearch } from "../contexts/SearchContext";

export default function UserMenu() {
    const { data: session } = useSession()
    const { theme, handleToggleTheme } = useTheme()
    const { clearInputValue } = useSearch()
    const { handleOpenSearchModal, handleOpenUserModal } = useModal()
    const [opacity, setOpacity] = useState(0)

    const router = useRouter()

    // Makes sure there's no layout shift in the userMenu applying opacity transition.
    useEffect(() => {
        const timeOut = localStorage.getItem('USER_THEME') === 'light' ? 100 : 1
        setTimeout(() => {
            setOpacity(100)
        }, timeOut)
    }, [])

    return (
        <div className={`flex justify-end gap-5 lg:gap-6 flex-1 pr-1 md:pr-1.5`}>
            <button onClick={handleToggleTheme} className={`flex justify-center items-center h-8 md:h-10 lg:h-11 w-8 md:w-10 lg:w-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-opacity duration-700 ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                {theme === 'light' ?
                    <MoonIcon className={`w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8`} /> :
                    <SunIcon className={`w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8`} />}
            </button>
            <button onClick={() => {
                clearInputValue()
                handleOpenSearchModal()
            }}
                disabled={router.asPath === '/seasonal'}
                className={`flex justify-center items-center md:hidden pb-[1px] hover:bg-gray-100 dark:hover:bg-gray-700 h-8 w-8 rounded-full transition-opacity duration-700 ${opacity === 100 ? 'opacity-100 disabled:opacity-50' : 'opacity-0'} disabled:cursor-not-allowed`}>
                <SearchIcon className={`h-[22px] w-[22px]`} />
            </button>
            <button onClick={() => handleOpenUserModal()} className={`flex md:hidden pl-1.5 transition-opacity duration-700 ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                {session ? <img src={session?.user?.image!} alt='img' className={`rounded-full border border-cyan-600 dark:border-cyan-400 h-8 w-8`} /> : <GitHubIcon />}
            </button>
            <div className={`hidden md:block transition-opacity duration-700 ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                {session ? <SignOut /> : <SignIn />}
            </div>
        </div>
    )
}