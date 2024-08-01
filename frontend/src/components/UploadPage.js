import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);

    try {
      await axios.post(`https://backend-rh85.onrender.com/api/media/upload`, formData);
      alert('Upload successful!');
      setTitle('');
      setDescription('');
      setThumbnail(null);
      setVideo(null);
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Upload Media</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          maxLength="50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          maxLength="200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Image</label>
        <input
          type="file"
          accept=".jpg,.png"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />
         <label>Video</label>
        <input
          type="file"
          accept=".mpg,.avi,.mp4"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
