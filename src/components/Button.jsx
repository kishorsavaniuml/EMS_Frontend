function Button (props){

    return(
        
        <button onClick = { () => props.clickHandler()} className="cursor-pointer bg-blue-700 w-2/5 px-1 py-1 text-white rounded">{props.value}</button>
    )
}

export default Button