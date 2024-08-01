import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';

const DisplayPage = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`https://backend-rh85.onrender.com/api/media${id}`);
        setMedia(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, [id]);

  if (!media) return <div>Loading...</div>;

  return (
    <div className="container display-page">
      <h1>{media.title}</h1>
      <p>{media.description}</p>
      <video controls autoPlay>
        <source src={media.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default DisplayPage;
