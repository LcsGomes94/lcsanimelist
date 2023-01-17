import { useSession, signOut } from "next-auth/react"
import { CloseIcon } from "../assets"

export default function SignOut() {
    const { data: session } = useSession()

    return (
        <div
            className={`flex border border-gray-300 dark:border-gray-500 rounded-full px-5 lg:px-6 h-10 lg:h-11 w-52 lg:w-60 lg:text-lg items-center gap-2 lg:gap-3 hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800`}>
            <img src={session?.user?.image!} alt='img' className={`rounded-full border border-cyan-600 dark:border-cyan-400 h-7 w-7 lg:h-8 lg:w-8`} />
            <h2 className={`whitespace-nowrap overflow-hidden text-cyan-600 dark:text-cyan-400 text-ellipsis`}>{session?.user?.name}</h2>
            <button onClick={() => signOut()}
                className={`text-gray-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 ml-auto`} >
                <CloseIcon className={`h-[19px] w-[19px] lg:h-[21px] lg:w-[21px]`} />
            </button>
        </div>
    )
}