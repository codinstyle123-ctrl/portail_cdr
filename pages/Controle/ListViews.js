import React from "react";
import Audits from "pages/LandingPages/Author/sections/Audits";

import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";

const Cards = () => {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />

        <Audits />
      </div>
    </React.Fragment>
  );
};

export default Cards;
