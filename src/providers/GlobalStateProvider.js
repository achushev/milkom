import React, { createContext, useState } from 'react'

export const GlobalStateContext = createContext(null)

export const GlobalStateProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState('')

    return (
        <GlobalStateContext.Provider
            value={{
                pageTitle,
                setPageTitle,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}
