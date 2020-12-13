import React from 'react'

const errorNotice = (props) => {
    return (
        <div className="error-notice">
            <span>{ props.message }</span>
            <button className='edit-btn' onClick={props.clearError} >x</button>
        </div>
    )
}

export default errorNotice
