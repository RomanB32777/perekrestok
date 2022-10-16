import { useState } from "react";
import { Col, Row } from "antd";
import { CountryPhoneInputValue } from "antd-country-phone-input";
import ModalComponent from "../ModalComponent";
import FormInput from "../../FormInput";
import BaseButton from "../../BaseButton";
import SelectInput from "../../SelectInput";
import { countries } from "../../../consts";
import FormDatePicker from "../../FormDatePicker";
import PhoneInput from "../../PhoneInput";
import FormCheckbox from "../../FormCheckbox";
import "./styles.sass";
import { useNavigate } from "react-router-dom";

const vacancies = ["Сборщик заказов", "Продавец-кассир", "Уборщик"];

interface IApplicationData {
  name: string;
  second_name: string;
  phone: CountryPhoneInputValue;
  country: string;
  date_birthday: string;
  vacancy: string;
  agreement: boolean;
}

const initApplicationData: IApplicationData = {
  name: "",
  second_name: "",
  phone: {
    code: 7,
    phone: "+7",
    short: "RU",
  },
  country: "Российская Федерация",
  date_birthday: "",
  vacancy: "",
  agreement: false,
};

const ModalApplication = ({
  isOpenModal,
  closeModal,
}: {
  isOpenModal: boolean;
  closeModal: () => void;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IApplicationData>({
    ...initApplicationData,
  });

  const goToTermsPage = () => {
    closeModal();
    navigate("terms");
  };

  const { name, second_name, phone, country, vacancy, agreement } = formData;

  return (
    <ModalComponent
      open={isOpenModal}
      title=""
      onCancel={closeModal}
      modificator="application-modificator"
      width={1280}
      topModal
    >
      <div className="application-modal">
        <h1 className="application-title">
          Заполните <span className="green-back">заявку</span> и мы вам
          перезвоним!
        </h1>
        <Row
          gutter={[0, 18]}
          className="application-modal-form"
          justify="start"
        >
          <Col span={24}>
            <div className="form-element">
              <FormInput
                value={name}
                placeholder="Имя"
                setValue={(value) => setFormData({ ...formData, name: value })}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="form-element">
              <FormInput
                value={second_name}
                placeholder="Фамилия"
                setValue={(value) =>
                  setFormData({ ...formData, second_name: value })
                }
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="form-element">
              <PhoneInput
                value={phone}
                setValue={(val) =>
                  setFormData({
                    ...formData,
                    phone: val,
                  })
                }
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="form-element">
              <SelectInput
                placeholder="Страна"
                list={countries.map((c) => ({ key: c, value: c }))}
                value={country}
                setValue={(value) =>
                  setFormData({
                    ...formData,
                    country: value as string,
                  })
                }
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="form-element">
              <FormDatePicker
                setValue={(val) =>
                  setFormData({
                    ...formData,
                    date_birthday: val,
                  })
                }
                placeholder="Дата рождения"
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="form-element">
              <SelectInput
                placeholder="Вакансия"
                list={vacancies.map((v) => ({ key: v, value: v }))}
                value={vacancy}
                setValue={(value) =>
                  setFormData({
                    ...formData,
                    vacancy: value as string,
                  })
                }
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="form-element">
              <FormCheckbox
                checked={agreement}
                setValue={(value) =>
                  setFormData({
                    ...formData,
                    agreement: value,
                  })
                }
                label={
                  <>
                    Даю согласие на обработку{" "}
                    <span className="terms-link" onClick={goToTermsPage}>
                      персональных данных
                    </span>
                  </>
                }
              />
            </div>
          </Col>

          <BaseButton
            title="Отправить заявку"
            modificator="application-btn"
            onClick={() => console.log(formData)}
          />
        </Row>
      </div>
    </ModalComponent>
  );
};

export default ModalApplication;
