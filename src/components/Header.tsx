import MenuController from "./MenuController"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"

export default function Header() {

  return (
    <header className={`dark:text-white bg-white dark:bg-gray-900 px-3 fixed top-0 right-0 left-0 flex h-14 md:h-20 items-center justify-between z-40`}>
      <MenuController />
      <SearchBar className={`hidden md:flex`} />
      <UserMenu />
    </header>
  )
}