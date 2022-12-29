import MenuController from "./MenuController"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"

export default function Header() {

  return (
    <header className={`dark:text-white px-3 flex h-20 items-center justify-between`}>
      <MenuController />
      <SearchBar />
      <UserMenu />
    </header>
  )
}