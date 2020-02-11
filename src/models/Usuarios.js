const baseQuery = require('./baseQuery');

class User {

    list() {
        return baseQuery('SELECT * FROM usuario');
    }

    searchEmail(email) {
        return baseQuery('SELECT * FROM usuario WHERE email = ?', email);
    }

    insere(usuario){
        return baseQuery('INSERT INTO usuario SET ?', usuario);
    }

}


module.exports = User;