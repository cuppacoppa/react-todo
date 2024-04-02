/* eslint-disable react/prop-types */
import { useState } from "react"

export function TodoItem({completed, id, title, toggleTodo, deleteTodo, nestedTodos, addNestedTodo}) {

    const [newNestedItem, setNewNestedItem] = useState("")
  
    function handleSubmit(e) {
      e.preventDefault()
      if (newNestedItem === "") return
  
      addNestedTodo(newNestedItem)
  
      setNewNestedItem("")
    }
    return <li>
        <label>
            <input type="checkbox" onChange={e => toggleTodo(id, e.target.checked)} checked={completed}></input>
            {title}
            {id}
        </label>
        <button onClick={() => deleteTodo(id, completed)}>Delete</button>
        
        <br/>
        {nestedTodos && nestedTodos.length > 0 && (
                <ul>
                    {nestedTodos.map(nestedTodo => (
                        <li key={nestedTodo.id}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    onChange={e => toggleTodo(nestedTodo.id, e.target.checked)} 
                                    checked={completed} 
                                />
                                {nestedTodo.nestedTitle}
                                {nestedTodo.parentId}
                            </label>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="item">New Nested Item</label>
                                    <input value={newNestedItem} type="text" onChange={e => setNewNestedItem(e.target.value)}></input>
                                </div>
                                <button>add</button>
                                </form>
                            
                            <button onClick={() => deleteTodo(id, completed)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
    </li>
}