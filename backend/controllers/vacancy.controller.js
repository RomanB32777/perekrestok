const db = require("../db");
const getRandomStr = require("../utils");

class VacancyController {
  async createVacancy(req, res) {
    try {
      const { file } = req.files;
      const { fields } = req.body;
      const { vacancy_name, descriptions, salary, vacancy_id } =
        JSON.parse(fields);

      const filename =
        getRandomStr(32) + file.name.slice(file.name.lastIndexOf("."));

      file.mv(`images/${filename}`, (err) => {});

      const newVacancy = await db.query(
        `INSERT INTO vacancies (vacancy_name, photo_link, descriptions, salary, vacancy_id) values ($1, $2, $3, $4, $5) RETURNING *;`,
        [vacancy_name, filename, descriptions, salary, vacancy_id]
      );

      res.status(200).json(newVacancy.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async deleteVacancy(req, res) {
    try {
      const { vacancy_name } = req.params;
      const deletedVacancy = await db.query(
        `DELETE FROM vacancies WHERE vacancy_name = $1 RETURNING *;`,
        [vacancy_name]
      );
      res.status(200).json(deletedVacancy.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async getVacancies(req, res) {
    try {
      const { selected_city } = req.query;

      const queryString = `SELECT ${
        selected_city
          ? `v.* FROM cities_vacancies cv
      LEFT JOIN vacancies v ON v.vacancy_name = cv.vacancy_name
      WHERE city_name = '${selected_city}'`
          : "* FROM vacancies"
      } ORDER BY created_at DESC`;

      const vacancies = await db.query(queryString);
      res.status(200).json(
        vacancies.rows.map((v) => ({
          ...v,
          descriptions: v.descriptions.split(","),
        }))
      );
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async getVacancy(req, res) {
    try {
      const { vacancy_name } = req.params;
      const vacancy = await db.query(
        "SELECT * FROM vacancies WHERE vacancy_name = $1",
        [vacancy_name]
      );
      res.status(200).json(vacancy.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }

  async editVacancy(req, res) {
    try {
      const files = req.files;
      const { fields } = req.body;
      const {
        vacancy_name,
        prev_vacancy_name,
        descriptions,
        salary,
        vacancy_id,
      } = JSON.parse(fields);

      let editedVacancy = await db.query(
        `UPDATE vacancies SET vacancy_name = $1, descriptions = $2, salary = $3, vacancy_id = $4 WHERE vacancy_name = $5 RETURNING *;`,
        [vacancy_name, descriptions, salary, vacancy_id, prev_vacancy_name]
      );

      if (files) {
        const { file } = files;
        const filename =
          getRandomStr(32) + file.name.slice(file.name.lastIndexOf("."));

        file.mv(`images/${filename}`, (err) => {});

        editedVacancy = await db.query(
          `UPDATE vacancies SET photo_link = $1 WHERE vacancy_name = $2 RETURNING *;`,
          [filename, editedVacancy.rows[0].vacancy_name]
        );
      }

      res.status(200).json(editedVacancy.rows[0]);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: true, message: error.message || "Something broke!" });
    }
  }
}

module.exports = new VacancyController();
