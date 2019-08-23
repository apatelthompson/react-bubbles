import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);

  console.log("bubblepage", colorList);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res.data);
        setColorList(res.data);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
