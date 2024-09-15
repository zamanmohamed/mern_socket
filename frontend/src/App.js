import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import ItemList from "./components/ItemList";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();

    socket.on("itemCreated", fetchItems);
    socket.on("itemUpdated", fetchItems);
    socket.on("itemDeleted", fetchItems);

    return () => {
      socket.off("itemCreated");
      socket.off("itemUpdated");
      socket.off("itemDeleted");
    };
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/api/items");
    setItems(response.data);
  };

  const handleAddItem = async () => {
    const newItem = { name, description };
    await axios.post("http://localhost:5000/api/items", newItem);
    fetchItems(); // Refetch items after adding a new item
    setName("");
    setDescription("");
  };

  const handleUpdateItem = async (id) => {
    const updatedItem = { name, description };
    await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
    fetchItems(); // Refetch items after updating an item
  };

  const handleDeleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems(); // Refetch items after deleting an item
  };

  return (
    <div>
      <h1>Real-time CRUD with Socket.io</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleAddItem}>Add Item</button>
      <ItemList
        items={items}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}

export default App;
