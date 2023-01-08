import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextProviderProps = {
    children: ReactNode
}

type ModalContextType = {
    isEditModalOpen: boolean
    isMoveModalOpen: boolean
    handleOpenEditModal: (caller: CallerType) => void
    handleCloseEditModal: () => void
    handleOpenMoveModal: (caller: CallerType) => void
    handleCloseMoveModal: () => void
    modalCaller: CallerType | null
    selectedTier: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | null
    handleSetSelectedTier: (tier: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E') => void
}

type CallerType = {
    mal_id: number
    title: string
    aired: string | 'Unknown'
    episodes: string | 'Unknown'
    genres: string[]
    imageUrl: string
    synopsis: string
    score: number | 'N/A'
    stage?: 'watch' | 'finished' | 'dropped'
    personalNote?: string
    personalTier?: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | null
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export function ModalContextProvider({ children }: ModalContextProviderProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false)
    const [modalCaller, setModalCaller] = useState<CallerType | null>(null)
    const [selectedTier, setSelectedTier] = useState<'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E'>('SS')

    function handleOpenEditModal(caller: CallerType) {
        setModalCaller(caller)
        setIsEditModalOpen(true)
        setSelectedTier(caller.personalTier || 'SS')
    }

    function handleCloseEditModal() {
        setIsEditModalOpen(false)
    }

    function handleOpenMoveModal(caller: CallerType) {
        setModalCaller(caller)
        setIsMoveModalOpen(true)
        setSelectedTier('SS')
    }

    function handleCloseMoveModal() {
        setIsMoveModalOpen(false)
    }

    function handleSetSelectedTier(tier: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E') {
        setSelectedTier(tier)
    }

    return (
        <ModalContext.Provider value={{
            isEditModalOpen, isMoveModalOpen, handleOpenEditModal, handleOpenMoveModal, handleCloseEditModal,
            handleCloseMoveModal, modalCaller, selectedTier, handleSetSelectedTier
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    return (
        useContext(ModalContext)
    )
}