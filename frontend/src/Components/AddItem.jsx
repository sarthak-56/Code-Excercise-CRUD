import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createuser', { name, description })
      .then(result => {
        console.log('Item created:', result.data);
        navigate('/');
      })
      .catch(err => {
        console.error('Error creating item:', err);
      });
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header">
          <h5 className="mb-0">Add Item</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="itemDescription"
                rows="3"
                placeholder="Enter item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              <i className="bi bi-check-circle me-2"></i>Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
