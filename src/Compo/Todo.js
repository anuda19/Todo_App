import React, {useState, useEffect} from 'react'
import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import './Todo.css'

const getData = () => {
    const list = localStorage.getItem('lists')
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}

export const Todo = () => {
    const [todo, setTodo] = useState(getData())
    const [item, setItem] = useState("")
    const [editItem, setEditItem] = useState(null)

    const handleChange = (e) =>{
        setItem(e.target.value)
    }

    const deleteItem = (index) => {
       const newTodo = todo.filter((x)=>{
        return index !== x.id;
       })
       setTodo(newTodo)
    }

    const editTodo = (id) => {
        const edit = todo.find((x)=>{
            return x.id === id
        })
        console.log(edit);
       setItem(edit.name)
       setEditItem(id)
    }

    const addTodo = () => {
        if(item === ""){
            alert("You haven't added any task")
        }else if(item && editItem){
            setTodo(
                todo.map((x)=>{
                    if(x.id===editItem){
                        return {...x, name:item}
                    }return x
                })
            )
            setItem('')            
            setEditItem(null)
        }else {
            const inputData = {id: new Date().getTime().toString(), name: item}
            setTodo([...todo, inputData])
            setItem("")
        }
    }

    const removeAll = () => {
        setTodo([])
    }

    useEffect(() => {
      localStorage.setItem('lists', JSON.stringify(todo))
    }, [todo])

  return (
    <div className="todoArea">
    <div className='container text-light my-5 w-50'>
        <h3 className='my-3 fw-bold'><u>Design Your Day</u></h3>
        <hr />
        <h4 className='text-warning'>Todo List</h4>
        <input type="text" value={item} onChange={handleChange} placeholder="Add Item"/>
        <button className='addButton mx-1' onClick={addTodo}>Add</button>
        <div className="addTodo my-3">
            <ul className='todos fw-bold'>
            {todo.length === 0 && <h4>No Pending Task</h4>}
            {todo?.map((todos)=>{
                return (
                    <li key={todos.id}>{todos.name}<div className='icon'><FaEdit className='editBtn text-warning'onClick={()=>editTodo(todos.id)}/><MdDelete className='delBtn text-danger' onClick={()=>deleteItem(todos.id)}/></div></li>
                )
            })}
            </ul>
        </div>
        <button className="button my-2" onClick={removeAll}>Remove All</button>
        </div>
    </div>
  )
}
