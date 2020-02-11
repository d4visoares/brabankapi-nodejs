const router = require('express').Router();
const categoriaController = require('../controllers/categorias');

router.get('/', categoriaController.lista);
router.post('/', categoriaController.insere);

module.exports = router;