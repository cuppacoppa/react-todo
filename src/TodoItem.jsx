/* eslint-disable react/prop-types */


export function TodoItem({completed, id, title, toggleTodo, deleteTodo, nestedTodos}) {
    return <li>
        <label>
            <input type="checkbox" onChange={e => toggleTodo(id, e.target.checked)} checked={completed}></input>
            {title}
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
                            </label>
                            <button onClick={() => deleteTodo(id, completed)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
    </li>
}