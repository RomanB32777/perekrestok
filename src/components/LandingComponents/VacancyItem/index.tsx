import { useState } from "react";
import BaseButton from "../../BaseButton";
import ModalApplication from "../../modals/ModalApplication";
import "./styles.sass";

const VacancyItem = () => {
  const [isOpenModalApplication, setIsOpenModalApplication] = useState(false);

  const openModalApplication = () => {
    setIsOpenModalApplication(true);
  };

  const closeModalApplication = () => {
    setIsOpenModalApplication(false);
  };
  return (
    <div>
      <div className="vacancy">
        <div className="vacancy-img">
          <img src="" alt="" />
        </div>
        <div className="vacancy-content">
          <div className="title">Сборщик заказов</div>
          <div className="description">
            <ul className="description-list">
              <li className="description-item">
                Сбор заказов и передача заказов в зону ожидания курьера
              </li>
              <li className="description-item">
                Отбор товаров согласно инструкции «Сборка заказов»
              </li>
              <li className="description-item">
                Производить выкладку товара в зале
              </li>
              <li className="description-item">
                Сбор заказов и передача заказов в зону ожидания курьера
              </li>
            </ul>
            <div className="description-salary">До 30,000 руб.</div>
          </div>
          <BaseButton
            title="Заполнить анкету"
            onClick={openModalApplication}
            modificator="vacancy-btn"
          />
        </div>
      </div>
      <ModalApplication
        isOpenModal={isOpenModalApplication}
        closeModal={closeModalApplication}
      />
    </div>
  );
};

export default VacancyItem;
