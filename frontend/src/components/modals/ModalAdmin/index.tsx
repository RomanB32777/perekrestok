import { Col, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import ModalComponent from "../ModalComponent";
import FormInput from "../../FormInput";
import BaseButton from "../../BaseButton";
import SelectInput from "../../SelectInput";
import { IAdminFormItem } from "../../../types";
import UploadImage from "../../UploadImage";
import "./styles.sass";

// const formElements: { [type in adminFormItemTypes]: JSX.Element } = {
//   string:  <FormInput value="" />,
//   number:  <FormInput value="" />,
//   select:  <FormInput value="" />,
// };

interface IModalAdminData<T> {
  formData: T;
  onSelect?: boolean;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  renderSelectDropdown?: (
    menu: React.ReactElement,
    formData?: T,
    setFormData?: React.Dispatch<React.SetStateAction<T>>
  ) => JSX.Element;
  renderSelectDropdownOption?: (
    value: string,
    isSelected: boolean,
    formData?: T,
    setFormData?: React.Dispatch<React.SetStateAction<T>>
  ) => React.ReactNode;
}

interface IModalAdmin<T> extends IModalAdminData<T> {
  title: string;
  isOpenModal: boolean;
  isEditMode?: boolean;
  topModal?: boolean;
  closeModal: () => void;
  axiosMethod: () => Promise<any>;
}

interface IRenderFormComponent<T> extends IModalAdminData<T> {
  itemName: string;
  itemData: IAdminFormItem;
}

const renderFormComponent = <T extends { [key in keyof T]: IAdminFormItem }>({
  itemName,
  itemData,
  formData,
  onSelect,
  setFormData,
  renderSelectDropdown,
  renderSelectDropdownOption,
}: React.PropsWithChildren<IRenderFormComponent<T>>) => {
  const { type, value, placeholder, list } = itemData;

  const dropdownRender = renderSelectDropdown
    ? (menu: React.ReactElement) =>
        renderSelectDropdown(menu, formData, setFormData)
    : undefined;

  const optionRender = renderSelectDropdownOption
    ? (value: string, isSelected: boolean) =>
        renderSelectDropdownOption(value, isSelected, formData, setFormData)
    : undefined;

  const selectList = list
    ? list.map((item) => ({ key: item, value: item }))
    : [];

  const setSelectValue = onSelect
    ? (value: string | string[]) =>
        setFormData({
          ...formData,
          [itemName]: {
            ...formData[itemName as keyof T],
            value: value as string,
          },
        })
    : undefined;

  switch (type) {
    case "string":
      return (
        <FormInput
          value={value}
          placeholder={placeholder}
          setValue={(value) =>
            setFormData({
              ...formData,
              [itemName]: { ...formData[itemName as keyof T], value },
            })
          }
          modificator="admin-modal-element"
        />
      );
    case "number":
      return (
        <FormInput
          value={value}
          placeholder={placeholder}
          setValue={(value) =>
            setFormData({
              ...formData,
              [itemName]: { ...formData[itemName as keyof T], value },
            })
          }
          typeInput="number"
          modificator="admin-modal-element"
        />
      );
    case "select":
      return (
        <SelectInput
          value={value}
          placeholder={placeholder || ""}
          list={selectList}
          setValue={setSelectValue}
          dropdownRender={dropdownRender}
          renderOption={optionRender}
          modificator="admin-modal-element"
          dropdownClassName={`${itemName}-select-list`}
          dropdownRightAlign
          isTags
        />
      );
    case "upload":
      return (
        <UploadImage
          formats={["PNG", "JPG", "JPEG"]}
          filePreview={value.preview}
          setFile={({ preview, file }) =>
            setFormData({
              ...formData,
              [itemName]: {
                ...formData[itemName as keyof T],
                value: {
                  file,
                  preview,
                },
              },
            })
          }
        />
      );
  }
  // const FormComponent = formElements[itemType]
  // return <FormComponent />
};

const ModalAdmin = <T extends { [key in keyof T]: IAdminFormItem }>({
  title,
  formData,
  isOpenModal,
  isEditMode,
  topModal,
  onSelect,
  renderSelectDropdown,
  renderSelectDropdownOption,
  setFormData,
  axiosMethod,
  closeModal,
}: React.PropsWithChildren<IModalAdmin<T>>) => {
  return (
    <ModalComponent
      open={isOpenModal}
      title={title}
      onCancel={closeModal}
      modificator="admin-modal"
      width={930}
      topModal={topModal}
      closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
    >
      <Row gutter={[0, 18]} className="admin-modal-form" justify="start">
        {Object.keys(formData).map((item) => {
          const itemData = formData[item as keyof T];
          return (
            <Col span={24} key={item}>
              <Row justify="space-between">
                <Col span={12}>
                  <div className="form-element">
                    {renderFormComponent({
                      itemName: item,
                      itemData,
                      formData,
                      onSelect,
                      setFormData,
                      renderSelectDropdown,
                      renderSelectDropdownOption,
                    })}
                  </div>
                </Col>
              </Row>
            </Col>
          );
        })}
        <Row style={{ marginTop: 25 }}>
          <BaseButton
            title="Отменить"
            modificator="admin-modal-btn"
            onClick={closeModal}
            isBlack
          />
          <BaseButton
            title={isEditMode ? "Изменить" : "Добавить"}
            modificator="admin-modal-btn add-btn"
            onClick={() => axiosMethod()}
          />
        </Row>
      </Row>
    </ModalComponent>
  );
};

export default ModalAdmin;
