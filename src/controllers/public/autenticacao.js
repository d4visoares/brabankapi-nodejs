const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UsuariosValidator = require('../../validator/Usuarios');
const auth = require('../../config/auth');
const usuarioDAO = new (require('../../models/Usuarios'))();

gerarToken = (params) =>
   jwt.sign(params, auth.secret, {
      expiresIn: 1200
   })


module.exports = {

   async registra(req, res) {
      console.log('passou')
      const erros = validationResult(req)

      if (!erros.isEmpty()) {
         return res.status(400).send(erros);
      }

      let usuario = req.body;

      try {

         const hash = await bcrypt.hash(usuario.senha, 10);
         usuario.senha = hash;

         const retorno = await usuarioDAO.insere(usuario);
         usuario = { id: retorno.insertId, ...usuario }

         res.status(201).send({
            usuario,
            token: gerarToken({ id: usuario.id })
         })

      } catch (erro) {

         console.log(erro);
         res.status(500).send(erro);

      }

   },

   async autentica(req, res) {
      console.log("teste");
      const { email, senha } = req.body

      let usuario = await usuarioDAO.searchEmail(email);

      usuario = usuario[0];

      if (!usuario)
         return res.status(401).send({ erro: "Usuário e/ou senha inválidos!" })

      if (! await bcrypt.compare(senha, usuario.senha))
         return res.status(401).send({ erro: "Usuário e/ou senha inválidos!" })

      const token = gerarToken({ id: usuario.id })

      delete usuario.senha
      res.send({ usuario, token })

   }

}