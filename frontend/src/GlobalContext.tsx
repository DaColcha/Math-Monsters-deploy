import { createContext, useState, ReactNode, useContext } from 'react'
import image from "./assets/dino.svg"

type contextType = {
    page: string;
    character: string;
    setPage: (value: string) => void
    setCharacter: (value: string) => void
    personajeImage: string;
    setPersonajeImage: (value: string) => void
    retorno: boolean;
    setRetorno: (value: boolean) => void
}

const GlobalContext = createContext<contextType | undefined>(undefined)

export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [page, setPage] = useState<string>('HOME')
    const [character, setCharacter] = useState<string>('DINO')
    const [personajeImage, setPersonajeImage] = useState<string>(image)
    const [retorno, setRetorno] = useState<boolean>(false)
 
    return (
        <GlobalContext.Provider value={{ page, setPage, character, setCharacter, personajeImage,setPersonajeImage, retorno,setRetorno }}>
            {children}
        </GlobalContext.Provider>
    )
}



export function useGlobalContext() {
    const context = useContext(GlobalContext)
    
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider')
    }
    
    return context
}
