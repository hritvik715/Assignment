import { useState } from 'react';

const InventoryTable = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', category: 'Category A', quantity: 15 }, { id: 2, name: 'Item 2', category: 'Category B', quantity: 5 },

    ]);

    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    const addItem = () => {
        setItems([...items, { ...newItem, id: items.length + 1 }]);
        setNewItem({ name: '', category: '', quantity: 0 });
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id, updatedItem) => {
        setItems(items.map(item => item.id === id ? updatedItem : item));
    };

    const filteredItems = filterCategory ? items.filter(item => item.category === filterCategory) : items;//imp-> yha hamne ternary ka use kiya 

    const sortedItems = sortBy ? [...filteredItems].sort((a, b) => a[sortBy] - b[sortBy]) : filteredItems;

    return (
        <div>
            <h2>Inventory Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            <div>
                <label>Filter by Category: </label>
                <select onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="Category A">Category A</option>
                    <option value="Category B">Category B</option>

                </select>
            </div>
            <div>
                <label>Sort by: </label>
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">None</option>
                    <option value="quantity">Quantity</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? 'red' : 'white' }}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                                <button onClick={() => {
                                    const updatedItem = { ...item, quantity: item.quantity + 1 };
                                    updateItem(item.id, updatedItem);
                                }}>Increase Quantity</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;