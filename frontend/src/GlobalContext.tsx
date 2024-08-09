import { createContext, useState, ReactNode, useContext } from 'react'

type contextType = {
    page: string;
    setPage: (value: string) => void
}

const GlobalContext = createContext<contextType | undefined>(undefined)

export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [page, setPage] = useState<string>('HOME')

    return (
        <GlobalContext.Provider value={{ page, setPage }}>
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
