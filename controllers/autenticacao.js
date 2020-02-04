const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuariosValidator = require('../validator/Usuarios');
const auth = require('../config/auth');

gerarToken = (params)=>
  jwt.sign(params, auth.secret, {
    expiresIn: 60
  })



const autenticacao = (app) => {

  app.post('/registrar',
    UsuariosValidator.validations(), (req, res) => {
      let usuario = req.body

      // const emailError = userDAO.searchEmail(usuario.email)

      const erros = validationResult(req)

      if (!erros.isEmpty()) {
        res.status(400).send(erros)
      }

      bcrypt.hash(usuario.senha, 10, (erro, hash) => {
        usuario.senha = hash

        const userDAO = app.models.Usuarios

        userDAO.insere(usuario)
          .then(retorno => {
            delete retorno.senha
            res.status(201).send({
              retorno,
              token: gerarToken({id: usuario.id})
            })
          })
          .catch(erro => {
            console.log(erro)
            res.status(500).send(erro)
          })
      });



    })

  //  EXEMPLO DO MÉTODO AUTENTICAR SEM USAR ASYNC E AWAIT ***********************

  // app.post('/autenticar', (req, res) => {

  //   const { email, senha } = req.body

  //   const usuarioDao = app.models.Usuarios
  //   usuarioDao.searchEmail(email).then(usuario => {
  //     if (!usuario)
  //       return res.status(401).send({ erro: "Usuário e/ou senha inválidos!" })

  //     bcrypt.compare(senha, usuario.senha, (erro, resultado) => {
  //       if (!resultado)
  //         return res.status(401).send({ erro: "Usuário e/ou senha inválidos!" })

  //       const token = jwt.sign({ id: usuario.id }, auth.secret, {
  //         expiresIn: 60
  //       })

  //       delete usuario.senha
  //       res.send({ usuario, token })


  //     })
  //   })

  // })
  // *****************************************************************


  app.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body

    const usuarioDao = app.models.Usuarios
    const usuario = await usuarioDao.searchEmail(email)

    if (!usuario)
      return res.status(401).send({ erro: "Usuário e/ou senha inválidos!" })

    if (! await bcrypt.compare(senha, usuario.senha))
      return res.status(401).send({ erro: "Usuário e/ou senha inválidos!" })

    const token = gerarToken({id: usuario.id})

    delete usuario.senha
    res.send({ usuario, token })
  })
}

module.exports = autenticacao;