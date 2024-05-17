import React, { useState } from "react";




function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function addData() {
        if (inputValue.length === 0) {
            return;
        }
        setTasks([
            ...tasks,
            {
                content: inputValue,
                isComplete: false,
                isEditing:false
            }
        ]);
        setInputValue("");
    }

    function deleteTask(task) {
        setTasks(
            tasks.filter((t) => t !== task)
        );
    }

    function editTask(taskIndex)
    {
        tasks[taskIndex].isEditing=true;
        setTasks([
            ...tasks
        ])
    }
    function markCompleted(taskIndex){
        tasks[taskIndex].isComplete=!tasks[taskIndex].isComplete;
        setTasks([
            ...tasks
        ])
    }

    function updateValue(taskIndex,value)
    {
        tasks[taskIndex].content=value;
        setTasks([
            ...tasks
        ])
    }

    function saveData(taskIndex)
    {
        tasks[taskIndex].isEditing=false;
        setTasks([
            ...tasks
        ])
    }

    return <div className="task-manager">
        <h1>Task Manager</h1>
        <div className="tasks">
    {
    tasks.map((task, index) => (
        <div key={index}>
            <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => markCompleted(index)}
            />
            

            {
                task.isEditing ? 
                // If task is being edited
                
                    <span className="content">
                        <input 
                            value={task.content} 
                            onChange={(event)=>updateValue(index,event.target.value)}
                            className="edit-value"
                        />
                      
                        {/* This seems like an extra button */}
                        <button>Save</button>
                    </span>
                
                :
                // If task is not being edited
                <span>
                    {task.isComplete ? <del>{task.content}</del> : task.content}
                    {' '} {/* Adds space between content and Edit button */}
                  
                </span>
            
            }
            {    task.isEditing ? 
                  <button onClick={()=>saveData(index)} className="save">Save</button>:
                  <button onClick={()=> editTask(index)} className="edit">Edit</button>
            }
           
            
            <button onClick={() => deleteTask(index)}className="delete">Delete</button>
        </div>
    ))}
</div>

            <div className="add-task-container">
                <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="Enter a task"/>
                <button onClick={addData} >Add task</button>
            </div>
        </div>

}

export default TaskManager;
