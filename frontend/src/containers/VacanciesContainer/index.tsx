import { Col, Input, InputRef, Row, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import BaseButton from "../../components/BaseButton";
import ConfirmPopup from "../../components/ConfirmPopup";
import ModalAdmin from "../../components/modals/ModalAdmin";
import PageTitle from "../../components/PageTitle";
import EmptyBlock from "../../components/EmptyBlock";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axiosClient from "../../axiosClient";
import { getVacancies } from "../../store/types/Vacancies";
import {
  addNotification,
  addSuccessNotification,
} from "../../utils/notifications";
import { IAdminFormItem, IVacancy } from "../../types";
import { CrossIcon, PencilIcon, TrashBinIcon } from "../../icons/icons";

import "./styles.sass";
import Loader from "../../components/Loader";

type IVacancyData = {
  [key in keyof IVacancy]: IAdminFormItem;
};

const SelectDropdownOption = (
  value: string,
  isSelected: boolean,
  formData?: IVacancyData,
  setFormData?: (value: React.SetStateAction<IVacancyData>) => void
) => {
  const removeItem = () => {
    if (setFormData && formData) {
      const descriptions = formData.descriptions;
      const values = descriptions.value.filter(
        (name: string) => name !== value
      );
      setFormData({
        ...formData,
        descriptions: {
          ...descriptions,
          value: [...values],
          list: [...values],
        },
      });
    }
  };

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="descriptions-modal-item"
    >
      <p>{value}</p>
      <BaseButton
        icon={<CrossIcon />}
        onClick={removeItem}
        modificator="descriptions-modal-btn"
      />
    </div>
  );
};

const SelectDropdown = (
  menu: React.ReactElement,
  formData?: IVacancyData,
  setFormData?: (value: React.SetStateAction<IVacancyData>) => void
) => {
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (event?: React.MouseEvent<HTMLDivElement>) => {
    event && event.preventDefault();
    if (setFormData && formData) {
      const descriptions = formData.descriptions;
      setFormData({
        ...formData,
        descriptions: {
          ...descriptions,
          value: [...descriptions.value, name],
          list: [...descriptions.value, name],
        },
      });
    }
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="descriptions-select-dropdown">
      <div>{menu}</div>
      <Space style={{ padding: "0 8px 4px" }}>
        <BaseButton
          onClick={addItem}
          modificator="descriptions-modal-btn"
          icon={<PlusOutlined />}
        />
        <Input
          placeholder="Добавить обязанность"
          bordered={false}
          ref={inputRef}
          value={name}
          onChange={onNameChange}
        />
      </Space>
    </div>
  );
};

const initVacancyData: IVacancyData = {
  photo_link: {
    type: "upload",
    value: {
      preview: "",
      file: null,
    },
  },
  vacancy_name: {
    type: "string",
    value: "",
    placeholder: "Введите название вакансии",
  },
  vacancy_id: {
    type: "string",
    value: "",
    placeholder: "Введите id вакансии",
  },
  descriptions: {
    type: "select",
    value: [],
    list: [],
    placeholder: "Добавьте описание",
  },
  salary: {
    type: "number",
    value: "",
    placeholder: "ЗП, сумма до",
  },
  prev_vacancy_name: {
    type: "hidden",
    value: "",
  },
};

const VacanciesContainer = () => {
  const dispatch = useAppDispatch();
  const vacancies = useAppSelector((state) => state.vacancies);
  const loading = useAppSelector((state) => state.loading);

  const { state } = useLocation();

  const [formData, setFormData] = useState<IVacancyData>({
    ...initVacancyData,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
    setIsEditMode(false);
  };

  const openModal = (
    event?: React.MouseEvent<HTMLDivElement>,
    forModalData?: IVacancy
  ) => {
    event && event.stopPropagation();
    setIsOpenModal(true);
    if (forModalData) {
      const reduceRes = Object.keys(formData).reduce((acc, key) => {
        const vacancyValue = forModalData[key as keyof IVacancy];
        return {
          ...acc,
          [key]: {
            ...acc[key as keyof IVacancyData],
            value: vacancyValue,
            list: Array.isArray(vacancyValue) ? vacancyValue : null,
          },
        };
      }, formData);
      setIsEditMode(true);
      setFormData({
        ...reduceRes,
        prev_vacancy_name: {
          ...reduceRes.prev_vacancy_name,
          value: reduceRes.vacancy_name.value,
        },
      });
    } else {
      setIsEditMode(false);
      setFormData(initVacancyData);
    }
  };

  const deleteVacancy = async (vacancy_name: string) => {
    try {
      await axiosClient.delete("/api/vacancy/" + vacancy_name);
      dispatch(getVacancies());
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
      const dataFileds = Object.keys(formData)
        .filter((field) => (field as keyof IVacancy) !== "photo_link")
        .reduce((acc, field) => {
          const fieldData = formData[field as keyof IVacancy]?.value;
          return {
            ...acc,
            [field]: Array.isArray(fieldData) ? fieldData.join(",") : fieldData,
          };
        }, {});

      const data = new FormData();
      data.append("file", formData.photo_link.value?.file);
      data.append("fields", JSON.stringify(dataFileds));
      await axiosClient[method]("/api/vacancy/", data);

      closeModal();
      dispatch(getVacancies());
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
    if (state) {
      const { isOpenModal } = state;
      if (isOpenModal) {
        setIsOpenModal(isOpenModal);
        setIsEditMode(!isOpenModal);
      }
    }
  }, [state]);

  useEffect(() => {
    dispatch(getVacancies());
  }, []);

  return (
    <div className="vacancies-page">
      <div className="container vacancies-container">
        <div className="vacancies-page-header">
          <Row justify="space-between">
            <Col>
              <PageTitle title="Активные вакансии" />
            </Col>
            <Col>
              <BaseButton
                title="Добавить вакансию"
                onClick={openModal}
                modificator="add-btn"
              />
            </Col>
          </Row>
        </div>
        {loading ? (
          <Loader size="big" />
        ) : (
          <div className="data-list">
            {Boolean(vacancies.length) ? (
              vacancies.map((vacancy) => (
                <div className="data-list-item" key={vacancy.vacancy_name}>
                  <Row justify="space-between">
                    <Col span={20}>
                      <p className="data-list-item__name">
                        {vacancy.vacancy_name}
                      </p>
                    </Col>
                    <Col span={3}>
                      <div className="data-list-item__btns">
                        <div
                          className="data-item__btn"
                          onClick={(e) => openModal(e, vacancy)}
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
                            confirm={() => deleteVacancy(vacancy.vacancy_name)}
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
              <EmptyBlock description="Вакансий пока нет, но скоро появятся !" />
            )}
          </div>
        )}
      </div>
      <ModalAdmin
        title={`${isEditMode ? "Изменить" : "Добавить"} вакансию`}
        isOpenModal={isOpenModal}
        isEditMode={isEditMode}
        formData={formData}
        axiosMethod={axiosMethod}
        closeModal={closeModal}
        setFormData={setFormData}
        renderSelectDropdown={SelectDropdown}
        renderSelectDropdownOption={SelectDropdownOption}
        topModal
      />
    </div>
  );
};

export default VacanciesContainer;
