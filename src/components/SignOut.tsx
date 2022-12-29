import { useSession, signOut } from "next-auth/react"
import { CloseIcon } from "../assets"

export default function SignOut() {
    const { data: session } = useSession()

    return (
        <div
            className={`flex border border-gray-300 dark:border-gray-500 rounded-full px-6 h-11 text-lg items-center
              gap-3 hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 w-60`}>
            <img src={session?.user?.image!} alt='img' height={32} width={32} className={`rounded-full border border-cyan-600 dark:border-cyan-400`} />
            <h2 className={`whitespace-nowrap overflow-hidden text-cyan-600 dark:text-cyan-400 text-ellipsis`}>{session?.user?.name}</h2>
            <button onClick={() => signOut()}
                className={`text-gray-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 ml-auto`} >
                <CloseIcon />
            </button>
        </div>
    )
}