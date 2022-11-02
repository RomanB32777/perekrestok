import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Row } from "antd";
import { useLocation, useSearchParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import BaseButton from "../../components/BaseButton";
import VacancyItem from "../../components/LandingComponents/VacancyItem";
import EmptyBlock from "../../components/EmptyBlock";
import Loader from "../../components/Loader";
import ApplicationForm from "../../components/LandingComponents/ApplicationForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { getQueryParams, scrollToElement } from "../../utils";
import { getVacancies } from "../../store/types/Vacancies";
import { filterVacancy, landingConts } from "../../consts";
import { IVacancy } from "../../types";
import banner from "../../assets/banner.png";
import worker from "../../assets/workers.jpg";
import "./styles.sass";

const LandingContainer = () => {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const vacanciesBlock = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { vacancies, cities, loading } = useAppSelector((state) => state);
  const { selected_city } = cities;

  const [selectedVacancy, setSelectedVacancy] = useState<IVacancy | null>(null);

  useEffect(() => {
    if (filterVacancy) selected_city && dispatch(getVacancies(selected_city));
    else dispatch(getVacancies());
  }, [selected_city]);

  useEffect(() => {
    hash && setTimeout(() => scrollToElement(hash), 500);
  }, [hash]);

  const queryParams = useMemo(
    () => getQueryParams(searchParams),
    [searchParams]
  );

  const { properties, steps, terms } = landingConts;

  return (
    <>
      <div className="landing">
        <div className="landing__banner">
          <div className="container landing__banner__container">
            <Row align="middle">
              <Col lg={10} xs={24}>
                <div className="landing__banner__content">
                  <h1 className="landing__banner__title">
                    Стань частью{" "}
                    <span className="green-back">нашей команды</span>
                  </h1>
                  <HashLink to={`${queryParams}#vacancies`} smooth>
                    <BaseButton
                      title="Открытые вакансии"
                      onClick={() => {}}
                      modificator="landing__banner__btn"
                    />
                  </HashLink>
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <div className="landing__banner__background">
                  <img src={banner} alt="banner" />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="landing__row-panel mainpage_properties">
          <div className="container">
            <p className="block-title">
              Наши сотрудники —{" "}
              <span className="green-back">самая большая</span>
              <span className="green-back">ценность</span> для нашей компании
            </p>
            <Row
              justify="space-between"
              className="landing__row-panel-properties"
              style={{
                width: "100%",
              }}
              gutter={[0, 18]}
            >
              {properties.map((property, key) => (
                <Col
                  lg={6}
                  sm={12}
                  xs={24}
                  key={"mainpage_properties_" + property.title}
                >
                  <div className="landing__row-panel_item">
                    <span className="icon">
                      <img
                        src={property.icon.img}
                        width={property.icon.width}
                        alt={`mainpage_properties_${key}`}
                      />
                    </span>
                    <p className="title">{property.title}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div className="landing__row-panel mainpage_steps">
          <div className="container">
            <p className="block-title">Три простых шага до новой работы</p>
            <Row justify="space-around" gutter={[0, 18]}>
              {steps.map((step, i) => (
                <Col
                  className="landing__row-panel_item"
                  key={"mainpage_steps_" + i}
                >
                  <span className="icon">{i + 1}</span>
                  <span className="title">{step.title}</span>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div className="landing__row-panel mainpage_terms">
          <div className="container">
            <p className="block-title mobile">
              Что мы <span className="green-back">предлагаем?</span>
            </p>
            <Row justify="space-around">
              <Col lg={{ span: 12, order: 0 }} xs={{ span: 24, order: 1 }}>
                <p className="block-title desktop">
                  Что мы <span className="green-back">предлагаем?</span>
                </p>
                <ul className="list">
                  {terms.map((i, key) => (
                    <li className="list-item" key={key}>
                      {i}
                    </li>
                  ))}
                </ul>
              </Col>
              <Col lg={10} xs={24}>
                <img src={worker} alt="" className="block-img" />
              </Col>
            </Row>
          </div>
        </div>

        <div className="landing__row-panel mainpage_vacancies" id="vacancies">
          {loading ? (
            <Loader size="big" />
          ) : (
            <div className="container">
              <p className="block-title">
                Открытые <span className="green-back">вакансии</span>
              </p>
              <div ref={vacanciesBlock}>
                {Boolean(vacancies.length) ? (
                  <Row gutter={[18, 18]}>
                    {vacancies.map((vacancy) => (
                      <Col xl={8} xs={24} key={vacancy.vacancy_id}>
                        <VacancyItem
                          vacancy={vacancy}
                          setSelectedVacancy={(vacancy: IVacancy) => {
                            setSelectedVacancy(vacancy);
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <EmptyBlock description="Вакансий пока нет, но скоро появятся !" />
                )}
              </div>
            </div>
          )}
        </div>
        <ApplicationForm selectedVacancy={selectedVacancy} />
      </div>
    </>
  );
};

export default LandingContainer;
