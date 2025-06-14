import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useFetchPlaylist } from "../hooks/useFetchPlaylist";
import { SiYoutube } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const Card = () => {
  const { data, loading, error } = useFetchPlaylist();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Loading component
  if (loading) return <Loading />;

  // Error component
  if (error) return <p>Error: {error.message}</p>;

  // No data available
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>Tidak ada playlist yang tersedia</h1>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // For nex page
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // For previous page
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {currentData.map((item) => (
          <div key={item.id_play} className="flex flex-col gap-1 items-start w-96 rounded-2xl px-3 pb-3 bg-white border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <a href={item.play_url} target="_blank" rel="noopener noreferrer" className="relative flex flex-col items-center justify-center w-11/12 h-40">
              <img src={item.play_thumbnail} alt={item.play_name} className="w-full h-full object-cover rounded" />
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <SiYoutube className="text-white text-7xl" />
              </div>
            </a>

            {/* Title */}
            <a href={item.play_url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold">
              {item.play_name}
            </a>

            {/* Description */}
            <span className="text-gray-600 text-base -mt-0 pt-1">
              {item.play_description} pada {dayjs(item.created_at).locale("id").format("D MMMM YYYY")}
            </span>

            <div className="flex justify-between items-center w-11/12 -mt-5 py-3">
              {/* Genre */}
              <span className="text-sm bg-gray-100 rounded-full px-2 py-1">#{item.play_genre}</span>

              {/* Actions */}
              <div className="-mt-0">
                <button className="text-gray-500 hover:text-gray-800 text-xl">
                  <FiEdit />
                </button>
                <button className="text-gray-500 hover:text-gray-800 text-xl">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} />
    </>
  );
};

export default Card;
