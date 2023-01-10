import { useEffect, useState } from "react"
import { CloseIcon, EditIcon, MoveIcon } from "../assets"
import { useFavorite } from "../contexts/FavoriteContext"
import { useModal } from "../contexts/ModalContext"
import SelectTierDropdown from "./SelectTierDropdown"

export default function MoveModal() {
    const { handleCloseMoveModal, modalCaller, selectedTier } = useModal()
    const { editFavorite } = useFavorite()
    const [selectedStage, setSelectedStage] = useState<'finished' | 'dropped'>(modalCaller?.stage === 'dropped' ? 'dropped' : 'finished')
    const [personalNote, setPersonalNote] = useState('')
    const [transition, setTransition] = useState(0)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setTransition(0)
                setTimeout(() => {
                    handleCloseMoveModal()
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
        <div className={`flex justify-center items-center fixed inset-0 bg-black/50 z-50
        transition-opacity duration-200 ${transition === 100 ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => {
                setTransition(0)
                setTimeout(() => {
                    handleCloseMoveModal()
                }, 200)
            }}>
            <div className={`relative flex flex-col items-center gap-5 md:gap-7 w-full md:w-[460px] max-w-[356px]
            md:max-w-[460px] bg-white dark:bg-gray-900 rounded-xl p-5 md:p-7 pt-4 md:pt-6`}
                onClick={e => {
                    e.stopPropagation()
                }}>
                <button
                    onClick={() => {
                        setTransition(0)
                        setTimeout(() => {
                            handleCloseMoveModal()
                        }, 200)
                    }}
                    className={`absolute top-2.5 md:top-3 right-2.5 md:right-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300`}>
                    <CloseIcon />
                </button>
                <div className={`flex items-center gap-1.5 text-2xl md:text-3xl text-cyan-500`}>
                    <div className={`w-[25px] md:w-[30px] h-[22px] md:h-[27px] pt-0.5 md:pt-1`}>
                        <MoveIcon className={`w-full h-full`} />
                    </div>
                    <h2 className={`overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] md:max-w-[320px]`}>{modalCaller?.title}</h2>
                </div>
                <div className={`flex justify-between w-full`}>
                    <button className={`flex gap-1.5 md:gap-2 items-center text-sm md:text-base`} onClick={() => {
                        selectedStage !== 'finished' && setSelectedStage('finished')
                    }}>
                        <div className={`flex items-center justify-center rounded-full border md:border-2 h-3.5 md:h-4 w-3.5 md:w-4
                            ${selectedStage === 'finished' ? 'border-cyan-400' : 'border-gray-400 dark:border-gray-500'}`} >
                            <div className={`h-2 w-2 rounded-full ${selectedStage === 'finished' ? 'bg-cyan-400' : ''}`} />
                        </div>
                        Finished
                    </button>
                    <button className={`flex gap-1.5 md:gap-2 items-center text-sm md:text-base`} onClick={() => {
                        selectedStage !== 'dropped' && setSelectedStage('dropped')
                    }}>
                        <div className={`flex items-center justify-center rounded-full border md:border-2 h-3.5 md:h-4 w-3.5 md:w-4
                            ${selectedStage === 'dropped' ? 'border-cyan-400' : 'border-gray-400 dark:border-gray-500'}`}>
                            <div className={`h-2 w-2 rounded-full ${selectedStage === 'dropped' ? 'bg-cyan-400' : ''}`} />
                        </div>
                        Dropped
                    </button>
                    <SelectTierDropdown />
                </div>
                <div className={`w-full rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden`}>
                    <div className={`flex items-center justify-center gap-0.5 md:gap-1 h-7 md:h-9 border-b border-gray-200 dark:border-gray-600`}>
                        <EditIcon className={`w-[19px] h-[16px] md:w-[21px] md:h-[18px]`} />
                        <h5 className={`text-sm md:text-base`}>Personal Note</h5>
                    </div>
                    <textarea value={personalNote} placeholder='Enter text' autoFocus
                        className={`h-24 md:h-32 w-full bg-inherit text-xs md:text-sm md:leading-[1.125rem] py-1 md:py-2 px-2.5 md:px-4 resize-none textarea-scroll-light
                        dark:textarea-scroll-dark dark:placeholder:opacity-50`}
                        onChange={e => {
                            setPersonalNote(e.target.value)
                        }} />
                </div>
                <div className={`flex justify-center`}>
                    <button onClick={() => {
                        modalCaller && editFavorite({ ...modalCaller, stage: selectedStage, personalTier: selectedTier, personalNote })
                        setTransition(0)
                        setTimeout(() => {
                            handleCloseMoveModal()
                        }, 200)
                    }} className={`rounded-full md:text-xl bg-cyan-500 hover:bg-cyan-400 w-56 md:w-72 h-8 md:h-10 text-white dark:text-gray-900`}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}