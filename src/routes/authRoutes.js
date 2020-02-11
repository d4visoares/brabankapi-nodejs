const router = require('express').Router();
const authController = require('../controllers/public/autenticacao');

const usuarioValidator = require('../validator/Usuarios');

router.post('/registrar', usuarioValidator.validations(), authController.registra);
router.post('/autenticar', usuarioValidator.validations(), authController.autentica);

module.exports = router;