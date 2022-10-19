const Router = require('express')
const router = new Router()

const vacancyController = require('../controllers/vacancy.controller')

router.post('/', vacancyController.createVacancy)
router.get('/', vacancyController.getVacancies)
router.get('/:vacancy_name', vacancyController.getVacancy)
router.put('/', vacancyController.editVacancy)
router.delete('/:vacancy_name', vacancyController.deleteVacancy)

module.exports = router
