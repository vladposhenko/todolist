import './App.css';
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import TodoList from "./components/TodoList";
import {useEffect, useState} from "react";
import {Context} from "./context";




function App() {
    const [todoList, setTodoList] = useState(() => {
        let list = localStorage.getItem('todos')
        if (list) {
            return JSON.parse(localStorage.getItem('todos'))
        } else {
            return []
        }
    })
    const [todoTitle, setTodoTitle] = useState('')
    const [uncompletedTodos, setUncompletedTodos] = useState([])
    const [deadline, setDeadline] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoList))
        setUncompletedTodos(
            todoList.filter(t => t.completed === false)
        )
        searchTodo()
    }, [todoList])

    useEffect(() => {
        searchTodo(searchValue)
    }, [searchValue])

    
    const addNewTodo = () => {
        if(!todoTitle || !deadline) return alert('incorrect value or deadline')
        setTodoList([
            ...todoList,
            {id: Date.now(), title: todoTitle, completed: false, deadline}
        ])
        setTodoTitle('')
    }

    const updateTodo = (id, newValue) => {
        setTodoList(prev => prev.map(t => {
            if(t.id === id) {
                t.title = newValue
            }
            return t
        }))

    }

    const deleteTodo = (id) => {
        setTodoList(
            todoList.filter((t) => t.id !== id)
        )
    }

    const toggleTodo = (id) => {
        setTodoList(
            todoList.map((t) => {
                if(t.id === id ) {
                    t.completed = !t.completed
                }
                return t
            })
        )
    }

    const searchTodo = (search) => {
        let data = [...todoList]
        if(search) {
            data = data.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
        }
        setFilteredList(data)
    }
  return (
      <Context.Provider value={{
          deleteTodo,
          toggleTodo,
          deadline,
          updateTodo
      }}>
          <div className="App">
              <header className="App-header">
                  <h1>Todo List</h1>
                  <div style={{display: "flex", alignItems: "center"}}>
                      <span style={{marginRight: "20px", fontSize: "25px", fontWeight: "bold"}}>Find your todo</span>
                      <input style={{width: "200px", margin: "0 auto", display:"inline"}}
                             className="text-field__input"
                             value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                             type="text" placeholder="Search todos"/>
                  </div>

              </header>
              <main>
                  <div style={{textAlign: "center"}}>
                      {uncompletedTodos.length > 0
                          ? <p>You have <i>{uncompletedTodos.length}</i>  uncompleted todos</p>
                          : <p>You have no active tasks</p>
                      }
                  </div>
                  <form className='form-wrapper'>
                      <FormInput setDeadline={setDeadline}
                                 deadline={deadline}
                                 todoTitle={todoTitle}
                                 setTodoTitle={setTodoTitle}/>
                      <FormButton setDeadline={setDeadline}
                                  addNewTodo={addNewTodo}>123</FormButton>
                  </form>
                  {todoList.length > 0 ? <TodoList todos={filteredList}/> : <p className='todo__empty'>Todos is empty</p> }
              </main>
          </div>
      </Context.Provider>
  );
}

export default App;
