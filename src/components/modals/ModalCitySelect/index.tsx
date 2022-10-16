import { useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { NavigationIcon } from "../../../icons/icons";
import ModalApplication from "../ModalApplication";
import ModalComponent from "../ModalComponent";
import "./styles.sass";

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Брянск",
  "Москва",
  "Белгород",
  "Брянск",
  "Москва",
  "Белгород",
  "Брянск",
];

const ModalCitySelect = ({
  isOpenModal,
  closeModal,
}: {
  isOpenModal: boolean;
  closeModal: () => void;
}) => {
  const { isTablet } = useWindowDimensions();
  const [isOpenModalApplication, setIsOpenModalApplication] = useState(false);

  const selectCity = () => {
    closeModal();
    setIsOpenModalApplication(true);
  };

  const closeModalApplication = () => {
    setIsOpenModalApplication(false);
  };

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
            {cities.map((city, key) => (
              <div key={city + key} className="city-item" onClick={selectCity}>
                <div className="icon">
                  <NavigationIcon />
                </div>
                <p>{city}</p>
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
