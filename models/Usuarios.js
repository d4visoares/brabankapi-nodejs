const con = require('../config/conexao-db')

class Users {

    list() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuario'

            con.query(sql, (error, callback) => {
                if (error){
                    reject('Erro ao consultar:' + erro)
                    return
                }
                console.log('Consultado!')
                resolve(callback)
            })
        })
    }

    searchEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from usuario where email = ?'

            con.query(sql, email, (error, callback) => {
                if(error)
                    reject("Erro ao consultar!" + error)
                else{
                    const usuario = callback[0]
                    resolve(usuario)
                    // if (usuario){
                    //     resolve(usuario)
                    // }else{
                    //     reject({erro: "Usuário não encontrado"})
                    // }
                }
            })
        })
    }

    // Insert method
    insere(usuario){
        return new  Promise((resolve, reject) => {
            const sql = 'INSERT INTO usuario SET ?'

            con.query(sql, usuario,
                // Callback do nosso insert
                (erro, retorno) => {
                    erro ? reject("Erro ao inserir:" + erro) :  
                    resolve({ id: retorno.insertId, ...usuario })
            })
        })
    }
}

module.exports = new Users()