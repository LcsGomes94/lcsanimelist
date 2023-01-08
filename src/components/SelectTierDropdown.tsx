import { useState } from "react";
import { DropdownIcon } from "../assets/Dropdown";
import { useModal } from "../contexts/ModalContext";

type SelectTierDropdownType = {
    removeFavorite?: boolean
}

type TierType = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E'

const tierArray: TierType[] = ['SS', 'S', 'A', 'B', 'C', 'D', 'E']

function completeTier(tier: TierType) {
    switch (tier) {
        case 'SS': return ' - Masterpiece'
        case 'S': return ' - Very Good'
        case 'A': return ' - Good'
        case 'B': return ' - Boring'
        case 'C': return ' - Bad'
        case 'D': return ' - Very Bad'
        case 'E': return ' - Dog Shit'
    }
}

export default function SelectTierDropdown({ removeFavorite }: SelectTierDropdownType) {
    const [isOpen, setIsOpen] = useState(false)
    const [lastHovered, setLastHovered] = useState('')
    const { selectedTier, handleSetSelectedTier } = useModal()

    return (
        <button disabled={removeFavorite} className={`relative w-40 h-8 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600
        ${isOpen ? 'rounded-b-none bg-gray-200 dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'} ${removeFavorite ? 'cursor-not-allowed opacity-50' : 'cursor-default'}`}
            onBlur={() => {
                isOpen && setIsOpen(false)
                lastHovered && setLastHovered('')
            }}
            onClick={() => {
                lastHovered && setLastHovered('')
                setIsOpen(!isOpen)
            }}>
            <div className={`flex items-center px-3`}>
                <h5>
                    {selectedTier ? selectedTier + completeTier(selectedTier) : 'Select Tier'}
                </h5>
                <DropdownIcon className={`ml-auto ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className={`absolute w-full bg-gray-200 dark:bg-gray-600 rounded-md rounded-t-none mt-1 overflow-hidden
                ${isOpen ? '' : 'hidden'}`}>
                <ul>
                    {tierArray.map(tier => (
                        <li key={tier} className={`group h-8 w-full`}
                            onMouseDown={() => {
                                setIsOpen(false)
                                handleSetSelectedTier(tier)
                                lastHovered && setLastHovered('')
                            }}
                            onMouseEnter={() => {
                                lastHovered !== tier && setLastHovered(tier)
                            }} >
                            <div className={`px-3 group-hover:bg-gray-300 dark:group-hover:bg-gray-500
                                ${(selectedTier === tier && lastHovered === '') || (lastHovered === tier) ? 'bg-gray-300 dark:bg-gray-500' : ''}`}>
                                <div className={`h-[1px] bg-gray-300 dark:bg-gray-500`}></div>
                            </div>
                            <div className={`flex items-center px-3 pb-0.5 hover:bg-gray-300 dark:hover:bg-gray-500 h-full
                                ${(selectedTier === tier && lastHovered === '') || (lastHovered === tier) ? 'bg-gray-300 dark:bg-gray-500' : ''}`}>
                                <h5>
                                    {tier + completeTier(tier)}
                                </h5>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </button>
    )
}