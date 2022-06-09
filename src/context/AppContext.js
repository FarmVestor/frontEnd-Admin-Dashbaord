import { createContext, useState } from "react";

export const AppContext = createContext({
    snackbar: {
        type: 'success',
        message: '',
        open: () => { },
        close: () => { },
    },
    reports: {},
    setReports: () => { }

})

export const AppProvider = ({ children }) => {
    const [type, setType] = useState('success')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const [reports, setReports] = useState(null)

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
        reports,
        setReports
    }}>
        {children}
    </AppContext.Provider>
}