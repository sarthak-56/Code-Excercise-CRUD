const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ItemModel = require('./Items');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/createuser', async (req, res) => {
  try {
    const newItem = await ItemModel.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/getusers', async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getusers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const item = await ItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/deleteuser/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
