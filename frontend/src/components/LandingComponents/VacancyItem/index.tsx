import { url } from "../../../consts";
import { IVacancy } from "../../../types";
import BaseButton from "../../BaseButton";
import "./styles.sass";

const VacancyItem = ({
  vacancy,
  openModalApplication,
}: {
  vacancy: IVacancy;
  openModalApplication: (vacancy: IVacancy) => void;
}) => {
  const { vacancy_name, photo_link, descriptions, salary } = vacancy;

  return (
    <div className="vacancy">
      <div className="vacancy-wrapper">
        <div className="vacancy-img">
          <img src={url + photo_link} alt="" />
        </div>
        <div className="vacancy-content">
          <div>
            <div className="title">{vacancy_name}</div>
            <div className="description">
              <ul className="description-list">
                {Boolean(descriptions.length) &&
                  descriptions.map((item, key) => (
                    <li key={key} className="description-item">
                      {item}
                    </li>
                  ))}
              </ul>
              <div className="description-salary">До {salary} руб.</div>
            </div>
          </div>
          <BaseButton
            title="Заполнить анкету"
            onClick={() => openModalApplication(vacancy)}
            modificator="vacancy-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default VacancyItem;
