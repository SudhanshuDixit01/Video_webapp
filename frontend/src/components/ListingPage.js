import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';

const ListingPage = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`https://backend-rh85.onrender.com/api/media`);
        setMedia(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Media List</h1>
      </header>
      <div className="media-list">
        {media.map((item) => (
          <div className="media-item" key={item._id}>
            <Link to={`/display/${item._id}`}>
              <img src={item.thumbnailUrl} alt={item.title} />
              <h3>{item.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingPage;
