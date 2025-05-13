import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Items from './Components/Items';
import UpdateItem from './Components/UpdateItem';
import AddItem from './Components/AddItem';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Items/> }></Route>
          <Route path='/create' element={<AddItem/> }></Route>
          <Route path='/update/:id' element={<UpdateItem/> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
