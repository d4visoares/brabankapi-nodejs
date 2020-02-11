const { check, validationResult } = require('express-validator');
// const UsuariosValidator = require('../../validator/Usuarios');
const UsuarioDAO = require('../models/Usuarios');
const usuarioDAO = new UsuarioDAO();

// Forma de importar e já instanciar uma classe
// const usuarioDAO = new (require('../models/Usuarios'))();



module.exports = {
   async lista(req, res) {
      try {

         const usuarios = usuarioDAO.list();
         if (!usuarios) return res.status(400).send({ erro: "lista vazia" });
         res.send(usuarios);

      } catch (erro) {

         console.log(erro);
         return res.status(404).send(erro);

      }
   },

   async insere(req, res) {

      const erros = validationResult(req);
      if (!erros.isEmpty()) return res.status(400).send(erros)

      let usuario = req.body;

      try {

         const retorno = await usuarioDAO.insere(usuario);
         usuario = { id: retorno.insertId, ...usuario };
         res.status(201).send(usuario);

      } catch (erro) {

         console.log(erro);
         res.status(500).send(erro);

      }

   }

}