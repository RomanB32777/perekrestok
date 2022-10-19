import { useEffect, useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { NavigationIcon } from "../../../icons/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCities, setSelectedCity } from "../../../store/types/Cities";
import ModalApplication from "../ModalApplication";
import ModalComponent from "../ModalComponent";
import "./styles.sass";

// const cities = [
//   "Москва",
//   "Санкт-Петербург",
//   "Брянск",
//   "Москва",
//   "Белгород",
//   "Брянск",
//   "Москва",
//   "Белгород",
//   "Брянск",
// ];

const ModalCitySelect = ({
  isOpenModal,
  closeModal,
}: {
  isOpenModal: boolean;
  closeModal: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);
  const { isTablet } = useWindowDimensions();
  const [isOpenModalApplication, setIsOpenModalApplication] = useState(false);

  const selectCity = (city_name: string) => {
    dispatch(setSelectedCity(city_name));
    closeModal();
    setIsOpenModalApplication(true);
  };

  const closeModalApplication = () => {
    setIsOpenModalApplication(false);
  };

  useEffect(() => {
    dispatch(getCities());
  }, []);

  return (
    <>
      <ModalComponent
        open={isOpenModal}
        title={
          <p className="modal-title">
            Выберите <span className="green-back">город</span>
          </p>
        }
        width={1024}
        centered={isTablet as boolean}
        onCancel={closeModal}
      >
        <div className="city-modal">
          <div className="city-list">
            {cities.map(({ city_name }) => (
              <div
                key={city_name}
                className="city-item"
                onClick={() => selectCity(city_name)}
              >
                <div className="icon">
                  <NavigationIcon />
                </div>
                <p>{city_name}</p>
              </div>
            ))}
          </div>
        </div>
      </ModalComponent>
      <ModalApplication
        isOpenModal={isOpenModalApplication}
        closeModal={closeModalApplication}
      />
    </>
  );
};

export default ModalCitySelect;
