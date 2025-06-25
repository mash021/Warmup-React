"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NasaEpic() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date"); // expected format: YYYY-MM-DD

  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    const fetchEpic = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=DEMO_KEY`
        );
        const data = await res.json();

        if (data.length === 0) {
          setError("No image available for this date.");
          return;
        }

        const image = data[0].image;
        const formattedDate = date.replaceAll("-", "/");
        const url = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${image}.png`;

        setImageUrl(url);
      } catch (err) {
        setError("Failed to load image.");
      }
    };

    fetchEpic();
  }, [date]);

  return (
    <div>
      <h1>NASA EPIC Image</h1>
      {error && <p>{error}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="NASA EPIC"
          style={{ width: "100%", maxWidth: 600 }}
        />
      )}
    </div>
  );
}
