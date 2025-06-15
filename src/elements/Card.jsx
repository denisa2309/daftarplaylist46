import dayjs from 'dayjs';
import 'dayjs/locale/id';
import ErrorHandler from '../components/ErrorHandler';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchForeign from '../components/SearchForeign';
import { SiYoutube } from 'react-icons/si';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

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
      <div className='grid grid-cols-3 gap-4'>
        {currentData.map((item) => (
          <div
            key={item.id_play}
            className='flex flex-col gap-1 items-start w-96 rounded-2xl px-3 pb-3 bg-white border border-blue-200 shadow-md hover:shadow-lg transition-shadow'
          >
            <a
              href={item.play_url}
              target='_blank'
              rel='noopener noreferrer'
              className='relative flex flex-col items-center justify-center w-11/12 h-40'
            >
              <img
                src={item.play_thumbnail}
                alt={item.play_name}
                className='w-full h-full object-cover rounded'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <SiYoutube className='text-white text-7xl' />
              </div>
            </a>
            <a
              href={item.play_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl font-semibold'
            >
              {item.play_name}
            </a>
            <span className='text-gray-600 text-base -mt-0 pt-1'>
              Ditambah oleh {item.play_description} pada{' '}
              {dayjs(item.created_at).locale('id').format('D MMMM YYYY')}
            </span>
            <div className='flex justify-between items-center w-11/12 -mt-5 py-3'>
              <span className='text-sm bg-gray-100 rounded-full px-2 py-1'>
                #{item.play_genre}
              </span>
              <div className='-mt-0'>
                <button className='text-gray-500 hover:text-gray-800 text-xl'>
                  <FiEdit />
                </button>
                <button className='text-gray-500 hover:text-gray-800 text-xl'>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
