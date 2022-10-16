import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import BaseButton from "../../components/BaseButton";
import VacancyItem from "../../components/LandingComponents/VacancyItem";

import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import banner from "../../assets/banner.png";
import worker from "../../assets/worker.png";

import "./styles.sass";

const steps = [
  {
    title: "Выберите одну из вакансий на этой странице",
  },
  {
    title:
      "Оставьте свои контактные данные и после обработки анкеты мы вам перезвоним",
  },
  {
    title: "Выберите удобную торговую точку и приходите на собеседование",
  },
];

const properties = [
  {
    icon: { img: icon1, width: 63 },
    title: "В нашей сети уже более 850 магазинов, и мы постоянно растём!",
  },
  {
    icon: { img: icon2, width: 93, },
    title:
      "Мы создаем сильную команду из активных и целеустремлённых сотрудников!",
  },
  {
    icon: { img: icon3, width: 73 },
    title: "Мы мотивируем двигаться вперёд и развиваться вместе!",
  },
  {
    icon: { img: icon4, width: 62 },
    title: "У нас дружный коллектив, гибкий график и удобное месторасположение",
  },
];

const terms = [
  "Работа рядом с домом. Можете выбрать ближайший супермаркет",
  "Гибкий график работы: 5/2, 2/2 и другие",
  "Официальное оформление по ТК РФ с 1-го рабочего дня + соц. пакет",
  "Белая заработная плата, выплата 2 раза в месяц",
  "Ежемесячные премии-надбавки",
  "Возможность карьерного роста",
  "Премии и призы по результатам профессиональных и творческих конкурсов",
  "Корпоративная скидка в магазинах сети до 10% («Пятерочка», «Перекресток», «Карусель»)",
];

const LandingContainer = () => {
  return (
    <>
      <div className="landing">
        <div className="landing__banner">
          <div className="container landing__banner__container">
            <Row align="middle">
              <Col lg={10} xs={24}>
                <div className="landing__banner__content">
                  <h1 className="landing__banner__title">
                    Работа в <span className="green-back">Перекрестке</span>
                  </h1>
                  <p className="landing__banner__subtitle">
                    Уверенность в будущем!
                  </p>
                  <Link to="/login">login</Link>{" "}
                  <Link to="/admin/cities">admin</Link>
                  <HashLink to="#vacancies" smooth>
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
            <Row justify="space-around">
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
          <div className="container">
            <p className="block-title">
              Открытые <span className="green-back">вакансии</span>
            </p>
            <Row justify="space-around" gutter={[18, 18]}>
              <Col lg={8} xs={24}>
                <VacancyItem />
              </Col>
              <Col lg={8} xs={24}>
                <VacancyItem />
              </Col>
              <Col lg={8} xs={24}>
                <VacancyItem />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingContainer;
