import React, {useContext, useState} from 'react';
import {Context} from "../context";


const Input = {
    position: "relative",
    width: "1.5em",
    height: "1.5em",
    color: "black",
    border: "1px solid gray",
    borderRadius: "4px",
    appearance: "none",
    outline: "0",
    cursor: "pointer",
    transition: "background 175ms cubic-bezier(0.1, 0.1, 0.25, 1)"
}

const TodoItem = ({todo: { title, completed, id, deadline }}) => {
    const { deleteTodo, toggleTodo, updateTodo } = useContext(Context)
    const [isEditMode, setEditMode] = useState(false)
    const [editValue, setEditValue]= useState("")
    const submitUpdate = value => {
        updateTodo(id, value)
        setEditMode(false)
    }
    return (
        <li className={completed ? 'todo__item todo__item-done' : 'todo__item'}>
            <input className="todo__check" style={Input} onChange={() => toggleTodo(id)}
                   type="checkbox" checked={completed}></input>
            {isEditMode
                ? <input  onBlur={() => submitUpdate(editValue)}
                                          className="todo__editing text-field__input"
                                          value={editValue}
                                          onChange={(e) => setEditValue(e.target.value)}
                                          type="text"/>
                : <label className={ completed ? "todo__label todo__done" : "todo__label"}>{title}</label>
            }
            <span className={completed && "todo__done"}>Deadline: {deadline}</span>
            <div style={{display: 'flex'}}>
                <button className="todo__edit" onClick={() => setEditMode(!isEditMode)}></button>
                <button className="todo__delete" onClick={() => {
                    deleteTodo(id)
                }}></button>
            </div>

        </li>
    );
};

export default TodoItem;