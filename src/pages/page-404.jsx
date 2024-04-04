import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import broken from "../assets/images/broken.svg";
import "./page-404.css";

const Page404 = () => {
  const navigate = useNavigate();

  const handleOnBackpress = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="errorImageOverlay">
        <img
          className="errorImageContainer"
          src={broken}
          alt="a picture of broken vase"
        />
        <div className="errorImageText">Sorry this page is broken</div>
        <Button type="primary" onClick={handleOnBackpress}>
          Go Back
        </Button>
      </div>
    </>
  );
};

export default Page404;
