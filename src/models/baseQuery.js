const con = require('../config/conexao-db')


module.exports = (sql, params)=>{

    return new Promise((resolve, reject)=>{

        con.query(sql, params || '', (erro, retorno)=>{

            if(erro) return reject(erro)
            resolve(retorno)
            
        })
    })
}