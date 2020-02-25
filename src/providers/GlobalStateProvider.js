import React, { createContext, useState } from 'react'

export const GlobalStateContext = createContext('')

export const GlobalStateProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState('')
    const [isLogged, setIsLogged] = useState(false)

    return (
        <GlobalStateContext.Provider
            value={{
                pageTitle,
                setPageTitle,
                isLogged,
                setIsLogged
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}
