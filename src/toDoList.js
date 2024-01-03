import './toDoList.css'
import React, {useState} from 'react';
import './App.css'

const ToDoList = () => {
    const [tasks, setTasks] = useState([])
    const [inputTask, setInputTask] = useState('')
    const [edit, setEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [show, setShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const add = () => {
        if(inputTask.trim() !== ''){
            if(edit){
                const upTask = [...tasks]
                upTask[indexEdit] = inputTask
                setTasks(upTask)
                setEdit(false)
                setIndexEdit(null)
            }else{
                setTasks([...tasks, inputTask])
            }
            setInputTask('')
        }
    }

    const deleteTask = (index) => {
        setDeleteIndex(index)
        setDeleteShow(true)
    }

    const confirmDelete = () => {
        const upTasks = [...tasks]
        upTasks.splice(deleteIndex, 1)
        setTasks(upTasks)
        setDeleteShow(false)
    }

    const cancelDelete = () => {
        setDeleteShow(false)
    }

    const editTask = (index) => {
        setInputTask(tasks[index])
        setEdit(true)
        setIndexEdit(index)
        setShow(true)
    }

    const confirmEdit = () => {
        add()
        setShow(false)
    }

    const cancelEdit = () => {
        setShow(false)
        setInputTask('')
        setEdit(false)
        setIndexEdit(null)
    }

    return (
        <div className="todolist">
            <h1>ToDoList</h1>
            <div className="input">
                <input
                    type="text"
                    placeholder="Do"
                    value={inputTask}
                    onChange={(e) => {setInputTask(e.target.value)}}
                />
                <button onClick={add}>{edit ? 'Edit':'Add' }</button>
            </div>
            <ul className="tasks">
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <div>
                            <button onClick={()=>{editTask(index)}}>Edit</button>
                            <button onClick={()=>{deleteTask(index)}}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {show && (
                <div className="window">
                    <div className="windowcontent">
                        <h2> Edit </h2>
                        <input
                            type="text"
                            value={inputTask}
                            onChange={(e) => setInputTask(e.target.value)}
                        />
                        <button onClick={()=>{confirmEdit()}}>save</button>
                        <button onClick={()=>{cancelEdit()}}>cancel</button>
                    </div>
                </div>
            )}

            {deleteShow && (
                <div className="window">
                    <div className="windowcontent">
                        <h2>Confirm Deleting </h2>
                        <p>Are You Sure???</p>
                        <button onClick={confirmDelete}>yes</button>
                        <button onClick={cancelDelete}>no</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ToDoList