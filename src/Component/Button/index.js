import React from 'react'
import './Button.css'

const Button=({title,onClick,disabledval,...props})=>{
return(
    <button disabled={disabledval} onClick={onClick} className='btn_custom'>
        {title}
    </button>
)
}


export default Button