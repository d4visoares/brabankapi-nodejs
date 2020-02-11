const jwt = require('jsonwebtoken')
const auth = require('../config/auth')

// ***** Criação de um middleware
// Para podermos passar para o próximo middlewares ou requisiçaõ, precisamos usar o comando next()

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization

    // Verifica se há um authorization passado no header
    if (!authHeader)
        return res.status(401).send({ erro: "Token Não informado" })

    const parts = authHeader.split(' ')

    // Verifica se o authorization possue duas partes
    if (parts.length !== 2) return res.status(401).send({ erro: "Token Errado" })


    const [bearer, token ] = parts
    console.log(parts)

    // Verifica se o authorization possue um Bearer
    if (!/^Bearer$/i.test(bearer)) return res.status(401).send({ erro: "Token mal formatado" })

    // Verifica se o token é válido
    try {

        const decoded = await jwt.verify(token, auth.secret)
        req.userid = decoded.id
        return next()

    } catch (error) {
        res.status(401).send({erro: "Token Inválido"})
    }

}