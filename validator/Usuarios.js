// Define qual pacote você quer, ao invés do default
const { check, body } = require('express-validator')
const usuarioDAO = require('../models/Usuarios')

class Usuarios {
    static validations() {
        return [
            check('nome').isLength({ min: 5, max: 100 })
                .withMessage("Campo nome deve estar entre 5 a 100 caracteres!"),
            check('email').isEmail()
                .withMessage("Insira um email válido!"),
            check('cpf').isNumeric()
                .withMessage("CPF deve conter apenas números!"),
            check('sexo').isLength({min:1, max: 1})
                .withMessage("Sexo deva ser M ou F"),
            check('senha').isLength({min:6, max:15})
                .withMessage("Senha Deve estar entre 6 a 15 caracteres!"),
            body('email').custom(email => {
                    return usuarioDAO.searchEmail(email)
                    .then(retorno => {
                        if(retorno){
                            return Promise.reject("Email já cadastrado!")
                        }
    
                })
            })
        ]
    }
}

module.exports = Usuarios