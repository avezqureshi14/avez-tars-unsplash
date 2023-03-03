import React, { useEffect } from "react";
import Image from "./Image";
import Banner from "./Banner";
const Images = () => {

  return (
    <>
    <Banner/>
      <div className="imagesContainer">
        <Image />
      </div>
    </>
  );
};

export default Images;
