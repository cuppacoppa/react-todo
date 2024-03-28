/* eslint-disable react/prop-types */


export function TodoItem({completed, id, title, toggleTodo, deleteTodo}) {
    return <li>
        <label>
            <input type="checkbox" onChange={e => toggleTodo(id, e.target.checked)} checked={completed}></input>
            {title}
        </label>
        <button onClick={() => deleteTodo(id, completed)}>Delete</button>
        
        <br/>
    </li>
}