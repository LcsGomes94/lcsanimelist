import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { GitHubIcon } from "../assets"
import { useModal } from "../contexts/ModalContext"

export default function UserModal() {
    const { handleCloseUserModal } = useModal()
    const { data: session } = useSession()
    const [transition, setTransition] = useState(0)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setTransition(0)
                setTimeout(() => {
                    handleCloseUserModal()
                }, 200)
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
        <div onClick={() => {
            setTransition(0)
            setTimeout(() => {
                handleCloseUserModal()
            }, 200)
        }}
            className={`flex items-end fixed inset-0 bg-black/50 z-50 md:hidden
            transition-opacity duration-200 ${transition === 100 ? 'opacity-100' : 'opacity-0'}`}>
            <div onClick={e => { e.stopPropagation() }}
                className={`flex flex-col items-center w-full bg-white dark:bg-gray-900 rounded-t-3xl p-8
                transition-translate duration-200 ${transition === 100 ? 'translate-y-0' : 'translate-y-full'}`}>
                {session ?
                    <img src={session.user?.image!} alt='img' className={`rounded-full border-2 border-cyan-600 dark:border-cyan-400 h-[70px] w-[70px] mb-1`} /> :
                    <GitHubIcon className={`w-[70px] h-[70px] mb-1`} />
                }
                {session ?
                    <h2 className={`text-cyan-500 dark:text-cyan-400 text-xl mb-6`}>{session.user?.name}</h2> :
                    <h2 className={`text-gray-500 dark:text-gray-400 text-xl mb-6`}>Guest</h2>
                }
                {session ?
                    <button onClick={() => signOut()}
                        className={`pb-0.5 w-72 h-11 text-white dark:text-gray-900 bg-cyan-500 dark:bg-cyan-400 rounded-full text-xl`}>
                        <span className={`underline font-semibold`}>Sign out</span>
                    </button> :
                    <button onClick={() => signIn('github')}
                        className={`pb-0.5 w-72 h-11 text-white dark:text-gray-900 bg-cyan-500 dark:bg-cyan-400 rounded-full text-xl`}>
                        <span className={`underline font-semibold`}>Sign in</span> with GitHub
                    </button>
                }
            </div>
        </div>
    )
}