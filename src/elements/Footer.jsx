const Footer = () => {
  return (
    <footer className='w-full flex flex-col items-center -mt-6'>
      <div className='w-1/2 border-t border-gray-300'></div>
      <div className='text-center text-xs text-gray-500 pb-7 pt-0.5'>
        <a
          href='https://github.com/amelia-iky/playlist-youtube'
          target='_blank'
          rel='noopener noreferrer'
        >
          © {new Date().getFullYear()} Artelle Team
        </a>
      </div>
    </footer>
  );
};

export default Footer;
