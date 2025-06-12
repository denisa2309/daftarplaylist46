import Loading from '../components/Loading';
import { useFetchPlaylist } from '../hooks/useFetchPlaylist';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { SiYoutube } from 'react-icons/si';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { FiEdit } from 'react-icons/fi';

const Card = () => {
  const { data, loading, error } = useFetchPlaylist();

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (error) return <p>Error: {error.message}</p>;

  if (!data || data.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1>Tidak ada playlist yang tersedia</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-row flex-wrap justify-between gap-4'>
      {data.map((item) => (
        <div
          key={item.id_play}
          className='flex flex-col gap-1 items-start w-96 rounded-2xl px-3 pb-3 bg-white border border-blue-200 shadow-md hover:shadow-lg transition-shadow'
        >
          {/* Thumbnail */}
          <a
            href={item.play_url}
            target='_blank'
            rel='noopener noreferrer'
            className='relative flex flex-col items-center justify-center w-11/12 h-1/2 mb-1'
          >
            <img
              src={item.play_thumbnail}
              alt={item.play_name}
              className='w-full h-full object-cover rounded'
            />
            {/* Play Icon */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <SiYoutube className='text-white text-7xl' />
            </div>
          </a>

          {/* Title */}
          <a
            href={item.play_url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl font-semibold mt-4'
          >
            {item.play_name}
          </a>

          {/* Description */}
          <span className='text-gray-600 mt-2'>
            Ditambah oleh {item.play_description} pada{' '}
            {dayjs(item.created_at).locale('id').format('D MMMM YYYY')}
          </span>

          {/* Genre */}
          <span className='text-sm mt-2 bg-gray-100 rounded-full px-2 py-1 inline-block'>
            #{item.play_genre}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Card;
