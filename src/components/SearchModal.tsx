import { useEffect, useState } from "react"
import { ArrowBackIcon } from "../assets"
import { useModal } from "../contexts/ModalContext"
import SearchBar from "./SearchBar"
import SearchHistory from "./SearchHistory"

export default function SearchModal() {
    const { handleCloseSearchModal } = useModal()
    const [transition, setTransition] = useState(0)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleCloseSearchModal()
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        setTransition(100)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            setTransition(0)
        }
    }, [])

    return (
        <div onClick={() => handleCloseSearchModal()} className={`fixed inset-0 px-4 py-2 bg-white dark:bg-gray-900 z-50 md:hidden`}>
            <div onClick={e => e.stopPropagation()} className={`flex items-center h-14 w-full
            transition-translate duration-100 ${transition === 100 ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => handleCloseSearchModal()}>
                    <ArrowBackIcon />
                </button>
                <SearchBar />
            </div>
            <div className={`transition-opacity duration-500 ${transition === 100 ? 'opacity-100' : 'opacity-0'}`}>
                <SearchHistory />
            </div>
        </div>
    )
}