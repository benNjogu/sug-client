import broken from "../assets/images/broken.svg";
import "./page-404.css";

const Page404 = () => {
  return (
    <>
      <div className="errorImageOverlay">
        <img
          className="errorImageContainer"
          // src={require("../assets/images/broken.png")}
          src={broken}
          alt="a picture of broken vase"
        />
        <div className="errorImageText">Sorry this page is broken</div>
      </div>
    </>
  );
};

export default Page404;
