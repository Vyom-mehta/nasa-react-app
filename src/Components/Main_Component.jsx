import React from "react";

function Main_Component(props) {
  const {data} = props
  return (
    <div className="imageContainer">
    <img
      
      src={data.hdurl}
      alt="Image"
       className="bgImage"
    />
    </div>
  );
}

export default Main_Component;
