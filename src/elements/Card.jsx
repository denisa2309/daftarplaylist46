import { useState, useEffect, React } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useFetchPlaylist } from "../hooks/useFetchPlaylist";
import { SiYoutube } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Modal, notification } from "antd";

const Card = () => {
  const { data, loading, error } = useFetchPlaylist();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // delete
  const [playlistData, setPlaylistData] = useState([]);
  useEffect(() => {
    if (data) {
      setPlaylistData(data);
    }
  }, [data]);

  const deletePlaylist = async (id) => {
    try {
      const response = await fetch(
        `https://webfmsi.singapoly.com/api/playlist/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus playlist");
      }

      return true;
    } catch (error) {
      console.error("Error saat menghapus:", error);
      return false;
    }
  };

  const handleDelete = (id) => {
    const updatedData = playlistData.filter((item) => item.id_play !== id);
    setPlaylistData(updatedData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const handleModalOk = async () => {
    const success = await deletePlaylist(selectedId);
    if (success) {
      handleDelete(selectedId);
      setIsModalOpen(false);
      setTimeout(() => {
        notification.success({
          message: "Playlist Dihapus",
          description: `"${selectedName}" berhasil dihapus dari daftar.`,
          placement: "topRight",
        });
      }, 300);
    } else {
      notification.error({
        message: "Gagal Menghapus",
        description: "Terjadi kesalahan saat menghapus playlist.",
        placement: "topRight",
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <p>Error: {error.message}</p>;

  // No data
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>Tidak ada playlist yang tersedia</h1>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(playlistData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = playlistData.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {currentData.map((item) => (
          <div
            key={item.id_play}
            className="flex flex-col gap-1 items-start w-96 rounded-2xl px-3 pb-3 bg-white border border-blue-200 shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Thumbnail */}
            <a
              href={item.play_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center w-11/12 h-40"
            >
              <img
                src={item.play_thumbnail}
                alt={item.play_name}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <SiYoutube className="text-white text-7xl" />
              </div>
            </a>

            {/* Title */}
            <a
              href={item.play_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold"
            >
              {item.play_name}
            </a>

            {/* Description */}
            <span className="text-gray-600 text-base -mt-0 pt-1">
              {item.play_description} pada{" "}
              {dayjs(item.created_at).locale("id").format("D MMMM YYYY")}
            </span>

            <div className="flex justify-between items-center w-11/12 -mt-5 py-3">
              {/* Genre */}
              <span className="text-sm bg-gray-100 rounded-full px-2 py-1">
                #{item.play_genre}
              </span>

              {/* Actions */}
              <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-800 text-xl">
                  <FiEdit />
                </button>

                <button
                  onClick={() => {
                    setSelectedId(item.id_play);
                    setSelectedName(item.play_name);
                    setIsModalOpen(true);
                  }}
                  className="text-gray-500 hover:text-red-500 text-xl ml-2 transition-colors"
                  title="Hapus Playlist"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />

      <Modal
        title="Konfirmasi Hapus"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null} // ❌ Matikan default footer dari AntD
        closeIcon={
          <span className="text-gray-600 hover:text-black text-lg font-bold">
            ×
          </span>
        }
        centered
      >
        <div className="text-center">
          <p className="mb-5">
            Yakin ingin menghapus playlist <strong>{selectedName}</strong>?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleModalCancel}
              className="px-6 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              onClick={handleModalOk}
              className="px-6 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Ya
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
