import React from 'react'

const DropdownItem = (props) => {

    return(
        <li onClick={()=>props.ItemClickHandler(props.item.id, props.index)}>{props.item.text}</li>
    )

}

export default DropdownItem