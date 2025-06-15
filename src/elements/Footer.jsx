const Footer = () => {
  return (
    <footer className='w-full flex flex-col items-center mt-10'>
      <div className='w-full max-w-xs sm:max-w-md border-t border-gray-300 my-2'></div>
      <div className='text-center text-xs text-gray-500 pb-5'>
        <a
          href='https://github.com/amelia-iky/playlist-youtube'
          target='_blank'
          rel='noopener noreferrer'
          className='transition duration-300'
        >
          © {new Date().getFullYear()} Artelle Team
        </a>
      </div>
    </footer>
  );
};

export default Footer;
