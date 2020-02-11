const categoriaDAO = new (require('../models/Categorias'))();
const {validationResult} = require('express-validator');



module.exports = {

    async lista(req, res){

        try {

            const categorias =  await categoriaDAO.list();
            if(categorias == 0) return res.status(404).send({erro: "lista vazia"});

            res.send(categorias);

        } catch (erro) {

            console.log(erro);
            res.status(500).send(erro);

        }
    },

    async insere(req, res){
        
        let categoria = req.body;
        // const erros = validationResult;

        // if(erros.length() != 0) return res.status(400).send(erros);

        try {

            const retorno = await categoriaDAO.insere(categoria);
            categoria = {id: retorno.insertId, ...categoria};

            res.status(201).send(categoria);

        } catch (erro) {

            console.log(erro);
            res.status(500).send(erro);
            
        }
    }

}