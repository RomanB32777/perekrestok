create TABLE cities(
    city_name VARCHAR(255) DEFAULT '' PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT Now() 
);

create TABLE vacancies(
    vacancy_name VARCHAR(512) DEFAULT '' PRIMARY KEY,
    photo_link VARCHAR(255) DEFAULT '',
    descriptions VARCHAR DEFAULT '',
    salary VARCHAR DEFAULT '',
    vacancy_id VARCHAR(30) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT Now() 
);

CREATE TABLE cities_vacancies
(
    id BIGSERIAL PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL REFERENCES cities ON DELETE CASCADE ON UPDATE CASCADE,
    vacancy_name VARCHAR(512) NOT NULL REFERENCES vacancies ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (city_name, vacancy_name)
);