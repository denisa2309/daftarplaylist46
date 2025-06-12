const Button = ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='bg-pink px-6 py-2.5 rounded-xl text-white text-lg font-medium hover:bg-pink/85 transition-colors duration-300'
    >
      {children}
    </button>
  );
};

export default Button;
