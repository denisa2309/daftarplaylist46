const Loading = () => (
  <div className='flex flex-col justify-center items-center h-screen'>
    <div className='w-16 h-16 border-4 border-pink border-t-gray-200 rounded-full animate-spin'></div>
    <span className='mt-4 text-gray-600 font-medium'>Memuat data...</span>
  </div>
);

export default Loading;
