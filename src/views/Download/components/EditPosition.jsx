import React from "react";

const EditPosition = ({ x, y, addText, style }) => {
  return (
    <div
      style={{ position: "absolute", top: y, left: x, ...style }}
      onClick={() => addText(x, y)}
    ></div>
  );
};

export default EditPosition;
