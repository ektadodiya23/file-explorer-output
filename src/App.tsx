import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Component/filefolder/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// interface ListItem {
//   text: string;
//   children?: ListItem[];
// }

function App() {
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
