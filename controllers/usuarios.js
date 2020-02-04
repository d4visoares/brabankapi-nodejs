const { check, validationResult } = require('express-validator');
const UsuariosValidator = require('../validator/Usuarios')
// Mapeando as rotas
const users = (app) => {



    // Primeira rota => requisição como get
    app.get('/', (req, res) => {
        res.send('Root rote i am the pretty groot')
    })




    // Rota de usuários
    app.get('/users', (req, res) => {
        const userDAO = app.models.Usuarios;

        userDAO.list()
            .then(lista => {
                res.send(lista)
            })
            .catch(erro => {
                res.status(500).send(erro)
            })
    })

    app.post('/users',
        UsuariosValidator.validations()
        , (req, res) => {
            let usuario = req.body

            // const emailError = userDAO.searchEmail(usuario.email)

            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                res.status(400).send(erros)
            }

            const userDAO = app.models.Usuarios

            // consulta de id teste
            // userDAO.insere(usuario)
            // .then(retorno => { 
            //     usuario.id = retorno.insertId
            //     res.status(201).send(usuario)

            // })
            // .catch(erro => {
            //     console.log(erro)
            //     res.status(500).send(erro)
            // })

            userDAO.insere(usuario)
                .then(retorno => {
                    res.status(201).send({ id: retorno.insertId, ...usuario })
                })
                .catch(erro => {
                    console.log(erro)
                    res.status(500).send(erro)
                })

            console.log(usuario)

        })

    // Rota email
    app.get('/users/email/:email', (req, res) =>{
        const email = req.params.email

        userDAO = app.models.Usuarios

        userDAO.searchEmail(email)
            .then(retorno => {

                if(retorno){
                    res.send(retorno)
                }else {
                    res.status(404).send()
                }
                res.send(retorno)
                 })
            .catch(erro =>  res.status(500).send(erro))
    })



}

module.exports = users