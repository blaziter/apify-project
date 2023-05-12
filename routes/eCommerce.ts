import Router from 'express'
const router = Router()
const eCommerceController = require('../controllers/eCommerce')

router.get('/products', eCommerceController.getProducts)

module.exports = router