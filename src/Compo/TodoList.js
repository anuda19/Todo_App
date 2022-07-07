import React, {useState} from 'react'
import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'

function TodoList() {
    const [item, setItem] = useState('')
    const [todos, setTodos] = useState([])

    const handleChange = (e) => {
        setItem(e.target.value)
    }

    const addTodo = () => {
        setTodos([...todos, item])
        setItem('')
    }

    const handleDelete = (index) => {
        // let newTodo = todos.filter((idx, x)=>{
        //     return x !== index
        // })
        let tempTodo = [...todos]
        tempTodo.splice(index, 1)
        setTodos(tempTodo)
    }
  return (
    <div className='todo'>
        <div className="container">
            <h1 className='text-light'>Design Your Day</h1>
            <input type="text" value={item} onChange={handleChange}/>
            <button className='btn btn-success btn-sm mx-2' onClick={addTodo}>Add</button>
        </div>
        {todos.length === 0 && <h4>No Pending Task</h4> }
        {todos.map((todo, i)=>{
            return (
                <div className="container" key={i}>
                    <div>
                        <input type="text" value={todo} />
                        <FaEdit className='text-warning'/>
                        <MdDelete className='text-danger' onClick={()=>handleDelete(i)}/>
                        <input type="checkbox" />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default TodoList