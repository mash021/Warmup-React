import React, { useEffect, useState } from "react";

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-07-01&api_key=DEMO_KEY",
          { signal: controller.signal }
        );
        const data = await res.json();
        setPhotos(data.photos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch Mars photos.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();

    return () => {
      controller.abort(); // cleanup on unmount
    };
  }, []);

  if (loading) return <p>Loading Mars Rover photos...</p>;
  if (error) return <p>{error}</p>;
  if (photos.length === 0) return <p>No photos available for this date.</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <h2>Mars Rover Photos - Curiosity (2020-07-01)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              borderRadius: "8px",
            }}
          >
            <img
              src={photo.img_src}
              alt={`Mars by ${photo.rover.name}`}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <p>
              <strong>Camera:</strong> {photo.camera.full_name}
            </p>
            <p>
              <strong>Date:</strong> {photo.earth_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
