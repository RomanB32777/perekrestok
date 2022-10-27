import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountryPhoneInputValue } from "antd-country-phone-input";
import moment from "moment";

import ModalComponent, { NotificationModalComponent } from "../ModalComponent";
import FormInput from "../../FormInput";
import BaseButton from "../../BaseButton";
import SelectInput from "../../SelectInput";
import FormDatePicker from "../../FormDatePicker";
import PhoneInput from "../../PhoneInput";
import FormCheckbox from "../../FormCheckbox";

import { useAppSelector } from "../../../store/hooks";
import { addNotification } from "../../../utils/notifications";
import { IVacancy } from "../../../types";
import { baseURL } from "../../../axiosClient";
import { authToken, countries, filterVacancy } from "../../../consts";
import cities from "./cities.json";

import "./styles.sass";

interface IApplicationData {
  name: string;
  second_name: string;
  phone: CountryPhoneInputValue;
  country: string;
  city?: string;
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
  city: "",
  country: "",
  date_birthday: undefined,
  vacancy: "",
  agreement: false,
};

interface INotificationModal {
  isOpen: boolean;
  message: React.ReactNode;
}

const initNotificationModal: INotificationModal = {
  isOpen: false,
  message: "",
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
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<IApplicationData>({
    ...initApplicationData,
  });
  const [notificationModalState, setNotificationModalState] =
    useState<INotificationModal>(initNotificationModal);
  const [existError, setExistError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeApplicationModal = () => {
    closeModal();
    setFormData({ ...initApplicationData });
    setNotificationModalState({ ...initNotificationModal });
  };

  const openErrorModal = (message: React.ReactNode) => {
    setExistError(true);
    setNotificationModalState({
      isOpen: true,
      message,
    });
  };

  const closeNotificationModal = () => {
    setNotificationModalState({ ...initNotificationModal });
    !existError && closeApplicationModal();
  };

  const goToTermsPage = () => {
    closeApplicationModal();
    navigate("terms");
  };

  const createCandidate = async () => {
    try {
      setLoading(true);
      setExistError(false);
      // const { name, second_name, phone, country, city, vacancy, date_birthday } = formData;
      const findVacancy = vacancies.find(
        ({ vacancy_name }) => vacancy_name === vacancy
      );

      const isValidate = Object.values({
        ...formData,
        city: city || selected_city,
      }).every((val) => Boolean(val));

      if (findVacancy && isValidate) {
        const date = date_birthday?.toISOString(); // moment.utc(date_birthday, "DD/MM/YYYY").toISOString();
        const response = await fetch(
          `${baseURL}/proxy/open-api/objects/candidates`, //  "http://localhost:8010/proxy/open-api/objects/candidates"
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
              Source: "Other",
              SfSource: "66",
              AddWay: "manual",
              PhoneNumber: phone.phone,
              BirthDate: date,
              CommonCandidateInfo: {
                City: city || selected_city,
                Country: country,
              },
              UtmSource: searchParams.get("utm_source") || "",
              UtmMedium: searchParams.get("utm_medium") || "",
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          if (result.IsOk) {
            setNotificationModalState({
              isOpen: true,
              message:
                "Ваша заявка успешно отправлена! В ближайшее время с вами свяжутся наши специалисты",
            });
          } else {
            openErrorModal("Возникла ошибка при создании заявки");
          }
        } else {
          openErrorModal(
            (result.errors &&
              Object.keys(result.errors).map((err, index) => (
                <p key={index} style={{ margin: "5px 0" }}>
                  {result.errors[err]}
                </p>
              ))) ||
              result.Detail ||
              "Возникла ошибка при создании заявки"
          );
        }
      } else {
        addNotification({
          type: "warning",
          title: "Не все поля заполнены",
        });
      }
    } catch (error) {
      openErrorModal(
        (error as any).message || "Возникла ошибка при создании заявки"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      selectedVacancy &&
        setFormData({ ...formData, vacancy: selectedVacancy.vacancy_name });

      // !filterVacancy && dispatch(getCities());
    }
  }, [selectedVacancy, isOpenModal]);

  const {
    name,
    second_name,
    phone,
    country,
    city,
    vacancy,
    date_birthday,
    agreement,
  } = formData;

  return (
    <>
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
                  setValue={(value) =>
                    setFormData({ ...formData, name: value })
                  }
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
                  placeholder="Гражданство"
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

            {!filterVacancy && (
              <Col span={24}>
                <div className="form-element">
                  <SelectInput
                    showSearch
                    placeholder="Город"
                    list={cities.sort().map(({ city, region }) => ({
                      key: `${city} - ${region}`,
                      value: `${city} - ${region}`,
                    }))}
                    value={city || ""}
                    setValue={(value) =>
                      setFormData({
                        ...formData,
                        city: value as string,
                      })
                    }
                    modificator="city-select"
                  />
                </div>
              </Col>
            )}

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
                  maxDate={moment().set("year", moment().get("year") - 18)}
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
              disabled={loading}
            />
          </Row>
        </div>
      </ModalComponent>
      <NotificationModalComponent
        open={notificationModalState.isOpen}
        onClose={closeNotificationModal}
        message={notificationModalState.message}
        existError={existError}
        showDurationPopup={3000}
      />
    </>
  );
};

export default ModalApplication;
