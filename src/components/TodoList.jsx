import React from 'react';
import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
    return (
        <ul className='todo__list'>
            {
                todos.map((t) => <TodoItem key={t.id} todo={t} />)
            }
        </ul>
    );
};

export default TodoList;