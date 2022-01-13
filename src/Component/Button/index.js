import React from 'react'
import './Button.css'

const Button=({title,onClick,...props})=>{
return(
    <button onClick={onClick} className='btn_custom'>
        {title}
    </button>
)
}


export default Button