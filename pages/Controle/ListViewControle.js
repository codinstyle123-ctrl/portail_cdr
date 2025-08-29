import React from "react";
import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import QualityControle from "pages/LandingPages/Author/sections/QualityControle";

const Cards = () => {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />

        <QualityControle />
      </div>
    </React.Fragment>
  );
};

export default Cards;
