import React from "react";
import { useDispatch } from "react-redux";
import { hideModelHandler } from "../../redux/modelReducer";
import "./Model.css";
const Model = ({ children, props }) => {
  const dispatch = useDispatch();
  const closeModelHandler = () => {
    dispatch(hideModelHandler());
  };
  return (
    <div className="modelBackdrop">
      <div className="model">
        <div>
          <i onClick={closeModelHandler} className="fa-solid fa-xmark"></i>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Model;
