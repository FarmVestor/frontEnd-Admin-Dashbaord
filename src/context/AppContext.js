import { createContext, useState } from "react";

export const AppContext = createContext({
    snackbar: {
        type: 'success',
        message: '',
        open: () => { },
        close: () => { },
    },
    numberOfUSers: 0,
    numberOfFarms: 0,
    setNumberOfUSers: () => { },
    setNumberOfFarms: () => { }

})

export const AppProvider = ({ children }) => {
    const [type, setType] = useState('success')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const [numberOfUSers, setNumberOfUSers] = useState(0)
    const [numberOfFarms, setNumberOfFarms] = useState(0)

    const closeSnackBar = () => {
        setOpen(false)
    }

    return <AppContext.Provider value={{
        snackbar: {
            type,
            setType,
            message,
            setMessage,
            open,
            setOpen,
            closeSnackBar
        },
        numberOfUSers,
        numberOfFarms,
        setNumberOfUSers,
        setNumberOfFarms
    }}>
        {children}
    </AppContext.Provider>
}