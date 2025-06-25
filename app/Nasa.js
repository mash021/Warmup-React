import React from "react";

const NasaPage = ({ apod }) => {
  if (!apod) return <h1>Could not load NASA image.</h1>;

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <h1>Astronomy Picture of the Day</h1>
      <h2>{apod.title}</h2>
      <p>
        <strong>Date:</strong> {apod.date}
      </p>

      {apod.media_type === "image" ? (
        <img
          src={apod.url}
          alt={apod.title}
          style={{ width: "100%", borderRadius: 8, marginBottom: "1rem" }}
        />
      ) : (
        <iframe
          title="NASA Video"
          src={apod.url}
          width="100%"
          height="500"
          allowFullScreen
        />
      )}

      <p style={{ lineHeight: 1.6 }}>{apod.explanation}</p>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    );
    const apod = await res.json();
    return { props: { apod } };
  } catch (error) {
    console.error("Failed to fetch NASA APOD:", error);
    return { props: { apod: null } };
  }
}

export default NasaPage;
