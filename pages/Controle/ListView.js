import React from "react";
import Places from "pages/LandingPages/Author/sections/Posts";

import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";

const Cards = () => {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />

        <Places />
      </div>
    </React.Fragment>
  );
};

export default Cards;
