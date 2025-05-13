import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(() => {
    axios.get('http://localhost:3001/getusers')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
      .then(() => {
        fetchItems();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Product List</h5>
          <Link to="/create" className="btn btn-success">
            <i className="bi bi-plus-lg me-1"></i> Add
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-warning">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th style={{ width: '150px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link to={`/update/${item._id}`} className="btn btn-sm btn-primary me-2">
                      <i className="bi bi-pencil-square"></i> Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Items;
