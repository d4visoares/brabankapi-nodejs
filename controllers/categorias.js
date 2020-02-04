module.exports = (app) => {

    app.get('/categorias', (req, res) => {
        res.json({ aviso: "Usuário autenticado" })
    })
}