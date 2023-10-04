import React from "react";
import "./PageLoader.scss";

export default (props) => {
  const {Logo, logoAlt} = props;
  return (
    <div className="pageloader">
      <div className="loader-box">
        <div className="img-box">
          <img width="77" height="76" src={Logo} alt={logoAlt}/>
        </div>
        <div className="loader"/>
      </div>
    </div>
  );
};
