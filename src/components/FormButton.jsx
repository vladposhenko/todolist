import React from 'react';


const FormButton = ({ addNewTodo }) => {
    return (
        <div>
            <button className="todo__form-btn" onClick={(e) => {
                e.preventDefault()
                addNewTodo()
            }}>New todo</button>
        </div>
    );
};

export default FormButton;