import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="bg-white w-[270px] pb-4 absolute z-30 rounded-b-md shadow-md">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center"
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              className="ml-[10px] object-contain w-[25px] h-[25px] select-none"
              alt=""
            />
            <h3 className="select-none m-3">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;