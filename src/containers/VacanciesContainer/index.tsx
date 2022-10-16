import { Col, Input, InputRef, Row, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import ConfirmPopup from "../../components/ConfirmPopup";
import ModalAdmin from "../../components/modals/ModalAdmin";
import PageTitle from "../../components/PageTitle";
import { CrossIcon, PencilIcon, TrashBinIcon } from "../../icons/icons";
import { PlusOutlined } from "@ant-design/icons";
import { IAdminFormItem, IAdminValueItem } from "../../types";

import "./styles.sass";

type IVacancyData = {
  photo: IAdminFormItem;
  name: IAdminFormItem;
  descriptions: IAdminFormItem;
  salary: IAdminFormItem;
};

type IVacancyItemData = {
  [key in keyof IVacancyData]: IAdminValueItem;
};

const SelectDropdownOption = (value: string, isSelected: boolean) => (
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
      onClick={() => {}}
      modificator="descriptions-modal-btn"
    />
  </div>
);

const SelectDropdown = (menu: React.ReactElement) => {
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (event?: React.MouseEvent<HTMLDivElement>) => {
    event && event.preventDefault();
    // setItems([...items, name || `New item ${index++}`]);
    setName('');
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
  photo: {
    type: "upload",
    value: {
      preview: "",
      file: null,
    },
  },
  name: {
    type: "string",
    value: "",
    placeholder: "Введите название вакансии",
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
};

const VacanciesContainer = () => {
  const { state } = useLocation();

  const [formData, setFormData] = useState<IVacancyData>({
    ...initVacancyData,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vacanciesList, setVacanciesList] = useState<IVacancyItemData[]>([
    {
      photo: {
        value: "",
      },
      name: {
        value: "Продавец-кассир",
      },
      descriptions: {
        value: ["Обязанность 1", "Обязанность 2"],
        list: ["Обязанность 1", "Обязанность 2"],
      },
      salary: {
        value: "0",
      },
    },
  ]);

  const closeModal = () => {
    setIsOpenModal(false);
    setIsEditMode(false);
  };

  const openModal = (
    event?: React.MouseEvent<HTMLDivElement>,
    forModalData?: IVacancyItemData
  ) => {
    event && event.stopPropagation();
    setIsOpenModal(true);
    if (forModalData) {
      const reduceRes = Object.keys(formData).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            ...acc[key as keyof IVacancyData],
            ...forModalData[key as keyof IVacancyData],
          },
        }),
        formData
      );
      setIsEditMode(true);
      setFormData(reduceRes);
    } else {
      setIsEditMode(false);
      setFormData(initVacancyData);
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
        <div className="data-list">
          {Boolean(vacanciesList.length) &&
            vacanciesList.map((vacancy) => (
              <div className="data-list-item" key={vacancy.name.value}>
                <Row justify="space-between">
                  <Col span={20}>
                    <p className="data-list-item__name">{vacancy.name.value}</p>
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
        title={`${isEditMode ? "Изменить" : "Добавить"} вакансию`}
        isOpenModal={isOpenModal}
        isEditMode={isEditMode}
        formData={formData}
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
