import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BaseButton from "../../BaseButton";
import { IVacancy } from "../../../types";
import { getQueryParams } from "../../../utils";
import { url } from "../../../consts";
import "./styles.sass";
import { HashLink } from "react-router-hash-link";

const VacancyItem = ({
  vacancy,
  setSelectedVacancy,
}: {
  vacancy: IVacancy;
  setSelectedVacancy: (vacancy: IVacancy) => void;
}) => {
  const [searchParams] = useSearchParams();

  const queryParams = useMemo(
    () => getQueryParams(searchParams),
    [searchParams]
  );

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
              <div className="description-salary">{salary}</div>
            </div>
          </div>
          <HashLink to={`${queryParams}#application`} smooth>
            <BaseButton
              title="Заполнить анкету"
              onClick={() => setSelectedVacancy(vacancy)}
              modificator="vacancy-btn"
            />
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default VacancyItem;
