const CustomButton = ({ handleClick, type, style, text, size }) => {
  return (
    <button
      className={`button btn-primary-outline btn-sm ${style} `}
      onClick={(e) => handleClick(e)}
    >
      <span className={`icon ${size}`}>
        <i className={`fas ${type}`}></i>
      </span>
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
