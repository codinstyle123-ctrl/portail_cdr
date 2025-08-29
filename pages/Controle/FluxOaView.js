import React from "react";
import PlacesCdrRadio from "pages/LandingPages/Author/sections/Posts_cdr_radio";
import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";

const RadioCards = () => {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />

        <PlacesCdrRadio />
      </div>
    </React.Fragment>
  );
};

export default RadioCards;
