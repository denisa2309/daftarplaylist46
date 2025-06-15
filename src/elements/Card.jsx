import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import {
  ErrorHandler,
  Loading,
  Pagination,
  SearchForeign,
} from '../components';
import Form from './Form';
import { useDeletePlaylist } from '../hooks/useDeletePlaylist';
import { FiEdit } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { SiYoutube } from 'react-icons/si';

const Card = ({
  playlists,
  loading,
  error,
  currentPage,
  itemsPerPage,
  goToNextPage,
  goToPrevPage,
  totalPages,
}) => {
  // State for showing form
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  // State for editing data
  const [editData, setEditData] = useState(null);

  // Delete Playlist Hook
  const { deleteData } = useDeletePlaylist();

  // Handle delete data
  const handleDelete = async (id_play) => {
    const result = await Swal.fire({
      title: 'Hapus Playlist',
      text: 'Apakah kamu yakin ingin menghapus playlist ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
      backdrop: false,
    });

    if (result.isConfirmed) {
      try {
        await deleteData(id_play);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          backdrop: false,
        }).then(() => window.location.reload());
      } catch (error) {
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menghapus data.',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          backdrop: false,
        });
      }
    }
  };

  // Handler
  if (loading) return <Loading />;
  if (error) return <ErrorHandler />;
  if (!playlists || playlists.length === 0) {
    return <SearchForeign />;
  }

  // Calculate indexes for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = playlists.slice(startIndex, endIndex);

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {currentData.map((item) => (
          <div
            key={item.id_play}
            className='flex flex-col gap-0 items-start w-full max-w-sm mx-auto rounded-2xl px-3 pb-5 bg-white border border-blue-200 shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out'
          >
            {/* Thumbnail */}
            <a
              href={item.play_url}
              target='_blank'
              rel='noopener noreferrer'
              className='relative flex flex-col items-center justify-center h-40 sm:h-44 md:h-48'
            >
              <img
                src={item.play_thumbnail}
                alt={item.play_name}
                className='w-full h-full object-cover rounded'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <SiYoutube className='text-white text-5xl sm:text-6xl md:text-7xl' />
              </div>
            </a>

            {/* Title */}
            <a
              href={item.play_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-lg sm:text-xl font-semibold mt-3'
            >
              {item.play_name}
            </a>

            {/* Description */}
            <span className='text-gray-600 text-sm sm:text-base'>
              Ditambah oleh {item.play_description} pada{' '}
              {dayjs(item.created_at).locale('id').format('D MMMM YYYY')}
            </span>

            {/* Genre and Actions */}
            <div className='flex justify-between items-center w-full -mt-0'>
              <span className='text-xs sm:text-sm bg-gray-100 rounded-full px-2 py-1'>
                #{item.play_genre}
              </span>

              <div className='flex pb-6 gap-0 items-center'>
                {/* Edit Buttons */}
                <button
                  type='button'
                  onClick={() => {
                    setEditData(item);
                    setShowForm(true);
                  }}
                  className='text-gray-500 hover:text-gray-800 text-lg sm:text-xl'
                >
                  <FiEdit />
                  {showForm}
                </button>

                {/* Delete Buttons */}
                <button
                  type='button'
                  onClick={() => handleDelete(item.id_play)}
                  className='text-gray-500 hover:text-gray-800 text-lg sm:text-xl'
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Form as Popup/Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className='fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='bg-white rounded-xl p-6 shadow-lg relative w-full max-w-md border border-blue-200'
              >
                <button
                  className='absolute top-0 right-0 text-gray-500 hover:text-red-500 text-xl font-bold'
                  onClick={toggleForm}
                >
                  <ImCancelCircle />
                </button>
                <Form
                  initialData={editData || {}}
                  id_play={editData?.id_play || null}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
    </>
  );
};

export default Card;
