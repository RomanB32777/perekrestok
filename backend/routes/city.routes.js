const Router = require('express')
const router = new Router()

const cityController = require('../controllers/city.controller')

router.post('/', cityController.createCity)
router.get('/', cityController.getCities)
router.get('/:city_name', cityController.getCity)
router.put('/', cityController.editCity)
router.delete('/:city_name', cityController.deleteCity)

module.exports = router