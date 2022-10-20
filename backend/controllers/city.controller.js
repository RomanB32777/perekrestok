const db = require("../db");

class CityController {
  async createCity(req, res) {
    try {
      const { city_name, vacancies } = req.body;
      const vacancies_list = vacancies.split(",");

      const newCity = await db.query(
        `INSERT INTO cities (city_name) values ($1) RETURNING *;`,
        [city_name]
      );

      const manyToManyValues = vacancies_list
        .map((vacancy) => `('${city_name}', '${vacancy}')`)
        .join(", ");

      await db.query(
        `INSERT INTO cities_vacancies (city_name, vacancy_name) VALUES ${manyToManyValues} RETURNING *;`
      );

      res.status(200).json(newCity.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async deleteCity(req, res) {
    try {
      const { city_name } = req.params;
      const deletedCity = await db.query(
        `DELETE FROM cities WHERE city_name = $1 RETURNING *;`,
        [city_name]
      );
      res.status(200).json(deletedCity.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async getCities(req, res) {
    try {
      const citiesQuery = await db.query(
        "SELECT * FROM cities ORDER BY created_at DESC"
      );

      const vacanciesQuery = await db.query(`
        SELECT c.city_name, v.vacancy_name
        FROM cities c
        LEFT JOIN cities_vacancies cv ON cv.city_name = c.city_name
        LEFT JOIN vacancies v ON v.vacancy_name = cv.vacancy_name
      `); // GROUP BY c.city_name, v.vacancy_name

      const vacancies = vacanciesQuery.rows.reduce(
        (acc, { city_name, vacancy_name }) => ({
          ...acc,
          [city_name]: acc[city_name]
            ? [...acc[city_name], vacancy_name]
            : [vacancy_name],
        }),
        {}
      );

      const emptyCities = Object.keys(vacancies).filter((city) =>
        vacancies[city].some((v) => !v)
      );

      if (emptyCities.length) {
        await db.query(
          `DELETE FROM cities WHERE city_name in (${emptyCities
            .map((v) => `'${v}'`)
            .join(", ")}) RETURNING *;`
        );
      }

      const cities = citiesQuery.rows
        .filter((city) => emptyCities.indexOf(city.city_name) < 0)
        .map((city) => ({
          ...city,
          vacancies: vacancies[city.city_name],
        }));

      res.status(200).json(cities);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async getCity(req, res) {
    try {
      const { city_name } = req.params;
      const city = await db.query("SELECT * FROM cities WHERE city_name = $1", [
        city_name,
      ]);
      res.status(200).json(city.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async editCity(req, res) {
    try {
      const { prev_city_name, city_name, vacancies } = req.body;
      const vacanciesSplit = vacancies.split(",");

      const editedCity = await db.query(
        `UPDATE cities SET city_name = $1 where city_name = $2 RETURNING *`,
        [city_name, prev_city_name]
      );

      const vacanciesQuery = await db.query(
        `
          SELECT v.vacancy_name
          FROM cities c
          LEFT JOIN cities_vacancies cv ON cv.city_name = c.city_name
          LEFT JOIN vacancies v ON v.vacancy_name = cv.vacancy_name
          where c.city_name = $1`,
        [city_name]
      );

      const vacanciesArr = vacanciesQuery.rows.map(
        ({ vacancy_name }) => vacancy_name
      );

      const newVacancies = vacanciesSplit.filter(
        (vacancy) => vacanciesArr.indexOf(vacancy) < 0
      );
      const deletedVacancies = vacanciesArr.filter(
        (vacancy) => vacanciesSplit.indexOf(vacancy) < 0
      );

      if (newVacancies.length) {
        const manyToManyValues = newVacancies
          .map((vacancy) => `('${city_name}', '${vacancy}')`)
          .join(", ");

        await db.query(
          `INSERT INTO cities_vacancies (city_name, vacancy_name) VALUES ${manyToManyValues} RETURNING *;`
        );
      }

      if (deletedVacancies.length) {
        await db.query(
          `DELETE FROM cities_vacancies WHERE city_name = $1 and vacancy_name in (${deletedVacancies
            .map((v) => `'${v}'`)
            .join(", ")}) RETURNING *;`,
          [city_name]
        );
      }

      res.status(200).json(editedCity.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }
}

module.exports = new CityController();
