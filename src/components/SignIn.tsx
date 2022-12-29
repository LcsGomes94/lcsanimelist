import { signIn } from "next-auth/react"
import { GitHubIcon } from "../assets"

export default function SignIn() {
    return (
        <button onClick={() => signIn('github')}
            className={`flex border border-gray-300 dark:border-gray-500 rounded-full px-6 h-11 text-lg items-center
            gap-3 hover:border-gray-400 dark:hover:border-gray-400 group hover:bg-gray-50 dark:hover:bg-gray-800 w-60`}>
            <GitHubIcon />
            <h2 className={`whitespace-nowrap`}><span className={`group-hover:underline text-cyan-600 dark:text-cyan-400`}>Sign in</span> with GitHub</h2>
        </button>
    )
}