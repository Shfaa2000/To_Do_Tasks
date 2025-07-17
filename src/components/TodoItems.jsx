import React from 'react'
import tick from '../assets/tick.ico'
import delete_icon from '../assets/delete_icon.ico'
import not_tick from '../assets/not_tick.png'

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
    return (
        // to make events in every task
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt='' className='w-12'></img>
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500
                ${isComplete ? "line-through" : ""}`}>{text}</p>
        </div>
        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt='' className='w-5 cursor-pointer'></img>
    </div>
    )
}

export default TodoItems