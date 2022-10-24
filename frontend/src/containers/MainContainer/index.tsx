import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import clsx from "clsx";

import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import ModalCitySelect from "../../components/modals/ModalCitySelect";
import Footer from "../../components/Footer";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCities,
  getSelectedCity,
  removeSelectedCity,
  setSelectedCity,
} from "../../store/types/Cities";

import { filterVacancy } from "../../consts";
import { LocationIcon } from "../../icons/icons";
import "./styles.sass";

const MainContainer = () => {
  const dispatch = useAppDispatch();
  const { selected_city, cities } = useAppSelector((state) => state.cities);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { pathname } = useLocation();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    filterVacancy && dispatch(getCities());
  }, []);

  useEffect(() => {
    if (cities.length) {
      const storageSelectedCity = getSelectedCity();
      const isExistCity = cities.some(
        (city) => city.city_name === storageSelectedCity
      );

      if (storageSelectedCity && isExistCity) {
        dispatch(setSelectedCity(storageSelectedCity));
      } else {
        removeSelectedCity();
        openModal();
      }
    }
  }, [cities]);

  return (
    <div className="main-container">
      <HeaderComponent
        visibleLogo
        logoUrl="/"
        modificator={clsx({ "bordered-header": pathname === "/terms" })}
        children={
          filterVacancy ? (
            <>
              {selected_city ? (
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
              ) : (
                <p
                  style={{ textAlign: "right" }}
                  className="city-block-change"
                  onClick={openModal}
                >
                  Выбрать город
                </p>
              )}
            </>
          ) : null
        }
      ></HeaderComponent>
      <Outlet />
      {filterVacancy && (
        <ModalCitySelect isOpenModal={isOpenModal} closeModal={closeModal} />
      )}
      <Footer />
    </div>
  );
};

export default MainContainer;
