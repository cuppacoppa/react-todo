import "./styles.css"
import { useEffect, useState } from "react"
import { TodoList } from "./TodoList"
import { NewTodoForm } from "./NewTodoForm"
import  { Lock }  from "./Lock"

export default function App() {

  const [lock, setLock] = useState(true);

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  })

  const [nestedTodos, setNestedTodos] = useState(() => {
    const localValue = localStorage.getItem("NESTEDITEMS")
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("NESTEDITEMS", JSON.stringify(nestedTodos))
  }, [nestedTodos])

  function addTodo(title) {
    const parentId = crypto.randomUUID();
    setTodos(currentTodos => {
      return [
          ...currentTodos,
          {id: parentId, title, completed: false, 
            nestedTodos: [
              {id: crypto.randomUUID(), nestedTitle: "hi", completed: false, parentId: parentId}, 
              {id: crypto.randomUUID(), nestedTitle: "john", completed: false, parentId: parentId}
          ]},
      ]
    })
  }

  // TODO MAKE THIS RECOGNIZE PARENT TODO AND THEN ADD NESTEDTODOS TO THAT PARENT TODOS ARRAY
  function addNestedTodo(parentTodoId, nestedTitle) {
    // Find the parent todo in the todos array
    const updatedTodos = todos.map(todo => {
      console.log(todo.id)
      // need to pass an actual parentId, this one is undefined because of eventHandler function has no arguments
      if (todo.id === parentTodoId) {
        // If found, create a new todo object with the updated nestedTodos array
        console.log(todo.id)
        return {
          ...todo,
          nestedTodos: [
            ...todo.nestedTodos,
            { id: crypto.randomUUID(), nestedTitle, completed: false }
          ]
        };
      }
      return todo; // Return the todo unchanged if it's not the parentTodo
    });
  
    // Update the state with the modified todos array
    setTodos(updatedTodos);
  }
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id, completed) {
    if (completed) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
      
      })
      console.log(completed)
    }
    else if (!completed & lock === false){
      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
        
        })
        console.log(completed)
    }
    else {
      alert("Todo must be completed or lock turned off");
    }
  }
  return (
    <>
    <Lock setLock={setLock} lock={lock}/>
    <NewTodoForm onSubmit={addTodo}/>
    <h1>Todo List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} addNestedTodo={addNestedTodo} nestedTodos={nestedTodos}/>
    </>
  )
}


