import React from 'react'

import './utils.css'

const ToggleMenu = (props) => {
    return(
        <div className="drawerToggle" onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ToggleMenu