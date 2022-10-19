import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import BaseButton from "../../components/BaseButton";
import ConfirmPopup from "../../components/ConfirmPopup";
import EmptyBlock from "../../components/EmptyBlock";
import FormCheckbox from "../../components/FormCheckbox";
import ModalAdmin from "../../components/modals/ModalAdmin";
import PageTitle from "../../components/PageTitle";
import { PencilIcon, TrashBinIcon } from "../../icons/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCities } from "../../store/types/Cities";
import { getVacancies } from "../../store/types/Vacancies";
import { IAdminFormItem, ICity } from "../../types";
import {
  addNotification,
  addSuccessNotification,
} from "../../utils/notifications";

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
        onClick={() =>
          navigate("/admin/vacancies", { state: { isOpenModal: true } })
        }
        modificator="admin-modal-btn add-list"
      />
    </div>
  );
};

type ICityData = {
  [key in keyof ICity]: IAdminFormItem;
};

const initCityData: ICityData = {
  city_name: {
    type: "string",
    value: "",
    placeholder: "Введите название города",
  },
  vacancies: {
    type: "select",
    value: [],
    list: [],
    placeholder: "Добавьте вакансии",
  },
  prev_city_name: {
    type: "hidden",
    value: "",
  },
};

const CitiesContainer = () => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);
  const vacancies = useAppSelector((state) => state.vacancies);

  const [formData, setFormData] = useState<ICityData>({
    ...initCityData,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
    setIsEditMode(false);
  };

  const openModal = (
    event?: React.MouseEvent<HTMLDivElement>,
    forModalData?: ICity
  ) => {
    event && event.stopPropagation();
    setIsOpenModal(true);
    if (forModalData) {
      const reduceRes = Object.keys(formData).reduce((acc, key) => {
        const cityValue = forModalData[key as keyof ICity];
        return {
          ...acc,
          [key]: {
            ...acc[key as keyof ICity],
            value: cityValue,
          },
        };
      }, formData);
      setIsEditMode(true);
      setFormData({
        ...reduceRes,
        prev_city_name: {
          ...reduceRes.prev_city_name,
          value: reduceRes.city_name.value,
        },
      });
    } else {
      setIsEditMode(false);
      setFormData({
        ...initCityData,
        vacancies: {
          ...initCityData.vacancies,
          list: vacancies.map(({ vacancy_name }) => vacancy_name),
        },
      });
    }
  };

  const deleteCity = async (city_name: string) => {
    try {
      await axiosClient.delete(`/api/city/${city_name}`);
      dispatch(getCities());
      addSuccessNotification("Запись удалена успешно");
    } catch (error) {
      addNotification({
        type: "danger",
        title: "Ошибка",
        message:
          (error as any)?.response?.data?.message ||
          `Возникла ошибка при удалении записи`,
      });
    }
  };

  const axiosMethod = async () => {
    try {
      const method = isEditMode ? "put" : "post";
      const data = Object.keys(formData).reduce((acc, field) => {
        const fieldData = formData[field as keyof ICity]?.value;
        return {
          ...acc,
          [field]: Array.isArray(fieldData) ? fieldData.join(",") : fieldData,
        };
      }, {});
      await axiosClient[method]("/api/city/", data);
      closeModal();
      dispatch(getCities());
      addSuccessNotification(
        `Запись ${isEditMode ? "изменена" : "создана"} успешно`
      );
    } catch (error) {
      addNotification({
        type: "danger",
        title: "Ошибка",
        message:
          (error as any)?.response?.data?.message ||
          `Возникла ошибка при ${
            isEditMode ? "редактировании" : "создании"
          } записи`,
      });
    }
  };

  useEffect(() => {
    dispatch(getCities());
    dispatch(getVacancies());
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      vacancies: {
        ...formData.vacancies,
        list: vacancies.map(({ vacancy_name }) => vacancy_name),
      },
    });
  }, [vacancies]);

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
          {Boolean(cities.length) ? (
            cities.map((city) => (
              <div className="data-list-item" key={city.city_name}>
                <Row justify="space-between">
                  <Col span={20}>
                    <p className="data-list-item__name">{city.city_name}</p>
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
                        <ConfirmPopup
                          confirm={() => deleteCity(city.city_name)}
                        >
                          <div>
                            <TrashBinIcon />
                          </div>
                        </ConfirmPopup>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <EmptyBlock description="Городов пока нет, но скоро появятся !" />
          )}
        </div>
      </div>
      <ModalAdmin
        title={`${isEditMode ? "Изменить" : "Добавить"} город`}
        isOpenModal={isOpenModal}
        isEditMode={isEditMode}
        formData={formData}
        axiosMethod={axiosMethod}
        closeModal={closeModal}
        setFormData={setFormData}
        renderSelectDropdown={SelectDropdown}
        renderSelectDropdownOption={SelectDropdownOption}
        onSelect
      />
    </div>
  );
};

export default CitiesContainer;
