import React from 'react'
import './Header.css'

const Header=(props)=>{
    return(
        <div className='container-fluid p-5'>
            <div className='d-flex flex-row justify-content-center'>
                <h1>Files App</h1>
                
            </div>  
            <div className='d-flex flex-row justify-content-center mt-2'><p>(Double click on file or folder to access)</p></div>

        </div>
    )
}


export default Header