import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { CountryPhoneInputValue } from "antd-country-phone-input";
import ModalComponent from "../ModalComponent";
import FormInput from "../../FormInput";
import BaseButton from "../../BaseButton";
import SelectInput from "../../SelectInput";
import { authToken, countries } from "../../../consts";
import FormDatePicker from "../../FormDatePicker";
import PhoneInput from "../../PhoneInput";
import FormCheckbox from "../../FormCheckbox";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import axios from "axios";
import { IVacancy } from "../../../types";
import {
  addNotification,
  addSuccessNotification,
} from "../../../utils/notifications";
import "./styles.sass";

interface IApplicationData {
  name: string;
  second_name: string;
  phone: CountryPhoneInputValue;
  country: string;
  date_birthday: moment.Moment | undefined;
  vacancy: string;
  agreement: boolean;
}

const initApplicationData: IApplicationData = {
  name: "",
  second_name: "",
  phone: {
    code: 7,
    phone: "",
    short: "RU",
  },
  country: "Российская Федерация",
  date_birthday: undefined,
  vacancy: "",
  agreement: false,
};

const ModalApplication = ({
  isOpenModal,
  selectedVacancy,
  closeModal,
}: {
  isOpenModal: boolean;
  selectedVacancy: IVacancy | null;
  closeModal: () => void;
}) => {
  const vacancies = useAppSelector((state) => state.vacancies);
  const { selected_city } = useAppSelector((state) => state.cities);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<IApplicationData>({
    ...initApplicationData,
  });

  const closeApplicationModal = () => {
    closeModal();
    setFormData({ ...initApplicationData });
  };

  const goToTermsPage = () => {
    closeApplicationModal();
    navigate("terms");
  };

  const createCandidate = async () => {
    try {
      const { name, second_name, phone, vacancy, date_birthday } = formData;
      const findVacancy = vacancies.find(
        ({ vacancy_name }) => vacancy_name === vacancy
      );

      const isValidate = Object.values(formData).every(val => Boolean(val))
      
      if (findVacancy && isValidate) {
        const date = date_birthday?.toISOString(); // moment.utc(date_birthday, "DD/MM/YYYY").toISOString();
        const response = await fetch(
          "https://api.skillaz.ru/open-api/objects/candidates",
          {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
              VacancyId: findVacancy.vacancy_id,
              FirstName: name,
              LastName: second_name,
              Source: "Unknown",
              AddWay: "Unknown",
              PhoneNumber: phone.phone,
              BirthDate: date,
              CommonCandidateInfo: {
                City: selected_city,
                Country: country,
              },
            }),
          }
        );
        const result = await response.json();

        if (result.IsOk) {
          addSuccessNotification(
            `Ваша заявка принята! Номер кандидата - ${result.CandidateId}`
          );
          closeApplicationModal();
        } else {
          addNotification({
            type: "danger",
            title: "Ошибка",
            message: "Возникла ошибка при создании заявки",
          });
        }
      } else {
        addNotification({
          type: "warning",
          title: "Не все поля заполнены",
        });
      }
    } catch (error) {
      console.log((error as any)?.response);

      addNotification({
        type: "danger",
        title: "Ошибка",
        message:
          ((error as any)?.response?.data?.errors &&
            Object.keys((error as any)?.response?.data?.errors).map((err) => (
              <p style={{ margin: "5px 0" }}>
                {(error as any)?.response?.data?.errors[err]}
              </p>
            ))) ||
          (error as any)?.response?.data?.Detail ||
          `Возникла ошибка при создании заявки`,
      });
    }
  };

  useEffect(() => {
    isOpenModal && selectedVacancy &&
      setFormData({ ...formData, vacancy: selectedVacancy.vacancy_name });
  }, [selectedVacancy, isOpenModal]);

  const {
    name,
    second_name,
    phone,
    country,
    vacancy,
    date_birthday,
    agreement,
  } = formData;

  return (
    <ModalComponent
      open={isOpenModal}
      title=""
      onCancel={closeApplicationModal}
      modificator="application-modificator"
      width={1280}
      topModal
    >
      <div className="application-modal">
        <h1 className="application-title">
          Заполните <span className="green-back">заявку</span> и мы вам
          перезвоним!
        </h1>
        {/* <Form
          form={form}
          name="register"
          onFinish={createCandidate}
          scrollToFirstError
          layout="vertical"
        >
        const [form] = Form.useForm();
        </Form> */}
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
                value={date_birthday}
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
                list={vacancies.map(({ vacancy_name }) => ({
                  key: vacancy_name,
                  value: vacancy_name,
                }))}
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
            onClick={createCandidate}
          />
        </Row>
      </div>
    </ModalComponent>
  );
};

export default ModalApplication;
