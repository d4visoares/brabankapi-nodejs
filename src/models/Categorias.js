const baseQuery = require('./baseQuery');

class Categoria {

    list() {
        return baseQuery('SELECT * FROM categoria');
    }

    searchById(id) {
        return baseQuery('SELECT * FROM categoria WHERE id = ?', id);
    }

    insere(categoria){
        return baseQuery('INSERT INTO categoria SET ?', categoria);
    }

    update(categoria){
        return baseQuery('UPDATE categoria SET ? WHERE id = ?', [categoria, categoria.id]);
    }

    delete(id){
        return baseQuery('DELETE FROM categoria WHERE id = ?', id);
    }

}


module.exports = Categoria