import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import Footer from "../../components/Footer";

import { Col, Row } from "antd";
import { LocationIcon } from "../../icons/icons";
import ModalCitySelect from "../../components/modals/ModalCitySelect";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSelectedCity, setSelectedCity } from "../../store/types/Cities";
import "./styles.sass";

const MainContainer = () => {
  const dispatch = useAppDispatch();
  const { selected_city } = useAppSelector((state) => state.cities);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { pathname } = useLocation();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    const storageSelectedCity = getSelectedCity();
    storageSelectedCity
      ? dispatch(setSelectedCity(storageSelectedCity))
      : openModal();
  }, []);

  return (
    <div className="main-container">
      <HeaderComponent
        visibleLogo
        logoUrl="/"
        modificator={clsx({ "bordered-header": pathname === "/terms" })}
      >
        {selected_city && (
          <Row
            align="middle"
            justify="end"
            style={{
              width: "100%",
            }}
          >
            <Col>
              <div className="city-block">
                <p className="city-block-name">{selected_city}</p>
                <p className="city-block-change" onClick={openModal}>
                  (сменить)
                </p>
              </div>
            </Col>
            <Col>
              <div className="icon">
                <LocationIcon />
              </div>
            </Col>
          </Row>
        )}
      </HeaderComponent>
      <Outlet />
      <ModalCitySelect isOpenModal={isOpenModal} closeModal={closeModal} />
      <Footer />
    </div>
  );
};

export default MainContainer;
