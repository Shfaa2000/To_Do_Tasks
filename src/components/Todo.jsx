import React, {useRef, useState, useEffect} from 'react'
import logo from '../assets/logo.ico'
import TodoItems from './TodoItems'

// localStorage.clear()
const Todo = () => {
    // create new state and check if there are tasks or not
    const [todoList, setTodoList] = useState(localStorage.getItem("todos")? 
    JSON.parse(localStorage.getItem("todos")) : []);
    // to read the text when i add it
    const inputRef = useRef();
    const add = ()=>{
        const inputText = inputRef.current.value.trim();
        // not add empty task
        if (inputText === "") return;
        const newTodo = {
            id:Date.now(),
            text: inputText,
            isComplete: false
        }
        // add new task and empty the input
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    }
    // to delete the task using id
    const deleteTodo = (id)=>{
        setTodoList((prvTodo)=>{
            return prvTodo.filter((todo)=> todo.id !== id)
        })
    }
    // change the state of task
    const toggle = (id)=>{
        setTodoList((prvTodo)=>{
            return prvTodo.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }
    // update the local storage and list
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])
    return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        {/* title */}
        <div className='flex items-center mt-7 gap-2'>
            <img src={logo} alt='' className='w-20'></img>
            <h1 className='text-3xl font-semibold'>To Do List</h1>
        </div>
        {/* input box */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} type='text' placeholder='Add Your Task' className='bg-transparent border-0 outline-none
            flex-1 h-14 pl-6 pr-2 placeholder:text-slate-500' />
            <button onClick={add} className='border-none rounded-full bg-pink-600 cursor-pointer text-white mr-3 p-2'>Add+</button>
        </div>
        {/* to do list */}
        <div>
        {/* show the task with these information about them */}
            {todoList.map((item, index)=>{
                return <TodoItems key={index} text={item.text} id={item.id}
                isComplete = {item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
            })}
        </div>
    </div>
  )
}

export default Todo