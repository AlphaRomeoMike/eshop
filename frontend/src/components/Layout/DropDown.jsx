import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch } from "react-redux";
import { fetchExchangeRate } from "../../redux/actions/currency";
import { countriesData } from "../../static/data";

const DropDown = ({
  categoriesData,
  setDropDown,
  dropDownType = "categories",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {dropDownType === "categories"
        ? categoriesData &&
          categoriesData.map((i, index) => (
            <div
              key={index}
              className={`${styles.noramlFlex}`}
              onClick={() => submitHandle(i)}
            >
              <img
                src={i.image_Url}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          ))
        : countriesData &&
          countriesData.map((i, index) => (
            <div
              key={index}
              className={`${styles.noramlFlex}`}
              onClick={() => dispatch(fetchExchangeRate(i?.subTitle))}
            >
              <img
                src={i.image_Url}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          ))}
    </div>
  );
};

export default DropDown;
