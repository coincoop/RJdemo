import React from 'react'
import TextField from '@mui/material/TextField';


//closed component
const InputField = ({
    type,
    
}: {
    type: string
    }) => {
    return (
        <TextField
            required
            type={type}
         
        />
    )
}

export default InputField