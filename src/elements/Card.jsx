import React from "react";
import { useFetchPlaylist } from "../hooks/useFetchPlaylist";

const Card = () => {
  const { data, loading, error } = useFetchPlaylist();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>Tidak ada playlist yang tersedia</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {data.map((item) => (
        <div
          key={item.id_play}
          className="bg-white w-80 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <img
            src={item.play_thumbnail}
            alt={item.play_name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-semibold mt-4">{item.play_name}</h2>
          <p className="text-gray-600 mt-2">{item.play_description}</p>
          <p className="text-sm text-blue-500 mt-2">{item.play_genre}</p>
          <a
            href={item.play_url}
            className="inline-block mt-4 text-indigo-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default Card;
