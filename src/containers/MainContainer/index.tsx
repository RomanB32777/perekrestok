import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import Footer from "../../components/Footer";

import "./styles.sass";
import { Col, Row } from "antd";
import { LocationIcon } from "../../icons/icons";
import ModalCitySelect from "../../components/modals/ModalCitySelect";
import clsx from "clsx";

const MainContainer = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="main-container">
      <HeaderComponent
        visibleLogo
        logoUrl="/"
        modificator={clsx({ "bordered-header": pathname === "/terms" })}
      >
        <Row
          align="middle"
          justify="end"
          style={{
            width: "100%",
          }}
        >
          <Col>
            <div className="city-block">
              <p className="city-block-name">Москва</p>
              <p
                className="city-block-change"
                onClick={() => setIsOpenModal(true)}
              >
                (сменить)
              </p>
            </div>
          </Col>
          <Col>
            <div className="icon">
              <LocationIcon />
            </div>
          </Col>
        </Row>{" "}
      </HeaderComponent>
      <Outlet />
      <ModalCitySelect
        isOpenModal={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      />
      <Footer />
    </div>
  );
};

export default MainContainer;
