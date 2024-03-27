/* eslint-disable react/prop-types */
import { useState } from "react"



export function NewTodoForm({ onSubmit }) {
  
  const [newItem, setNewItem] = useState("")
  const [newDescription, setNewDescription] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return

    onSubmit(newItem, newDescription)

    setNewItem("")
    setNewDescription("")
  }

    return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="item">New Item</label>
        <input value={newItem} type="text" onChange={e => setNewItem(e.target.value)}></input>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          value={newDescription}
          type="text"
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <button>add</button>
    </form>
    )
}