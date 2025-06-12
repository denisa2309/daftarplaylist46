const Button = ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-pink px-6 py-2 rounded-lg text-white text-lg hover:bg-pink/90 transition-colors duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
