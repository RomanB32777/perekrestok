import { Col, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import ConfirmPopup from "../../components/ConfirmPopup";
import FormCheckbox from "../../components/FormCheckbox";
import ModalAdmin from "../../components/modals/ModalAdmin";
import PageTitle from "../../components/PageTitle";
import { PencilIcon, TrashBinIcon } from "../../icons/icons";
import { IAdminFormItem, IAdminValueItem } from "../../types";

import "./styles.sass";

const SelectDropdownOption = (value: string, isSelected: boolean) => (
  <div
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <FormCheckbox label={value} checked={isSelected} />
  </div>
);

const SelectDropdown = (menu: React.ReactElement) => {
  const navigate = useNavigate();
  return (
    <div className="cities-select-dropdown">
      <div>{menu}</div>
      <BaseButton
        title="Добавить"
        onClick={() => navigate("/admin/vacancies", { state: { isOpenModal: true } })}
        modificator="admin-modal-btn add-list"
      />
    </div>
  );
};

type ICityData = {
  name: IAdminFormItem;
  cityVacancies: IAdminFormItem;
};

type ICityItemData = {
  [key in keyof ICityData]: IAdminValueItem;
};

const initCityData: ICityData = {
  name: {
    type: "string",
    value: "",
    placeholder: "Введите название города",
  },
  cityVacancies: {
    type: "select",
    value: [],
    list: ["Продавец-кассир", "Продавец", "кассир", "ХУЙЛО"],
    placeholder: "Добавьте вакансии",
  },
};

const CitiesContainer = () => {
  const [formData, setFormData] = useState<ICityData>({
    ...initCityData,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [citiesList, setCitisList] = useState<ICityItemData[]>([
    {
      name: {
        value: "Moscow",
      },
      cityVacancies: {
        value: ["Продавец-кассир"],
        list: ["Продавец-кассир", "Продавец", "кассир", "ХУЙЛО"],
      },
    },
  ]);

  const closeModal = () => {
    setIsOpenModal(false);
    setIsEditMode(false);
  };

  const openModal = (
    event?: React.MouseEvent<HTMLDivElement>,
    forModalData?: ICityItemData
  ) => {
    event && event.stopPropagation();
    setIsOpenModal(true);
    if (forModalData) {
      const reduceRes = Object.keys(formData).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            ...acc[key as keyof ICityData],
            ...forModalData[key as keyof ICityData],
          },
        }),
        formData
      );
      setIsEditMode(true);
      setFormData(reduceRes);
    } else {
      setIsEditMode(false);
      setFormData(initCityData);
    }
  };

  // const isEditMode = useMemo(
  //   () =>
  //     !isOpenModal && Object.values(formData).some(({ value }) => value.length),
  //   [isOpenModal, formData]
  // );

  return (
    <div className="cities-page">
      <div className="container cities-container">
        <div className="cities-page-header">
          <Row justify="space-between">
            <Col>
              <PageTitle title="Активные города" />
            </Col>
            <Col>
              <BaseButton
                title="Добавить город"
                onClick={openModal}
                modificator="add-btn"
              />
            </Col>
          </Row>
        </div>
        <div className="data-list">
          {Boolean(citiesList.length) &&
            citiesList.map((city) => (
              <div className="data-list-item" key={city.name.value}>
                <Row justify="space-between">
                  <Col span={20}>
                    <p className="data-list-item__name">{city.name.value}</p>
                  </Col>
                  <Col span={3}>
                    <div className="data-list-item__btns">
                      <div
                        className="data-item__btn"
                        onClick={(e) => openModal(e, city)}
                        style={{ marginRight: 10 }}
                      >
                        <PencilIcon />
                      </div>
                      <div
                        className="data-item__btn"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                          e.stopPropagation()
                        }
                      >
                        <ConfirmPopup confirm={() => {}}>
                          <div>
                            <TrashBinIcon />
                          </div>
                        </ConfirmPopup>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
        </div>
      </div>
      <ModalAdmin
        title={`${isEditMode ? "Изменить" : "Добавить"} город`}
        isOpenModal={isOpenModal}
        isEditMode={isEditMode}
        formData={formData}
        closeModal={closeModal}
        setFormData={setFormData}
        renderSelectDropdown={SelectDropdown}
        renderSelectDropdownOption={SelectDropdownOption}
      />
    </div>
  );
};

export default CitiesContainer;
