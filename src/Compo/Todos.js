import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';


const Todo = () => {
    const [todo, setTodo] = useState([])
    const [del, setDel] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((data) => setTodo(data));
    }, []);

    const handleDel = ()=>{
        const updatedRow = todo.filter(row=>!del.includes(row))
        setDel(updatedRow)
    }

    return (
        <div className="container">
            <h2>TODO</h2>
            <MaterialTable
            onSelectionChange={(rows)=>setDel(rows)}
                columns={[
                    {
                        title: "SL No",
                        field: "id"
                    },
                    {
                        title: "User ID",
                        field: "userId"
                    },
                    {
                        title: "ID",
                        field: "id"
                    },
                    {
                        title: "Title",
                        field: "title"
                    },
                    {
                        title: "Completed",
                        field: "completed",
                        lookup: {
                            "false": "false",
                            "true": "true"
                        }
                    }
                ]}
                data={todo}
                options={{
                    sorting: true,
                    selection: true
                }}
                actions={[
                    {
                        tooltip: 'Remove All Selected Users',
                        icon: 'delete',
                        onClick: ()=> handleDel
                    }
                ]}
            />
            <div className="form-check form-switch my-3 mx-2">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dense padding</label>
            </div>
        </div>
    )
}

export default Todo