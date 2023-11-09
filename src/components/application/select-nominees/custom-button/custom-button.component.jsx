const CustomButton = ({ handleClick, type, style, text, size }) => {
  return (
    <button
      className={`button btn-primary-outline btn-sm ${style} `}
      onClick={handleClick}
    >
      <span className={`icon ${size}`}>
        <i className={`fas ${type}`}></i>
      </span>
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
