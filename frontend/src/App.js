import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './components/UploadPage';
import ListingPage from './components/ListingPage';
import DisplayPage from './components/DisplayPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/display/:id" element={<DisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
