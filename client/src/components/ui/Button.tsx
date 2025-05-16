import React from 'react'
import style from '@/styles/ui/Button.module.css'

const Button = ({ name, onClick }: ButtonProps) => {
    return (
        <button className={style['btn']} onClick={onClick}>
            {name}
        </button>
    )
}



export default Button

