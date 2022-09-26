import React from 'react';

const FormInput = ({ todoTitle, setTodoTitle, deadline, setDeadline }) => {
    return (
        <div style={{display: 'flex'}}>
            <input placeholder="Enter new todo" className="text-field__input"  value={todoTitle} onChange={(e) => {
                setTodoTitle(e.target.value)
            }} type="text"/>
            <input  value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date"/>
        </div>
    );
};

export default FormInput;