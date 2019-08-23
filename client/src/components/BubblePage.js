import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  console.log("bubblepage", colorList);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res.data);
        const colorList = res.data;
        setColorList(colorList);
      })
      .catch(err => console.log(err.response));
  };

  const updateColors = () => {
    setColorList(
      colorList.map(color =>
        color.id === colorToEdit.id ? setColorToEdit : color
      )
    );
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList
        getColors={getColors}
        colors={colorList}
        setColorList={setColorList}
        updateColors={updateColors}
        initialColor={initialColor}
        colorToEdit={colorToEdit}
        setColorToEdit={setColorToEdit}
        history={props.history}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
