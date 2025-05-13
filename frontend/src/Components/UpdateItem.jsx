import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getusers/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch item data');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/update/${id}`, { name, description });
      navigate('/');
    } catch (err) {
      setError('Failed to update item');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header">
          <h5 className="mb-0">Update Item</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="itemDescription"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              <i className="bi bi-check-circle me-2"></i>Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;
