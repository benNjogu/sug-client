const MineAllBtns = ({
  btn1Text,
  btn2Text,
  selected = "btn1",
  onClickBtn1,
  onClickBtn2,
}) => {
  return (
    <div className="d-flex justify-content-between">
      <button
        type="button"
        className={`btn w-25 ${
          selected === "btn1" ? "btn-primary" : "btn-outline-secondary"
        }`}
        onClick={onClickBtn1}
      >
        {btn1Text}
      </button>
      <button
        type="button"
        className={`btn w-25 ${
          selected === "btn2" ? "btn-primary" : "btn-outline-secondary"
        }`}
        onClick={onClickBtn2}
      >
        {btn2Text}
      </button>
    </div>
  );
};

export default MineAllBtns;
